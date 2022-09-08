import React, { useEffect, useState } from 'react';
import { Table, Button, Message } from 'adesign-react';
import './index.less';
import PlanHeader from '../planHeader';
import {
    Iconeye as SvgEye,
    Copy as SvgCopy,
    Delete as SvgDelete,
    CaretRight as SvgRun,

} from 'adesign-react/icons';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPlanList } from '@services/plan';
import dayjs from 'dayjs';
import Bus from '@utils/eventBus';

const PlanList = () => {

    const navigate = useNavigate();
    const [planList, setPlanList] = useState([]);
    const [keyword, setKeyword] = useState('');
    const dispatch = useDispatch();
    const refreshList = useSelector((store) => store.plan.refreshList);

    const taskList = {
        '0': '-',
        '1': '普通任务',
        '2': '定时任务',
    };
    const modeList = {
        '0': '-',
        '1': '并发模式',
        '2': '阶梯模式',
        '3': '错误率模式',
        '4': '响应时间模式',
        '5': '每秒请求数模式',
    };
    const statusList = {
        '1': '未开始',
        '2': <p style={{ color: '#3CC071' }}>进行中</p>,
    }

    const HandleContent = (props) => {
        const { status, data } = props;
        return (
            <div className='handle-content'>
                {status === 'running' ? <Button className='stop-btn' preFix={<SvgRun />}>停止</Button> :
                    <Button className='run-btn' preFix={<SvgRun />}>开始</Button>}
                <SvgEye onClick={() => {
                    console.log(data);
                    dispatch({
                        type: 'plan/updateOpenPlan',
                        payload: data
                    })
                    navigate(`/plan/detail/${data.plan_id}`);
                }} />
                <SvgCopy onClick={() => {
                    // Bus.$emit('copyPlan', data);
                }} />
                <SvgDelete style={{ fill: '#f00' }} onClick={() => {
                    Bus.$emit('deletePlan', data.plan_id, (code) => {
                        if (code === 0) {
                            Message('success', '删除成功!');
                        } else {
                            Message('error', '删除失败!');
                        }
                    })
                }} />
            </div>
        )
    }

    useEffect(() => {
        const query = {
            page: 1,
            size: 20,
            team_id: localStorage.getItem('team_id'),
            keyword,
            start_time_sec: '',
            end_time_sec: '',
        };
        fetchPlanList(query).subscribe({
            next: (res) => {
                const { data: { plans } } = res;
                const planList = plans.map(item => {
                    const { task_type, mode, status, created_time_sec, updated_time_sec } = item;
                    return {
                        ...item,
                        task_type: taskList[task_type],
                        mode: modeList[mode],
                        status: statusList[status],
                        created_time_sec: dayjs(created_time_sec * 1000).format('YYYY-MM-DD hh:mm:ss'),
                        updated_time_sec: dayjs(updated_time_sec * 1000).format('YYYY-MM-DD hh:mm:ss'),
                        handle: <HandleContent data={item} status='running' />
                    }
                })
                plans && setPlanList(planList);
            }
        })
    }, [refreshList, keyword])


    const columns = [
        {
            title: '任务ID',
            dataIndex: 'plan_id',
        },
        {
            title: '计划名称',
            dataIndex: 'name',
        },
        {
            title: '任务类型',
            dataIndex: 'task_type',
        },
        {
            title: '压测模式',
            dataIndex: 'mode',
        },
        {
            title: '创建时间',
            width: 220,
            dataIndex: 'created_time_sec',
        },
        {
            title: '最后修改时间',
            width: 220,
            dataIndex: 'updated_time_sec',
        },
        {
            title: '状态',
            dataIndex: 'status',
        },
        {
            title: '操作者',
            dataIndex: 'created_user_name',
        },
        {
            title: '备注',
            dataIndex: 'remark',
        },
        {
            title: '操作',
            dataIndex: 'handle',
            width: 196,
        }
    ];


    return (
        <div className='plan'>
            <PlanHeader onChange={(e) => setKeyword(e)} />
            <Table className="plan-table" showBorder columns={columns} data={planList} noDataElement={<p className='empty'>还没有数据</p>} />,
        </div>
    )
};

export default PlanList;
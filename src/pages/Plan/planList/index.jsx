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
import { debounce } from 'lodash';
import dayjs from 'dayjs';
import Bus from '@utils/eventBus';
import SvgStop from '@assets/icons/Stop';
import Pagination from '@components/Pagination';

const PlanList = () => {

    const navigate = useNavigate();
    const [planList, setPlanList] = useState([]);
    const [keyword, setKeyword] = useState('');
    const [total, setTotal] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
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
        '1': '未运行',
        '2': <p style={{ color: '#3CC071' }}>运行中</p>,
    }

    const HandleContent = (props) => {
        const { data } = props;
        const { status, plan_id } = data;
        return (
            <div className='handle-content'>
                {status === 2 ? <Button className='stop-btn' preFix={<SvgStop />} onClick={() => Bus.$emit('stopPlan', plan_id, (code) => {
                    if (code === 0) {
                        Message('success', '停止成功!');
                        getPlanList();
                    } else {
                        Message('error', '停止失败!');
                    }
                })}>停止</Button> :
                    <Button className='run-btn' preFix={<SvgRun />} onClick={() => Bus.$emit('runPlan', plan_id, (code) => {
                        if (code === 0) {
                            getPlanList();
                        } else {
                            Message('error', '操作失败!');
                        }
                    })}>开始</Button>}
                <div className='handle-icons'>
                    <SvgEye onClick={() => {
                        dispatch({
                            type: 'plan/updateOpenPlan',
                            payload: data
                        })
                        navigate(`/plan/detail/${plan_id}`);
                    }} />
                    <SvgCopy onClick={() => {
                        // Bus.$emit('copyPlan', data);
                    }} />
                    <SvgDelete style={{ fill: '#f00' }} onClick={() => {
                        Bus.$emit('deletePlan', plan_id, (code) => {
                            if (code === 0) {
                                Message('success', '删除成功!');
                            } else {
                                Message('error', '删除失败!');
                            }
                        })
                    }} />
                </div>
            </div>
        )
    }

    let plan_t = null;
    useEffect(() => {
        getPlanList();
        if (plan_t) {
            clearInterval(plan_t);
        }
        plan_t = setInterval(getPlanList, 1000);

        return () => {
            clearInterval(plan_t);
        }
    }, [refreshList, keyword, currentPage, pageSize]);

    const getPlanList = () => {
        const query = {
            page: currentPage,
            size: pageSize,
            team_id: localStorage.getItem('team_id'),
            keyword,
            start_time_sec: '',
            end_time_sec: '',
        };
        fetchPlanList(query).subscribe({
            next: (res) => {
                const { data: { plans, total } } = res;
                setTotal(total);
                const planList = plans.map(item => {
                    const { task_type, mode, status, created_time_sec, updated_time_sec } = item;
                    return {
                        ...item,
                        task_type: taskList[task_type],
                        mode: modeList[mode],
                        status: statusList[status],
                        created_time_sec: dayjs(created_time_sec * 1000).format('YYYY-MM-DD hh:mm:ss'),
                        updated_time_sec: dayjs(updated_time_sec * 1000).format('YYYY-MM-DD hh:mm:ss'),
                        handle: <HandleContent data={item} />
                    }
                })
                plans && setPlanList(planList);
            }
        })
    }


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

    const getNewkeyword = debounce((e) => setKeyword(e), 500);

    const pageChange = (page, size) => {
        page !== currentPage && setCurrentPage(page);
        size !== pageSize && setPageSize(size);
    }


    return (
        <div className='plan'>
            <PlanHeader onChange={getNewkeyword} />
            <Table className="plan-table" showBorder columns={columns} data={planList} noDataElement={<div className='empty'>还没有数据</div>} />
            { planList.length > 0 && <Pagination total={total} size={pageSize} current={currentPage} onChange={(page, pageSize) => pageChange(page, pageSize)} /> }
        </div>
    )
};

export default PlanList;
import React, { useEffect, useState } from 'react';
import { Table, Button, Message, Tooltip, Modal } from 'adesign-react';
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
import { fetchPlanList, fetchCopyPlan } from '@services/plan';
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
    const id_apis_plan = useSelector((d) => d.plan.id_apis);
    const node_config_plan = useSelector((d) => d.plan.node_config);

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
    };

    const copyPlan = (plan_id) => {
        const params = {
            team_id: parseInt(localStorage.getItem('team_id')),
            plan_id: parseInt(plan_id),
        };
        fetchCopyPlan(params).subscribe({
            next: (res) => {
                const { code } = res;
                if (code === 0) {
                    Message('success', '复制成功!');
                    getPlanList();
                } else {
                    Message('error', '复制失败!');
                }
            }
        })
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
                        dispatch({
                            type: 'plan/updateOpenScene',
                            payload: null,
                        })
                        let planMap = JSON.parse(localStorage.getItem('planMap') || '{}');
                        console.log(planMap);
                        if (planMap[plan_id]) {
                            console.log(planMap[plan_id]);
                            Bus.$emit('addOpenPlanScene', { target_id: planMap[plan_id] }, id_apis_plan, node_config_plan)
                        }
                        navigate(`/plan/detail/${plan_id}`);
                    }} />
                    <SvgCopy onClick={() => copyPlan(plan_id)} />
                    <SvgDelete style={{ fill: '#f00' }} onClick={() => {
                        Modal.confirm({
                            title: '注意',
                            content: '是否确定要删除此计划?',
                            onOk: () => {
                                Bus.$emit('deletePlan', plan_id, (code) => {
                                    if (code === 0) {
                                        Message('success', '删除成功!');
                                    } else {
                                        Message('error', '删除失败!');
                                    }
                                })
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
                // let bool = false;
                const planList = plans.map(item => {
                    const { task_type, mode, status, created_time_sec, updated_time_sec, name, rank } = item;
                    // if (status === 1) {
                    //     bool = true;
                    // }
                    return {
                        ...item,
                        rank,
                        name:
                            <Tooltip content={<div>{name}</div>}>
                                <div className='ellipsis'>{name}</div>
                            </Tooltip>,
                        task_type: taskList[task_type],
                        mode: modeList[mode],
                        status: statusList[status],
                        created_time_sec: dayjs(created_time_sec * 1000).format('YYYY-MM-DD HH:mm:ss'),
                        updated_time_sec: dayjs(updated_time_sec * 1000).format('YYYY-MM-DD HH:mm:ss'),
                        handle: <HandleContent data={item} />
                    }
                });
                // if (!bool) {
                //     plan_t && clearInterval(plan_t);
                // }
                plans && setPlanList(planList);
            }
        })
    }


    const columns = [
        {
            title: '计划ID',
            dataIndex: 'rank',
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
            {total > 0 && <Pagination total={total} size={pageSize} current={currentPage} onChange={(page, pageSize) => pageChange(page, pageSize)} />}
        </div>
    )
};

export default PlanList;
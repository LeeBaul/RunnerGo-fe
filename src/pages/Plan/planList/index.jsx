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
import SvgEmpty from '@assets/img/empty';
import { useTranslation } from 'react-i18next';

import { DatePicker } from '@arco-design/web-react';
const { RangePicker } = DatePicker;

const PlanList = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [planList, setPlanList] = useState([]);
    const [keyword, setKeyword] = useState('');
    const [total, setTotal] = useState(0);
    const [pageSize, setPageSize] = useState(parseInt(localStorage.getItem('plan_pagesize')) || 10);
    const [currentPage, setCurrentPage] = useState(parseInt(sessionStorage.getItem('plan_page')) || 1);

    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
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
        '2': <p style={{ color: 'var(--run-green)' }}>运行中</p>,
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
                    Message('success', t('message.copySuccess'));
                    getPlanList();
                } else {
                    Message('error', t('message.copyError'));
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
                        Message('success', t('message.stopSuccess'));
                        getPlanList();
                    } else {
                        Message('error', t('message.stopError'));
                    }
                })}> {t('btn.finish')} </Button> :
                    <Button className='run-btn' preFix={<SvgRun />} onClick={() => Bus.$emit('runPlan', plan_id, (code) => {
                        if (code === 0) {
                            getPlanList();
                        } else {
                            Message('error', t('message.handleError'));
                        }
                    })}>{t('btn.start')}</Button>}
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
                        // let planMap = JSON.parse(localStorage.getItem('planMap') || '{}');
                        // console.log(planMap);
                        // if (planMap[plan_id]) {
                        //     console.log(planMap[plan_id]);
                        //     Bus.$emit('addOpenPlanScene', { target_id: planMap[plan_id] }, id_apis_plan, node_config_plan)
                        // }
                        navigate(`/plan/detail/${plan_id}`);
                    }} />
                    <SvgCopy onClick={() => copyPlan(plan_id)} />
                    <SvgDelete style={{ fill: '#f00' }} onClick={() => {
                        Modal.confirm({
                            title: t('modal.look'),
                            content: t('modal.deletePlan'),
                            onOk: () => {
                                Bus.$emit('deletePlan', plan_id, (code) => {
                                    if (code === 0) {
                                        Message('success', t('message.deleteSuccess'));
                                    } else {
                                        Message('error', t('message.deleteError'));
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
    }, [refreshList, keyword, currentPage, pageSize, startTime, endTime]);

    const getPlanList = () => {
        const query = {
            page: currentPage,
            size: pageSize,
            team_id: localStorage.getItem('team_id'),
            keyword,
            start_time_sec: startTime,
            end_time_sec: endTime,
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
            title: t('plan.planId'),
            dataIndex: 'rank',
            // width: 84,
        },
        {
            title: t('plan.planName'),
            dataIndex: 'name',
            // width: 190,
        },
        {
            title: t('plan.taskType'),
            dataIndex: 'task_type',
            filters: [{ key: 1, value: "普通任务" }, { key: 2, value: "定时任务" }],
            onFilter: (key, value, item) => item.task_type == value,
            // width: 190,
        },
        {
            title: t('plan.mode'),
            dataIndex: 'mode',
            filters: [{ key: 1, value: "并发模式" }, { key: 2, value: "阶梯模式" }, { key: 3, value: "错误率模式" }, { key: 4, value: "响应时间模式" }, { key: 5, value: "每秒请求数模式" }],
            onFilter: (key, value, item) => item.mode === value,
            // width: 190,
        },
        {
            title: t('plan.createTime'),
            dataIndex: 'created_time_sec',
            width: 190,
        },
        {
            title: t('plan.updateTime'),
            dataIndex: 'updated_time_sec',
            width: 190,
        },
        {
            title: t('plan.status'),
            dataIndex: 'status',
            // width: 190,
        },
        {
            title: t('plan.operator'),
            dataIndex: 'created_user_name',
            // width: 190,
        },
        {
            title: t('plan.remark'),
            dataIndex: 'remark',
            // width: 190,
        },
        {
            title: t('plan.handle'),
            dataIndex: 'handle',
            width: 196,
        }
    ];

    const getNewkeyword = debounce((e) => setKeyword(e), 500);

    const getSelectDate = (startTime, endTime) => {
        setStartTime(startTime);
        setEndTime(endTime);
    }

    const pageChange = (page, size) => {
        if (size !== pageSize) {
            localStorage.setItem('plan_pagesize', size);
        }
        sessionStorage.setItem('plan_page', page)
        page !== currentPage && setCurrentPage(page);
        size !== pageSize && setPageSize(size);
    }

    const renderRow = (tableData, renderRowItem) => {
        return (
            <tbody>
                {tableData.map((tableRowData, rowIndex) => {
                    const rowComp = React.cloneElement(renderRowItem(tableRowData, rowIndex), {
                        key: rowIndex,
                        onDoubleClick(tableRowData) {
                            const { plan_id } = tableData[rowIndex];

                            dispatch({
                                type: 'plan/updateOpenPlan',
                                payload: tableData[rowIndex]
                            })
                            dispatch({
                                type: 'plan/updateOpenScene',
                                payload: null,
                            })
                            // let planMap = JSON.parse(localStorage.getItem('planMap') || '{}');
                            // console.log(planMap);
                            // if (planMap[plan_id]) {
                            //     console.log(planMap[plan_id]);
                            //     Bus.$emit('addOpenPlanScene', { target_id: planMap[plan_id] }, id_apis_plan, node_config_plan)
                            // }
                            navigate(`/plan/detail/${plan_id}`);
                        },
                    });
                    return rowComp;
                })}
            </tbody>
        );
    };


    return (
        <div className='plan'>
            <PlanHeader onChange={getNewkeyword} onDateChange={getSelectDate} />
            <Table renderRow={renderRow} className="plan-table" showBorder columns={columns} data={planList} noDataElement={<div className='empty'><SvgEmpty /> <p>{t('index.emptyData')}</p> </div>} />
            {total > 0 && <Pagination total={total} size={pageSize} current={currentPage} onChange={(page, pageSize) => pageChange(page, pageSize)} />}
        </div>
    )
};

export default PlanList;
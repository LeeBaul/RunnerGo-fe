import React, { useEffect, useState } from 'react';
import { Button, Message, Tooltip, Modal } from 'adesign-react';
import './index.less';
import ReportListHeader from './reportListHeader';
import {
    Iconeye as SvgEye,
    Copy as SvgCopy,
    Delete as SvgDelete,
    CaretRight as SvgRun,

} from 'adesign-react/icons';
import { useNavigate } from 'react-router-dom';
import { fetchReportList, fetchDeleteReport } from '@services/report';
import { debounce } from 'lodash';
import dayjs from 'dayjs';
import Pagination from '@components/Pagination';
import SvgEmpty from '@assets/img/empty';
import { useTranslation } from 'react-i18next';

import { Table } from '@arco-design/web-react';

const ReportList = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [reportList, setReportList] = useState([]);
    const [keyword, setKeyword] = useState('');
    const [total, setTotal] = useState(0);
    const [currentPage, setCurrentPage] = useState(parseInt(sessionStorage.getItem('report_page')) || 1);
    const [pageSize, setPageSize] = useState(parseInt(localStorage.getItem('report_pagesize')) || 10);

    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [taskType, setTaskType] = useState('');
    const [taskMode, setTaskMode] = useState('');
    const [status, setStatus] = useState('');
    const [sort, setSort] = useState(0);

    const modeList = {
        '1': t('plan.modeList.1'),
        '2': t('plan.modeList.2'),
        '3': t('plan.modeList.3'),
        '4': t('plan.modeList.4'),
        '5': t('plan.modeList.5'),
        '7': t('plan.modeList.7')
    };

    const taskList = {
        '0': '-',
        '1': t('plan.taskList.commonTask'),
        '2': t('plan.taskList.cronTask'),
        '3': t('plan.taskList.mixTask')
    };
    const statusList = {
        '1': <p style={{ color: 'var(--run-green)' }}>{ t('report.statusList.1') }</p>,
        '2': t('report.statusList.2'),
    }

    const HandleContent = (props) => {
        const { report_id } = props;
        return (
            <div className='handle-content'>
                <SvgEye onClick={() => navigate(`/report/detail?id=${report_id}`)} />
                {/* <SvgCopy /> */}
                <SvgDelete className='delete-svg' onClick={() => {
                    Modal.confirm({
                        title: t('modal.look'),
                        content: t('modal.deleteReport'),
                        okText: t('btn.ok'),
                        cancelText: t('btn.cancel'),
                        onOk: () => {
                            deleteReport(report_id);
                        }
                    })
                }} />
            </div>
        )
    };

    const deleteReport = (report_id) => {
        const params = {
            team_id: parseInt(localStorage.getItem('team_id')),
            report_id: parseInt(report_id),
        };

        fetchDeleteReport(params).subscribe({
            next: (res) => {
                Message('success', t('message.deleteSuccess'));
                getReportData();
            }
        });
    }

    let report_t = null;

    useEffect(() => {
        getReportData();
        if (report_t) {
            clearInterval(report_t);
        }
        report_t = setInterval(getReportData, 1000);

        return () => {
            clearInterval(report_t);
        }
    }, [keyword, currentPage, pageSize, startTime, endTime, taskType, taskMode, status, sort]);

    const getReportData = () => {
        const query = {
            page: currentPage,
            size: pageSize,
            team_id: localStorage.getItem('team_id'),
            keyword,
            start_time_sec: startTime,
            end_time_sec: endTime,
            task_type: taskType,
            task_mode: taskMode,
            status,
            sort
        };
        fetchReportList(query).subscribe({
            next: (res) => {
                const { data: { reports, total } } = res;
                setTotal(total);
                // let bool = false;
                const list = reports.map(item => {
                    const { task_type, task_mode, status, run_time_sec, last_time_sec, report_id, plan_name, rank, scene_name, run_user_name } = item;
                    // if (status === 1) {
                    //     bool = true;
                    // }
                    return {
                        ...item,
                        rank,
                        plan_name:
                            <Tooltip content={<div>{plan_name}</div>}>
                                <div className='ellipsis'>{plan_name}</div>
                            </Tooltip>,
                        scene_name:
                            <Tooltip content={<div>{scene_name}</div>}>
                                <div className='ellipsis'>{scene_name}</div>
                            </Tooltip>,
                        run_user_name:
                            <Tooltip content={<div>{run_user_name}</div>}>
                                <div className='ellipsis'>{run_user_name}</div>
                            </Tooltip>,
                        task_mode: modeList[task_mode],
                        status: statusList[status],
                        task_type: taskList[task_type],
                        run_time_sec: dayjs(run_time_sec * 1000).format('YYYY-MM-DD HH:mm:ss'),
                        last_time_sec: status === 1 ? '-' : dayjs(last_time_sec * 1000).format('YYYY-MM-DD HH:mm:ss'),
                        handle: <HandleContent report_id={report_id} />
                    }
                });
                // if (!bool) {
                //     report_t && clearInterval(report_t);
                // }

                setReportList(list);
            }
        })
    }

    const columns = [
        {
            title: t('index.reportId'),
            dataIndex: 'rank',
            // width: 84,
        },
        {
            title: t('index.planName'),
            dataIndex: 'plan_name',
            ellipsis: true
            // width: 200
        },
        {
            title: t('index.sceneName'),
            dataIndex: 'scene_name',
            ellipsis: true
            // width: 200
        },
        {
            title: t('index.taskType'),
            dataIndex: 'task_type',
            filterMultiple: false,
            // filters: [
            //     { text: t('plan.taskList.commonTask'), value: 1 },
            //     { text: t('plan.taskList.cronTask'), value: 2 },
            //     { text: t('plan.taskList.mixTask'), value: 3 },
            // ],
            // onFilter: (value, item) => {
            //     setTaskType(value);
            //     return true;
            // },
            // width: 200
        },
        {
            title: t('index.mode'),
            dataIndex: 'task_mode',
            filterMultiple: false,
            filters: [
                { text: t('plan.modeList.1'), value: 1 },
                { text: t('plan.modeList.2'), value: 2 },
                { text: t('plan.modeList.3'), value: 3 },
                { text: t('plan.modeList.4'), value: 4 },
                { text: t('plan.modeList.5'), value: 5 },
                // { text: t('plan.modeList.6'), value: 6 },
                // { text: t('plan.modeList.7'), value: 7 },
            ],
            onFilter: (value, item) => {
                setTaskMode(value);
                return true;
            },
            width: 135
        },
        {
            title: t('index.startTime'),
            dataIndex: 'run_time_sec',
            width: 200,
            sorter: true
        },
        {
            title: t('index.endTime'),
            dataIndex: 'last_time_sec',
            width: 200,
            sorter: true
        },
        {
            title: t('index.performer'),
            dataIndex: 'run_user_name',
            ellipsis: true
            // width: 200
        },
        {
            title: t('index.status'),
            dataIndex: 'status',
            width: 120,
            filterMultiple: false,
            filters: [
                { text: t('report.statusList.1'), value: 1 },
                { text: t('report.statusList.2'), value: 2 }
            ],
            onFilter: (value, item) => {
                setStatus(value);
                return true;
            },
        },
        {
            title: t('index.handle'),
            dataIndex: 'handle',
            width: 112
        }
    ];

    const getNewkeyword = debounce((e) => setKeyword(e), 500);

    const pageChange = (page, size) => {
        if (size !== pageSize) {
            localStorage.setItem('report_pagesize', size);
        }
        sessionStorage.setItem('report_page', page);
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

                            const { report_id } = tableData[rowIndex]
                            navigate(`/report/detail/${report_id}`)
                        },
                    });
                    return rowComp;
                })}
            </tbody>
        );
    };

    const getSelectDate = (startTime, endTime) => {
        setStartTime(startTime);
        setEndTime(endTime);
    }

    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [selectReport, setSelectReport] = useState([])


    return (
        <div className='report'>
            <ReportListHeader onChange={getNewkeyword} onDateChange={getSelectDate} selectReport={selectReport} />
            <Table
                className="report-table"
                border={{
                    wrapper: true,
                    cell: true,
                }}
                pagination={false}
                columns={columns}
                data={reportList}
                noDataElement={<div className='empty'><SvgEmpty /><p>{t('index.emptyData')}</p></div>}
                rowKey='report_id'
                rowSelection={
                    {
                        type: 'checkbox',
                        selectedRowKeys,
                        onChange: (selectedRowKeys, selectedRows) => {
                            console.log('onChange:', selectedRowKeys, selectedRows);
                            setSelectedRowKeys(selectedRowKeys);
                            setSelectReport(selectedRows);
                        },
                    }
                }
                onChange={(a, sort, filter, c) => {
                    console.log(a, sort, c);
                    if (!filter.hasOwnProperty('task_mode')) {
                        setTaskMode('');
                    } else {
                        setTaskMode(filter.task_mode[0]);
                    }
                    if (!filter.hasOwnProperty('task_type')) {
                        setTaskType('');
                    } else {
                        setTaskType(filter.task_type[0]);
                    }
                    if (!filter.hasOwnProperty('status')) {
                        setStatus('');
                    } else {
                        setStatus(filter.status[0]);
                    }
                    if (sort.hasOwnProperty('field') && sort.hasOwnProperty('direction') && sort.direction) {
                        if (sort.field === 'run_time_sec') {
                            setSort(sort.direction === 'ascend' ? 2 : 1);
                        } else if (sort.field === 'last_time_sec') {
                            setSort(sort.direction === 'ascend' ? 4 : 3);
                        }
                    } else {
                        setSort(0);
                    }
                }}
                onRow={(record, index) => {
                    return {
                        onDoubleClick: (event) => {
                            const { report_id } = record;
                            navigate(`/report/detail?id=${report_id}`)
                        },
                    };
                }}
            />
            {total > 0 && <Pagination total={total} size={pageSize} current={currentPage} onChange={(page, pageSize) => pageChange(page, pageSize)} />}
        </div>
    )
};

export default ReportList;
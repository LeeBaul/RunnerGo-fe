import React, { useEffect, useState } from 'react';
import './index.less';
import { Input, Button, Message, Tooltip, Modal } from 'adesign-react';
import {
    Iconeye as SvgEye,
    Export as SvgExport,
    Delete as SvgDelete,
    Search as SvgSearch,
} from 'adesign-react/icons';
import { fetchReportList, fetchDeleteReport } from '@services/report';
import { tap } from 'rxjs';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import { debounce } from 'lodash';
import Pagination from '@components/Pagination';
import SvgEmpty from '@assets/img/empty';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { isArray } from 'lodash';
import enUS from '@arco-design/web-react/es/locale/en-US';
import cnUS from '@arco-design/web-react/es/locale/zh-CN';


import { DatePicker, Table, ConfigProvider } from '@arco-design/web-react';
const { RangePicker } = DatePicker;

const RecentReport = () => {

    const [reportList, setReportList] = useState([]);
    const [keyword, setKeyword] = useState('');
    const [total, setTotal] = useState(0);
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [taskType, setTaskType] = useState('');
    const [taskMode, setTaskMode] = useState('');
    const [status, setStatus] = useState('');
    const [sort, setSort] = useState(0);

    const [currentPage, setCurrentPage] = useState(parseInt(sessionStorage.getItem('index_page')) || 1);
    const [pageSize, setPageSize] = useState(parseInt(localStorage.getItem('index_pagesize')) || 10);
    const theme = useSelector((store) => store.user.theme);
    const language = useSelector((store) => store.user.language);
    const navigate = useNavigate();
    const { t } = useTranslation();
    const modeList = {
        '1': t('plan.modeList.1'),
        '2': t('plan.modeList.2'),
        '3': t('plan.modeList.3'),
        '4': t('plan.modeList.4'),
        '5': t('plan.modeList.5'),
        '6': t('plan.modeList.6'),
        '7': t('plan.modeList.7')
    };

    const taskList = {
        '0': '-',
        '1': t('plan.taskList.commonTask'),
        '2': t('plan.taskList.cronTask'),
        '3': t('plan.taskList.mixTask')
    };


    let index_report_t = null;

    useEffect(() => {
        getReportData();
        if (index_report_t) {
            clearInterval(index_report_t);
        }
        index_report_t = setInterval(getReportData, 2000);

        return () => {
            clearInterval(index_report_t);
        }
    }, [keyword, localStorage.getItem('team_id'), currentPage, pageSize, startTime, endTime, taskType, taskMode, status, sort, language]);

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
        }
        fetchReportList(query)
            .pipe(
                tap((res) => {
                    const { code, data } = res;
                    if (code === 0) {
                        const { reports, total } = data;
                        setTotal(total);
                        const list = reports.map((item, index) => {
                            const { report_id, plan_name, scene_name, task_type, task_mode, run_time_sec, last_time_sec, run_user_name, status, rank } = item;
                            return {
                                ...item,
                                rank,
                                plan_name: <Tooltip className='tooltip-diy' content={<div>{plan_name}</div>}><div className='ellipsis'>{plan_name}</div></Tooltip>,
                                scene_name:
                                    <Tooltip className='tooltip-diy' content={<div>{scene_name}</div>}>
                                        <div className='ellipsis'>{scene_name}</div>
                                    </Tooltip>,
                                run_user_name:
                                    <Tooltip className='tooltip-diy' content={<div>{run_user_name}</div>}>
                                        <div className='ellipsis'>{run_user_name}</div>
                                    </Tooltip>,
                                task_mode: modeList[task_mode],
                                task_type: taskList[task_type],
                                run_time_sec: dayjs(run_time_sec * 1000).format('YYYY-MM-DD HH:mm:ss'),
                                last_time_sec: status === 1 ? '-' : dayjs(last_time_sec * 1000).format('YYYY-MM-DD HH:mm:ss'),
                                status: status === 1 ? <p style={{ color: 'var(--run-green)' }}>{t('report.statusList.1')}</p> : t('report.statusList.2'),
                                operation: <HandleContent report_id={report_id} />
                            }
                        });
                        setReportList(list);
                    }
                })
            )
            .subscribe();
    }

    const HandleContent = (props) => {
        const { report_id } = props;
        return (
            <div className='handle-content'>
                <Tooltip bgColor={theme === 'dark' ? '#39393D' : '#E9E9E9'} content={t('tooltip.view')}>
                    <div> <SvgEye onClick={() => navigate(`/report/detail?id=${report_id}`)} /></div>
                </Tooltip>
                {/* <SvgExport /> */}
                <Tooltip bgColor={theme === 'dark' ? '#39393D' : '#E9E9E9'} content={t('tooltip.delete')}>
                    <div>
                        <SvgDelete className='delete' onClick={() => {
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
                </Tooltip>
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
    };

    const columns = [
        {
            title: t('index.reportId'),
            dataIndex: 'rank',
            width: 105,
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
            width: 135,
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
                // { text: t('plan.modeList.7'), value: 7 }
            ],
            onFilter: (value, item) => {
                console.log(value);
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
            dataIndex: 'operation',
            width: 112,
        }
    ];

    const getNewKeyword = debounce((e) => setKeyword(e), 500);

    const pageChange = (page, size) => {
        if (size !== pageSize) {
            localStorage.setItem('index_pagesize', size);
        }
        sessionStorage.setItem('index_page', page);
        page !== currentPage && setCurrentPage(page);
        size !== pageSize && setPageSize(size);
    };


    const renderRow = (tableData, renderRowItem) => {
        return (
            <tbody>
                {tableData.map((tableRowData, rowIndex) => {
                    const rowComp = React.cloneElement(renderRowItem(tableRowData, rowIndex), {
                        key: rowIndex,
                        onDoubleClick(tableRowData) {

                            const { report_id } = tableData[rowIndex]
                            navigate(`/report/detail?id=${report_id}`)
                        },
                    });
                    return rowComp;
                })}
            </tbody>
        );
    };

    // const mode = value === 'date time' ? 'date' : value;
    // const style =
    //     value === 'date time'
    //         ? {
    //             width: 380,
    //         }
    //         : {
    //             width: 254,
    //             marginBottom: 20,
    //         };
    const onChange = (dateString, date) => {
        console.log('onChange: ', dateString, date);
        if (isArray(dateString)) {
            const [start, end] = dateString;
            setStartTime(new Date(start).getTime() / 1000);
            setEndTime(new Date(end).getTime() / 1000);
        } else {
            setStartTime('');
            setEndTime('');
        }
    }

    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [selectReport, setSelectReport] = useState(false);

    const toContrast = () => {
        let task_mode = '';
        if (selectReport.filter(item => item.status === t('report.statusList.2')).length !== selectReport.length) {
            Message('error', t('message.contrastRunning'));
            return;
        }
        for (let i = 0; i < selectReport.length; i++) {
            if (i === 0) {
                task_mode = selectReport[i].task_mode;
            } else {
                if (task_mode !== selectReport[i].task_mode) {
                    Message('error', t('message.contrastMode'))
                    return;
                }
            }
        }
        const _selectReport = selectReport.map((item, index) => {
            return {
                report_id: item.report_id,
                plan_name: item.plan_name.props.content.props.children,
                scene_name: item.scene_name.props.content.props.children,
            }
        });
        navigate(`/reportContrast?contrast=${JSON.stringify(_selectReport)}`)
    }
    return (
        <div className='recent-report'>
            <p className='title'>{t('index.recentReport')}</p>
            <div className='report-search'>
                <Input
                    className="textBox"
                    value={keyword}
                    onChange={getNewKeyword}
                    beforeFix={<SvgSearch />}
                    placeholder={t('index.placeholder')}
                />
                <RangePicker
                    mode="date"
                    onChange={onChange}
                    showTime="true"
                />
                {
                    selectedRowKeys.length < 2 || selectedRowKeys.length > 4 ?
                        <Tooltip
                            bgColor={theme === 'dark' ? '#39393D' : '#E9E9E9'}
                            className='tooltip-diy'
                            content={selectedRowKeys.length < 2 || selectedRowKeys.length > 4 ? t('index.contrastText') : ''}
                        >
                            <Button className='contrast-btn' style={{ backgroundColor: selectedRowKeys.length < 2 || selectedRowKeys.length > 4 ? 'var(--bg-4)' : '', color: selectedRowKeys.length < 2 || selectedRowKeys.length > 4 ? 'var(--font-1)' : '' }} disabled={selectedRowKeys.length < 2 || selectedRowKeys.length > 4} onClick={() => toContrast()}>{t('btn.contrast')}</Button>
                        </Tooltip>
                        : <Button className='contrast-btn' disabled={selectedRowKeys.length < 2 || selectedRowKeys.length > 4} onClick={() => toContrast()}>{t('btn.contrast')}</Button>
                }
            </div>
            <Table
                className="report-table"
                border={{
                    wrapper: true,
                    cell: true,
                }}
                showSorterTooltip={false}
                columns={columns}
                data={reportList}
                pagination={false}
                noDataElement={<div className='empty'> <SvgEmpty /> <p>{t('index.emptyData')}</p></div>}
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
                    console.log(a, sort, filter, c);
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
            {total > 0 && <Pagination total={total} current={currentPage} size={pageSize} onChange={(page, pageSize) => pageChange(page, pageSize)} />}
        </div>
    )
};

export default RecentReport;
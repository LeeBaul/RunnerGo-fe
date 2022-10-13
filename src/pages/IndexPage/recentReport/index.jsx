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


import { DatePicker, Table } from '@arco-design/web-react';
const { RangePicker } = DatePicker;

const RecentReport = () => {

    const [reportList, setReportList] = useState([]);
    const [keyword, setKeyword] = useState('');
    const [total, setTotal] = useState(0);
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');

    const [currentPage, setCurrentPage] = useState(parseInt(sessionStorage.getItem('index_page')) || 1);
    const [pageSize, setPageSize] = useState(parseInt(localStorage.getItem('index_pagesize')) || 10);
    const theme = useSelector((store) => store.user.theme);
    const navigate = useNavigate();
    const { t } = useTranslation();
    const modeList = {
        '1': '并发模式',
        '2': '阶梯模式',
        '3': '错误率模式',
        '4': '响应时间模式',
        '5': '每秒请求数模式'
    };

    const taskLit = {
        '1': '普通任务',
        '2': '定时任务',
    };

    useEffect(() => {
        getReportData();
    }, [keyword, localStorage.getItem('team_id'), currentPage, pageSize, startTime, endTime]);


    const getReportData = () => {
        const query = {
            page: currentPage,
            size: pageSize,
            team_id: localStorage.getItem('team_id'),
            keyword,
            start_time_sec: startTime,
            end_time_sec: endTime,
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
                                plan_name: <Tooltip content={<div>{plan_name}</div>}><div className='ellipsis'>{plan_name}</div></Tooltip>,
                                scene_name:
                                <Tooltip content={<div>{scene_name}</div>}>
                                    <div className='ellipsis'>{scene_name}</div>
                                </Tooltip>,
                                run_user_name:
                                <Tooltip content={<div>{run_user_name}</div>}>
                                    <div className='ellipsis'>{run_user_name}</div>
                                </Tooltip>,
                                task_mode: modeList[task_mode],
                                task_type: taskLit[task_type],
                                run_time_sec: dayjs(run_time_sec * 1000).format('YYYY-MM-DD HH:mm:ss'),
                                last_time_sec: dayjs(last_time_sec * 1000).format('YYYY-MM-DD HH:mm:ss'),
                                status: status === 1 ? <p style={{ color: 'var(--run-green)' }}>运行中</p> : <p>已完成</p>,
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
                <SvgEye onClick={() => navigate(`/report/detail/${report_id}`)} />
                {/* <SvgExport /> */}
                <SvgDelete className='delete' onClick={() => {
                    Modal.confirm({
                        title: t('modal.look'),
                        content: t('modal.deleteReport'),
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
                Message('success', '删除成功!');
                getReportData();
            }
        });
    };

    const columns = [
        {
            title: t('index.reportId'),
            dataIndex: 'rank',
            // width: 84
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
            filters: [
                { text: "普通任务", value: "普通任务" },
                { text: "定时任务", value: "定时任务" }
            ],
            onFilter: (value, item) => item.task_type === value,
            // width: 200,
        },
        {
            title: t('index.mode'),
            dataIndex: 'task_mode',
            filters: [
                { text: "并发模式", value: "并发模式" },
                { text: "阶梯模式", value: "阶梯模式" },
                { text: "错误率模式", value: "错误率模式" },
                { text: "响应时间模式", value: "响应时间模式" },
                { text: "每秒请求数模式", value: "每秒请求数模式" }
            ],
            onFilter: (value, item) => item.task_mode === value,
            width: 135
        },
        {
            title: t('index.startTime'),
            dataIndex: 'run_time_sec',
            width: 200,
        },
        {
            title: t('index.endTime'),
            dataIndex: 'last_time_sec',
            width: 200,
        },
        {
            title: t('index.performer'),
            dataIndex: 'run_user_name',
            ellipsis: true
            // width: 200,
        },
        {
            title: t('index.status'),
            dataIndex: 'status',
            // width: 200,

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
                            navigate(`/report/detail/${report_id}`)
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

    useEffect(() => {
        if (theme === 'dark') {
            document.body.setAttribute('arco-theme', 'dark');
        } else {
            document.body.removeAttribute('arco-theme');
        }
    }, [theme]);

    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [selectReport, setSelectReport] = useState(false);

    const toContrast = () => {
        const _selectReport = selectReport.map(item => {
            return {
                report_id: item.report_id,
                plan_name: item.plan_name.props.content.props.children,
                scene_name: item.scene_name.props.content.props.children,
            }
        });
        navigate(`/report/detail?contrast=${JSON.stringify(_selectReport)}`)
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
                <Tooltip
                    content={ selectedRowKeys.length < 2 || selectedRowKeys.length > 5 ? t('index.contrastText') : '' }
                >
                    <Button className='contrast-btn' disabled={ selectedRowKeys.length < 2 || selectedRowKeys.length > 5 } onClick={() => toContrast()}>{t('btn.contrast')}</Button>
                </Tooltip>
            </div>
            <Table
                className="report-table"
                border={{
                    wrapper: true,
                    cell: true,
                }}
                columns={columns}
                data={reportList}
                pagination={false}
                noDataElement={<div className='empty'> <SvgEmpty /> <p>{ t('index.emptyData') }</p></div>}
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
                onRow={(record, index) => {
                    return {
                        onDoubleClick: (event) => {
                            const { report_id } = record;
                            navigate(`/report/detail/${report_id}`)
                        },
                    };
                }}
            />
            {total > 0 && <Pagination total={total} current={currentPage} size={pageSize} onChange={(page, pageSize) => pageChange(page, pageSize)} />}
        </div>
    )
};

export default RecentReport;
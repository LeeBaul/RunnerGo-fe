import React, { useEffect, useState } from 'react';
import './index.less';
import { Table, Input, Button, Message, Tooltip } from 'adesign-react';
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

const RecentReport = () => {

    const [reportList, setReportList] = useState([]);
    const [keyword, setKeyword] = useState('');
    const [total, setTotal] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const navigate = useNavigate();
    const { t } = useTranslation();

    const modeList = {
        '1': '并发模式',
        '2': '阶梯模式',
        '3': '错误率模式',
        '4': '响应时间模式',
        '5': '每秒请求数模式',
        '6': '每秒事务数模式'
    };

    const taskLit = {
        '1': '普通任务',
        '2': '定时任务',
    };

    useEffect(() => {
        getReportData();
    }, [keyword, localStorage.getItem('team_id'), currentPage, pageSize]);

    const getReportData = () => {
        const query = {
            page: currentPage,
            size: pageSize,
            team_id: localStorage.getItem('team_id'),
            keyword,
            start_time_sec: '',
            end_time_sec: '',
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
                                scene_name,
                                task_mode: modeList[task_mode],
                                task_type: taskLit[task_type],
                                run_time_sec: dayjs(run_time_sec * 1000).format('YYYY-MM-DD HH:mm:ss'),
                                last_time_sec: dayjs(last_time_sec * 1000).format('YYYY-MM-DD HH:mm:ss'),
                                run_user_name,
                                status: status === 1 ? <p style={{ color: '#3CC071' }}>运行中</p> : <p>已完成</p>,
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
                <SvgDelete className='delete' onClick={() => deleteReport(report_id)} />
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
        },
        {
            title: t('index.planName'),
            dataIndex: 'plan_name',
        },
        {
            title: t('index.sceneName'),
            dataIndex: 'scene_name',
        },
        {
            title: t('index.taskType'),
            dataIndex: 'task_type',
        },
        {
            title: t('index.mode'),
            dataIndex: 'task_mode',
        },
        {
            title: t('index.startTime'),
            dataIndex: 'run_time_sec',
            // width: 220,
        },
        {
            title: t('index.endTime'),
            dataIndex: 'last_time_sec',
            // width:
        },
        {
            title: t('index.performer'),
            dataIndex: 'run_user_name',
        },
        {
            title: t('index.status'),
            dataIndex: 'status',
        },
        {
            title: t('index.handle'),
            dataIndex: 'operation'
        }
    ];

    const getNewKeyword = debounce((e) => setKeyword(e), 500);

    const pageChange = (page, size) => {
        page!== currentPage && setCurrentPage(page);
        size !== pageSize && setPageSize(size);
    };

    return (
        <div className='recent-report'>
            <p className='title'>{ t('index.recentReport') }</p>
            <div className='report-search'>
                <Input
                    className="textBox"
                    value={keyword}
                    onChange={getNewKeyword}
                    beforeFix={<SvgSearch />}
                    placeholder={ t('index.placeholder') }
                />
                {/* <Button className='searchBtn'>搜索</Button> */}
            </div>
            <Table className="report-table" showBorder columns={columns} data={reportList} noDataElement={<div className='empty'> <SvgEmpty /> <p>还没有数据</p></div>} />
            { total > 0 && <Pagination total={total} current={currentPage} size={pageSize} onChange={(page, pageSize) => pageChange(page, pageSize)} /> }
        </div>
    )
};

export default RecentReport;
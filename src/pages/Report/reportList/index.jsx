import React, { useEffect, useState } from 'react';
import { Table, Button, Message, Tooltip, Modal } from 'adesign-react';
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

const ReportList = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [reportList, setReportList] = useState([]);
    const [keyword, setKeyword] = useState('');
    const [total, setTotal] = useState(0);
    const [currentPage, setCurrentPage] = useState(parseInt(sessionStorage.getItem('report_page')) || 1);
    const [pageSize, setPageSize] = useState(parseInt(localStorage.getItem('report_pagesize')) || 10);

    const modeList = {
        '1': '并发模式',
        '2': '阶梯模式',
        '3': '错误率模式',
        '4': '响应时间模式',
        '5': '每秒请求数模式',
        '6': '每秒事务数模式',
    };

    const taskList = {
        '1': '普通任务',
        '2': '定时任务',
    };

    const statusList = {
        '1': <p style={{ color: '#3CC071' }}>运行中</p>,
        '2': '已完成',
    }

    const HandleContent = (props) => {
        const { report_id } = props;
        return (
            <div className='handle-content'>
                <SvgEye onClick={() => navigate(`/report/detail/${report_id}`)} />
                {/* <SvgCopy /> */}
                <SvgDelete className='delete-svg' onClick={() => {
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
    }, [keyword, currentPage, pageSize]);

    const getReportData = () => {
        const query = {
            page: currentPage,
            size: pageSize,
            team_id: localStorage.getItem('team_id'),
            keyword,
            start_time_sec: '',
            end_time_sec: '',
        };
        fetchReportList(query).subscribe({
            next: (res) => {
                const { data: { reports, total } } = res;
                setTotal(total);
                // let bool = false;
                const list = reports.map(item => {
                    const { task_type, task_mode, status, run_time_sec, last_time_sec, report_id, plan_name, rank } = item;
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

    const data = [
        {
            id: '1',
            name: '测试2',
            type: '普通类型',
            mode: '并发模式',
            createTime: '2022.5.9 11:00:00',
            lastUpdateTime: '2022.6.9 11:00:00',
            status: '未开始',
            handler: 'cici',
            remark: '这是一个备注',
            handle: <HandleContent />,
        },
        {
            id: '2',
            name: '测试2',
            type: '普通类型',
            mode: '并发模式',
            createTime: '2022.5.9 11:00:00',
            lastUpdateTime: '2022.6.9 11:00:00',
            status: '未开始',
            handler: 'cici',
            remark: '这是一个备注',
            handle: <HandleContent />,
        },
        {
            id: '3',
            name: '测试2',
            type: '普通类型',
            mode: '并发模式',
            createTime: '2022.5.9 11:00:00',
            lastUpdateTime: '2022.6.9 11:00:00',
            status: '未开始',
            handler: 'cici',
            remark: '这是一个备注',
            handle: <HandleContent />,
        },
        {
            id: '4',
            name: '测试2',
            type: '普通类型',
            mode: '并发模式',
            createTime: '2022.5.9 11:00:00',
            lastUpdateTime: '2022.6.9 11:00:00',
            status: '未开始',
            handler: 'cici',
            remark: '这是一个备注',
            handle: <HandleContent />,
        },
    ];

    const columns = [
        {
            title: t('index.reportId'),
            dataIndex: 'rank',
            sorter:(a,b)=>a.rank - b.rank,
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
            filters:[{key:1 ,value:"普通任务"},{key:2,value:"定时任务"}],
            onFilter:(value, item) => item.task_type == value,
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
            dataIndex: 'handle'
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

    return (
        <div className='report'>
            <ReportListHeader onChange={getNewkeyword} />
            <Table className="report-table" showBorder columns={columns} data={reportList} noDataElement={<div className='empty'><SvgEmpty /><p>还没有数据</p></div>} />
            { total > 0 && <Pagination total={total} size={pageSize} current={currentPage} onChange={(page, pageSize) => pageChange(page, pageSize)} /> }
        </div>
    )
};

export default ReportList;
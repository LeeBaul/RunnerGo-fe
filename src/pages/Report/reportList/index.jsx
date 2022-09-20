import React, { useEffect, useState } from 'react';
import { Table, Button, Message } from 'adesign-react';
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

const ReportList = () => {
    const navigate = useNavigate();
    const [reportList, setReportList] = useState([]);
    const [keyword, setKeyword] = useState('');
    const [total, setTotal] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

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
        '1': '未开始',
        '2': <p style={{ color: '#3CC071' }}>进行中</p>,
    }

    const HandleContent = (props) => {
        const { report_id } = props;
        return (
            <div className='handle-content'>
                <SvgEye onClick={() => navigate(`/report/detail/${report_id}`)} />
                <SvgCopy />
                <SvgDelete className='delete-svg' onClick={() => deleteReport(report_id)} />
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
    }

    useEffect(() => {
        getReportData();
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
                const list = reports.map(item => {
                    const { task_type, task_mode, status, run_time_sec, last_time_sec, report_id } = item;
                    return {
                        ...item,
                        task_mode: modeList[task_mode],
                        status: statusList[status],
                        task_type: taskList[task_type],
                        run_time_sec: dayjs(run_time_sec * 1000).format('YYYY-MM-DD hh:mm:ss'),
                        last_time_sec: dayjs(last_time_sec * 1000).format('YYYY-MM-DD hh:mm:ss'),
                        handle: <HandleContent report_id={report_id} />
                    }
                });
                console.log(list);
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
            title: '测试报告ID',
            dataIndex: 'report_id',
        },
        {
            title: '计划名称',
            dataIndex: 'plan_name',
        },
        {
            title: '场景名称',
            dataIndex: 'scene_name',
        },
        {
            title: '任务模式',
            dataIndex: 'task_type',
        },
        {
            title: '压测模式',
            dataIndex: 'task_mode',
        },
        {
            title: '开始时间',
            dataIndex: 'run_time_sec',
            width: 220,
        },
        {
            title: '结束时间',
            dataIndex: 'last_time_sec',
            width: 220,
        },
        {
            title: '执行者',
            dataIndex: 'run_user_name',
        },
        {
            title: '状态',
            dataIndex: 'status',
        },
        {
            title: '操作',
            dataIndex: 'handle',
            width: 196,
        }
    ];

    const getNewkeyword = debounce((e) => setKeyword(e), 500);

    const pageChange = (page, size) => {
        page !== page && setCurrentPage(page);
        size !== size && setPageSize(size);
    }

    return (
        <div className='report'>
            <ReportListHeader onChange={getNewkeyword} />
            <Table className="report-table" showBorder columns={columns} data={reportList} noDataElement={<div className='empty'>还没有数据</div>} />
            { reportList.length > 0 && <Pagination total={total} size={pageSize} current={currentPage} onChange={(page, pageSize) => pageChange(page, pageSize)} /> }
        </div>
    )
};

export default ReportList;
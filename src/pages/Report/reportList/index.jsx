import React, { useEffect, useState } from 'react';
import { Table, Button } from 'adesign-react';
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
import dayjs from 'dayjs';

const ReportList = () => {
    const navigate = useNavigate();
    const [reportList, setReportList] = useState([]);
    const [keyword, setKeyword] = useState('');

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
            report_id,
        };

        fetchDeleteReport(params).subscribe()
    }

    useEffect(() => {
        const query = {
            page: 1,
            size: 10,
            team_id: localStorage.getItem('team_id'),
            keyword,
            start_time_sec: '',
            end_time_sec: '',
        };
        fetchReportList(query).subscribe({
            next: (res) => {
                const { data: { reports } } = res;
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
                setReportList(list);
            }
        })
    }, [keyword])

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


    return (
        <div className='report'>
            <ReportListHeader onChange={(e) => setKeyword(e)} />
            <Table className="report-table" showBorder columns={columns} data={reportList} noDataElement={<p className='empty'>还没有数据</p>} />,
        </div>
    )
};

export default ReportList;
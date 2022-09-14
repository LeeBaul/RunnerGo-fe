import React, { useEffect, useState } from 'react';
import './index.less';
import { Table, Input, Button } from 'adesign-react';
import {
    Iconeye as SvgEye,
    Export as SvgExport,
    Delete as SvgDelete,
    Search as SvgSearch,
} from 'adesign-react/icons';
import { fetchReportList } from '@services/report';
import { tap } from 'rxjs';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';

const RecentReport = () => {

    const [reportList, setReportList] = useState([]);
    const [keyword, setKeyword] = useState('');
    const navigate = useNavigate();

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
        const query = {
            page: 1,
            size: 10,
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
                        const { reports } = data;
                        const list = reports.map((item, index) => {
                            const { report_id, plan_name, scene_name, task_type, task_mode, run_time_sec, last_time_sec, run_user_name, status } = item;
                            return {
                                report_id,
                                plan_name,
                                scene_name,
                                task_mode: modeList[task_mode],
                                task_type: taskLit[task_type],
                                run_time_sec: dayjs(run_time_sec * 1000).format('YYYY-MM-DD hh:mm:ss'),
                                last_time_sec: dayjs(last_time_sec * 1000).format('YYYY-MM-DD hh:mm:ss'),
                                run_user_name,
                                status: status === 1 ? <p style={{ color: '#3CC071' }}>运行中</p> : <p>未开始</p>,
                                operation: <HandleContent />
                            }
                        });
                        setReportList(list);
                    }
                })
            )
            .subscribe();
    }, [keyword, localStorage.getItem('team_id')]);

    const HandleContent = () => {
        return (
            <div className='handle-content'>
                <SvgEye onClick={() => navigate('/report/detail')} />
                <SvgExport />
                <SvgDelete className='delete' />
            </div>
        )
    };
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
            title: '运行时间',
            dataIndex: 'run_time_sec',
            width: 220,
        },
        {
            title: '最后修改时间',
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
            dataIndex: 'operation'
        }
    ];

    return (
        <div className='recent-report'>
            <p className='title'>近期测试报告</p>
            <div className='report-search'>
                <Input
                    className="textBox"
                    value={keyword}
                    onChange={(e) => setKeyword(e)}
                    beforeFix={<SvgSearch />}
                    placeholder="搜索计划名称/执行者"
                />
                {/* <Button className='searchBtn'>搜索</Button> */}
            </div>
            <Table className="report-table" showBorder columns={columns} data={reportList} noDataElement={<p className='empty'>还没有数据</p>} />
        </div>
    )
};

export default RecentReport;
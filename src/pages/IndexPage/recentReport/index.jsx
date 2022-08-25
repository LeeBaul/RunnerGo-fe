import React, { useEffect, useState } from 'react';
import './index.less';
import { Table } from 'adesign-react';
import { 
    Iconeye as SvgEye,
    Export as SvgExport,
    Delete as SvgDelete    
} from 'adesign-react/icons';
import { fetchReportList } from '@services/report';
import { tap } from 'rxjs';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';

const RecentReport = () => {

    const [reportList, setReportList] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const query = {
            page: 1,
            size: 10,
            team_id: window.team_id,
            keyword: '',
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
                        const { report_id, name, mode, run_time_sec, last_time_sec, run_user_name, status } = item;
                        return {
                            report_id,
                            name,
                            mode,
                            run_time_sec: dayjs(run_time_sec * 1000).format('YYYY-MM-DD hh:mm:ss'),
                            last_time_sec: dayjs(last_time_sec * 1000).format('YYYY-MM-DD hh:mm:ss'),
                            run_user_name,
                            status,
                            operation: <HandleContent />
                        }
                    });
                    setReportList(list);
                }
            })
        )
        .subscribe();
    }, []);

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
            title: '序列号',
            dataIndex: 'report_id',
        },
        {
            title: '计划名称',
            dataIndex: 'name',
        },
        {
            title: '压测模式',
            dataIndex: 'mode',
        },
        {
            title: '运行时间',
            dataIndex: 'run_time_sec',
        },
        {
            title: '最后修改时间',
            dataIndex: 'last_time_sec'
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
            <div className='report-search'></div>
            <Table className="report-table" showBorder columns={columns} data={reportList} noDataElement={<p className='empty'>还没有数据</p>} />
        </div>
    )
};

export default RecentReport;
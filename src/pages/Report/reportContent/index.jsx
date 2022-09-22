import React, { useEffect, useState } from 'react';
import './index.less';
import ReportHeader from '../reportHeader';
import ReportExecutor from '../reportExecutor';
import ReportDetail from '../reportDetail';
import { Tabs as TabList } from 'adesign-react';
import { TabStyle } from './style';
import { fetchReportInfo } from '@services/report';
import { useParams } from 'react-router-dom';

const { Tabs, TabPan } = TabList;

const ReportContent = () => {
    const { id: report_id } = useParams();
    // 计划名称
    const [headerData, setHeaderData] = useState({});
    // 头像 昵称 创建时间
    const [infoData, setInfoData] = useState({});
    // 任务类型 模式 config
    const [configData, setConfigData] = useState({});
    const [stopDebug, setStopDebug] = useState('stop');
    const [reportStatus, setReportStatus] = useState(1);

    let report_info_t = null;

    useEffect(() => {
        getReportInfo();
        report_info_t =  setInterval(getReportInfo, 1000);

        return () => {
           report_info_t && clearInterval(report_info_t);
        }
    }, []);

    const getReportInfo = () => {
        const query = {
            report_id,
            team_id: localStorage.getItem('team_id'),
        };
        fetchReportInfo(query).subscribe({
            next: (res) => {
                console.log(res);
                const { data: { report: { plan_name, task_mode, task_type, mode_conf, user_name, user_avatar, created_time_sec, task_status } }} = res;
                setHeaderData({
                    plan_name,
                })
                setInfoData({
                    user_avatar,
                    user_name,
                    created_time_sec,
                });
                setConfigData({
                    task_mode,
                    task_type,
                    mode_conf
                });
                setReportStatus(task_status);
                if (task_status === 2) {
                   report_info_t && clearInterval(report_info_t);
                }
            }
        });
    }

    const defaultList = [
        { id: '1', title: '新建标题1', content: <ReportDetail /> },
        { id: '2', title: '新建标题2', content: '新建内容2' },
        { id: '3', title: '新建标题3', content: '新建内容3' },
    ];
    return (
        <div className='report'>
            <ReportHeader data={headerData} status={reportStatus} />
            <ReportExecutor data={infoData} status={reportStatus} onStop={(e) => setStopDebug(e)} />
            {/* <Tabs type="card" className={TabStyle} defaultActiveId="1">
                {defaultList.map((d) => (
                    <TabPan key={d.id} id={d.id} title={d.title}>
                        {d.content}
                    </TabPan>
                ))}
            </Tabs> */}
            <ReportDetail data={configData} stopDebug={stopDebug} /> 
        </div>
    )
};

export default ReportContent;
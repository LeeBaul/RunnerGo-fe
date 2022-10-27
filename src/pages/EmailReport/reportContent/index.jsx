import React, { useEffect, useState } from 'react';
import './index.less';
import ReportHeader from '../reportHeader';
import ReportExecutor from '../reportExecutor';
import ReportDetail from '../reportDetail';
import { Tabs as TabList } from 'adesign-react';
import { TabStyle } from './style';
import { fetchEmailReportInfo } from '@services/report';
import { useParams, useMatch, useLocation } from 'react-router-dom';
import qs from 'qs';
import { useSelector, useDispatch } from 'react-redux';
import SvgLogo1 from '@assets/logo/runner_dark';
import SvgLogo2 from '@assets/logo/runner_white';
import LogoRight from '@assets/logo/info_right';
import SvgRight from '@assets/logo/right';
import { useTranslation } from 'react-i18next';

const { Tabs, TabPan } = TabList;

const ReportContent = () => {
    // const { id: report_id } = useParams();
    const { search } = useLocation();
    const { report_id, contrast } = qs.parse(search.slice(1));
    const dispatch = useDispatch();
    // 计划名称
    const [headerData, setHeaderData] = useState({});
    // 头像 昵称 创建时间
    const [infoData, setInfoData] = useState({});
    // 任务类型 模式 config
    const [configData, setConfigData] = useState({});
    const [stopDebug, setStopDebug] = useState('stop');
    const [reportStatus, setReportStatus] = useState(1);
    const [runTime, setRunTime] = useState(0);
    const [planId, setPlanId] = useState(0);
    const select_plan = useSelector((store) => (store.plan.select_plan));
    const { t } = useTranslation();

    const theme = useSelector((store) => store.user.theme);

    let report_info_t = null;

    useEffect(() => {
        if (report_id) {
            getReportInfo();
            report_info_t = setInterval(getReportInfo, 1000);

            return () => {
                report_info_t && clearInterval(report_info_t);
            }
        }
    }, []);

    useEffect(() => {
        if (!report_id) {
            getReportInfo();
        }
    }, [select_plan]);

    const getReportInfo = () => {
        const query = {
            report_id: report_id ? report_id : JSON.parse(contrast)[select_plan].report_id,
            team_id: sessionStorage.getItem('team_id'),
        };
        fetchEmailReportInfo(query).subscribe({
            next: (res) => {
                const { data: { report: { plan_name, task_mode, task_type, mode_conf, user_name, user_avatar, created_time_sec, task_status, plan_id } } } = res;
                setPlanId(planId);
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

    const defaultList1 = contrast ? JSON.parse(contrast).map((item, index) => {
        return {
            id: index,
            title: `${item.plan_name}/${item.scene_name}`,
            content: ''
        }
    }) : '';

    return (
        <div className='report'>
            <LogoRight className='logo-right' />
            <div className='report-logo'>
                {theme === 'dark' ? <SvgLogo1 /> : <SvgLogo2 />}
                <SvgRight className='svg-right' />
                <p className='report-logo-title'>{t('report.title')}</p>
            </div>
            <ReportHeader data={headerData} status={reportStatus} />
            <ReportExecutor data={infoData} status={reportStatus} runTime={runTime} onStop={(e) => setStopDebug(e)} />
            <ReportDetail onRunTime={(e) => setRunTime(e)} data={configData} stopDebug={stopDebug} status={reportStatus} plan_id={planId} />
        </div>
    )
};

export default ReportContent;
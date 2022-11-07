import React, { useState, useEffect } from 'react';
import { Tabs as TabComponent } from 'adesign-react';
import { TabStyle } from './style';
import ReportContent from './reportContent';
import DebugLog from './debugLog';
import PressMonitor from './pressMonitor';
import { useParams, useLocation } from 'react-router-dom';
import { fetchReportDetail } from '@services/report';
import { useTranslation } from 'react-i18next';
import qs from 'qs';
import { useSelector } from 'react-redux';

const { Tabs, TabPan } = TabComponent;


const ReportDetail = (props) => {
	const { data: configData, stopDebug, onStatus, status, onRunTime, plan_id, create_time } = props;
	const { t } = useTranslation();

    const [data, setData] = useState([]);
	// const { id: report_id } = useParams();
	const { search } = useLocation();
	const { id: report_id, contrast } = qs.parse(search.slice(1));
	const [end, setEnd] = useState(false);
	// const [runTime, setRunTime] = useState(0);
	const select_plan = useSelector((store) =>(store.plan.select_plan));
	
	let report_detail_t = null;
	console.log(plan_id);

    useEffect(() => {
		if (report_id) {
			getReportDetail(plan_id);
			report_detail_t = setInterval(() => {
				getReportDetail(plan_id);
			}, 1000);
	
			return () => {
				clearInterval(report_detail_t);
			}
		}
    }, [plan_id]);

	useEffect(() => {
		if (!report_id) {
			getReportDetail(plan_id);
		}
	}, [select_plan, plan_id]);

	const getReportDetail = (plan_id) => {
		console.log(plan_id);
		const query = {
			report_id: report_id ? report_id : JSON.parse(contrast)[select_plan].report_id,
			plan_id,
			team_id: localStorage.getItem('team_id')
		};
		fetchReportDetail(query).subscribe({
			next: (res) => {
				const { data: { results, end } } = res;
				const dataList = [];
				for (let i in results) {
					dataList.push(results[i]);
				}
				setData(dataList);
				const item = dataList.length > 0 ? dataList[0].qps_list : [];
				const time = item.length > 1 ? item[item.length - 1].time_stamp - item[0].time_stamp : 0;
				// setRunTime(time);
				onRunTime(time);
				if (end) {
					// onStatus('已完成')
					clearInterval(report_detail_t);
					setEnd(true);
				}
			}
		})
	}


    const defaultList = [
        { id: '1', title: t('report.tabList.0'), content: <ReportContent data={data} config={configData} create_time={create_time}  />  },
        { id: '2', title: t('report.tabList.1'), content: <DebugLog status={status} end={end} stopDebug={stopDebug} />},
        { id: '3', title: t('report.tabList.2'), content: <PressMonitor status={status} /> },
        { id: '4', title: t('report.tabList.3'), content: '被服务器监控' }
    ];

    return (
        <div>
            <Tabs className={TabStyle} defaultActiveId="1">
                {defaultList.map((d) => (
                    <TabPan key={d.id} id={d.id} title={d.title}>
                        {d.content}
                    </TabPan>
                ))}
            </Tabs>
        </div>
    )
};

export default ReportDetail;
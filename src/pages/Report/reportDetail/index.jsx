import React, { useState, useEffect } from 'react';
import { Tabs as TabComponent } from 'adesign-react';
import { TabStyle } from './style';
import ReportContent from './reportContent';
import DebugLog from './debugLog';
import PressMonitor from './pressMonitor';
import { useParams } from 'react-router-dom';
import { fetchReportDetail } from '@services/report';

const { Tabs, TabPan } = TabComponent;

const reportResult = {
	"end": false,                                                                    // 任务是否结束
	"report_id": "1111111",                                                 // 测试报告id
	"report_name": "测试项目性能测试报告",                        // 测试报告名称
	"plan_id": 1,
	"plan_name": "测试项目",
	"scene_id": 123,
	"scene_name": "登录新增",
	"results": {
		"1111111": {                                                              // event_id
			"total_request_num": 10,                                 // 总请求数
			"total_request_time": 2496,                                  // 总响应时间
			"success_num": 0,                                                 // 成功数
			"error_num": 10,                                                   // 失败数
			"avg_request_time": 249,                                      // 平均响应时间
			"max_request_time": 439,                                     // 最大响应时间
			"min_request_time": 51,                                          // 最小响应时间
			"custom_request_time_line": 0,                               // 自定义响应时间线
			"custom_request_time_line_value": 0,                     // 自定义响应时间线的值
			"ninety_request_time_line": 439,                            // 90%响应时间线的值
			"ninety_five_request_time_line": 439,       				 // 95%响应时间线的值
			"ninety_nine_request_time_line": 439,                       // 99%响应时间线的值
			"send_bytes": 440,                                                     // 发送的字节数
			"received_bytes": 2300,                                              // 接收到的字节数
			"qps": 10                                                                    // 每秒请求数
		},
		"333333": {
			"total_request_num": 9,
			"total_request_time": 2351,
			"success_num": 9,
			"error_num": 0,
			"avg_request_time": 261,
			"max_request_time": 378,
			"min_request_time": 107,
			"custom_request_time_line": 0,
			"custom_request_time_line_value": 0,
			"ninety_request_time_line": 378,
			"ninety_five_request_time_line": 378,
			"ninety_nine_request_time_line": 378,
			"send_bytes": 2862,
			"received_bytes": 450,
			"qps": 9
		}
	},
	"Machine": null
};

const ReportDetail = (props) => {
	const { data: configData, stopDebug, onStatus, status } = props;

    const [data, setData] = useState([]);
	const { id: report_id } = useParams();
	const [end, setEnd] = useState(false);
	
	let report_detail_t = null;

    useEffect(() => {
		getReportDetail();
		report_detail_t = setInterval(getReportDetail, 1000);

		return () => {
			clearInterval(report_detail_t);
		}
    }, []);

	const getReportDetail = () => {
		const query = {
			report_id,
		};
		fetchReportDetail(query).subscribe({
			next: (res) => {
				const { data: { results, end } } = res;
				const dataList = [];
				for (let i in results) {
					dataList.push(results[i]);
				}
				setData(dataList);

				
				if (end) {
					// onStatus('已完成')
					clearInterval(report_detail_t);
					setEnd(true);
				}
			}
		})
	}


    const defaultList = [
        { id: '1', title: '测试详情页', content: <ReportContent data={data} config={configData}  />  },
        { id: '2', title: 'debug日志', content: <DebugLog status={status} end={end} stopDebug={stopDebug} />},
        { id: '3', title: '压力机监控', content: <PressMonitor /> },
        { id: '4', title: '被服务器监控', content: '被服务器监控' }
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
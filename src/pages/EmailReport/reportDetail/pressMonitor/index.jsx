import React, { useEffect, useState } from 'react';
import './index.less';
import 'echarts/lib/echarts';
import ReactEcharts from 'echarts-for-react';
import { useParams, useLocation } from 'react-router-dom';
import { fetchEmailMachine } from '@services/report';
import dayjs from 'dayjs';
import { useSelector } from 'react-redux';
import qs from 'qs';

const PressMonitor = (props) => {
    const { status } = props;

    let base = +new Date(1988, 9, 3);
    let oneDay = 24 * 3600 * 1000;
    let _data = [[base, Math.random() * 300]];
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [metrics, setMetrics] = useState([]);
    // const { id: report_id } = useParams();
    const { search } = useLocation();
    const { report_id, contrast } = qs.parse(search.slice(1));

    const theme = useSelector((store) => store.user.theme);
    const select_plan = useSelector((store) =>(store.plan.select_plan));

    let press_monitor_t = null;
    useEffect(() => {
 
        if (report_id) {
            getMonitorData();

            if (status === 2) {
                press_monitor_t && clearInterval(press_monitor_t);
            } else {
                press_monitor_t = setInterval(getMonitorData, 3000);   
            }
    
            return () => {
                clearInterval(press_monitor_t);
            }
        }
    }, [status]);

    useEffect(() => {
        if (!report_id) {
            getMonitorData();
        }
    }, [select_plan]);

    const getMonitorData = () => {
        const query = {
            report_id: report_id ? report_id : JSON.parse(contrast)[select_plan].report_id,
        };
        fetchEmailMachine(query).subscribe({
            next: (res) => {
                const { data: { start_time_sec, end_time_sec, metrics } } = res;
                setStartTime(start_time_sec);
                setEndTime(end_time_sec);
                setMetrics(metrics);
            }
        });
    }
    // for (let i = 1; i < 20000; i++) {
    //     let now = new Date((base += oneDay));
    //     _data.push([+now, Math.round((Math.random() - 0.5) * 20 + _data[i - 1][1])]);
    // }
    let getOption = (name, data) => {
        // let x_data = [];
        // let y_data = [];
        data.forEach(item => {
            if (`${item[0].length === 10}`) {
                item[0] = item[0] * 1000;
            }
        })
        let option = {
            title: {
                text: name,
                left: 'center',
                textStyle: {
                    color: theme === 'dark' ? '#fff' : '#000',
                    fontSize: 14
                },
            },
            tooltip: {
                trigger: 'axis',
                position: function (pt) {
                    return [pt[0], '10%'];
                }
            },
            xAxis: {
                type: 'time',
                boundaryGap: false,
                axisLabel: {
                    color: theme === 'dark' ? '#fff' : '#000',
                },
                axisLabel: {
                    formatter: function (val) {
                       return dayjs(val).format('HH:mm')
                    }
                }
                // axisTick: {
                //     length: 1,
                //     lineStyle: {
                //       type: 'dashed'
                //       // ...
                //     }
                // },
                // axisLabel: {
                //     //  X 坐标轴标签相关设置，写在xAxis里面
                //     interval: 0,//全部标签显示
                //     rotate: '45'//标签倾斜度数
                //   }
                // data: x_data,
            },
            yAxis: {
                type: 'value',
                boundaryGap: [0, '100%'],
                axisLabel: {
                    color: theme === 'dark' ? '#fff' : '#000',
                },
                splitLine: {
                    lineStyle: {
                        color: theme === 'dark' ? '#39393D' : '#E9E9E9'
                    }
                }
            },
            // dataZoom: [
            //     {
            //         type: 'inside',
            //         start: 0,
            //         end: 20
            //     },
            //     {
            //         start: 0,
            //         end: 20
            //     }
            // ],
            series: [
                {
                    name,
                    type: 'line',
                    smooth: true,
                    symbol: 'none',
                    areaStyle: {},
                    data,
                }
            ]
        };

        return option;
    }

    return (
        <div className='press-monitor'>
            {
               metrics.length > 0 && metrics.map(item => (
                    <div className='monitor-list'>
                    <ReactEcharts className='echarts' option={getOption('cpu', item.cpu)} />
                    <ReactEcharts className='echarts' option={getOption('disk_io', item.disk_io)} />
                    <ReactEcharts className='echarts' option={getOption('mem', item.mem)} />
                    <ReactEcharts className='echarts' option={getOption('net_io', item.net_io)} />
                </div>
                ))
            }
        </div>
    )
};

export default PressMonitor;
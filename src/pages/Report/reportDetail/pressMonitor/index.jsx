import React, { useEffect, useState } from 'react';
import './index.less';
import 'echarts/lib/echarts';
import ReactEcharts from 'echarts-for-react';
import { useParams } from 'react-router-dom';
import { fetchMachine } from '@services/report';
import dayjs from 'dayjs';

const PressMonitor = () => {
    let base = +new Date(1988, 9, 3);
    let oneDay = 24 * 3600 * 1000;
    let data = [[base, Math.random() * 300]];
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [metrics, setMetrics] = useState([]);
    const { id: report_id } = useParams();

    useEffect(() => {

        const query = {
            report_id: 136,
        };
        fetchMachine(query).subscribe({
            next: (res) => {
                const { data: { start_time_sec, end_time_sec, metrics } } = res;
                setStartTime(start_time_sec);
                setEndTime(end_time_sec);
                setMetrics(metrics);
                // console.log(res);
            }
        })
    }, [])
    for (let i = 1; i < 20000; i++) {
        let now = new Date((base += oneDay));
        data.push([+now, Math.round((Math.random() - 0.5) * 20 + data[i - 1][1])]);
    }
    console.log(data);
    let getOption = (name, data) => {
        data.forEach(item => {
            item[0] = item[0] * 1000; 
        })
        let option = {
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
                    color: '#fff',
                },
            },
            yAxis: {
                type: 'value',
                boundaryGap: [0, '100%'],
                axisLabel: {
                    color: '#fff',
                },
                splitLine: {
                    lineStyle: {
                        color: '#39393D'
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
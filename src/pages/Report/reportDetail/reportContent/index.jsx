import React, { useEffect, useState } from 'react';
import './index.less';
import { Table } from 'adesign-react';
import 'echarts/lib/echarts';
import ReactEcharts from 'echarts-for-react';
import { cloneDeep } from 'lodash';
import dayjs from 'dayjs';

const modeMap = {
    'duration': '持续时长',
    'round_num': '轮次',
    'concurrency': '并发数',
    'reheat_time': '预热',
    'start_concurrency': '起始并发数',
    'step': '并发数步长',
    'step_run_time': '步长执行时长',
    'max_concurrency': '最大并发数',
}

const modeList = {
    '1': '并发模式',
    '2': '阶梯模式',
    '3': '错误率模式',
    '4': '响应时间模式',
    '5': '每秒请求数模式'
}

const ReportContent = (props) => {
    const { data: datas, config: { task_mode, task_type, mode_conf }  } = props;
    const [tableData, setTableData] = useState([]);
    const [tableData1, setTableData1] = useState([]);
    // 每秒事务数
    const [tps, setTps] = useState([]);
    // 每秒请求数
    const [rps, setRps] = useState([]);
    // 并发数
    const [concurrency, setConcurrency] = useState([]);
    // 错误数
    const [errNum, setErrNum] = useState([]);
    const [qpsList, setQpsList] = useState([]);
    const [configColumn, setConfigColumn] = useState([]);
    const [configData, setConfigData] = useState([]);

    useEffect(() => {
        setTableData1(datas);
        let tps = [];
        let rps = [];
        let concurrency = [];
        let errNum = [];
        let _total_request_num = 0;
        let _total_request_time = 0;
        let _max_request_time = 0;
        let _min_request_time = 0;
        let _ninety_request_time_line = 0;
        let _ninety_five_request_time_line = 0;
        let _ninety_nine_request_time_line = 0;
        let _qps = 0;
        let _error_num = 0;
        let _error_rate = 0;
        let _received_bytes = 0;
        let _send_bytes = 0;
        
        let _qps_list = []; 
        datas && datas.forEach(item => {
            const {
                total_request_num,
                total_request_time,
                max_request_time,
                min_request_time,
                ninety_request_time_line,
                ninety_five_request_time_line,
                ninety_nine_request_time_line,
                qps,
                error_num,
                error_rate,
                received_bytes,
                send_bytes,
                qps_list,
                api_name,
            } = item;
            tps.push(qps);
            rps.push(qps);
            concurrency.push(qps);
            errNum.push(qps);
            _total_request_num += total_request_num;
            _total_request_time += total_request_time;
            _max_request_time += max_request_time;
            _min_request_time += min_request_time;
            _ninety_request_time_line += ninety_request_time_line;
            _ninety_five_request_time_line += ninety_five_request_time_line;
            _ninety_nine_request_time_line += ninety_nine_request_time_line;
            _qps += qps;
            _error_num += error_num;
            _error_rate += error_rate;
            _received_bytes += received_bytes;
            _send_bytes += send_bytes;

            _qps_list.push({
                api_name,
                x_data: qps_list.map(item => dayjs(item.time_stamp * 1000).format('hh:mm:ss')),
                y_data: qps_list.map(item => item.value)
            });
        });
        setTps(tps);
        setRps(rps);
        setConcurrency(concurrency);
        setErrNum(errNum);
        setQpsList(_qps_list);
        let _datas = cloneDeep(datas);
        _datas.unshift({
            api_name: '汇总',
            total_request_num: _total_request_num,
            total_request_time: _total_request_time,
            max_request_time: '-',
            min_request_time: '-',
            ninety_request_time_line: '-',
            ninety_five_request_time_line: '-',
            ninety_nine_request_time_line: '-',
            qps: '-',
            error_num: '-',
            error_rate: '-',
            received_bytes: _received_bytes,
            send_bytes: _send_bytes,
        });
        setTableData1(_datas);
    }, [datas]);

    useEffect(() => {
        console.log(mode_conf);
        if (mode_conf) {
            const { 
                concurrency,
                duration,
                max_concurrency,
                reheat_time,
                round_num,
                start_concurrency,
                step,
                step_run_time,
                threshold_value
            } = mode_conf;
            setConfigData([{ concurrency, duration, max_concurrency, reheat_time, round_num, start_concurrency, step, step_run_time }]);
            let _columns = [];
            if (task_mode === 1) {
                _columns = [
                    duration ?
                    {
                        title: '持续时长',
                        dataIndex: 'duration',
                    } : 
                    {
                        title: '轮次',
                        dataIndex: 'round_num',
                    },
                    {
                        title: '并发数',
                        dataIndex: 'concurrency',
                    },
                    {
                        title: '预热时长',
                        dataIndex: 'reheat_time',
                    }
                ];
            } else {
                _columns = [
                    {
                        title: '起始并发数',
                        dataIndex: 'start_concurrency',
                    },
                    {
                        title: '并发数步长',
                        dataIndex: 'step',
                    },
                    {
                        title: '步长执行时长',
                        dataIndex: 'step_run_time',
                    },
                    {
                        title: '最大并发数',
                        dataIndex: 'max_concurrency',
                    },
                    {
                        title: '稳定持续时长',
                        dataIndex: 'duration'
                    }
                ];
            };
            setConfigColumn(_columns);
        }

    }, [mode_conf]);
    const data = [
        {
            threshold: '-',
            concurrent: '-',
            step: '-',
            stepRunTime: '-'
        }
    ];

    const columns = [
        {
            title: '阈值',
            dataIndex: 'threshold',
        },
        {
            title: '起始并发数',
            dataIndex: 'concurrent',
        },
        {
            title: '步长',
            dataIndex: 'step',
        },
        {
            title: '步长执行时间',
            dataIndex: 'stepRunTime',
        },
    ];

    const data1 = [
        {
            apiName: '汇总',
            reqTotal: '20000',
            resTimeMax: '1000',
            resTimeMin: '50',
            custom: '-',
            ninetyTime: '600',
            ninetyFiveTime: '900',
            ninetyNineTime: '-',
            throughput: '1000',
            errNum: '50',
            errRate: '0.025',
            acceptByte: '900',
            sendByte: '90'
        },
        {
            apiName: '汇总',
            reqTotal: '20000',
            resTimeMax: '1000',
            resTimeMin: '50',
            custom: '-',
            ninetyTime: '600',
            ninetyFiveTime: '900',
            ninetyNineTime: '-',
            throughput: '1000',
            errNum: '50',
            errRate: '0.025',
            acceptByte: '900',
            sendByte: '90'
        },
        {
            apiName: '汇总',
            reqTotal: '20000',
            resTimeMax: '1000',
            resTimeMin: '50',
            custom: '-',
            ninetyTime: '600',
            ninetyFiveTime: '900',
            ninetyNineTime: '-',
            throughput: '1000',
            errNum: '50',
            errRate: '0.025',
            acceptByte: '900',
            sendByte: '90'
        },
        {
            apiName: '汇总',
            reqTotal: '20000',
            resTimeMax: '1000',
            resTimeMin: '50',
            custom: '-',
            ninetyTime: '600',
            ninetyFiveTime: '900',
            ninetyNineTime: '-',
            throughput: '1000',
            errNum: '50',
            errRate: '0.025',
            acceptByte: '900',
            sendByte: '90'
        },
    ];

    const columns1 = [
        {
            title: '接口名称',
            dataIndex: 'api_name',
        },
        {
            title: '总请求数',
            dataIndex: 'total_request_num',
        },
        {
            title: '总响应时间',
            dataIndex: 'total_request_time'
        },
        {
            title: '最大响应时间',
            dataIndex: 'max_request_time',
        },
        {
            title: '最小响应时间',
            dataIndex: 'min_request_time',
        },
        {
            title: '90%响应时间线',
            dataIndex: 'ninety_request_time_line',
        },
        {
            title: '95%响应时间线',
            dataIndex: 'ninety_five_request_time_line',
        },
        {
            title: '99%响应时间线',
            dataIndex: 'ninety_nine_request_time_line',
        },
        {
            title: '吞吐量',
            dataIndex: 'qps',
        },
        {
            title: '错误数',
            dataIndex: 'error_num',
        },
        {
            title: '错误率',
            dataIndex: 'error_rate',
        },
        {
            title: '接受字节数',
            dataIndex: 'received_bytes',
        },
        {
            title: '发送字节数',
            dataIndex: 'send_bytes',
        },
    ];

    const getOption = (name, data) => {
        let option = {
            title: {
                text: name,
                left: 'center',
                textStyle: {
                    color: '#fff',
                    fontSize: 14
                },
            },
            tooltip: {
                trigger: 'axis'
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: data[0] ? data[0].x_data : [],
                axisLabel: {
                    color: '#fff',
                },
            },
            yAxis: {
                type: 'value',
                axisLabel: {
                    color: '#fff',
                },
                splitLine: {
                    lineStyle: {
                        color: '#39393D'
                    }
                }
            },
            series: data.length > 0 ? data.map(item => {
                return {
                    name: item.api_name,
                    type: 'line',
                    stack: 'Total',
                    data: item.y_data
                }
            }) : []
        }
        return option;
    }

    console.log(configColumn, configData);

    return (
        <div className='report-content'>
            <div className='report-content-top'>
                <div className='top-type'>
                    <span>任务类型: { task_type === 1 ? '普通任务' : '定时任务' }</span>
                    <span>分布式: 是</span>
                </div>
                <div className='top-mode'>
                    <span>压测模式: { modeList[task_mode] }</span>
                </div>
            </div>
            <Table showBorder columns={configColumn} data={configData} />
            <Table showBorder columns={columns1} data={tableData1} />
            <div className='echarts-list'>
                <ReactEcharts className='echarts' option={getOption('每秒事务数', qpsList)} />
                <ReactEcharts className='echarts' option={getOption('每秒请求数', qpsList)} />
                <ReactEcharts className='echarts' option={getOption('并发数', qpsList)} />
                <ReactEcharts className='echarts' option={getOption('错误数', qpsList)} />
            </div>
        </div>
    )
};

export default ReportContent;
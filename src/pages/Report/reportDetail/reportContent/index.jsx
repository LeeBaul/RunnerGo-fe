import React from 'react';
import './index.less';
import { Table } from 'adesign-react';
import 'echarts/lib/echarts';
import ReactEcharts from 'echarts-for-react';

const ReportContent = () => {
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
            dataIndex: 'apiName',
        },
        {
            title: '总请求数',
            dataIndex: 'reqTotal',
        },
        {
            title: '最大响应时间',
            dataIndex: 'resTimeMax',
        },
        {
            title: '最小响应时间',
            dataIndex: 'resTimeMin',
        },
        {
            title: '自定义',
            dataIndex: 'custom',
        },
        {
            title: '90%响应时间线',
            dataIndex: 'ninetyTime',
        },
        {
            title: '95%响应时间线',
            dataIndex: 'ninetyFiveTime',
        },
        {
            title: '99%响应时间线',
            dataIndex: 'ninetyNineTime',
        },
        {
            title: '吞吐量',
            dataIndex: 'throughput',
        },
        {
            title: '错误数',
            dataIndex: 'errNum',
        },
        {
            title: '错误率',
            dataIndex: 'errRate',
        },
        {
            title: '接受字节数',
            dataIndex: 'acceptByte',
        },
        {
            title: '发送字节数',
            dataIndex: 'sendByte',
        },
    ];

    const getOption = () => {
        let option = {
            title: {
                text: '每秒事务数',
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
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
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
            series: [
                {
                    name: 'Email',
                    type: 'line',
                    stack: 'Total',
                    data: [120, 132, 101, 134, 90, 230, 210]
                },
                {
                    name: 'Union Ads',
                    type: 'line',
                    stack: 'Total',
                    data: [220, 182, 191, 234, 290, 330, 310]
                },
                {
                    name: 'Video Ads',
                    type: 'line',
                    stack: 'Total',
                    data: [150, 232, 201, 154, 190, 330, 410]
                },
                {
                    name: 'Direct',
                    type: 'line',
                    stack: 'Total',
                    data: [320, 332, 301, 334, 390, 330, 320]
                },
                {
                    name: 'Search Engine',
                    type: 'line',
                    stack: 'Total',
                    data: [820, 932, 901, 934, 1290, 1330, 1320]
                }
            ]
        };
        return option;
    }

    return (
        <div className='report-content'>
            <div className='report-content-top'>
                <div className='top-type'>
                    <span>任务类型: 普通任务</span>
                    <span>分布式: 是</span>
                </div>
                <div className='top-mode'>
                    <span>压测模式: 响应时间模式90%</span>
                </div>
            </div>
            <Table showBorder columns={columns} data={data} />
            <Table showBorder columns={columns1} data={data1} />
            <div className='echarts-list'>
                <ReactEcharts className='echarts' option={getOption()} />
                <ReactEcharts className='echarts' option={getOption()} />
                <ReactEcharts className='echarts' option={getOption()} />
                <ReactEcharts className='echarts' option={getOption()} />
            </div>
        </div>
    )
};

export default ReportContent;
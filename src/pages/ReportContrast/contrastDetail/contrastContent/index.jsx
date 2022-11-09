import React, { useEffect, useState } from "react";
import './index.less';
import { Table } from 'adesign-react';
import { useTranslation } from 'react-i18next';

const ContrastContent = () => {
    const { t } = useTranslation();
    const [column1, setColumn1] = useState(
        [
            {
                title: t('index.sceneName'),
                dataIndex: 'name'
            },
            {
                title: t('index.performer'),
                dataIndex: 'performer'
            },
            {
                title: t('plan.startTaskTime'),
                dataIndex: 'startTaskTime'
            },
            {
                title: t('report.taskType'),
                dataIndex: 'taskType'
            },
            {
                title: t('report.mode'),
                dataIndex: 'mode'
            },
            {
                title: t('plan.startConcurrency'),
                dataIndex: 'startConcurrency'
            },
            {
                title: t('plan.step'),
                dataIndex: 'step'
            },
            {
                title: t('plan.stepRunTime'),
                dataIndex: 'stepRunTime'
            },
            {
                title: t('plan.maxConcurrency'),
                dataIndex: 'maxConcurrency'
            },
            {
                title: t('plan.duration'),
                dataIndex: 'duration'
            }
        ]
    );
    const [data1, setData1] = useState([
        {
            name: <p style={{ color: '#A84B1F' }}>计划名称/场景一</p>,
            performer: 'Creator',
            startTaskTime: '2022.11.02 12:24:33',
            taskType: '普通任务',
            mode: '并发模式',
            startConcurrency: 20,
            step: 5,
            stepRunTime: 100,
            maxConcurrency: 500,
            duration: 200
        },
        {
            name: <p style={{ color: '#6155BC' }}>计划名称/场景二</p>,
            performer: 'Creator',
            startTaskTime: '2022.11.02 12:24:33',
            taskType: '普通任务',
            mode: '并发模式',
            startConcurrency: 20,
            step: 5,
            stepRunTime: 100,
            maxConcurrency: 500,
            duration: 200
        },
        {
            name: <p style={{ color: '#32AF3F' }}>计划名称/场景三</p>,
            performer: 'Creator',
            startTaskTime: '2022.11.02 12:24:33',
            taskType: '普通任务',
            mode: '并发模式',
            startConcurrency: 20,
            step: 5,
            stepRunTime: 100,
            maxConcurrency: 500,
            duration: 200
        },
        {
            name: <p style={{ color: '#3B7BC6' }}>计划名称/场景四</p>,
            performer: 'Creator',
            startTaskTime: '2022.11.02 12:24:33',
            taskType: '普通任务',
            mode: '并发模式',
            startConcurrency: 20,
            step: 5,
            stepRunTime: 100,
            maxConcurrency: 500,
            duration: 200
        }
    ]);
    const [column2, setColumn2] = useState([
        {
            title: t('report.apiName'),
            dataIndex: 'api_name',
        },
        {
            title: t('report.totalReqNum'),
            dataIndex: 'total_request_num',
        },
        {
            title: t('report.totalResTime'),
            dataIndex: 'total_request_time',
            width: 150,
        },
        {
            title: 'Max(ms)',
            dataIndex: 'max_request_time',
        },
        {
            title: 'Min(ms)',
            dataIndex: 'min_request_time',
        },
        {
            title: 'Avg(ms)',
            dataIndex: 'avg_request_time',
        },
        {
            title: '90%',
            dataIndex: 'ninety_request_time_line_value',
        },
        {
            title: '95%',
            dataIndex: 'ninety_five_request_time_line_value',
        },
        {
            title: '99%',
            dataIndex: 'ninety_nine_request_time_line_value',
        },
        {
            title: t('report.qps'),
            dataIndex: 'qps',
        },
        {
            title: t('report.srps'),
            dataIndex: 'srps',
        },
        {
            title: t('report.errRate'),
            dataIndex: 'error_rate',
        },
        {
            title: t('report.acceptByte'),
            dataIndex: 'received_bytes',
        },
        {
            title: t('report.sendByte'),
            dataIndex: 'send_bytes',
        },
    ]);

    const [data2, setData2] = useState([
        {
            api_name: '汇总',
            total_request_num: 200000,
            total_request_time: 1000,
            max_request_time: 50,
            min_request_time: 50,
            avg_request_time: 50,
            ninety_request_time_line_value: 600,
            ninety_five_request_time_line_value: 900,
            ninety_nine_request_time_line_value: 1200,
            qps: 1000,
            srps: 200,
            error_rate: 0.05,
            received_bytes: 91273,
            send_bytes: 10213
        },
        {
            api_name: '汇总',
            total_request_num: 200000,
            total_request_time: 1000,
            max_request_time: 50,
            min_request_time: 50,
            avg_request_time: 50,
            ninety_request_time_line_value: 600,
            ninety_five_request_time_line_value: 900,
            ninety_nine_request_time_line_value: 1200,
            qps: 1000,
            srps: 200,
            error_rate: 0.05,
            received_bytes: 91273,
            send_bytes: 10213
        }
    ])

    useEffect(() => {

    }, []);


    return (
        <div className="contrast-content">
            <Table showBorder columns={column1} data={data1} />

            <div className="table-data">
                <p className="title" style={{ color: '#A84B1F' }}>计划名称/场景一</p>
                <Table className='color1' showBorder columns={column2} data={data2} />
            </div>


            <div className="table-data">
                <p className="title" style={{ color: '#6155BC' }}>计划名称/场景二</p>
                <Table className='color2' showBorder columns={column2} data={data2} />
            </div>
            

            <div className="table-data">
                <p className="title" style={{ color: '#32AF3F' }}>计划名称/场景三</p>
                <Table className='color3' showBorder columns={column2} data={data2} />
            </div>


            <div className="table-data">
                <p className="title" style={{ color: '#3B7BC6' }}>计划名称/场景四</p>
                <Table className='color4' showBorder columns={column2} data={data2} />
            </div>

            <div className="echart-list">
                <div className="title">
                    <div className="title-item item-1">
                        <p>计划名称/场景一</p>
                        <p>2022.11.11 12:23:22</p>
                    </div>
                    <div className="title-item item-2">
                        <p>计划名称/场景二</p>
                        <p>2022.11.11 12:23:22</p>
                    </div>
                    <div className="title-item item-3">
                        <p>计划名称/场景三</p>
                        <p>2022.11.11 12:23:22</p>
                    </div>
                    <div className="title-item item-4">
                        <p>计划名称/场景四</p>
                        <p>2022.11.11 12:23:22</p>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default ContrastContent;
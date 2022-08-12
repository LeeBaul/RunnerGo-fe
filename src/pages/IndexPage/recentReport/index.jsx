import React from 'react';
import './index.less';
import { Table } from 'adesign-react';

const RecentReport = () => {
    const data = [
        {
            key: '1',
            id: '1',
            plan: '世界和平',
            mode: 'qps模式',
            runTime: '2022.5.9 11:00:00',
            lastUpdate: '2022.5.9 11:00:00',
            performer: '路人甲',
            status: '运行中',
            operation: '导出'
        },
        {
            key: '2',
            id: '2',
            plan: '世界和平',
            mode: 'qps模式',
            runTime: '2022.5.9 11:00:00',
            lastUpdate: '2022.5.9 11:00:00',
            performer: '路人甲',
            status: '运行中',
            operation: '导出'
        },
        {
            key: '3',
            id: '3',
            plan: '世界和平',
            mode: 'qps模式',
            runTime: '2022.5.9 11:00:00',
            lastUpdate: '2022.5.9 11:00:00',
            performer: '路人甲',
            status: '运行中',
            operation: '导出'
        },
        {
            key: '4',
            id: '4',
            plan: '世界和平',
            mode: 'qps模式',
            runTime: '2022.5.9 11:00:00',
            lastUpdate: '2022.5.9 11:00:00',
            performer: '路人甲',
            status: '运行中',
            operation: '导出'
        },
        {
            key: '5',
            id: '5',
            plan: '世界和平',
            mode: 'qps模式',
            runTime: '2022.5.9 11:00:00',
            lastUpdate: '2022.5.9 11:00:00',
            performer: '路人甲',
            status: '运行中',
            operation: '导出'
        },
    ];

    const columns = [
        {
            title: '序列号',
            dataIndex: 'id',
        },
        {
            title: '计划名称',
            dataIndex: 'plan',
        },
        {
            title: '压测模式',
            dataIndex: 'mode',
        },
        {
            title: '运行时间',
            dataIndex: 'runTime',
        },
        {
            title: '最后修改时间',
            dataIndex: 'lastUpdate'
        },
        {
            title: '执行者',
            dataIndex: 'performer',
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
            <Table className="report-table" showBorder columns={columns} data={data} />
        </div>
    )
};

export default RecentReport;
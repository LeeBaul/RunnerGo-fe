import React from 'react';
import { Radio, Switch, Table, Input } from 'adesign-react';
import './index.less';

const TaskConfig = () => {
    const column = [
        {
            title: '机器IP',
            dataIndex: 'ip',
        },
        {
            title: '机器所在区域',
            dataIndex: 'area',
        },
        {
            title: '机器状态',
            dataIndex: 'status',
        },
        {
            title: '配置权重',
            dataIndex: 'weight',
        },
    ];
    const data = [
        {
            ip: '172.20.10.1',
            area: '上海',
            status: '空闲',
            weight: '90%',
        },
        {
            ip: '172.20.10.2',
            area: '北京',
            status: '较忙',
            weight: '70%',
        },
        {
            ip: '172.20.10.3',
            area: '广东',
            status: '繁忙',
            weight: '-',
        }
    ];

    const modeList = ['并发模式', '阶梯模式', '错误率模式', '响应时间模式', '每秒请求数模式', '每秒事务数模式'];
    return (
        <div className='task-config'>
            <div className='task-config-header'>
                <p>任务配置</p>
            </div>
            <div className='task-config-container'>
                <div className='item'>
                    <p>采用配置: </p>
                    <Radio.Group value="A">
                        <Radio value="A">单独配置</Radio>
                        <Radio value="B">全局配置</Radio>
                    </Radio.Group>
                </div>
                <div className='item'>
                    <p>任务类型: </p>
                    <Radio.Group value="A">
                        <Radio value="A">普通任务</Radio>
                        <Radio value="B">定时任务</Radio>
                        <Radio value="C">cicd任务</Radio>
                    </Radio.Group>
                </div>
                <div className='item'>
                    <p>区域配置: </p>
                    <Switch />
                </div>
                <Table showBorder columns={column} data={data} />
                <div className='item'>
                    <p style={{marginBottom: 'auto', marginTop: '5px'}}>压测模式: </p>
                    <Radio.Group value="并发模式">
                        { modeList.map((item, index) => (<Radio value={item} style={{marginBottom: '16px'}}>{ item }</Radio>)) }
                    </Radio.Group>
                </div>
                <div className='other-config'>
                    <div className='other-config-item'>
                        <Radio.Group value="A">
                            <Radio value="A"><span className='label'>持续时长: </span> <Input size="mini" value="并发数: 1000" /></Radio>
                            <Radio value="B"><span className='label'>轮次: </span> <Input size="mini" value="2600 s" disabled /></Radio>
                            <Radio value="C" style={{marginTop: '16px'}}><span className='label'>预热: </span> <Input size="mini" value="2600 s" disabled /></Radio>
                        </Radio.Group>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default TaskConfig;
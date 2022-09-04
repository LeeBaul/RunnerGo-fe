import React, { useState } from 'react';
import { Radio, Switch, Table, Input, Button } from 'adesign-react';
import './index.less';

const TaskConfig = (props) => {
    const { from } = props;
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

    const modeList = ['并发模式', '阶梯模式', '错误率模式', '响应时间模式', '每秒请求数模式'];
    // 模式
    const [mode, setMode] = useState(1);
    // 普通任务1 定时任务2
    const [task_type, setTaskType] = useState(1);
    const [default_mode, setDefaultMode] = useState("duration");
    // 持续时长
    const [duration, setDuration] = useState('');
    // 轮次
    const [round_num, setRoundNum] = useState('');
    // 并发数
    const [concurrency, setConcurrency] = useState('');
    // 预热时长
    const [reheat_time, setReheatTime] = useState('');

    // 并发模式
    const ConcurrentMode = () => {
        return (
            <div className='other-config-item'>
                <Radio.Group value={default_mode} onChange={(e) => setDefaultMode(e)}>
                    <Radio value="duration">
                        <span className='label'>持续时长: </span>
                        <Input size="mini" value={duration} onChange={(e) => setDuration(e)} disabled={default_mode === 'round_num'} /> s
                    </Radio>
                    <Radio value="round_num">
                        <span className='label'>轮次: </span>
                        <Input size="mini" value={round_num} onChange={(e) => setRoundNum(e)} disabled={default_mode === 'duration'} /> 次
                    </Radio>
                </Radio.Group>
                <div className='other-config-detail'>
                    <div className='config-detail-item'>
                        <span>并发数: </span>
                        <Input size="mini" value={concurrency} onChange={(e) => setConcurrency(e)} />
                    </div>
                    <div className='config-detail-item'>
                        <span>预热: </span>
                        <Input size="mini" value={reheat_time} onChange={(e) => setReheatTime(e)} />s
                    </div>
                </div>
            </div>
        )
    }

    // 阶梯模式
    const CommonMode = () => {
        return (
            <div className='other-config-item'>
                <div className='other-config-detail'>
                    <div className='config-detail-item'>
                        <span>起始并发数: </span>
                        <Input size="mini" value={concurrency} onChange={(e) => setConcurrency(e)} />
                    </div>
                    <div className='config-detail-item'>
                        <span>并发数步长: </span>
                        <Input size="mini" value={reheat_time} onChange={(e) => setReheatTime(e)} />
                    </div>
                    <div className='config-detail-item'>
                        <span>步长执行时长: </span>
                        <Input size="mini" value={reheat_time} onChange={(e) => setReheatTime(e)} />s
                    </div>
                    <div className='config-detail-item'>
                        <span>最大并发数: </span>
                        <Input size="mini" value={reheat_time} onChange={(e) => setReheatTime(e)} />次
                    </div>
                    <div className='config-detail-item'>
                        <span>稳定持续时长: </span>
                        <Input size="mini" value={reheat_time} onChange={(e) => setReheatTime(e)} />s
                    </div>
                </div>
            </div>
        )
    }

    const modeContentList = {
        '1': <ConcurrentMode />,
        '2': <CommonMode />,
        '3': <CommonMode />,
        '4': <CommonMode />,
        '5': <CommonMode />,
    }
    return (
        <div className='task-config'>
            {
                from !== 'preset' && <div className='task-config-header'>
                    <p>任务配置</p>
                    <Button>导入预设配置</Button>
                </div>
            }
            <div className='task-config-container'>
                {/* <div className='item'>
                    <p>采用配置: </p>
                    <Radio.Group value="A">
                        <Radio value="A">单独配置</Radio>
                        <Radio value="B">全局配置</Radio>
                    </Radio.Group>
                </div> */}
                <div className='item' style={{ marginBottom: '30px' }}>
                    <p>任务类型: </p>
                    <Radio.Group value={task_type} onChange={(e) => setTaskType(e)}>
                        <Radio value={1}>普通任务</Radio>
                        <Radio value={2}>定时任务</Radio>
                    </Radio.Group>
                </div>
                {
                    task_type === 2 && <div className='item'>
                        <p style={{ marginRight: '5px' }}>填写cron表达式: </p>
                        <Input placeholder="每隔5秒执行一次: */5 * * * * ?" />
                    </div>
                }
                {/* <div className='item'>
                    <p>区域配置: </p>
                    <Switch />
                </div>
                <Table showBorder columns={column} data={data} /> */}
                <div className='item'>
                    <p style={{ marginBottom: 'auto', marginTop: '5px' }}>压测模式: </p>
                    <Radio.Group value={mode} onChange={(e) => setMode(e)} >
                        {modeList.map((item, index) => (<Radio value={index + 1} style={{ marginBottom: '16px' }}>{item}</Radio>))}
                    </Radio.Group>
                </div>
                <div className='other-config'>
                    <p className='mode-config-title'>{modeList[mode - 1]}设置</p>
                    {
                        modeContentList[mode]
                    }
                </div>
            </div>
        </div>
    )
};

export default TaskConfig;
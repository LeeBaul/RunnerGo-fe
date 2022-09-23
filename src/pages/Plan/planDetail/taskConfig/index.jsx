import React, { useState, useEffect } from 'react';
import { Radio, Switch, Table, Input, Button, Message } from 'adesign-react';
import { Save as SvgSave } from 'adesign-react/icons';
import { fetchPreConfig } from '@services/plan';
import { useSelector, useDispatch } from 'react-redux';
import './index.less';
import { cloneDeep } from 'lodash';
// import { fetchPlanDetail } from '@services/plan';
import { fetchPlanDetail, fetchSavePlan } from '@services/plan';
import { useParams } from 'react-router-dom';

const TaskConfig = (props) => {
    const { from, onChange } = props;
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

    const [initData, setInitData] = useState({});
    const dispatch = useDispatch();
    const [planDetail, setPlanDetail] = useState({});
    const task_config = useSelector((store) => store.plan.task_config);
    const { id: plan_id } = useParams();

    useEffect(() => {
        const query = {
            team_id: localStorage.getItem('team_id'),
            plan_id,
        };
        fetchPlanDetail(query).subscribe({
            next: (res) => {
                const { data: { plan } } = res;
                if (from === 'default') {
                    const {
                        mode,
                        cron_expr,
                        mode_conf,
                        task_type
                    } = plan;
                    mode && setMode(mode);
                    cron_expr && setCronExpr(cron_expr);
                    // concurrency && setConcurrency(concurrency);
                    // duration && setDuration(duration);
                    // max_concurrency && setMaxConcurrency(max_concurrency);
                    // reheat_time && setReheatTime(reheat_time);
                    // round_num && setRoundNum(round_num);
                    // start_concurrency && setStartConcurrency(start_concurrency);
                    // step && setStep(step);
                    // step_run_time && setStepRunTime(step_run_time);
                    setModeConf(mode_conf);
                    task_type && setTaskType(task_type);
                    dispatch({
                        type: 'plan/updateTaskConfig',
                        payload: {
                            mode,
                            cron_expr,
                            task_type,
                            mode_conf,
                        },
                    })
                }
                setPlanDetail(plan);
            }
        })
    }, [plan_id]);

    const init = (preinstall = initData) => {
        const {
            mode,
            cron_expr,
            mode_conf,
            task_type
        } = preinstall;
        console.log(preinstall);
        const { concurrency, duration, max_concurrency, reheat_time, round_num, start_concurrency, step, step_run_time } = mode_conf;
        mode && setMode(mode);
        cron_expr && setCronExpr(cron_expr);
        setModeConf(mode_conf);
        concurrency && setConcurrency(concurrency);
        duration && setDuration(duration);
        max_concurrency && setMaxConcurrency(max_concurrency);
        reheat_time && setReheatTime(reheat_time);
        round_num && setRoundNum(round_num);
        start_concurrency && setStartConcurrency(start_concurrency);
        step && setStep(step);
        step_run_time && setStepRunTime(step_run_time);
        task_type && setTaskType(task_type);
    }

    useEffect(() => {
        getPreConfig();
    }, []);

    const getPreConfig = (callback) => {
        const query = {
            team_id: localStorage.getItem('team_id'),
        };
        fetchPreConfig(query).subscribe({
            next: (res) => {
                const { data: { preinstall } } = res;
                if (from === 'preset') {
                    init(preinstall);
                } else {
                    setInitData(preinstall);
                }
                callback && init(preinstall);
            }
        })
    }



    const modeList = ['并发模式', '阶梯模式', '错误率模式', '响应时间模式', '每秒请求数模式'];
    // 模式
    const [mode, setMode] = useState(1);
    // 普通任务1 定时任务2
    const [task_type, setTaskType] = useState(1);
    const [default_mode, setDefaultMode] = useState("duration");
    // 持续时长
    const [duration, setDuration] = useState(0);
    // 轮次
    const [round_num, setRoundNum] = useState(0);
    // 并发数
    const [concurrency, setConcurrency] = useState(0);
    // 起始并发数
    const [start_concurrency, setStartConcurrency] = useState(0);
    // 并发数步长
    const [step, setStep] = useState(0);
    // 步长执行时间
    const [step_run_time, setStepRunTime] = useState(0);
    // 最大并发数
    const [max_concurrency, setMaxConcurrency] = useState(0);
    // 预热时长
    const [reheat_time, setReheatTime] = useState(0);

    const [mode_conf, setModeConf] = useState({});

    // cron表达式
    const [cron_expr, setCronExpr] = useState('');

    const updateTaskConfig = (type, value) => {
        const _task_config = cloneDeep(task_config);
        if (type === 'task_type') {
            _task_config['task_type'] = value;
        } else if (type === 'cron_expr') {
            _task_config['cron_expr'] = value;
        } else if (type === 'mode') {
            _task_config['mode'] = value;
        } else {
            _task_config['task_type'] = task_type;
            if (task_type === 2) {
                _task_config['cron_expr'] = cron_expr;
            }
            _task_config['mode'] = mode;
            _task_config['mode_conf'] = mode_conf;
            _task_config['mode_conf'][type] = value;
        };


        dispatch({
            type: 'plan/updateTaskConfig',
            payload: _task_config,
        })
    }

    // 并发模式
    const ConcurrentMode = () => {
        return (
            <div className='other-config-item'>
                <Radio.Group value={default_mode} onChange={(e) => setDefaultMode(e)}>
                    <Radio value="duration">
                        <span className='label'>持续时长: </span>
                        <Input size="mini" value={mode_conf.duration} onBlur={(e) => {
                            const _mode_conf = cloneDeep(mode_conf);
                            _mode_conf.duration = parseInt(e.target.value);
                            // setDuration(parseInt(e.target.value));
                            setModeConf(_mode_conf);
                            // from === 'preset' && onChange('duration', parseInt(e.target.value));
                            // from === 'default' && 
                            updateTaskConfig('duration', parseInt(e.target.value));
                        }} disabled={default_mode === 'round_num'} /> s
                    </Radio>
                    <Radio value="round_num">
                        <span className='label'>轮次: </span>
                        <Input size="mini" value={mode_conf.round_num} onBlur={(e) => {
                            const _mode_conf = cloneDeep(mode_conf);
                            _mode_conf.round_num = parseInt(e.target.value);
                            // setRoundNum(_mode_conf);
                            setModeConf(_mode_conf);
                            // from === 'preset' && onChange('round_num', parseInt(e.target.value));
                            // from === 'default' && 
                            updateTaskConfig('round_num', parseInt(e.target.value));
                        }} disabled={default_mode === 'duration'} /> 次
                    </Radio>
                </Radio.Group>
                <div className='other-config-detail'>
                    <div className='config-detail-item'>
                        <span>并发数: </span>
                        <Input size="mini" value={mode_conf.concurrency} onBlur={(e) => {
                            const _mode_conf = cloneDeep(mode_conf);
                            _mode_conf.concurrency = parseInt(e.target.value);
                            // setConcurrency(_mode_conf);
                            setModeConf(_mode_conf);
                            // from === 'preset' && onChange('concurrency', parseInt(e.target.value));
                            // from === 'default' && 
                            updateTaskConfig('concurrency', parseInt(e.target.value));
                        }} />
                    </div>
                    <div className='config-detail-item'>
                        <span>预热: </span>
                        <Input size="mini" value={mode_conf.reheat_time} onBlur={(e) => {
                            const _mode_conf = cloneDeep(mode_conf);
                            _mode_conf.reheat_time = parseInt(e.target.value);
                            setModeConf(_mode_conf);
                            // from === 'preset' && onChange('reheat_time', parseInt(e.target.value));
                            // from === 'default' && 
                            updateTaskConfig('reheat_time', parseInt(e.target.value));
                        }} />s
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
                        <Input size="mini" value={mode_conf.start_concurrency} onBlur={(e) => {
                            const _mode_conf = cloneDeep(mode_conf);
                            _mode_conf.start_concurrency = parseInt(e.target.value);
                            // setStartConcurrency(parseInt(e.target.value));
                            setModeConf(_mode_conf);
                            // from === 'preset' && onChange('start_concurrency', parseInt(e.target.value));
                            // from === 'default' && 
                            updateTaskConfig('start_concurrency', parseInt(e.target.value));
                        }} />
                    </div>
                    <div className='config-detail-item'>
                        <span>并发数步长: </span>
                        <Input size="mini" value={mode_conf.step} onBlur={(e) => {
                            const _mode_conf = cloneDeep(mode_conf);
                            _mode_conf.step = parseInt(e.target.value);
                            // setStep(parseInt(e.target.value));
                            setModeConf(_mode_conf);
                            // from === 'preset' && onChange('step', parseInt(e.target.value));
                            // from === 'default' && 
                            updateTaskConfig('step', parseInt(e.target.value));
                        }} />
                    </div>
                    <div className='config-detail-item'>
                        <span>步长执行时长: </span>
                        <Input size="mini" value={mode_conf.step_run_time} onBlur={(e) => {
                            const _mode_conf = cloneDeep(mode_conf);
                            _mode_conf.step_run_time = parseInt(e.target.value);
                            // setStepRunTime(parseInt(e.target.value));
                            setModeConf(_mode_conf);
                            // from === 'preset' && onChange('step_run_time', parseInt(e.target.value));
                            // from === 'default' && 
                            updateTaskConfig('step_run_time', parseInt(e.target.value));
                        }} />s
                    </div>
                    <div className='config-detail-item'>
                        <span>最大并发数: </span>
                        <Input size="mini" value={mode_conf.max_concurrency} onBlur={(e) => {
                            const _mode_conf = cloneDeep(mode_conf);
                            _mode_conf.max_concurrency = parseInt(e.target.value);
                            // setMaxConcurrency(parseInt(e.target.value));
                            setModeConf(_mode_conf);
                            // from === 'preset' && onChange('max_concurrency', parseInt(e.target.value));
                            // from === 'default' && 
                            updateTaskConfig('max_concurrency', parseInt(e.target.value));
                        }} />次
                    </div>
                    <div className='config-detail-item'>
                        <span>稳定持续时长: </span>
                        <Input size="mini" value={mode_conf.duration} onBlur={(e) => {
                            const _mode_conf = cloneDeep(mode_conf);
                            _mode_conf.duration = parseInt(e.target.value);
                            // setDuration(parseInt(e.target.value));
                            setModeConf(_mode_conf);
                            // from === 'preset' && onChange('duration', parseInt(e.target.value));
                            // from === 'default' && 
                            updateTaskConfig('duration', parseInt(e.target.value));
                        }} />s
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
    };

    const savePlan = () => {
        if (mode === 1) {
            const { mode_conf: { duration, round_num, concurrency, reheat_time } } = task_config;
            if (!duration && !round_num) {
                Message('error', '未填必填项!');
                return;
            } else if (!concurrency) {
                Message('error', '未填必填项!');
                return;
            }
        } else {
            const { mode_conf: { start_concurrency, step, step_run_time, max_concurrency, duration } } = task_config;
            if (!start_concurrency || !step || !step_run_time || !max_concurrency || !duration) {
                Message('error', '未填必填项!');
                return;
            }
        }
        const params = {
            plan_id: parseInt(plan_id),
            team_id: parseInt(localStorage.getItem('team_id')),
            name: planDetail.name,
            ...task_config,
        };

        fetchSavePlan(params).subscribe({
            next: (res) => {
                const { code } = res;

                if (code === 0) {
                    Message('success', '保存成功!');
                } else {
                    Message('error', '保存失败!');
                }
            }
        })
    }

    return (
        <div className='task-config'>
            {
                from !== 'preset' && <div className='task-config-header'>
                    <p>任务配置</p>
                    <div className='btn'>
                        <Button className='save' onClick={() => savePlan()} preFix={<SvgSave width="16" height="16" />}>保存</Button>
                        <Button onClick={() => {
                            getPreConfig(() => init(initData))
                        }}>导入预设配置</Button>
                    </div>
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
                    <Radio.Group value={task_type} onChange={(e) => {
                        setTaskType(e);
                        // from === 'preset' && onChange('task_type', e);
                        // from === 'default' && 
                        updateTaskConfig('task_type', parseInt(e));
                    }}>
                        <Radio value={1}>普通任务</Radio>
                        <Radio value={2}>定时任务</Radio>
                    </Radio.Group>
                </div>
                {
                    task_type === 2 && <div className='item' style={{ marginBottom: '20px' }}>
                        <p style={{ marginRight: '5px' }}>填写cron表达式: </p>
                        <Input value={cron_expr} onChange={(e) => {
                            setCronExpr(e);
                            // from === 'preset' && onChange('cron_expr', e);
                            // from === 'default' && 
                            updateTaskConfig('cron_expr', e);
                        }} placeholder="每隔5秒执行一次: */5 * * * * ?" />
                    </div>
                }
                {/* <div className='item'>
                    <p>区域配置: </p>
                    <Switch />
                </div>
                <Table showBorder columns={column} data={data} /> */}
                <div className='item'>
                    <p style={{ marginBottom: 'auto', marginTop: '5px' }}>压测模式: </p>
                    <Radio.Group value={mode} onChange={(e) => {
                        setMode(e);
                        // from === 'preset' && onChange('mode', e);
                        // from === 'default' && 
                        updateTaskConfig('mode', parseInt(e));
                    }} >
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
import React, { useState, useEffect, useRef } from 'react';
import { Radio, Switch, Table, Input, Button, Message, Select, Dropdown, Tooltip } from 'adesign-react';
import { Save as SvgSave, Import as SvgImport } from 'adesign-react/icons';
import { fetchPreConfig } from '@services/plan';
import { useSelector, useDispatch } from 'react-redux';
import './index.less';
import { cloneDeep, round } from 'lodash';
// import { fetchPlanDetail } from '@services/plan';
import { fetchPlanDetail, fetchSavePlan, fetchGetTask } from '@services/plan';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import 'echarts/lib/echarts';
import ReactEcharts from 'echarts-for-react';
import cn from 'classnames';
import { DatePicker } from '@arco-design/web-react';
import SvgExplain from '@assets/icons/Explain';
import dayjs from 'dayjs';
import PreviewPreset from '@modals/PreviewPreset';
const { RangePicker } = DatePicker;
const { Group } = Radio;

const { Option } = Select;

const TaskConfig = (props) => {
    const { from, onChange } = props;
    const { t } = useTranslation();
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
    const open_scene = useSelector((store) => store.plan.open_plan_scene);
    const open_scene_name = useSelector((store) => store.scene.open_scene_name);
    console.log(open_scene);
    const language = useSelector((store) => store.user.language);
    const { id: plan_id } = useParams();

    useEffect(() => {
        if (open_scene) {
            console.log(open_scene);
            const query = {
                team_id: localStorage.getItem('team_id'),
                plan_id,
                scene_id: open_scene.scene_id ? open_scene.scene_id : open_scene.target_id
            };
            fetchGetTask(query).subscribe({
                next: (res) => {
                    const { data: { plan_task } } = res;
                    if (from === 'default') {
                        if (plan_task) {
                            const {
                                mode,
                                cron_expr,
                                mode_conf,
                                task_type,
                                timed_task_conf
                            } = plan_task;
                            mode && setMode(mode);
                            cron_expr && setCronExpr(cron_expr);
                            const { concurrency, duration, max_concurrency, reheat_time, round_num, start_concurrency, step, step_run_time } = mode_conf;
                            concurrency && setConcurrency(concurrency);
                            duration && setDuration(duration);
                            max_concurrency && setMaxConcurrency(max_concurrency);
                            reheat_time && setReheatTime(reheat_time);
                            round_num && setRoundNum(round_num);
                            start_concurrency && setStartConcurrency(start_concurrency);
                            step && setStep(step);
                            step_run_time && setStepRunTime(step_run_time);
                            setModeConf(mode_conf);
                            console.log(mode_conf);
                            task_type && setTaskType(task_type);

                            if (timed_task_conf) {

                                const { frequency, task_exec_time, task_close_time } = timed_task_conf;

                                frequency && setFrequency(frequency);
                                task_exec_time && setTaskExecTime(task_exec_time);
                                task_close_time && setTaskCloseTime(task_close_time);

                            }

                            if (mode_conf.round_num !== 0) {
                                setDefaultMode('round_num');
                            } else {
                                setDefaultMode('duration');
                            }
                            dispatch({
                                type: 'plan/updateTaskConfig',
                                payload: {
                                    mode,
                                    cron_expr,
                                    task_type,
                                    mode_conf: mode_conf ? mode_conf : {},
                                    timed_task_conf: timed_task_conf ? timed_task_conf : {}
                                },
                            })
                        } else {
                            setModeConf({
                                concurrency: 0,
                                duration: 0,
                                max_concurrency: 0,
                                reheat_time: 0,
                                round_num: 0,
                                start_concurrency: 0,
                                step: 0,
                                step_run_time: 0,
                                threshold_value: 0,
                            })
                        }
                    }
                    setPlanDetail(plan_task);
                }
            })
        }
    }, [open_scene]);

    const init = (preinstall = initData) => {
        console.log('preinstall', preinstall);
        const {
            task_mode,
            cron_expr,
            mode_conf,
            timed_task_conf,
            task_type
        } = preinstall;
        console.log(preinstall);
        const { concurrency, duration, max_concurrency, reheat_time, round_num, start_concurrency, step, step_run_time } = mode_conf;
        task_mode && setMode(task_mode);
        cron_expr && setCronExpr(cron_expr);
        console.log(mode_conf);
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

        const { frequency, task_exec_time, task_close_time } = timed_task_conf;

        frequency && setFrequency(frequency);
        task_exec_time && setTaskExecTime(task_exec_time);
        task_close_time && setTaskCloseTime(task_close_time);

        let _task_config = cloneDeep(task_config);
        _task_config = {
            mode: task_mode,
            cron_expr,
            mode_conf: mode_conf ? mode_conf : {},
            timed_task_conf: timed_task_conf ? timed_task_conf : {},
            task_type,
        }

        console.log(_task_config);

        dispatch({
            type: 'plan/updateTaskConfig',
            payload: _task_config,
        })
    }

    useEffect(() => {
        // getPreConfig();
    }, []);

    const getPreConfig = (callback) => {
        const query = {
            team_id: localStorage.getItem('team_id'),
            plan_id,
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



    const modeList = [t('plan.modeList.1'), t('plan.modeList.2'), t('plan.modeList.3'), t('plan.modeList.4'), t('plan.modeList.5')];
    // 模式
    const [mode, setMode] = useState(1);
    // 普通任务1 定时任务2
    const [task_type, setTaskType] = useState(1);

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

    const [default_mode, setDefaultMode] = useState('duration');

    // cron表达式
    const [cron_expr, setCronExpr] = useState('');

    const updateTaskConfig = (type, value) => {
        const _task_config = cloneDeep(task_config);
        const arr = ['duration', 'round_num', 'concurrency', 'reheat_time', 'start_concurrency', 'step', 'step_run_time', 'max_concurrency'];

        if (type === 'task_type') {
            _task_config['task_type'] = value;
        } else if (type === 'cron_expr') {
            _task_config['cron_expr'] = value;
        } else if (type === 'mode') {
            _task_config['mode'] = value;
        } else if (arr.includes(type)) {
            _task_config['task_type'] = task_type;
            if (task_type === 2) {
                _task_config['cron_expr'] = cron_expr;
            }
            _task_config['mode'] = mode;
            _task_config['mode_conf'] = mode_conf;
            _task_config['mode_conf'][type] = value;
        } else {
            if (task_type === 2) {
                console.log(_task_config);
                _task_config['timed_task_conf'][type] = value;
                if (type === 'frequency' && value === 0 && taskExecTime) {
                    _task_config['timed_task_conf']['task_close_time'] = value + 120;
                }
                if (frequency === 0 && type === 'task_exec_time') {
                    _task_config['timed_task_conf']['task_close_time'] = value + 120;
                }
            }
        }

        dispatch({
            type: 'plan/updateTaskConfig',
            payload: _task_config,
        })
    }


    // 并发模式 60 82
    const taskConfig = () => {
        return (
            <div className="task-config-detail" style={{ marginLeft: language === 'cn' ? '60px' : '82px' }}>
                <div className="left">
                    <div className="left-container">
                        {
                            // <Select onChange={(e) => {
                            //     setMode(e);
                            // }}>
                            //     {
                            //         modeList.map((item, index) => (
                            //             <Option key={index} value={index + 1}>{ item }</Option>
                            //         ))
                            //     }
                            // </Select>
                            // modeList.map((item, index) => (
                            //     <p 
                            //         className={ cn({ select: parseInt(mode) === index + 1 })} 
                            //         key={index}
                            //         onClick={() => {
                            //             setMode(index + 1);
                            //             updateTaskConfig('mode', index + 1);
                            //         }}
                            //         style={{ marginBottom: index === modeList.length -1 ? '0' : '' }}
                            //     >
                            //         { item }
                            //     </p>
                            // ))
                        }
                    </div>
                </div>
                <div className="right">
                    {
                        mode === 1 ? <div className="right-container-first">

                            <div style={{ display: 'flex', marginLeft: '6px' }}>
                                <span className='must-input' style={{ paddingTop: '8px' }}>*</span>
                                <Group className='radio-group' value={default_mode} onChange={(e) => {
                                    setDefaultMode(e);
                                    // console.log(e);
                                    const _mode_conf = cloneDeep(mode_conf);
                                    if (e === 'duration') {
                                        _mode_conf.round_num = 0;
                                        setModeConf(_mode_conf);
                                        updateTaskConfig('round_num', 0);
                                    } else if (e === 'round_num') {
                                        _mode_conf.duration = 0;
                                        setModeConf(_mode_conf);
                                        updateTaskConfig('duration', 0);
                                    }
                                }}>
                                    <Radio className='radio-group-item' value="duration">
                                        <span style={{ marginTop: '5px' }}>{t('plan.duration')}： </span>
                                        <Input value={mode_conf.duration} placeholder={t('placeholder.unitS')} onBlur={(e) => {
                                            const _mode_conf = cloneDeep(mode_conf);
                                            _mode_conf.duration = parseInt(e.target.value);
                                            // setDuration(parseInt(e.target.value));
                                            setModeConf(_mode_conf);
                                            // from === 'preset' && onChange('duration', parseInt(e.target.value));
                                            // from === 'default' && 
                                            setDuration(parseInt(e.target.value));
                                            updateTaskConfig('duration', parseInt(e.target.value));
                                        }} disabled={default_mode === 'round_num'} />
                                    </Radio>
                                    <Radio className='radio-group-item' value="round_num">
                                        <span style={{ marginTop: '5px' }}>{t('plan.roundNum')}： </span>
                                        <Input value={mode_conf.round_num} placeholder={t('placeholder.unitR')} onBlur={(e) => {
                                            const _mode_conf = cloneDeep(mode_conf);
                                            _mode_conf.round_num = parseInt(e.target.value);
                                            // setRoundNum(_mode_conf);
                                            setModeConf(_mode_conf);
                                            setRoundNum(parseInt(e.target.value));
                                            // from === 'preset' && onChange('round_num', parseInt(e.target.value));
                                            // from === 'default' && 
                                            updateTaskConfig('round_num', parseInt(e.target.value));
                                        }} disabled={default_mode === 'duration'} />
                                    </Radio>
                                </Group>
                            </div>
                            <div className="right-item">
                                <span><span className='must-input'>*&nbsp;</span>{t('plan.concurrency')}: </span>
                                <Input value={mode_conf.concurrency} placeholder={t('placeholder.unitR')} onBlur={(e) => {
                                    const _mode_conf = cloneDeep(mode_conf);
                                    _mode_conf.concurrency = parseInt(e.target.value);
                                    setConcurrency(parseInt(e.target.value));
                                    setModeConf(_mode_conf);
                                    // from === 'preset' && onChange('concurrency', parseInt(e.target.value));
                                    // from === 'default' && 
                                    updateTaskConfig('concurrency', parseInt(e.target.value));
                                }} />
                            </div>
                            <div className="right-item">
                                <div class="reheat-explain">
                                    &nbsp;&nbsp;&nbsp;<span>{t('plan.reheatTime')}： </span>
                                    <Tooltip content={<div>{t('plan.reheatExplain')}</div>}>
                                        <div><SvgExplain /></div>
                                    </Tooltip>
                                </div>
                                <Input value={mode_conf.reheat_time} placeholder={t('placeholder.unitS')} onBlur={(e) => {
                                    const _mode_conf = cloneDeep(mode_conf);
                                    _mode_conf.reheat_time = parseInt(e.target.value);
                                    setModeConf(_mode_conf);
                                    // from === 'preset' && onChange('reheat_time', parseInt(e.target.value));
                                    // from === 'default' && 
                                    updateTaskConfig('reheat_time', parseInt(e.target.value));
                                }} />
                            </div>
                        </div>
                            : <div className="right-container">
                                <div className="right-item">
                                    <span><span className='must-input'>*&nbsp;</span> {t('plan.startConcurrency')}：</span>
                                    <Input value={mode_conf.start_concurrency} placeholder={t('placeholder.unitR')} onBlur={(e) => {
                                        const _mode_conf = cloneDeep(mode_conf);
                                        _mode_conf.start_concurrency = parseInt(e.target.value);
                                        setStartConcurrency(parseInt(e.target.value));
                                        setModeConf(_mode_conf);
                                        // from === 'preset' && onChange('start_concurrency', parseInt(e.target.value));
                                        // from === 'default' && 
                                        updateTaskConfig('start_concurrency', parseInt(e.target.value));
                                    }} />
                                </div>
                                <div className="right-item">
                                    <span><span className='must-input'>*&nbsp;</span>{t('plan.step')}：</span>
                                    <Input value={mode_conf.step} placeholder={t('placeholder.unitR')} onBlur={(e) => {
                                        const _mode_conf = cloneDeep(mode_conf);
                                        _mode_conf.step = parseInt(e.target.value);
                                        setStep(parseInt(e.target.value));
                                        setModeConf(_mode_conf);
                                        // from === 'preset' && onChange('step', parseInt(e.target.value));
                                        // from === 'default' && 
                                        updateTaskConfig('step', parseInt(e.target.value));
                                    }} />
                                </div>
                                <div className="right-item">
                                    <span><span className='must-input'>*&nbsp;</span>{t('plan.stepRunTime')}：</span>
                                    <Input value={mode_conf.step_run_time} placeholder={t('placeholder.unitS')} onBlur={(e) => {
                                        const _mode_conf = cloneDeep(mode_conf);
                                        _mode_conf.step_run_time = parseInt(e.target.value);
                                        setStepRunTime(parseInt(e.target.value));
                                        setModeConf(_mode_conf);
                                        // from === 'preset' && onChange('step_run_time', parseInt(e.target.value));
                                        // from === 'default' && 
                                        updateTaskConfig('step_run_time', parseInt(e.target.value));
                                    }} />
                                </div>
                                <div className="right-item">
                                    <span><span className='must-input'>*&nbsp;</span>{t('plan.maxConcurrency')}： </span>
                                    <Input value={mode_conf.max_concurrency} placeholder={t('placeholder.unitR')} onBlur={(e) => {
                                        const _mode_conf = cloneDeep(mode_conf);
                                        _mode_conf.max_concurrency = parseInt(e.target.value);
                                        setMaxConcurrency(parseInt(e.target.value));
                                        setModeConf(_mode_conf);
                                        // from === 'preset' && onChange('max_concurrency', parseInt(e.target.value));
                                        // from === 'default' && 
                                        updateTaskConfig('max_concurrency', parseInt(e.target.value));
                                    }} />
                                </div>
                                <div className="right-item" style={{ marginBottom: 0 }}>
                                    <span><span className='must-input'>*&nbsp;</span>{t('plan.duration')}：</span>
                                    <Input value={mode_conf.duration} placeholder={t('placeholder.unitS')} onBlur={(e) => {
                                        const _mode_conf = cloneDeep(mode_conf);
                                        _mode_conf.duration = parseInt(e.target.value);
                                        setDuration(parseInt(e.target.value));
                                        setModeConf(_mode_conf);
                                        // from === 'preset' && onChange('duration', parseInt(e.target.value));
                                        // from === 'default' && 
                                        updateTaskConfig('duration', parseInt(e.target.value));
                                    }} />
                                </div>
                            </div>
                    }
                </div>
            </div>
            // <div className='other-config-item'>
            //     <Radio.Group value={default_mode} onChange={(e) => {
            //         setDefaultMode(e);
            //         // console.log(e);
            //         const _mode_conf = cloneDeep(mode_conf);
            //         if (e === 'duration') {
            //             _mode_conf.round_num = 0;
            //             setModeConf(_mode_conf);
            //             updateTaskConfig('round_num', 0);
            //         } else if (e === 'round_num') {
            //             _mode_conf.duration = 0;
            //             setModeConf(_mode_conf);
            //             updateTaskConfig('duration', 0);
            //         }
            //     }}>
            //         <Radio value="duration">
            //             <span className='label'>{t('plan.duration')}: </span>
            //             <Input size="mini" value={mode_conf.duration} onBlur={(e) => {
            //                 const _mode_conf = cloneDeep(mode_conf);
            //                 _mode_conf.duration = parseInt(e.target.value);
            //                 // setDuration(parseInt(e.target.value));
            //                 setModeConf(_mode_conf);
            //                 // from === 'preset' && onChange('duration', parseInt(e.target.value));
            //                 // from === 'default' && 
            //                 updateTaskConfig('duration', parseInt(e.target.value));
            //             }} disabled={default_mode === 'round_num'} /> s
            //         </Radio>
            //         <Radio value="round_num">
            //             <span className='label'>{t('plan.roundNum')}: </span>
            //             <Input size="mini" value={mode_conf.round_num} onBlur={(e) => {
            //                 const _mode_conf = cloneDeep(mode_conf);
            //                 _mode_conf.round_num = parseInt(e.target.value);
            //                 // setRoundNum(_mode_conf);
            //                 setModeConf(_mode_conf);
            //                 // from === 'preset' && onChange('round_num', parseInt(e.target.value));
            //                 // from === 'default' && 
            //                 updateTaskConfig('round_num', parseInt(e.target.value));
            //             }} disabled={default_mode === 'duration'} /> {t('plan.second')}
            //         </Radio>
            //     </Radio.Group>
            //     <div className='other-config-detail'>
            //         <div className='config-detail-item'>
            //             <span>{t('plan.concurrency')}: </span>
            //             <Input size="mini" value={mode_conf.concurrency} onBlur={(e) => {
            //                 const _mode_conf = cloneDeep(mode_conf);
            //                 _mode_conf.concurrency = parseInt(e.target.value);
            //                 // setConcurrency(_mode_conf);
            //                 setModeConf(_mode_conf);
            //                 // from === 'preset' && onChange('concurrency', parseInt(e.target.value));
            //                 // from === 'default' && 
            //                 updateTaskConfig('concurrency', parseInt(e.target.value));
            //             }} />
            //         </div>
            //         <div className='config-detail-item'>
            //             <span>{t('plan.reheatTime')}: </span>
            //             <Input size="mini" value={mode_conf.reheat_time} onBlur={(e) => {
            //                 const _mode_conf = cloneDeep(mode_conf);
            //                 _mode_conf.reheat_time = parseInt(e.target.value);
            //                 setModeConf(_mode_conf);
            //                 // from === 'preset' && onChange('reheat_time', parseInt(e.target.value));
            //                 // from === 'default' && 
            //                 updateTaskConfig('reheat_time', parseInt(e.target.value));
            //             }} />s
            //         </div>
            //     </div>
            // </div>
        )
    }

    // 阶梯模式
    const CommonMode = () => {
        return (
            <div className='other-config-item'>
                <div className='other-config-detail'>
                    <div className='config-detail-item'>
                        <span>{t('plan.startConcurrency')}: </span>
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
                        <span>{t('plan.step')}: </span>
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
                        <span>{t('plan.stepRunTime')}: </span>
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
                        <span>{t('plan.maxConcurrency')}: </span>
                        <Input size="mini" value={mode_conf.max_concurrency} onBlur={(e) => {
                            const _mode_conf = cloneDeep(mode_conf);
                            _mode_conf.max_concurrency = parseInt(e.target.value);
                            // setMaxConcurrency(parseInt(e.target.value));
                            setModeConf(_mode_conf);
                            // from === 'preset' && onChange('max_concurrency', parseInt(e.target.value));
                            // from === 'default' && 
                            updateTaskConfig('max_concurrency', parseInt(e.target.value));
                        }} />{t('plan.second')}
                    </div>
                    <div className='config-detail-item'>
                        <span>{t('plan.duration')}: </span>
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

    // const modeContentList = {
    //     '1': <ConcurrentMode />,
    //     '2': <CommonMode />,
    //     '3': <CommonMode />,
    //     '4': <CommonMode />,
    //     '5': <CommonMode />,
    // };

    const savePlan = () => {
        console.log(frequency, taskExecTime, taskCloseTime);
        console.log(mode, mode_conf);
        if (mode === 1) {
            if (task_type === 2) {
                if (frequency === 0 && taskExecTime === 0) {
                    console.log(123);
                    Message('error', t('message.taskConfigEmpty'));
                    return;
                } else if (frequency !== 0 && (taskExecTime === 0 || taskCloseTime === 0)) {
                    console.log(456);
                    Message('error', t('message.taskConfigEmpty'));
                    return;
                }

                if (frequency !== 0 && taskCloseTime <= taskExecTime) {
                    Message('error', t('message.endGTstart'));
                    return;
                }
            }
            const { duration, round_num, concurrency, reheat_time } = mode_conf;
            if (!duration && !round_num) {
                console.log(789);
                Message('error', t('message.taskConfigEmpty'));
                return;
            } else if (!concurrency) {
                console.log(999);
                Message('error', t('message.taskConfigEmpty'));
                return;
            }
        } else {
            const { start_concurrency, step, step_run_time, max_concurrency, duration } = mode_conf;
            console.log(start_concurrency, step, step_run_time, max_concurrency, duration);
            if (!start_concurrency || !step || !step_run_time || !max_concurrency || !duration) {
                Message('error', t('message.taskConfigEmpty'));
                return;
            }
        }
        console.log(open_scene);
        const params = {
            plan_id: parseInt(plan_id),
            name: open_scene_name,
            team_id: parseInt(localStorage.getItem('team_id')),
            scene_id: open_scene.scene_id ? parseInt(open_scene.scene_id) : parseInt(open_scene.target_id),
            ...task_config,
        };

        fetchSavePlan(params).subscribe({
            next: (res) => {
                const { code } = res;

                if (code === 0) {
                    Message('success', t('message.saveSuccess'));
                }
            }
        })
    };

    const theme = useSelector((store) => store.user.theme);

    const getOption = (name, x, y) => {
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
                data: x.length > 0 ? x : [],
                axisLabel: {
                    color: theme === 'dark' ? '#fff' : '#000',
                },
            },
            yAxis: {
                type: 'value',
                axisLabel: {
                    color: theme === 'dark' ? '#fff' : '#000',
                },
                splitLine: {
                    lineStyle: {
                        color: theme === 'dark' ? '#39393D' : '#E9E9E9'
                    }
                },
                name: t('plan.yUnit'),
                nameTextStyle: {
                    color: theme === 'dark' ? '#fff' : '#000',
                }
            },
            series: [
                {
                    data: y.length > 0 ? y : [],
                    type: 'line',
                    step: 'end'
                }
            ]
        }
        return option;
    };

    const [x_echart, setXEchart] = useState([]);
    const [y_echart, setYEchart] = useState([]);

    useEffect(() => {
        let result = [];
        if (mode === 1) {
            console.log(round_num, default_mode);
            if (default_mode === 'duration') {
                setXEchart([0, duration]);
                setYEchart([concurrency, concurrency]);
            } else if (default_mode === 'round_num') {
                setXEchart([0, round_num]);
                setYEchart([concurrency, concurrency]);
            }
        } else {
            if (start_concurrency > 0 && step > 0 && step_run_time > 0 && max_concurrency > 0 && duration > 0) {
                result.push([0]);
                result.push([start_concurrency]);
                while (true) {
                    if (result[1][result[1].length - 1] >= max_concurrency) {
                        result[1][result[1].length - 1] = max_concurrency;

                        result[0].push(result[0][result[0].length - 1] + duration);
                        result[1].push(result[1][result[1].length - 1]);

                        setXEchart(result[0]);
                        setYEchart(result[1]);
                        return;
                    }
                    result[0].push(result[0][result[0].length - 1] + step_run_time);
                    result[1].push(result[1][result[1].length - 1] + step)
                }
            }
        }
    }, [start_concurrency, step, step_run_time, max_concurrency, duration, round_num, concurrency, reheat_time, default_mode]);



    // [
    //     [0, 10],
    //     [5, 12],
    //     [10, 14],
    //     [15, 16],
    //     [20, 18],
    // ]

    // 频次: 0-一次，1-每天，2-每周，3-每月
    const [frequency, setFrequency] = useState(0);
    // 任务执行时间
    const [taskExecTime, setTaskExecTime] = useState(0);
    // 任务结束时间
    const [taskCloseTime, setTaskCloseTime] = useState(0);
    const [timeText, setTimeText] = useState('');

    useEffect(() => {
        let start = dayjs(taskExecTime * 1000).format('YYYY-MM-DD HH:mm');
        let start_time = dayjs(taskExecTime * 1000).format('HH:mm');
        let end = dayjs(taskCloseTime * 1000).format('YYYY-MM-DD HH:mm');
        if (frequency === 1) {
            setTimeText(`自${start}起, 每天的${start_time}该场景将自动执行一次, 直至${end}结束`);
        } else if (frequency === 2) {
            let week = new Date(taskExecTime * 1000).getDay();
            console.log(week);
            let weekList = {
                0: '周日',
                1: '周一',
                2: '周二',
                3: '周三',
                4: '周四',
                5: '周五',
                6: '周六'
            };
            setTimeText(`自${start}起, 每${weekList[week]}的${start_time}该场景将自动执行一次, 直至${end}结束`);
        } else if (frequency === 3) {
            let day = new Date(taskExecTime).getDate();
            setTimeText(`自${start}起, 每月${day}日的的${start_time}该场景将自动执行一次, 直至${end}结束`);
        } else {
            setTimeText('');
        }
        if (!taskExecTime || !taskCloseTime) {
            setTimeText('');
        }
    }, [taskExecTime, taskCloseTime, frequency]);

    const onTimeStart = (dateString, date) => {
        let start_time = new Date(dateString).getTime()
        setTaskExecTime(start_time / 1000);
        updateTaskConfig('task_exec_time', start_time / 1000);
    }

    const onTimeEnd = (dateString, date) => {
        let end_time = new Date(dateString).getTime()
        setTaskCloseTime(end_time / 1000);
        updateTaskConfig('task_close_time', end_time / 1000);
    }


    const refDropdown = useRef();
    const [showImport, setShowImport] = useState(false);
    const [preset, setPreset] = useState({});

    useEffect(() => {
        if (Object.entries(preset).length > 0) {
            init(preset);
        }
    }, [preset]);

    return (
        <div className='task-config'>
            {
                from !== 'preset' && <div className='task-config-header'>
                    <p>{t('plan.taskConfig')}</p>
                    <div className='btn'>
                        <Button className='save' onClick={() => savePlan()} preFix={<SvgSave width="16" height="16" />}>{t('btn.save')}</Button>
                        <Button className='pre-btn' onClick={() => setShowImport(true)}>{t('plan.importPre')}</Button>
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
                    <p style={{ marginTop: '2px' }}>{t('plan.taskType')}： </p>
                    <Radio.Group value={task_type} onChange={(e) => {
                        setTaskType(e);
                        // from === 'preset' && onChange('task_type', e);
                        // from === 'default' && 
                        updateTaskConfig('task_type', parseInt(e));
                    }}>
                        <Radio value={1}>{t('plan.taskList.commonTask')}</Radio>
                        <Radio value={2}>{t('plan.taskList.cronTask')}</Radio>
                    </Radio.Group>
                </div>
                {
                    task_type === 2 ? <div className='item time-select' style={{ marginBottom: '30px' }}>
                        <div className='explain'>
                            <div className='explain-left'>
                                <p>{t('btn.add')}</p>
                                <Tooltip content={<div>{t('plan.explain')}</div>}>
                                    <div>
                                        <SvgExplain />
                                    </div>
                                </Tooltip>
                            </div>
                            <div className='explain-right'>
                                <p>{t('plan.frequency')}</p>
                                <Select value={frequency} onChange={(e) => {
                                    setFrequency(e);
                                    updateTaskConfig('frequency', parseInt(e));
                                    if (e === 0) {
                                        setTaskCloseTime(0);
                                    }
                                }}>
                                    <Option value={0}>{t('plan.frequencyList.0')}</Option>
                                    <Option value={1}>{t('plan.frequencyList.1')}</Option>
                                    <Option value={2}>{t('plan.frequencyList.2')}</Option>
                                    <Option value={3}>{t('plan.frequencyList.3')}</Option>
                                </Select>
                            </div>
                        </div>
                        <div className='select-date'>
                            <div className='select-date-right'>
                                <div className='time-item'>
                                    <p className='label'>{ t('index.startTime') }:</p>
                                    <DatePicker
                                        value={taskExecTime * 1000}
                                        placeholder={t('placeholder.startTime')}
                                        style={{ marginTop: '10px' }}
                                        showTime
                                        format='YYYY-MM-DD HH:mm'
                                        onChange={onTimeStart}
                                        disabledDate={(current) => current.isBefore(new Date().getTime() - 86400000)}
                                    />
                                </div>
                                <div className='time-item'>
                                    <p className='label'>{ t('index.endTime') }:</p>
                                    <DatePicker
                                        value={taskCloseTime * 1000}
                                        disabled={frequency === 0}
                                        placeholder={t('placeholder.endTime')}
                                        style={{ marginTop: '10px' }}
                                        showTime
                                        format='YYYY-MM-DD HH:mm'
                                        onChange={onTimeEnd}
                                        disabledDate={(current) => current.isBefore(dayjs(taskExecTime * 1000).format('YYYY-MM-DD HH:mm:ss'))}
                                    />
                                </div>
                            </div>
                        </div>
                        <p className='time-explain'>{timeText}</p>
                    </div> : <></>
                }
                {/* {
                    task_type === 2 && <div className='item' style={{ marginBottom: '20px' }}>
                        <p style={{ marginRight: '5px' }}>{t('plan.fillInCron')}: </p>
                        <Input value={cron_expr} onChange={(e) => {
                            setCronExpr(e);
                            // from === 'preset' && onChange('cron_expr', e);
                            // from === 'default' && 
                            updateTaskConfig('cron_expr', e);
                        }} placeholder={t('placeholder.cronContent')} />
                    </div>
                } */}
                {/* <div className='item'>
                    <p>区域配置: </p>
                    <Switch />
                </div>
                <Table showBorder columns={column} data={data} /> */}
                <div className='item' style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                    <p >{t('plan.mode')}:</p>
                    <Select value={mode} style={{ width: '300px', height: '32px', marginLeft: '14px' }} onChange={(e) => {
                        if (e === 1) {
                            setDuration(0);
                            updateTaskConfig('duration', 0);
                            setRoundNum(0);
                            updateTaskConfig('round_num', 0);
                            setConcurrency(0);
                            updateTaskConfig('concurrency', 0);
                            setReheatTime(0);
                            updateTaskConfig('reheat_time', 0);
                        } else {
                            setStartConcurrency(0);
                            updateTaskConfig('start_concurrency', 0);
                            setStep(0);
                            updateTaskConfig('step', 0);
                            setStepRunTime(0);
                            updateTaskConfig('step_run_time', 0);
                            setMaxConcurrency(0);
                            updateTaskConfig('max_concurrency', 0);
                            setDuration(0);
                            updateTaskConfig('duration', 0);
                        }
                        setMode(e);
                        updateTaskConfig('mode', parseInt(e));
                    }}>
                        {
                            modeList.map((item, index) => (
                                <Option key={index} value={index + 1}>{item}</Option>
                            ))
                        }
                    </Select>
                    {/* <Radio.Group value={mode} onChange={(e) => {
                        setMode(e);
                        // from === 'preset' && onChange('mode', e);
                        // from === 'default' && 
                        updateTaskConfig('mode', parseInt(e));
                    }} >
                        {modeList.map((item, index) => (<Radio value={index + 1} style={{ marginBottom: '16px' }}>{item}</Radio>))}
                    </Radio.Group> */}
                </div>
                <div className='other-config'>
                    {
                        taskConfig()
                    }
                </div>
                <ReactEcharts style={{ marginTop: '10px' }} className='echarts' option={getOption(t('plan.configEchart'), x_echart, y_echart)} />
                <p>{t('plan.xUnit')}</p>
            </div>
            {
                showImport && <PreviewPreset onCancel={(e) => {
                    console.log(e);
                    if (e) {
                        setPreset(e);
                    }
                    setShowImport(false);
                }} />
            }
        </div>
    )
};

export default TaskConfig;
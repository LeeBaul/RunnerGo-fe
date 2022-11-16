import React, { useState, useEffect } from "react";
import './index.less';
import { Modal, Button, Input, Radio, Select, Message, Tooltip } from 'adesign-react';
import { useTranslation } from 'react-i18next';
import SvgClose from '@assets/logo/close';
import { useSelector } from 'react-redux';
import { DatePicker } from '@arco-design/web-react';
import dayjs from "dayjs";
const { Group } = Radio;
const { Option } = Select;
import 'echarts/lib/echarts';
import ReactEcharts from 'echarts-for-react';
import { fetchSavePreset } from '@services/preset';
import SvgExplain from '@assets/icons/Explain';

const CreatePreset = (props) => {
    const { onCancel, configDetail } = props;

    const { t } = useTranslation();
    const language = useSelector((store) => store.user.language);
    const [conf_name, setConfName] = useState('');
    const [task_type, setTaskType] = useState(1);
    const [task_mode, setMode] = useState(1);
    const [duration, setDuration] = useState(null);
    const [round_num, setRoundNum] = useState(null);
    const [concurrency, setConcurrency] = useState(null);
    const [reheat_time, setReheatTime] = useState(null);
    const [start_concurrency, setStartConcurrency] = useState(null);
    const [step, setStep] = useState(null);
    const [step_run_time, setStepRunTime] = useState(null);
    const [max_concurrency, setMaxConcurrency] = useState(null);
    const [default_mode, setDefaultMode] = useState('duration');
    const [id, setId] = useState(null);

    const modeList = [t('plan.modeList.1'), t('plan.modeList.2'), t('plan.modeList.3'), t('plan.modeList.4'), t('plan.modeList.5')];
    const theme = useSelector((store) => store.user.theme);


    useEffect(() => {
        if (Object.entries(configDetail).length > 0) {
            const {
                id,
                conf_name,
                mode_conf: {
                    concurrency,
                    duration,
                    max_concurrency,
                    reheat_time,
                    round_num,
                    start_concurrency,
                    step,
                    step_run_time
                },
                task_mode,
                task_type,
                timed_task_conf: {
                    frequency,
                    task_close_time,
                    task_exec_time
                }
            } = configDetail;
            console.log(task_mode);

            setId(id);
            setConfName(conf_name);
            setConcurrency(concurrency);
            setDuration(duration);
            setMaxConcurrency(max_concurrency);
            setReheatTime(reheat_time);
            setRoundNum(round_num);
            setStartConcurrency(start_concurrency);
            setStep(step);
            setStepRunTime(step_run_time);
            setTaskType(task_type);
            setMode(task_mode);
            setFrequency(frequency);
            setTaskExecTime(task_exec_time);
            setTaskCloseTime(task_close_time);
        }
    }, [configDetail]);


    const taskConfig = () => {
        return (
            <div className="task-config-detail" style={{ marginLeft: language === 'cn' ? '60px' : '82px' }}>
                <div className="left">
                    <div className="left-container">
                    </div>
                </div>
                <div className="right">
                    {
                        task_mode === 1 ? <div className="right-container-first">

                            <div style={{ display: 'flex', marginLeft: '6px' }}>
                                <Group className='radio-group' value={default_mode} onChange={(e) => {
                                    setDefaultMode(e);
                                }}>
                                    <Radio className='radio-group-item' value="duration">
                                        <span style={{ marginTop: '5px' }}>{t('plan.duration')}： </span>
                                        <Input value={duration} placeholder={t('placeholder.unitS')} onChange={(e) => setDuration(parseInt(e))} disabled={default_mode === 'round_num'} />
                                    </Radio>
                                    <Radio className='radio-group-item' value="round_num">
                                        <span style={{ marginTop: '5px' }}>{t('plan.roundNum')}： </span>
                                        <Input value={round_num} placeholder={t('placeholder.unitR')} onChange={(e) => setRoundNum(parseInt(e))} disabled={default_mode === 'duration'} />
                                    </Radio>
                                </Group>
                            </div>
                            <div className="right-item">
                                <span>{t('plan.concurrency')}: </span>
                                <Input value={concurrency} placeholder={t('placeholder.unitR')} onChange={(e) => setConcurrency(parseInt(e))} />
                            </div>
                            <div className="right-item">
                            <div class="reheat-explain">
                                    <span>{t('plan.reheatTime')}： </span>
                                    <Tooltip content={<div>{t('plan.reheatExplain')}</div>}>
                                        <div><SvgExplain /></div>
                                    </Tooltip>
                                </div>
                                <Input value={reheat_time} placeholder={t('placeholder.unitS')} onChange={(e) => setReheatTime(parseInt(e))} />
                            </div>
                        </div>
                            : <div className="right-container">
                                <div className="right-item">
                                    <span>{t('plan.startConcurrency')}：</span>
                                    <Input value={start_concurrency} placeholder={t('placeholder.unitR')} onChange={(e) => setStartConcurrency(parseInt(e))} />
                                </div>
                                <div className="right-item">
                                    <span>{t('plan.step')}：</span>
                                    <Input value={step} placeholder={t('placeholder.unitR')} onChange={(e) => setStep(parseInt(e))} />
                                </div>
                                <div className="right-item">
                                    <span>{t('plan.stepRunTime')}：</span>
                                    <Input value={step_run_time} placeholder={t('placeholder.unitS')} onChange={(e) => setStepRunTime(parseInt(e))} />
                                </div>
                                <div className="right-item">
                                    <span>{t('plan.maxConcurrency')}： </span>
                                    <Input value={max_concurrency} placeholder={t('placeholder.unitR')} onChange={(e) => setMaxConcurrency(parseInt(e))} />
                                </div>
                                <div className="right-item" style={{ marginBottom: 0 }}>
                                    <span>{t('plan.duration')}：</span>
                                    <Input value={duration} placeholder={t('placeholder.unitS')} onChange={(e) => setDuration(parseInt(e))} />
                                </div>
                            </div>
                    }
                </div>
            </div>
        )
    }

    const [frequency, setFrequency] = useState(0);
    const [task_exec_time, setTaskExecTime] = useState(0);
    const [task_close_time, setTaskCloseTime] = useState(0);
    const [x_echart, setXEchart] = useState([]);
    const [y_echart, setYEchart] = useState([]);
    const [timeText, setTimeText] = useState('');

    useEffect(() => {
        let start = dayjs(task_exec_time * 1000).format('YYYY:MM:DD HH:mm');
        let start_time = dayjs(task_exec_time * 1000).format('HH:mm');
        let end = dayjs(task_close_time * 1000).format('YYYY:MM:DD HH:mm');
        if (frequency === 1) {
            setTimeText(`自${start}起, 每天的${start_time}该场景将自动执行一次, 直至${end}结束`);
        } else if (frequency === 2) {
            let week = new Date(task_exec_time).getDay();
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
            let day = new Date(task_exec_time).getDate();
            setTimeText(`自${start}起, 每月${day}日的的${start_time}该场景将自动执行一次, 直至${end}结束`);
        } else {
            setTimeText('');
        }
        if (!task_exec_time || !task_close_time) {
            setTimeText('');
        }
    }, [task_exec_time, task_close_time, frequency]);

    const onTimeStart = (dateString, date) => {
        console.log(dateString);
        let start_time = new Date(dateString).getTime()
        setTaskExecTime(start_time / 1000);
    }

    const onTimeEnd = (dateString, date) => {
        let end_time = new Date(dateString).getTime()
        setTaskCloseTime(end_time / 1000);
    }

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
                    align: 'left'
                },
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

    useEffect(() => {
        let result = [];
        if (task_mode === 1) {
            setXEchart([0, duration]);
            setYEchart([concurrency, concurrency]);
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
    }, [start_concurrency, step, step_run_time, max_concurrency, duration, round_num, concurrency, reheat_time]);
    console.log(123123);

    const saveConfig = () => {
        if (!conf_name) {
            Message('error', t('message.configNameEmpty'));
            return;
        }

        // if (task_mode === 1) {
        //     if (task_type === 2) {
        //         if (frequency === 0 && task_exec_time === 0) {
        //             Message('error', t('message.taskConfigEmpty'));
        //             return;
        //         } else if (frequency !== 0 && (task_exec_time === 0 || task_close_time === 0)) {
        //             Message('error', t('message.taskConfigEmpty'));
        //             return;
        //         }

        //         if (frequency !== 0 && task_close_time <= task_exec_time) {
        //             Message('error', t('message.endGTstart'));
        //             return;
        //         }
        //     }
        //     if (!duration && !round_num) {
        //         Message('error', t('message.taskConfigEmpty'));
        //         return;
        //     } else if (!concurrency) {
        //         Message('error', t('message.taskConfigEmpty'));
        //         return;
        //     }
        // } else {
        //     if (!start_concurrency || !step || !step_run_time || !max_concurrency || !duration) {
        //         Message('error', t('message.taskConfigEmpty'));
        //         return;
        //     }
        // }
        let params = {};
        if (id) {
            params = {
                id,
                team_id: parseInt(localStorage.getItem('team_id')),
                conf_name,
                task_type,
                task_mode,
                mode_conf: {
                    concurrency,
                    duration,
                    max_concurrency,
                    reheat_time,
                    round_num,
                    start_concurrency,
                    step,
                    step_run_time,
                    threshold_value: 0
                },
                timed_task_conf: {
                    frequency,
                    task_exec_time,
                    task_close_time
                }
            };
        } else {
            params = {
                team_id: parseInt(localStorage.getItem('team_id')),
                conf_name,
                task_type,
                task_mode,
                mode_conf: {
                    concurrency,
                    duration,
                    max_concurrency,
                    reheat_time,
                    round_num,
                    start_concurrency,
                    step,
                    step_run_time,
                    threshold_value: 0
                },
                timed_task_conf: {
                    frequency,
                    task_exec_time,
                    task_close_time
                }
            };
        }
        console.log(params);

        fetchSavePreset(params).subscribe({
            next: (res) => {
                console.log(res);
                const { code } = res;

                if (code === 0) {
                    Message('success', t('message.saveSuccess'));
                    onCancel(true);
                }
            }
        })
    }

    return (
        <div>
            <Modal
                className="create-preset"
                visible
                title={null}
                okText={t('btn.save')}
                cancelText={t('btn.close')}
                onOk={() => saveConfig()}
                onCancel={onCancel}
            >
                <div className="top">
                    <p className="top-left">{t('leftBar.preset')}</p>
                    <Button className='top-right' onClick={onCancel}><SvgClose /></Button>
                </div>
                <div className="config-name item">
                    <p><span className="must-input">*</span><span>{t('column.preset.name')}：</span></p>
                    <Input value={conf_name} placeholder={t('placeholder.configName')} onChange={(e) => setConfName(e)} />
                </div>

                <div className='task-config-container'>
                    <div className="task-config-container-left">
                        <div className='item' style={{ marginBottom: '30px' }}>
                            <p style={{ marginTop: '2px' }}>{t('plan.taskType')}： </p>
                            <Radio.Group value={task_type} onChange={(e) => setTaskType(e)}>
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
                                                 value={task_exec_time * 1000}
                                                 placeholder={t('placeholder.startTime')}
                                                 style={{ marginTop: '10px' }}
                                                 showTime
                                                 format='YYYY-MM-DD HH:mm'
                                                 onChange={onTimeStart}
                                                 disabledDate={(current) => current.isBefore(new Date().getTime() - 86400000)}
                                             />
                                         </div>
                                         <div className='time-item' style={{ marginLeft: '10px' }}>
                                             <p className='label'>{ t('index.endTime') }:</p>
                                             <DatePicker
                                                 value={task_close_time * 1000}
                                                 disabled={frequency === 0}
                                                 placeholder={t('placeholder.endTime')}
                                                 style={{ marginTop: '10px' }}
                                                 showTime
                                                 format='YYYY-MM-DD HH:mm'
                                                 onChange={onTimeEnd}
                                                 disabledDate={(current) => current.isBefore(dayjs(task_exec_time * 1000).format('YYYY-MM-DD HH:mm:ss'))}
                                             />
                                         </div>
                                     </div>
                                 </div>
                                 <p className='time-explain'>{timeText}</p>
                             </div> : <></>
                        }
                        <div className='item' style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                            <p >{t('plan.mode')}:</p>
                            <Select value={task_mode} style={{ width: '300px', height: '32px', marginLeft: '14px' }} onChange={(e) => {
                                if (e === 1) {
                                    setDuration(0);
                                    // updateTaskConfig('duration', 0);
                                    setRoundNum(0);
                                    // updateTaskConfig('round_num', 0);
                                    setConcurrency(0);
                                    // updateTaskConfig('concurrency', 0);
                                    setReheatTime(0);
                                    // updateTaskConfig('reheat_time', 0);
                                } else {
                                    setStartConcurrency(0);
                                    // updateTaskConfig('start_concurrency', 0);
                                    setStep(0);
                                    // updateTaskConfig('step', 0);
                                    setStepRunTime(0);
                                    // updateTaskConfig('step_run_time', 0);
                                    setMaxConcurrency(0);
                                    // updateTaskConfig('max_concurrency', 0);
                                    setDuration(0);
                                    // updateTaskConfig('duration', 0);
                                }
                                setMode(e);
                                // updateTaskConfig('mode', parseInt(e));
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
                                // <TaskConfig />
                                taskConfig()
                            }
                        </div>
                    </div>
                    <div className="task-config-container-right">
                        <ReactEcharts className='echarts' option={getOption(t('plan.configEchart'), x_echart, y_echart)} />
                        <p style={{ marginLeft: '20px' }}>{t('plan.xUnit')}</p>
                    </div>
                </div>
            </Modal>
        </div>
    )
};

export default CreatePreset;
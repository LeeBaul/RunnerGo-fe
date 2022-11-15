import React, { useState, useEffect } from "react";
import './index.less';
import { Modal, Button, Input, Radio } from 'adesign-react';
import { useTranslation } from 'react-i18next';
import SvgClose from '@assets/icons/Cancel1';
import { useSelector } from 'react-redux';
import { DatePicker } from '@arco-design/web-react';
import dayjs from "dayjs";
const { Group } = Radio;

const CreatePreset = () => {
    const { t } = useTranslation();
    const language = useSelector((store) => store.user.language);
    const [task_type, setTaskType] = useState(1);
    const [mode, setMode] = useState(1);
    const [duration, setDuration] = useState(null);
    const [round_num, setRoundNum] = useState(null);
    const [concurrency, setConcurrency] = useState(null);
    const [reheat_time, setReheatTime] = useState(null);
    const [start_concurrency, setStartConcurrency] = useState(null);
    const [step, setStep] = useState(null);
    const [step_run_time, setStepRunTime] = useState(null);
    const [max_concurrency, setMaxConcurrency] = useState(null);
    const [default_mode, setDefaultMode] = useState('duration');
    const [frequency, setFrequency] = useState(0);
    const [taskExecTime, setTaskExecTime] = useState(0);
    const [taskCloseTime, setTaskCloseTime] = useState(0);



    const TaskConfig = () => {
        return (
            <div className="task-config-detail" style={{ marginLeft: language === 'cn' ? '60px' : '82px' }}>
                <div className="left">
                    <div className="left-container">
                    </div>
                </div>
                <div className="right">
                    {
                        mode === 1 ? <div className="right-container-first">

                            <div style={{ display: 'flex', marginLeft: '6px' }}>
                                <span className='must-input' style={{ paddingTop: '8px' }}>*</span>
                                <Group className='radio-group' value={default_mode} onChange={(e) => {
                                    setDefaultMode(e);
                                }}>
                                    <Radio className='radio-group-item' value="duration">
                                        <span style={{ marginTop: '5px' }}>{t('plan.duration')}： </span>
                                        <Input value={duration} placeholder={t('placeholder.unitS')} onChange={(e) => setDuration(e)} disabled={default_mode === 'round_num'} />
                                    </Radio>
                                    <Radio className='radio-group-item' value="round_num">
                                        <span style={{ marginTop: '5px' }}>{t('plan.roundNum')}： </span>
                                        <Input value={round_num} placeholder={t('placeholder.unitR')} onChange={(e) => setRoundNum(e)} disabled={default_mode === 'duration'} />
                                    </Radio>
                                </Group>
                            </div>
                            <div className="right-item">
                                <span><span className='must-input'>*&nbsp;</span>{t('plan.concurrency')}: </span>
                                <Input value={concurrency} placeholder={t('placeholder.unitR')} onChange={(e) => setConcurrency(e)} />
                            </div>
                            <div className="right-item">
                                &nbsp;<span>{t('plan.reheatTime')}： </span>
                                <Input value={reheat_time} placeholder={t('placeholder.unitS')} onChange={(e) => setReheatTime(e)} />
                            </div>
                        </div>
                            : <div className="right-container">
                                <div className="right-item">
                                    <span><span className='must-input'>*&nbsp;</span> {t('plan.startConcurrency')}：</span>
                                    <Input value={start_concurrency} placeholder={t('placeholder.unitR')} onChange={(e) => setStartConcurrency(e)} />
                                </div>
                                <div className="right-item">
                                    <span><span className='must-input'>*&nbsp;</span>{t('plan.step')}：</span>
                                    <Input value={step} placeholder={t('placeholder.unitR')} onChange={(e) => setStep(e)} />
                                </div>
                                <div className="right-item">
                                    <span><span className='must-input'>*&nbsp;</span>{t('plan.stepRunTime')}：</span>
                                    <Input value={step_run_time} placeholder={t('placeholder.unitS')} onChange={(e) => setStepRunTime(e)} />
                                </div>
                                <div className="right-item">
                                    <span><span className='must-input'>*&nbsp;</span>{t('plan.maxConcurrency')}： </span>
                                    <Input value={max_concurrency} placeholder={t('placeholder.unitR')} onChange={(e) => setMaxConcurrency(e)} />
                                </div>
                                <div className="right-item" style={{ marginBottom: 0 }}>
                                    <span><span className='must-input'>*&nbsp;</span>{t('plan.duration')}：</span>
                                    <Input value={duration} placeholder={t('placeholder.unitS')} onChange={(e) => setDuration(e)} />
                                </div>
                            </div>
                    }
                </div>
            </div>
        )
    }

    const onTimeStart = () => {

    };

    const onTimeEnd = () => {

    };

    return (
        <div>
            <Modal
                className="create-preset"
                title={null}
                okText={t('btn.save')}
                cancelText={t('btn.close')}
            >
                <div className="top">
                    <p className="top-left">{t('leftBar.preset')}</p>
                    <Button className='top-right'><SvgClose /></Button>
                </div>
                <div className="config-name">
                    <p><span className="must-input">*</span><span>配置名称</span></p>
                    <Input placeholder={t('placeholder.configName')} />
                </div>

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
                        <Radio.Group value={task_type} onChange={(e) => setTaskType(e)}>
                            <Radio value={1}>{t('plan.taskList.commonTask')}</Radio>
                            <Radio value={2}>{t('plan.taskList.cronTask')}</Radio>
                        </Radio.Group>
                    </div>
                    {
                        task_type === 2 ? <div className='item time-select' style={{ marginBottom: '30px' }}>
                            <div className='explain'>
                                <p>{t('btn.add')}</p>
                                <SvgExplain />
                            </div>
                            <div className='select-date'>
                                <div className='select-date-left'>
                                    <p>{t('plan.frequency')}</p>
                                    <Select value={frequency} onChange={(e) => {
                                        setFrequency(e);
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
                                <div className='select-date-right'>
                                    <DatePicker
                                        value={taskExecTime * 1000}
                                        placeholder={t('placeholder.startTime')}
                                        showTime
                                        format='YYYY-MM-DD HH:mm'
                                        onChange={onTimeStart}
                                        disabledDate={(current) => current.isBefore(new Date().getTime() - 86400000)}
                                    />
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
                            <TaskConfig />
                        }
                    </div>
                    {
                        mode !== 1 ? <ReactEcharts style={{ marginTop: '10px' }} className='echarts' option={getOption(t('plan.configEchart'), x_echart, y_echart)} /> : <></>
                    }
                    {
                        mode != 1 ? <p>{t('plan.xUnit')}</p> : <></>
                    }
                </div>
            </Modal>
        </div>
    )
};

export default CreatePreset;
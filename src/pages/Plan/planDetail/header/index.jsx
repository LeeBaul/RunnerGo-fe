import React, { useState, useEffect } from 'react';
import './index.less';
import { Button, Input, Message, Modal, Tooltip } from 'adesign-react';
import {
    Left as SvgLeft,
    Save as SvgSave,
    CaretRight as SvgCareRight
} from 'adesign-react/icons';
import avatar from '@assets/logo/avatar.png';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import TaskConfig from '../taskConfig';
import { cloneDeep } from 'lodash';
import Bus from '@utils/eventBus';
import { fetchPlanDetail, fetchSavePlan, fetchRunPlan, fetchStopPlan, fetchCreatePlan } from '@services/plan';
import dayjs from 'dayjs';
import SvgSendEmail from '@assets/icons/SendEmail';
import SvgStop from '@assets/icons/Stop';
import { useTranslation } from 'react-i18next';
import InvitationModal from '@modals/ProjectInvitation';

const DetailHeader = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [preSet, setPreSet] = useState(false);
    const [mode, setMode] = useState(1);
    const [mode_conf, setModeConf] = useState({});
    const [task_type, setTaskType] = useState(1);
    const [cron_expr, setCronExpr] = useState('');
    const open_plan = useSelector((store) => store.plan.open_plan);
    const task_config = useSelector((store) => store.plan.task_config);
    const { id: plan_id } = useParams();
    const [planDetail, setPlanDetail] = useState({});
    const [showEmail, setShowEmail] = useState(false);

    useEffect(() => {
        getReportDetail();
    }, [plan_id]);

    const getReportDetail = () => {
        const query = {
            team_id: localStorage.getItem('team_id'),
            plan_id,
        };
        fetchPlanDetail(query).subscribe({
            next: (res) => {
                const { data: { plan } } = res;
                setPlanDetail(plan);
            }
        })
    }

    const savePreSet = (e) => {

    }

    const statusList = {
        '1': t('plan.notRun'),
        '2': <p style={{ color: 'var(--run-green)' }}>{ t('plan.running') }</p>,
    }

    const onConfigChange = (type, value) => {
        if (type === 'task_type') {
            setTaskType(value);
        } else if (type === 'cron_expr') {
            setCronExpr(value);
        } else if (type === 'mode') {
            setMode(value);
        } else {
            const _mode_conf = cloneDeep(mode_conf);
            _mode_conf[type] = value;
            setModeConf(_mode_conf);
        }
    };

    const changePlanInfo = (type, value) => {
        let params = {
            team_id: parseInt(localStorage.getItem('team_id')),
            name: planDetail.name,
            remark: planDetail.remark,
            plan_id: parseInt(plan_id),
        };
        params[type] = value;
        fetchCreatePlan(params).subscribe({
            next: (res) => {
                const { code } = res;
                if (code !== 0) {
                    Message('error', t('message.updateError'));
                }
            }
        })
    }

    return (
        <div className='detail-header'>
            {
                preSet && (
                    <Modal title={ t('plan.preinstall') } okText={ t('btn.save') } cancelText={ t('btn.cancel') } onOk={() => {
                        const { task_type, mode, cron_expr, mode_conf } = task_config;
                        Bus.$emit('savePreConfig', { task_type, mode, cron_expr, mode_conf }, () => {
                            setPreSet(false);
                            Message('success', t('message.saveSuccess'));
                        }, plan_id)
                    }} visible onCancel={() => setPreSet(false)}>
                        <TaskConfig onChange={(type, value) => onConfigChange(type, value)} from="preset" />
                    </Modal>
                )
            }
            {
                showEmail && <InvitationModal from="plan" email={true} onCancel={() => setShowEmail(false)} />
            }
            <div className='detail-header-left'>
                <Button onClick={() => navigate('/plan/list')} >
                    <SvgLeft />
                </Button>
                <div className='detail'>
                    <div className='detail-top'>
                        <p className='name'>
                            { t('plan.planManage') } / 
                            <Tooltip
                                placement="top"
                                content={<div>{planDetail.name}</div>}
                            >
                              <div style={{ marginLeft: '8px' }}>
                                 <Input value={planDetail.name} onBlur={(e) => changePlanInfo('name', e.target.value)} />
                              </div>
                            </Tooltip>
                        </p>
                        <p className='status' style={{ color: planDetail.status === 2 ? 'var(--run-green)' : 'var(--font-color)' }}>
                            {statusList[planDetail.status]}
                        </p>
                    </div>
                    <div className='detail-bottom'>
                        <div className='item'>
                            <p>{ t('plan.createdBy') }：{planDetail.created_user_name}</p>
                            <img src={planDetail.created_user_avatar || avatar} />
                            <p style={{ marginLeft: '4px' }}></p>
                        </div>
                        <div className='item'>
                            { t('plan.createTime') }：{dayjs(planDetail.created_time_sec * 1000).format('YYYY-MM-DD HH:mm:ss')}
                        </div>
                        <div className='item'>
                            { t('plan.updateTime') }：{dayjs(planDetail.updated_time_sec * 1000).format('YYYY-MM-DD HH:mm:ss')}
                        </div>
                        <div className='item'>
                            { t('plan.planDesc') }: 
                            <Input value={planDetail.remark} onBlur={(e) => changePlanInfo('remark', e.target.value)} />
                        </div>
                    </div>
                </div>
            </div>
            <div className='detail-header-right'>
                <Button className='notice' onClick={() => setPreSet(true)}>{ t('plan.preinstall') }</Button>
                <Button className='notice' disabled={ planDetail.status !== 1 } preFix={<SvgSendEmail width="16" height="16" />} onClick={() => setShowEmail(true)}>{ t('btn.notifyEmail') }</Button>
                {
                    planDetail.status === 1
                        ? <Button className='run' preFix={<SvgCareRight width="16" height="16" />} onClick={() => Bus.$emit('runPlan', plan_id, (code) => {
                            if (code === 0) {
                                getReportDetail();
                            } else {
                                Message('error', t('message.handleError'));
                            }
                        })}>{ t('btn.run') }</Button>
                        : <Button className='stop' preFix={<SvgStop width="10" height="10" />} onClick={() => Bus.$emit('stopPlan', plan_id, (code) => {
                            if (code === 0) {
                                Message('success', t('message.stopSuccess'));
                                getReportDetail();
                            } else {
                                Message('error', t('message.stopError'));
                            }
                        })} >{ t('btn.stopRun') }</Button>
                }
            </div>
        </div>
    )
};

export default DetailHeader;
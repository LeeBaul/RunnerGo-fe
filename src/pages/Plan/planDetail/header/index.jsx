import React, { useState, useEffect } from 'react';
import './index.less';
import { Button, Message, Modal } from 'adesign-react';
import {
    Left as SvgLeft,
    Save as SvgSave
} from 'adesign-react/icons';
import avatar from '@assets/logo/avatar.png';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import TaskConfig from '../taskConfig';
import { cloneDeep } from 'lodash';
import Bus from '@utils/eventBus';
import { fetchPlanDetail } from '@services/plan';
import dayjs from 'dayjs';

const DetailHeader = () => {
    const navigate = useNavigate();
    const [preSet, setPreSet] = useState(false);
    const [mode, setMode] = useState(1);
    const [mode_conf, setModeConf] = useState({});
    const [task_type, setTaskType] = useState(1);
    const [cron_expr, setCronExpr] = useState('');
    const open_plan = useSelector((store) => store.plan.open_plan);
    const { id: plan_id } = useParams();
    const [planDetail, setPlanDetail] = useState({});

    console.log(open_plan);

    useEffect(() => {
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
    }, [plan_id]);

    const savePreSet = (e) => {

    }

    const statusList = {
        '1': '未开始',
        '2': <p style={{ color: '#3CC071' }}>进行中</p>,
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
    }
    return (
        <div className='detail-header'>
            {
                preSet && (
                    <Modal title='预设配置' okText='保存' onOk={() => {
                        Bus.$emit('savePreConfig', {task_type, mode, cron_expr, mode_conf}, () => {
                            setPreSet(false);
                            Message('success', '保存成功!');
                        })
                    }} visible onCancel={() => setPreSet(false)}>
                        <TaskConfig onChange={(type, value) => onConfigChange(type, value)} from="preset" />
                    </Modal>
                )
            }
            <div className='detail-header-left'>
                <SvgLeft onClick={() => navigate('/plan/list')} />
                <div className='detail'>
                    <div className='detail-top'>
                        <p className='name'>计划管理/{ planDetail.name }</p>
                        <p className='status'>
                            { statusList[planDetail.status] }
                        </p>
                    </div>
                    <div className='detail-bottom'>
                        <div className='item'>
                            <p>创建人：{ planDetail.created_user_name }</p>
                            <img src={avatar} />
                            <p style={{ marginLeft: '4px' }}></p>
                        </div>
                        <div className='item'>
                            创建时间：{ dayjs(planDetail.created_time_sec * 1000).format('YYYY-MM-DD hh:mm:ss') }
                        </div>
                        <div className='item'>
                            最后修改时间：{ dayjs(planDetail.updated_time_sec * 1000).format('YYYY-MM-DD hh:mm:ss') }
                        </div>
                    </div>
                </div>
            </div>
            <div className='detail-header-right'>
                <Button className='notice' onClick={() => setPreSet(true)}>预设配置</Button>
                <Button className='notice' preFix={<SvgSave width="16" height="16" />} onClick={() => setSendEmail(true)}>通知收件人</Button>
                <Button className='save' preFix={<SvgSave width="16" height="16" />}>保存</Button>
                <Button className='run' preFix={<SvgSave width="16" height="16" />}>开始运行</Button>
            </div>
        </div>
    )
};

export default DetailHeader;
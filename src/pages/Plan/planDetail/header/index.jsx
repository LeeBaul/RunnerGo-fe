import React, { useState } from 'react';
import './index.less';
import { Button, Modal } from 'adesign-react';
import {
    Left as SvgLeft,
    Save as SvgSave
} from 'adesign-react/icons';
import avatar from '@assets/logo/avatar.png';
import { useNavigate } from 'react-router-dom';
import TaskConfig from '../taskConfig';

const DetailHeader = () => {
    const navigate = useNavigate();
    const [preSet, setPreSet] = useState(false);
    return (
        <div className='detail-header'>
            {
                preSet && (
                    <Modal title='预设配置' okText='保存' onOk visible onCancel={() => setPreSet(false)}>
                        <TaskConfig from="preset" />
                    </Modal>
                )
            }
            <div className='detail-header-left'>
                <SvgLeft onClick={() => navigate('/plan/list')} />
                <div className='detail'>
                    <div className='detail-top'>
                        <p className='name'>计划管理/新闻列表并发</p>
                        <p className='status'>运行中</p>
                    </div>
                    <div className='detail-bottom'>
                        <div className='item'>
                            <p>创建人：</p>
                            <img src={avatar} />
                            <p style={{ marginLeft: '4px' }}>哎呀思</p>
                        </div>
                        <div className='item'>
                            创建人：2022.5.9 11:00:00
                        </div>
                        <div className='item'>
                            最后修改时间：2022.5.9 11:00:00
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
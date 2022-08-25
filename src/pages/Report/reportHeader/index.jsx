import React, { useState } from 'react';
import './index.less';
import { Button } from 'adesign-react';
import {
    Addcircle as SvgAddcircle,
    Left as SvgLeft,
} from 'adesign-react/icons';
import SendEmail from '@modals/SendEmail';
import { useNavigate } from 'react-router-dom';

const ReportHeader = () => {
    const [showSendEmail, setSendEmail] = useState(false);
    const navigate = useNavigate();

    return (
        <div className='report-header'>
            <div className='report-header-left'>
                <SvgLeft onClick={() => navigate('/report/list')} />
                <div className='report-name'>计划名称12345</div>
                <div className='report-status'>运行中</div>
            </div>
            <div className='report-header-right'>
                <Button className='notice' preFix={<SvgAddcircle width="16" height="16" />} onClick={() => setSendEmail(true)}>通知收件人</Button>
                <Button className='download'>下载</Button>
                <Button className='stop' preFix={<SvgAddcircle width="16" height="16" />}>停止任务</Button>
            </div>
            {showSendEmail && <SendEmail onCancel={() => setSendEmail(false)} />}
        </div>
    )
};

export default ReportHeader;
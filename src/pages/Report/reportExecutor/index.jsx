import React from 'react';
import './index.less';
import avatar from '@assets/logo/avatar.png';
import { Button } from 'adesign-react';

const ReportExecutor = () => {
    return (
        <div className='report-executor'>
            <p>执行者:</p>
            <div className='executor-info'>
                <img src={avatar} />
                <p>哎呀思</p>
            </div>
            <p className='create-time'>创建时间: 2022-12-22 02:22</p>
            <p className='last-time'>最后修改时间: 2022-12-22 03:22</p>
            <p className='run-time'>执行时长: 300s</p>
            <Button className='close-debug' type='primary'>关闭debug模式</Button>
        </div>
    )
};

export default ReportExecutor;
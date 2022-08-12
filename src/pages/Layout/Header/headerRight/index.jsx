import React from 'react';
import './index.less';
import { Button } from 'adesign-react';
import {
    LogoutRight as SvgLogout,
    InviteMembers as SvgInvite
} from 'adesign-react/icons';
import avatar from '@assets/logo/avatar.png'

const HeaderRight = () => {
    return (
        <div className='header-right'>
            <Button className='handle-log'>操作日志</Button>
            <div className='team-person'>
                <div className='person-avatar'>
                    <img src={avatar} alt="" />
                    <div className='person-status'></div>
                </div>
                <div className='person-avatar'>
                    <img src={avatar} alt="" />
                    <div className='person-status'></div>
                </div>
                <div className='person-avatar'>
                    <img src={avatar} alt="" />
                    <div className='person-status'></div>
                </div>
                <div className='person-number'>
                    <p>4</p>
                </div>
            </div>
            <div className='more-btn'>
                <Button className='handle-log' preFix={<SvgLogout />}>退出</Button>
                <Button className='invite' preFix={<SvgInvite />}>邀请</Button>
            </div>
        </div>
    )
};

export default HeaderRight;
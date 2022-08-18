import React, { useState } from 'react';
import './index.less';
import { Button } from 'adesign-react';
import {
    LogoutRight as SvgLogout,
    InviteMembers as SvgInvite
} from 'adesign-react/icons';
import avatar from '@assets/logo/avatar.png'
import InvitationModal from '@modals/ProjectInvitation';
import ProjectMember from '@modals/ProjectMember';

const HeaderRight = () => {
    const [showModal, setShowModal] = useState(false);
    const [showMember, setMemberModal] = useState(false);
    return (
        <div className='header-right'>
            <div className='team-person' onClick={() => setMemberModal(true)}>
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
            <Button className='invite' preFix={<SvgInvite />} onClick={() => setShowModal(true)}>邀请协作</Button>
            <div className='more-btn'>
                <Button className='handle-log'>操作日志</Button>
                <Button className='handle-log' preFix={<SvgLogout />}>退出</Button>
            </div>
            {showModal && <InvitationModal onCancel={() => {
                setShowModal(false);
            }} />}
            { showMember && <ProjectMember onCancel={() => {
                setMemberModal(false);
            }} /> }
        </div>
    )
};

export default HeaderRight;
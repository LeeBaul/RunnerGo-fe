import React, { useState } from 'react';
import './index.less';
import { Button, Dropdown } from 'adesign-react';
import {
    LogoutRight as SvgLogout,
    InviteMembers as SvgInvite
} from 'adesign-react/icons';
import avatar from '@assets/logo/avatar.png'
import InvitationModal from '@modals/ProjectInvitation';
import ProjectMember from '@modals/ProjectMember';
import TeamworkLogs from '@modals/TeamworkLogs';
// import SingleUser from './SingleUser.Jsx';

const HeaderRight = () => {
    const [showModal, setShowModal] = useState(false);
    const [showMember, setMemberModal] = useState(false);
    const [showLog, setShowLog] = useState(false);
    return (
        <div className='header-right'>
            <div className='team-person' onClick={() => setMemberModal(true)}>
                <Dropdown
                    content={
                        <div className="online-list">
                            {/* <SingleUser
                                useMsg={user}
                                currentUser={currentUser}
                                onSecMenuToggle={(val) => {
                                    setOutsideClose(val);
                                }}
                            ></SingleUser> */}
                        </div>
                    }
                >
                    <div className='person-avatar'>
                        <img src={avatar} alt="" />
                        <div className='person-status'></div>
                    </div>
                </Dropdown>
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
                <Button className='handle-log' onClick={() => setShowLog(true)}>操作日志</Button>
                <Button className='handle-log' preFix={<SvgLogout />}>退出</Button>
            </div>
            {showModal && <InvitationModal onCancel={() => {
                setShowModal(false);
            }} />}
            {showMember && <ProjectMember onCancel={() => {
                setMemberModal(false);
            }} />}
            {showLog && <TeamworkLogs onCancel={() => {
                setShowLog(false);
            }} />}
        </div>
    )
};

export default HeaderRight;
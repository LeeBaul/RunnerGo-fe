import React from 'react';
import { Modal, Button, Table } from 'adesign-react';
import cn from 'classnames';
import { ProjectMemberModal, HeaderLeftModal } from './style';
import avatar from '@assets/logo/avatar.png';
import { InviteMembers as SvgInvite } from 'adesign-react/icons';

const ProjectMember = (props) => {
    const { onCancel } = props;
    const columns = [
        {
            title: '成员',
            dataIndex: 'member',
            width: 220,
        },
        {
            title: '加入日期',
            dataIndex: 'joinTime',
        },
        {
            title: '邀请人',
            dataIndex: 'invitedBy',
        },
        {
            title: '工位属性',
            dataIndex: 'stationType',
        },
        {
            title: '操作',
            dataIndex: 'handle'
        }
    ];

    const MemberInfo = () => {
        return (
            <div className='member-info'>
                <img src={avatar} />
                <div className='detail'>
                    <p>冯丽妍（本人）</p>
                    <p>liuguanglei@apipost.cn</p>
                </div>
            </div>
        )
    }

    const data = [
        {
            member: <MemberInfo />,
            joinTime: '2021-12-21 22:22',
            invitedBy: '七七',
            stationType: <Button style={{ marginLeft: '10px' }}>读写工位</Button>,
            handle: '移除成员',
        },
        {
            member: <MemberInfo />,
            joinTime: '2021-12-21 22:22',
            invitedBy: '七七',
            stationType: <Button style={{ marginLeft: '10px' }}>读写工位</Button>,
            handle: '移除成员',
        },
        {
            member: <MemberInfo />,
            joinTime: '2021-12-21 22:22',
            invitedBy: '七七',
            stationType: <Button style={{ marginLeft: '10px' }}>读写工位</Button>,
            handle: '移除成员',
        },
    ];

    const HeaderLeft = () => {
        return (
                <div className={HeaderLeftModal}>
                    <div className='member-header-left'>
                        <p className='title'>项目成员列表</p>
                        <Button className='invite-btn' preFix={<SvgInvite />}>邀请协作</Button>
                    </div>
                </div>
        )
    }

    return (
        <div>
            <Modal className={ProjectMemberModal} visible={true} title={<HeaderLeft />} onCancel={onCancel} >
                <Table columns={columns} data={data} />
                {/* <div className='title'>
                    <p>成员</p>
                    <p>加入日期</p>
                    <p>邀请人</p>
                    <p>工位属性</p>
                    <p>邀请</p>
                </div>
                <div className='member-list'>
                    <div className='member-item'>
                        <div className='member-info'>
                            <img src={avatar} />
                            <div className='detail'>
                                <p>冯丽妍（本人）</p>
                                <p>liuguanglei@apipost.cn</p>
                            </div>
                        </div>

                        <div className='join-time'>2021-12-21 22:22</div>
                        <div className='invited-by'>七七</div>
                        <div className='station-type'>
                            <Button>读写工位</Button>
                        </div>
                        <div className='handle-member'>移除成员</div>
                    </div>
                </div> */}
            </Modal>
        </div>
    )
};

export default ProjectMember;
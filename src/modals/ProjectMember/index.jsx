import React, { useState, useEffect } from 'react';
import { Modal, Button, Table } from 'adesign-react';
import cn from 'classnames';
import { ProjectMemberModal, HeaderLeftModal } from './style';
import avatar from '@assets/logo/avatar.png';
import { InviteMembers as SvgInvite } from 'adesign-react/icons';
import { fetchTeamMemberList, fetchRemoveMember } from '@services/user';
import { tap } from 'rxjs';
import dayjs from 'dayjs';
import InvitationModal from '../ProjectInvitation';

const ProjectMember = (props) => {
    const { onCancel } = props;
    const [data, setData] = useState([]);
    const [showInvite, setShowInvite] = useState(false);

    const removeMember = (team_id, member_id) => {
        const params = {
            team_id,
            member_id,
        }
        fetchRemoveMember(params)
        .pipe(
            tap((res) => {
                console.log(res);
            })
        )
        .subscribe()
    }
    useEffect(() => {
        const query = {
            team_id: 10
        }
        fetchTeamMemberList(query)
            .pipe(
                tap((res) => {
                    console.log(res);
                    const { code, data: { members } } = res;
                    if (code === 0) {
                        let dataList = [];
                        dataList = members.map((item, index) => {
                            const { avatar, email, nickname, join_time_sec } = item;
                            const userInfo = {
                                avatar,
                                email,
                                nickname
                            }
                            return {
                                member: <MemberInfo userInfo={userInfo}  />,
                                joinTime: dayjs(join_time_sec * 1000).format('YYYY-MM-DD hh:mm:ss'),
                                // invitedBy: '七七',
                                stationType: '读写工位',
                                handle: <p style={{cursor: 'pointer'}} onClick={() => removeMember(item.user_id)}>移除成员</p>,
                            }
                        });
                        setData(dataList);
                    }
                })
            )
            .subscribe();
    }, [])
    const columns = [
        {
            title: '成员',
            dataIndex: 'member',
            width: 220,
        },
        {
            title: '加入日期',
            dataIndex: 'joinTime',
            width: 220,
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

    const MemberInfo = (props) => {
        const { userInfo: { nickname, avatar: avatarUrl, email } } = props;
        return (
            <div className='member-info'>
                <img src={avatarUrl || avatar} />
                <div className='detail'>
                    <p>{nickname}</p>
                    <p>{email}</p>
                </div>
            </div>
        )
    }

    const HeaderLeft = () => {
        return (
            <div className={HeaderLeftModal}>
                <div className='member-header-left'>
                    <p className='title'>项目成员列表</p>
                    <Button className='invite-btn' preFix={<SvgInvite />} onClick={() => setShowInvite(true)}>邀请协作</Button>
                </div>
            </div>
        )
    }

    return (
        <div>
            { showInvite && <InvitationModal onCancel={() => setShowInvite(false)} /> }
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
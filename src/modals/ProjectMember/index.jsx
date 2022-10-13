import React, { useState, useEffect } from 'react';
import { Modal, Button, Table, Message, Select } from 'adesign-react';
import cn from 'classnames';
import { ProjectMemberModal, HeaderLeftModal } from './style';
import avatar from '@assets/logo/avatar.png';
import { InviteMembers as SvgInvite } from 'adesign-react/icons';
import { fetchTeamMemberList, fetchRemoveMember, fetchQuitTeam, fetchUpdateConfig, fetchUpdateRole } from '@services/user';
import { tap } from 'rxjs';
import dayjs from 'dayjs';
import InvitationModal from '../ProjectInvitation';
import Bus from '@utils/eventBus';
import { useSelector, useDispatch } from 'react-redux';
import { fetchDashBoardInfo } from '@services/dashboard';

import { global$ } from '@hooks/useGlobal/global';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const { Option } = Select;

const ProjectMember = (props) => {
    const { onCancel } = props;
    const [data, setData] = useState([]);
    const [showInvite, setShowInvite] = useState(false);
    const [roleId, setRoleId] = useState(1);
    const [userId, setUserId] = useState(0);

    const userInfo = useSelector((store) => store.user.userInfo);
    const teamList = useSelector((store) => store.teams.teamData);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const removeMember = (member_id, role_id) => {
        // // 当前用户是普通成员, 没有移除任何人的权限
        // if (roleId === 2) {
        //     Message('error', '您没有权限移除成员!');
        //     return;
        // }
        // // 当前用户是管理员, 想移除管理员或者超级管理员
        // if (roleId === 3 && (role_id === 1 || role_id === 3)) {
        //     Message('error', '您没有权限移除该成员!');
        // }
        const params = {
            team_id: parseInt(localStorage.getItem('team_id')),
            member_id: parseInt(member_id),
        }
        fetchRemoveMember(params)
            .pipe(
                tap((res) => {
                    const { data, code } = res;

                    if (code === 0) {
                        Message('success', t('message.removeMemSuccess'));
                        getUserInfo().pipe(tap(fetchData)).subscribe();
                        Bus.$emit('getTeamMemberList');
                    } else {
                        Message('error', t('message.removeMemError'));
                    }
                })
            )
            .subscribe()
    };

    const getUserInfo = () => {
        return fetchDashBoardInfo({
            team_id: parseInt(localStorage.getItem('team_id'))
        }).pipe((res) => {
            return res;
        });
    }

    // 移除成员:
    // 1. 超级管理员可以移除管理员和普通成员
    // 2. 管理员可以移除普通成员, 不能移除管理员和超级管理员
    // 3. 普通成员没有任何移除的权限


    // 退出团队:
    // 1. 不能退出自己的私有团队
    // 2. 退出当前非私有团队后, 切换到自己的私有团队

    // role_id:
    // 1: 创始人
    // 2: 成员
    // 3: 管理员

    const outTeam = () => {
        // 判断当前团队是否是该用户的私有团队
        const team_id = localStorage.getItem('team_id');
        const team_item = teamList[team_id];

        // // 当前团队是私有团队, 并且团队的创建者是自己
        // if (team_item.type === 1 && team_item.created_user_id === userId) {
        //     Message('error', '您无法退出自己的私有团队!');
        //     return;
        // }
        const params = {
            team_id: parseInt(team_id),
        };
        fetchQuitTeam(params).subscribe({
            next: (res) => {
                const { code } = res;
                if (code === 0) {
                    Message('success', t('message.quitSuccess'));
                    const _teamList = Object.values(teamList);
                    const myTeam = _teamList.find(item => item.type === 1 && item.created_user_id === userId);

                    const settings = JSON.parse(localStorage.getItem('settings'));
                    settings.settings.current_team_id = myTeam.team_id;
                    fetchUpdateConfig(settings).subscribe({
                        next: (res) => {
                            const { code } = res;
                            if (code === 0) {
                                localStorage.setItem('team_id', myTeam.team_id);
                                global$.next({
                                    action: 'INIT_APPLICATION',
                                });
                                dispatch({
                                    type: 'opens/coverOpenApis',
                                    payload: {},
                                })
                                dispatch({
                                    type: 'scene/updateOpenScene',
                                    payload: null,
                                })
                                onCancel();
                                navigate('/index');
                            } else {
                                Message('error', t('moidal.checkTeamError'));
                            }
                        },
                    })
                } else {
                    Message('error', t('message.quitError'));
                }
            }
        })
    };

    const setRole = (role_id, user_id) => {
        // 判断当前用户的更改权限
        // 成员: 无任何更改权限
        // 管理员: 成员 => 管理员 true 管理员 => 成员 false
        // 超级管理员: 成员 => 管理员 true 管理员 => 成员 true
        // all： xxx => 超级管理员 false 超级管理员 => xxx false 

        const params = {
            team_id: parseInt(localStorage.getItem('team_id')),
            user_id: user_id,
            role_id: parseInt(role_id),
        };
        fetchUpdateRole(params).subscribe({
            next: (res) => {
                const { code } = res;
                if (code === 0) {
                    Message('success', t('message.handleSuccess'));
                    getUserInfo().pipe(tap(fetchData)).subscribe();
                } else {
                    Message('error', t('message.handleError'));
                }
            }
        })
    }

    const roleList = {
        1: t('modal.roleList.2'),
        2: t('modal.roleList.0'),
        3: t('modal.roleList.1')
    }

    const fetchData = (res) => {
        console.log(res);
        const { data: { user: { user_id, role_id } } } = res;
        setUserId(user_id);
        setRoleId(role_id);
        const query = {
            team_id: localStorage.getItem('team_id')
        }
        fetchTeamMemberList(query)
            .pipe(
                tap((res) => {
                    const { code, data: { members } } = res;
                    if (code === 0) {
                        let dataList = [];
                        console.log(userInfo);

                        dataList = members.map((item, index) => {
                            const { avatar, email, nickname, join_time_sec, invite_user_name } = item;
                            const userInfo = {
                                avatar,
                                email,
                                nickname
                            }
                            // 1. 本人是超级管理员
                            //    自己的权限是文本，其它人的都是select
                            // 2. 本人是管理员
                            //    自己、超管、其它管理员的权限都是文本, 成员是select
                            // 3. 本人是成员
                            //    所有人的权限都是文本
                            if (role_id === 1) {
                                return {
                                    member: <MemberInfo userInfo={userInfo} me={ item.user_id === user_id }  />,
                                    join_time_sec: dayjs(join_time_sec * 1000).format('YYYY-MM-DD HH:mm:ss'),
                                    invite_user_name,
                                    power:
                                        item.role_id === 1
                                            ?
                                            <p className='default-power'>{roleList[item.role_id]}</p>
                                            :
                                            <div>
                                                {
                                                    <Select
                                                        value={item.role_id}
                                                        onChange={(e) => setRole(e, item.user_id)}
                                                    >
                                                        <Option value={2}>{ t('modal.roleList.0') }</Option>
                                                        <Option value={3}>{ t('modal.roleList.1') }</Option>
                                                    </Select>
                                                }
                                            </div>,
                                    handle: <p style={{ cursor: 'pointer', color: '#f00' }} onClick={() => {
                                        if (item.user_id === user_id) {
                                            outTeam();
                                        } else {
                                            removeMember(item.user_id, item.role_id);
                                        }
                                    }}>
                                        {
                                            item.role_id !== 1
                                                ? item.user_id === user_id ? t('modal.quitTeam') : t('modal.delMem')
                                                : ''
                                        }
                                    </p>,
                                }
                            } else if (role_id === 2) {
                                return {
                                    member: <MemberInfo userInfo={userInfo} me={ item.user_id === user_id }  />,
                                    join_time_sec: dayjs(join_time_sec * 1000).format('YYYY-MM-DD HH:mm:ss'),
                                    invite_user_name,
                                    power: <p className='default-power'>{roleList[item.role_id]}</p>,
                                    handle: <p style={{ cursor: 'pointer', color: '#f00' }} onClick={() => {
                                        if (item.user_id === user_id) {
                                            outTeam();
                                        } else {
                                            removeMember(item.user_id, item.role_id);
                                        }
                                    }}>
                                        {
                                            item.role_id !== 1
                                                ? item.user_id === user_id ? t('modal.quitTeam') : ''
                                                : ''
                                        }
                                    </p>,
                                }
                            } else if (role_id === 3) {
                                return {
                                    member: <MemberInfo userInfo={userInfo} me={ item.user_id === user_id }  />,
                                    join_time_sec: dayjs(join_time_sec * 1000).format('YYYY-MM-DD HH:mm:ss'),
                                    invite_user_name,
                                    power:
                                        item.role_id === 1 || item.role_id === 3
                                        ?
                                            <p className='default-power'>{roleList[item.role_id]}</p>
                                        :
                                            <div>
                                                {
                                                    <Select
                                                        value={item.role_id}
                                                        onChange={(e) => setRole(e, item.user_id)}
                                                    >
                                                        <Option value={2}>{ t('modal.roleList.0') }</Option>
                                                        <Option value={3}>{ t('modal.roleList.1') }</Option>
                                                    </Select>
                                                }
                                            </div>
                                    ,
                                    handle: <p style={{ cursor: 'pointer', color: '#f00' }} onClick={() => {
                                        if (item.user_id === user_id) {
                                            outTeam();
                                        } else {
                                            removeMember(item.user_id, item.role_id);
                                        }
                                    }}>
                                        {
                                            item.role_id === 2
                                                ? t('modal.delMem')
                                                : item.user_id === user_id ? t('modal.quitTeam') : ''
                                        }
                                    </p>,
                                }
                        }

                        });
        setData(dataList);
    }
})
            )
            .subscribe();
    }
useEffect(() => {
    getUserInfo().pipe(tap(fetchData)).subscribe();
    console.log(teamList);
    // fetchData();
}, [])
const columns = [
    {
        title: t('column.teamMember.member'),
        dataIndex: 'member',
        width: 220,
    },
    {
        title: t('column.teamMember.joinTime'),
        dataIndex: 'join_time_sec',
        width: 220,
    },
    {
        title: t('column.teamMember.inviteBy'),
        dataIndex: 'invite_user_name',
    },
    {
        title: t('column.teamMember.power'),
        dataIndex: 'power',
    },
    {
        title: t('column.teamMember.handle'),
        dataIndex: 'handle'
    }
];

const MemberInfo = (props) => {
    const { userInfo: { nickname, avatar: avatarUrl, email }, me } = props;
    return (
        <div className='member-info'>
            <img src={avatarUrl || avatar} />
            <div className='detail'>
                <p>{nickname} { me ? `（${ t('modal.me') }）` : '' }</p>
                <p>{email}</p>
            </div>
        </div>
    )
}

const HeaderLeft = () => {
    return (
        <div className={HeaderLeftModal}>
            <div className='member-header-left'>
                <p className='title'>{ t('modal.teamMemTitle') }</p>
                <Button className='invite-btn' preFix={<SvgInvite />} onClick={() => setShowInvite(true)}>邀请</Button>
            </div>
        </div>
    )
}

return (
    <div>
        {showInvite && <InvitationModal onCancel={() => setShowInvite(false)} />}
        <Modal className={ProjectMemberModal} visible={true} title={<HeaderLeft />} footer={null} onCancel={onCancel}>
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
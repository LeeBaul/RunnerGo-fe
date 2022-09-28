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

    const removeMember = (member_id, role_id) => {
        // 当前用户是普通成员, 没有移除任何人的权限
        if (roleId === 2) {
            Message('error', '您没有权限移除成员!');
            return;
        }
        // 当前用户是管理员, 想移除管理员或者超级管理员
        if (roleId === 3 && (role_id === 1 || role_id === 3)) {
            Message('error', '您没有权限移除该成员!');
        }
        const params = {
            team_id: parseInt(localStorage.getItem('team_id')),
            member_id,
        }
        fetchRemoveMember(params)
            .pipe(
                tap((res) => {
                    const { data, code } = res;

                    if (code === 0) {
                        Message('success', '移除成功!');
                        fetchData();
                        Bus.$emit('getTeamMemberList');
                    } else {
                        Message('error', '移除失败!');
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

        // 当前团队是私有团队, 并且团队的创建者是自己
        if (team_item.type === 1 && team_item.created_user_id === userId) {
            Message('error', '您无法退出自己的私有团队!');
            return;
        }
        const params = {
            team_id: parseInt(team_id),
        };
        fetchQuitTeam(params).subscribe({
            next: (res) => {
                const { code } = res;
                if (code === 0) {
                    Message('success', '退出成功!');
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
                                Message('error', '切换团队失败!');
                            }
                        },
                    })
                } else {
                    Message('error', '退出失败!');
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
            user_id: 'xxxx',
            role_id: parseInt(role_id),
        };
        fetchUpdateRole(params).subscribe({
            next: (res) => {
                const { code } = res;
                if (code === 0) {
                    Message('success', '更改成功!');
                } else {
                    Message('error', '更改失败!');
                }
            }
        })
    }

    const fetchData = (res) => {
        const { data: { user: { user_id } } } = res;
        setUserId(user_id);
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
                            if (item.user_id === user_id) {
                                setRoleId(item.role_id);
                            }
                            return {
                                member: <MemberInfo userInfo={userInfo} />,
                                join_time_sec: dayjs(join_time_sec * 1000).format('YYYY-MM-DD HH:mm:ss'),
                                invite_user_name,
                                power:
                                    <div>
                                        <Select
                                            value={item.role_id}
                                            onChange={(e) => setRole(e, item.user_id)}
                                        >
                                            <Option value={1}>超级管理员</Option>
                                            <Option value={2}>成员</Option>
                                            <Option value={3}>管理员</Option>
                                        </Select>
                                    </div>,
                                handle: <p style={{ cursor: 'pointer', color: '#f00' }} onClick={() => {
                                    if (item.user_id === user_id) {
                                        outTeam();
                                    } else {
                                        removeMember(item.user_id, item.role_id);
                                    }
                                }}>
                                    {item.user_id === user_id ? '退出团队' : '移除成员'}
                                </p>,
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
            title: '成员',
            dataIndex: 'member',
            width: 220,
        },
        {
            title: '加入日期',
            dataIndex: 'join_time_sec',
            width: 220,
        },
        {
            title: '邀请人',
            dataIndex: 'invite_user_name',
        },
        {
            title: '人员权限',
            dataIndex: 'power',
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
            {showInvite && <InvitationModal onCancel={() => setShowInvite(false)} />}
            <Modal className={ProjectMemberModal} visible={true} title={<HeaderLeft />} onCancel={onCancel} onOk={onCancel} >
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
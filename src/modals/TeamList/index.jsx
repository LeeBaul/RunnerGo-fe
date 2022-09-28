import React, { useState, useEffect } from 'react';
import { Modal, Button, Table, Message, Select } from 'adesign-react';
import cn from 'classnames';
import { ProjectMemberModal, HeaderLeftModal } from './style';
import avatar from '@assets/logo/avatar.png';
import { InviteMembers as SvgInvite, Team as SvgTeam } from 'adesign-react/icons';
import { fetchTeamMemberList, fetchRemoveMember, fetchTeamList, fetchQuitTeam } from '@services/user';
import { tap } from 'rxjs';
import dayjs from 'dayjs';
import InvitationModal from '../ProjectInvitation';
import Bus from '@utils/eventBus';
import { useSelector, useDispatch } from 'react-redux';
import { fetchDashBoardInfo } from '@services/dashboard';
import CreateTeam from '../CreateTeam';

const { Option } = Select;

const TeamList = (props) => {
    const { onCancel } = props;
    const [data, setData] = useState([]);
    const [showInvite, setShowInvite] = useState(false);
    const [showCreate, setShowCreate] = useState(false);
    const [showQuit, setShowQuit] = useState(false);
    const [confirmTeam, setConfirmTeam] = useState({});

    const userInfo = useSelector((store) => store.user.userInfo);
    const dispatch = useDispatch();

    const removeMember = (member_id) => {
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

    const confirmQuit = () => {
        setShowQuit(true);
    }

    const deleteTeam = () => {

    }
    const outTeam = () => {
        // 判断当前团队是否是该用户的私有团队
        const team_id = localStorage.getItem('team_id');
        const team_item = data.find(item => item.team_id === confirmTeam.team_id);

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

    const fetchData = (res) => {
        const { data: { user: { user_id } } } = res;

        fetchTeamList()
            .pipe(
                tap((res) => {
                    const { code, data: { teams } } = res;
                    if (code === 0) {
                        let dataList = [];
                        // console.log(userInfo);
                        dataList = teams.map((item, index) => {
                            const { name, created_time_sec } = item;
                            return {
                                ...item,
                                created_time_sec: dayjs(created_time_sec * 1000).format('YYYY-MM-DD HH:mm:ss'),
                                handle: <p style={{ cursor: 'pointer', color: '#f00' }} onClick={() => {
                                    if (item.created_user_id === user_id) {
                                        deleteTeam();
                                    } else {
                                        setConfirmTeam(item);
                                        confirmQuit();
                                    }
                                }}>
                                    {item.created_user_id === user_id ? '解散团队' : '退出团队'}
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
        // fetchData();
    }, [])
    const columns = [
        {
            title: '团队名称',
            dataIndex: 'name',
            width: 220,
        },
        {
            title: '创建日期',
            dataIndex: 'created_time_sec',
            width: 220,
        },
        {
            title: '创建人',
            dataIndex: 'created_user_name',
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
                    <p className='title'>团队管理</p>
                    <Button className='create-team' preFix={<SvgTeam />} onClick={() => setShowCreate(true)}>新建团队</Button>
                </div>
            </div>
        )
    }

    return (
        <div>
            {showInvite && <InvitationModal onCancel={() => setShowInvite(false)} />}
            {showCreate && <CreateTeam onCancel={(e) => {
                setShowCreate(false);
                if (e) {
                    getUserInfo().pipe(tap(fetchData)).subscribe();
                }
            }} />}
            {showQuit &&
                <Modal
                    visible={true}
                    title="退出团队"
                    content={`确认退出${confirmTeam.name}?`}
                    okText="退出团队"
                    onCancel={() => setShowQuit(false)}
                    onOk={() => outTeam()}
                ></Modal>
            }
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

export default TeamList;
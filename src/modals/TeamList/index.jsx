import React, { useState, useEffect } from 'react';
import { Modal, Button, Table, Message, Select } from 'adesign-react';
import cn from 'classnames';
import { ProjectMemberModal, HeaderLeftModal } from './style';
import avatar from '@assets/logo/avatar.png';
import { InviteMembers as SvgInvite, Team as SvgTeam } from 'adesign-react/icons';
import { fetchTeamMemberList, fetchRemoveMember, fetchTeamList, fetchQuitTeam, fetchDissTeam, fetchUpdateConfig } from '@services/user';
import { tap } from 'rxjs';
import dayjs from 'dayjs';
import InvitationModal from '../ProjectInvitation';
import Bus from '@utils/eventBus';
import { useSelector, useDispatch } from 'react-redux';
import { fetchDashBoardInfo } from '@services/dashboard';
import CreateTeam from '../CreateTeam';
import { useTranslation } from 'react-i18next';

import { global$ } from '@hooks/useGlobal/global';

const { Option } = Select;

const TeamList = (props) => {
    const { onCancel } = props;
    const [data, setData] = useState([]);
    const [showInvite, setShowInvite] = useState(false);
    const [showCreate, setShowCreate] = useState(false);
    const [showQuit, setShowQuit] = useState(false);
    const [confirmTeam, setConfirmTeam] = useState({});
    const [userId, setUserId] = useState(null);
    const [roleId, setRoleId] = useState(null);

    const userInfo = useSelector((store) => store.user.userInfo);
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const getUserInfo = () => {
        return fetchDashBoardInfo({
            team_id: parseInt(localStorage.getItem('team_id'))
        }).pipe((res) => {
            return res;
        });
    }

    const confirmQuit = (confirmTeam) => {

        Modal.confirm({
            title: t('modal.quitTeam'),
            content: `${t('modal.confirmQuit')}${confirmTeam.name}?`,
            cancelText: t('btn.cancel'),
            okText: t('modal.quitTeam'),
            onOk: () => {
                outTeam(confirmTeam);
            }
        })
        // setShowQuit(true);
    }

    const deleteTeam = (data, confirmTeam, userId) => {
        const myTeam = data.find(item => item.type === 1 && item.created_user_id === userId);

        Modal.confirm({
            title: t('modal.dissmissTeam'),
            content: t('modal.dissmissContent1'),
            cancelText: t('btn.cancel'),
            okText: t('btn.confirmDissmiss'),
            onOk: () => {
                const { team_id } = confirmTeam;
                const params = {
                    team_id: parseInt(team_id)
                };
                fetchDissTeam(params).subscribe({
                    next: (res) => {
                        console.log(team_id, localStorage.getItem('team_id'));
                        if (`${team_id}` === `${localStorage.getItem('team_id')}`) {
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
                                        Message('error', t('message.checkTeamError'));
                                    }
                                },
                            })
                        } else {
                            getUserInfo().pipe(tap(fetchData)).subscribe();
                        }
                    }
                })
                // deleteReport(report_id);
            }
        })
    }
    const outTeam = (confirmTeam) => {
        console.log(confirmTeam);
        // return;
        const { team_id: quit_id } = confirmTeam;
        // 判断当前团队是否是该用户的私有团队
        const team_id = localStorage.getItem('team_id');
        // const team_item = data.find(item => item.team_id === confirmTeam.team_id);

        // // 当前团队是私有团队, 并且团队的创建者是自己
        // if (team_item.type === 1 && team_item.created_user_id === userId) {
        //     Message('error', '您无法退出自己的私有团队!');
        //     return;
        // }
        const params = {
            team_id: parseInt(quit_id),
        };
        fetchQuitTeam(params).subscribe({
            next: (res) => {
                const { code } = res;
                if (code === 0) {
                    Message('success', t('message.quitSuccess'));
                    const myTeam = data.find(item => item.type === 1 && item.created_user_id === userId);
                    if (quit_id === myTeam.team_id) {
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
                                    Message('error', t('message.checkTeamError'));
                                }
                            },
                        })
                    } else {
                        getUserInfo().pipe(tap(fetchData)).subscribe();
                    }

                } else {
                    Message('error', t('message.quitError'));
                }
            }
        })
    };

    const fetchData = (res) => {
        const { data: { user: { user_id, role_id } } } = res;
        setUserId(user_id);
        setRoleId(role_id);

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
                                handle: item.type === 1 && item.created_user_id === user_id ? ''
                                    : <p style={{ cursor: 'pointer', color: '#f00' }} onClick={() => {
                                        if (item.created_user_id === user_id) {
                                            deleteTeam(teams, item, user_id);
                                        } else {
                                            setConfirmTeam(item);
                                            confirmQuit(item);
                                        }
                                    }}>
                                        {item.created_user_id === user_id ? t('column.teamManage.dissmissTeam') : t('column.teamManage.quitTeam')}
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
            title: t('column.teamManage.teamName'),
            dataIndex: 'name',
            width: 220,
        },
        {
            title: t('column.teamManage.createTime'),
            dataIndex: 'created_time_sec',
            width: 220,
        },
        {
            title: t('column.teamManage.creator'),
            dataIndex: 'created_user_name',
        },
        {
            title: t('column.teamManage.handle'),
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
                    <p className='title'>{t('modal.teamManage')}</p>
                    <Button className='create-team' preFix={<SvgTeam />} onClick={() => setShowCreate(true)}>{t('modal.createTeam')}</Button>
                </div>
            </div>
        )
    }

    console.log(confirmTeam);

    return (
        <div>
            {showInvite && <InvitationModal onCancel={() => setShowInvite(false)} />}
            {showCreate && <CreateTeam onCancel={(e) => {
                setShowCreate(false);
                onCancel();
                if (e) {
                    getUserInfo().pipe(tap(fetchData)).subscribe();
                }
            }} />}
            {/* {showQuit &&
                <Modal
                    visible={true}
                    title="退出团队"
                    content="`确认退出${confirmTeam.name}?`"
                    okText="退出团队"
                    onCancel={() => setShowQuit(false)}
                    onOk={() => outTeam()}
                ></Modal>
            } */}
            <Modal
                className={ProjectMemberModal}
                visible={true}
                title={<HeaderLeft />}
                onCancel={onCancel}
                onOk={onCancel}
                cancelText={t('btn.cancel')}
                okText={t('btn.ok')}
            >
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
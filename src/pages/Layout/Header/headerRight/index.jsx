import React, { useState, useEffect, useRef } from 'react';
import './index.less';
import { Button, Dropdown, Message } from 'adesign-react';
import {
    LogoutRight as SvgLogout,
    InviteMembers as SvgInvite,
    Userhome as SvgUserhome,
    Docs as SvgDocs,
    Customer as SvgCustomer,
    Setting1 as SvgSetting,
    Right as SvgRight,
    Down as SvgDown
} from 'adesign-react/icons';
import avatar from '@assets/logo/avatar.png'
import InvitationModal from '@modals/ProjectInvitation';
import ProjectMember from '@modals/ProjectMember';
import TeamworkLogs from '@modals/TeamworkLogs';
import InfoManage from '@modals/InfoManage';
import SingleUser from './SingleUser';
import { fetchTeamMemberList } from '@services/user';
import { tap } from 'rxjs';
import { useSelector, useDispatch } from 'react-redux';
import { global$ } from '@hooks/useGlobal/global';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';


const HeaderRight = () => {
    const [showModal, setShowModal] = useState(false);
    const [showMember, setMemberModal] = useState(false);
    const [showLog, setShowLog] = useState(false);
    // 个人资料
    const [showInfo, setShowInfo] = useState(false);
    // 切换语言
    const [showLge, setShowLge] = useState(false);
    // 切换主题
    const [showTheme, setShowTheme] = useState(false);
    const [memberList, setMemberList] = useState([]);

    const [outsideClose, setOutsideClose] = useState(true);

    const teamMember = useSelector((store) => store.teams.teamMember);
    const navigate = useNavigate();
    const refDropdown = useRef();
    const refMenu = useRef();
    const dispatch = useDispatch();
    const theme = useSelector((store) => store.user.theme);
    const userInfo = useSelector((store) => store.user.userInfo);

    let { i18n, t } = useTranslation();
    useEffect(() => {
        // global$.next({
        //     action: 'INIT_APPLICATION',
        // });
        // setMemberList()
        // const query = {
        //     team_id: 10
        // }
        // fetchTeamMemberList(query)
        //     .pipe(
        //         tap((res) => {
        //             const { code, data: { members } } = res;
        //             setMemberList(members);
        //             // if (code === 0) {
        //             //     let dataList = [];
        //             //     dataList = members.map((item, index) => {
        //             //         const { avatar, email, nickname, join_time_sec } = item;
        //             //         const userInfo = {
        //             //             avatar,
        //             //             email,
        //             //             nickname
        //             //         }
        //             //         return {
        //             //             member: <MemberInfo userInfo={userInfo}  />,
        //             //             joinTime: dayjs(join_time_sec * 1000).format('YYYY-MM-DD HH:mm:ss'),
        //             //             // invitedBy: '七七',
        //             //             stationType: '读写工位',
        //             //             handle: <p style={{cursor: 'pointer'}} onClick={() => removeMember(item.user_id)}>移除成员</p>,
        //             //         }
        //             //     });
        //             //     setData(dataList);
        //             // }
        //         })
        //     )
        //     .subscribe();
    }, []);

    const RenderMemberList = () => {
        return  (
            // <Dropdown
            //     content={
            //         <div className="online-list">
            //             <SingleUser
            //                 useMsg={item}
            //                 currentUser={item}
            //             ></SingleUser>
            //         </div>
            //     }
            // >
            <Dropdown
                ref={refDropdown}
                placement="bottom-end"
                content={
                    <div className='user-home'>
                        <p className='name'>{ userInfo.nickname }</p>
                        <p className='email'>{ userInfo.email }</p>
                        <Button className='person-page' preFix={<SvgUserhome />} onClick={() => {
                            refDropdown.current.setPopupVisible(false);
                            setShowInfo(true);
                        }}>{ t('header.myInfo') }</Button>
                        <div className='line'></div>
                        <div className='person-drop'>
                            <div className='person-drop-item' onClick={() => {
                                refDropdown.current.setPopupVisible(false);
                            }}>
                                <SvgDocs />
                                <span>{ t('header.doc') }</span>
                            </div>
                            <div className='person-drop-item' onClick={() => {
                                refDropdown.current.setPopupVisible(false);
                            }}>
                                <SvgCustomer />
                                <span>{ t('header.customer') }</span>
                            </div>
                        </div>
                    </div>
                }
            >
                <div>
                    <div className='person-avatar'>
                        <img className='avatar' src={userInfo.avatar || avatar} alt="" />
                    </div>
                </div>
            </Dropdown>
        )
    };

    const changeTheme = (color) => {
        const url = `/skins/${color}.css`;
        document.querySelector(`link[name="apt-template-link"]`).setAttribute('href', url);
        localStorage.setItem('theme_color', color);
        dispatch({
            type: 'user/updateTheme',
            payload: color
        });
        refMenu.current.setPopupVisible(false);
    }

    const MenuList = () => {
        return (
            <div className='menu-list'>
                <div className='menu-list-item' style={{ backgroundColor: showLge ? 'var(--bg-4)' : ''}}>
                   <div className='default' onClick={() => setShowLge(!showLge)}>
                        {
                            showLge ? <SvgDown /> : <SvgRight />
                        }
                        <p>{ t('header.changeLge') }</p>
                   </div>
                    {
                        showLge &&  
                        <div className='drop-content'>
                            <p style={{ color: i18n.language === 'cn' ? 'var(--theme-color)' : ''}} onClick={() => {
                                i18n.changeLanguage('cn');
                                dispatch({
                                    type: 'user/updateLanGuaGe',
                                    payload: 'cn'
                                })
                                refMenu.current.setPopupVisible(false);
                            }}>中文</p>
                            <p style={{ color: i18n.language === 'en' ? 'var(--theme-color)' : '' }} onClick={() => {
                                i18n.changeLanguage('en');
                                dispatch({
                                    type: 'user/updateLanGuaGe',
                                    payload: 'en'
                                })
                                refMenu.current.setPopupVisible(false);
                            }}>English</p>
                        </div>
                    }
                </div>
                <div className='menu-list-item' style={{ backgroundColor: showTheme ? 'var(--bg-4)' : ''}}>
                    <div className='default' onClick={() => setShowTheme(!showTheme)}>
                        {
                            showTheme ? <SvgDown /> : <SvgRight />
                        }
                        <p>{ t('header.changeTheme') }</p>
                    </div>
                    {
                        showTheme &&
                        <div className='drop-content theme'>
                            <p className='theme-white' style={{ border: theme === 'white' ? '1px solid var(--theme-color)' : '' }} onClick={() => changeTheme('white')}></p>
                            <p className='theme-black' style={{ border: theme === 'dark' ? '1px solid var(--theme-color)' : '' }} onClick={() => changeTheme('dark')}></p>
                        </div>
                    }
                </div>
                <div className='menu-list-item'>
                    <div className='default' onClick={() => loginOut()}>
                        <SvgLogout />
                        <p>{ t('header.signOut') }</p>
                    </div>
                </div>
            </div>
        )
    }

    const loginOut = () => {
        localStorage.removeItem('kunpeng-token');
        localStorage.removeItem('expire_time_sec');
        localStorage.removeItem('team_id');
        localStorage.removeItem('settings');
        localStorage.removeItem('open_apis');
        localStorage.removeItem('open_scene');
        navigate('/login');
        Message('success', t('message.quitSuccess'));
    };

    return (
        <div className='header-right'>
            <div className='team-person'>
                <RenderMemberList />
                <div className='person-number' onClick={() => setMemberModal(true)}>
                    <p>{teamMember.length}</p>
                </div>
            </div>
            <Button className='invite' preFix={<SvgInvite />} onClick={() => setShowModal(true)}>{ t('header.invitation') }</Button>
            <div className='more-btn'>
                <Button className='handle-log' onClick={() => setShowLog(true)}>{ t('header.handleLog') }</Button>
                {/* <Button onClick={() => i18n.changeLanguage(i18n.language === 'en' ? 'cn' : 'en')}>中英文切换</Button> */}
                <Dropdown
                    ref={refMenu}
                    placement="bottom-end"
                    content={
                        <div><MenuList /></div>
                    }
                >
                    <Button className='handle-log' preFix={<SvgSetting />}>{ t('header.menu') }</Button>
                </Dropdown>
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
            {
             showInfo && <InfoManage onCancel={() => {
                setShowInfo(false);
             }} />
            }
        </div>
    )
};

export default HeaderRight;
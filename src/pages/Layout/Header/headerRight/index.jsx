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
import SingleUser from './SingleUser';
import { fetchTeamMemberList } from '@services/user';
import { tap } from 'rxjs';
import { useSelector } from 'react-redux';
import { global$ } from '@hooks/useGlobal/global';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';


const HeaderRight = () => {
    const [showModal, setShowModal] = useState(false);
    const [showMember, setMemberModal] = useState(false);
    const [showLog, setShowLog] = useState(false);
    // 切换语言
    const [showLge, setShowLge] = useState(false);
    // 切换主题
    const [showTheme, setShowTheme] = useState(false);
    const [memberList, setMemberList] = useState([]);

    const [outsideClose, setOutsideClose] = useState(true);

    const teamMember = useSelector((store) => store.teams.teamMember);
    const navigate = useNavigate();
    const refDropdown = useRef();

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
        return teamMember.slice(0, 1).map(item => (
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
                        <p className='name'>Frank</p>
                        <p className='email'>17710709463@163.com</p>
                        <Button className='person-page' preFix={<SvgUserhome />} onClick={() => {
                            refDropdown.current.setPopupVisible(false);
                            navigate('/userhome')
                        }}>我的个人主页</Button>
                        <div className='line'></div>
                        <div className='person-drop'>
                            <div className='person-drop-item' onClick={() => {
                                refDropdown.current.setPopupVisible(false);
                            }}>
                                <SvgDocs />
                                <span>实用文档</span>
                            </div>
                            <div className='person-drop-item' onClick={() => {
                                refDropdown.current.setPopupVisible(false);
                            }}>
                                <SvgCustomer />
                                <span>企业专属客服</span>
                            </div>
                        </div>
                    </div>
                }
            >
                <div>
                    <div className='person-avatar'>
                        <img src={item.avatar || avatar} alt="" />
                    </div>
                </div>
            </Dropdown>
        ))
    };

    const MenuList = () => {
        return (
            <div className='menu-list'>
                <div className='menu-list-item'>
                   <div className='default' onClick={() => setShowLge(!showLge)}>
                        {
                            showLge ? <SvgDown /> : <SvgRight />
                        }
                        <p>{ t('header.changeLge') }</p>
                   </div>
                    {
                        showLge &&  
                        <div className='drop-content'>
                            <p style={{ color: i18n.language === 'cn' ? '#EC663C' : ''}} onClick={() => i18n.changeLanguage('cn')}>中文</p>
                            <p style={{ color: i18n.language === 'en' ? '#EC663C' : '' }} onClick={() => i18n.changeLanguage('en')}>English</p>
                        </div>
                    }
                </div>
                <div className='menu-list-item'>
                    <div className='default' onClick={() => setShowTheme(!showLge)}>
                        {
                            showTheme ? <SvgDown /> : <SvgRight />
                        }
                        <p>{ t('header.changeTheme') }</p>
                    </div>
                    {
                        showTheme &&
                        <div className='drop-content theme'>
                            <p className='theme-white'></p>
                            <p className='theme-black'></p>
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
        navigate('/login');
        Message('success', '退出成功!');
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
        </div>
    )
};

export default HeaderRight;
import React, { useState, useRef, useEffect } from "react";
import cn from 'classnames';
import { Link, useLocation } from 'react-router-dom';
import './index.less';
// import { leftBarItems } from './constant';
import { Dropdown, Button } from 'adesign-react';
import {
    Lately as SvgLately,
    Apis as SvgApis,
    Answer as SvgDesign,
    ShareDoc as SvgShare,
    // Processtest as SvgTest,
    Project as SvgProject,
    Doc as SvgDoc,
    Delete as RecycleIcon,
    Setting1 as SvgSetting,
    Right as SvgRight,
    LogoutRight as SvgLogout,
    Down as SvgDown,
    Left as SvgLeft
} from 'adesign-react/icons';
import SvgHome from '@assets/icons/Home';
import SvgScene from '@assets/icons/Scene1';
import SvgPlan from '@assets/icons/Plan1';
import SvgReport from '@assets/icons/Report1';
import SvgMachine from '@assets/icons/Machine';
import SvgPreset from '@assets/icons/Preset';
import SvgTest from '@assets/icons/left-test';
import SvgPer from '@assets/icons/left-performance';
//  import SvgGroup from '@assets/icons/H';

import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Menu } from '@arco-design/web-react';
import { IconApps, IconBug, IconBulb } from '@arco-design/web-react/icon';

const MenuItem = Menu.Item;
const SubMenu = Menu.SubMenu;


const LeftToolbar = () => {
    // let [currentPath, setCurrentPath] = useState(`/${location.hash.split('/')[1]}`);
    const { t, i18n } = useTranslation();
    const refMenu = useRef();
    // 切换语言
    const [showLge, setShowLge] = useState(false);
    // 切换主题
    const [showTheme, setShowTheme] = useState(false);
    const dispatch = useDispatch();
    const theme = useSelector((store) => store.user.theme);
    const [visible, setVisible] = useState(false);
    const [selectKey, setSelectKey] = useState([]);
    const [openKeys, setOpenKeys] = useState([]);
    const location = useLocation();

    console.log(location);

    useEffect(() => {
        let leftBarOpen = sessionStorage.getItem('leftBarOpen');
        if (leftBarOpen) {
            setOpenKeys(JSON.parse(leftBarOpen));
        }
    }, []);

    useEffect(() => {
        const { pathname } = location;
        setSelectKey([`/${pathname.split('/')[1]}`])
    }, [location]);
    const leftBarItems = [
        {
            type: 'index',
            title: t('leftBar.index'),
            icon: SvgHome,
            link: '/index',
        },
        {
            type: 'apis',
            title: t('leftBar.apis'),
            icon: SvgApis,
            link: '/apis',
        },
        {
            type: 'scene',
            title: t('leftBar.scene'),
            icon: SvgScene,
            link: '/scene',
        },
        {
            type: 'plan',
            title: t('leftBar.plan'),
            icon: SvgPlan,
            link: '/plan',
        },
        {
            type: 'report',
            title: t('leftBar.report'),
            icon: SvgReport,
            link: '/report',
        },
        {
            type: 'machine',
            title: t('leftBar.machine'),
            icon: SvgMachine,
            link: '/machine',
        },
        {
            type: 'preset',
            title: t('leftBar.preset'),
            icon: SvgMachine,
            link: '/preset',
        },
        {
            type: 'doc',
            title: t('leftBar.docs'),
            icon: SvgDoc,
            link: '/doc',
        },
    ];

    // const leftBarList = leftBarItems.map((item, index) => (
    //     <React.Fragment key={index}>
    //         {
    //             item.link === '/doc' ? <div
    //                 key={index}
    //                 className='toolbar-item'
    //                 onClick={() => {
    //                     window.open('https://rhl469webu.feishu.cn/docx/Rr0cdBuVUoskdkxE5t6cUo9vnOe', '_blank')
    //                 }}
    //             >
    //                 <item.icon className='svg-item' />
    //                 <span className="item-text">{item.title}</span>
    //             </div>
    //                 : <Link to={item.link}>
    //                     <div
    //                         key={index}
    //                         className={cn('toolbar-item', {
    //                             active: currentPath === item.link,
    //                         })}
    //                         onClick={() => setCurrentPath(item.link)}
    //                     >
    //                         <item.icon className='svg-item' />
    //                         <span className="item-text">{item.title}</span>
    //                     </div>
    //                 </Link>
    //         }
    //     </React.Fragment>
    // ))

    const changeTheme = (color) => {
        const url = `/skins/${color}.css`;
        document.querySelector(`link[name="apt-template-link"]`).setAttribute('href', url);
        localStorage.setItem('theme_color', color);
        dispatch({
            type: 'user/updateTheme',
            payload: color
        });
        if (color === 'dark') {
            document.body.setAttribute('arco-theme', 'dark');
        } else {
            document.body.removeAttribute('arco-theme');
        }
        refMenu.current.setPopupVisible(false);
    }

    const MenuList = () => {
        return (
            <div className='menu-list'>
                <div className='menu-list-item' style={{ backgroundColor: showLge ? 'var(--bg-4)' : '' }}>
                    <div className='default' onClick={() => setShowLge(!showLge)}>
                        {
                            showLge ? <SvgDown /> : <SvgRight />
                        }
                        <p>{t('header.changeLge')}</p>
                    </div>
                    {
                        showLge &&
                        <div className='drop-content'>
                            <p style={{ color: i18n.language === 'cn' ? 'var(--theme-color)' : '' }} onClick={() => {
                                i18n.changeLanguage('cn');
                                dispatch({
                                    type: 'user/updateLanGuaGe',
                                    payload: 'cn'
                                })
                                refMenu.current.setPopupVisible(false);
                            }}>中文</p>
                            <p style={{ color: i18n.language === 'en' ? 'var(--theme-color)' : '', marginTop: '14px' }} onClick={() => {
                                i18n.changeLanguage('en');
                                dispatch({
                                    type: 'user/updateLanGuaGe',
                                    payload: 'en'
                                })
                                console.log(refMenu);
                                refMenu.current.setPopupVisible(false);
                            }}>English</p>
                        </div>
                    }
                </div>
                <div className='menu-list-item' style={{ backgroundColor: showTheme ? 'var(--bg-4)' : '', marginBottom: 0 }}>
                    <div className='default' onClick={() => setShowTheme(!showTheme)}>
                        {
                            showTheme ? <SvgDown /> : <SvgRight />
                        }
                        <p>{t('header.changeTheme')}</p>
                    </div>
                    {
                        showTheme &&
                        <div className='drop-content theme'>
                            <p className='theme-white' style={{ border: theme === 'white' ? '2px solid var(--theme-color)' : '', marginRight: '10px' }} onClick={() => changeTheme('white')}></p>
                            <p className='theme-black' style={{ border: theme === 'dark' ? '2px solid var(--theme-color)' : '' }} onClick={() => changeTheme('dark')}></p>
                        </div>
                    }
                </div>
            </div>
        )
    }

    console.log(refMenu);

    const [collapseStatus, setCollapseStatus] = useState(true);

    return (
        <>
            <div className="left-toolbars">
                {/* {leftBarList} */}
                <div className="collapse-btn" onClick={() => setCollapseStatus(!collapseStatus)}>
                    {
                        collapseStatus ? <SvgRight /> : <SvgLeft />
                    }
                </div>
                {/* 48 */}
                <Menu
                    style={{ width: '170px', paddingBottom: '100px' }}
                    selectedKeys={selectKey}
                    openKeys={openKeys}
                    defaultOpenKeys={openKeys}
                    collapse={!collapseStatus}
                    onClickMenuItem={(k, e, kp) => {
                        console.log(k, e, kp);
                        setSelectKey([k]);

                    }}
                    onClickSubMenu={(k, ok, kp) => {
                        console.log(k, ok, kp)
                        setOpenKeys(ok);
                        sessionStorage.setItem('leftBarOpen', JSON.stringify(ok));

                    }}
                    onCollapseChange={(e) => {
                        console.log(e);
                    }}
                >
                    <Link to="/index">
                        <MenuItem key='/index'><SvgHome className="arco-icon arco-icon-robot" />{t('leftBar.index')}</MenuItem>
                    </Link>
                    <Link to="/apis">
                        <MenuItem key='/apis'><SvgApis className="arco-icon arco-icon-robot" />{t('leftBar.apis')}</MenuItem>
                    </Link>
                    <Link to="/scene">
                        <MenuItem key='/scene'><SvgScene className="arco-icon arco-icon-robot" />{t('leftBar.scene')}</MenuItem>
                    </Link>
                    <SubMenu
                        key='1'
                        selectable
                        title={
                            <div className="sub-menu-title">
                                <SvgPer className="arco-icon arco-icon-robot" />{t('leftBar.performance')}
                            </div>
                        }
                    >

                        <Link to="/plan">
                            <MenuItem className="sub-item" key='/plan'>{t('leftBar.plan')}</MenuItem>
                        </Link>
                        <Link to="/report">
                            <MenuItem className="sub-item" key='/report'>{t('leftBar.report')}</MenuItem>
                        </Link>
                    </SubMenu>
                    <SubMenu
                        key='2'
                        selectable
                        title={
                            <div className="sub-menu-title">
                                <SvgTest className="arco-icon arco-icon-robot" />{t('leftBar.test')}
                            </div>
                        }
                    >
                        <Link to="/testPlan">
                            <MenuItem className="sub-item" key='/testPlan'>{t('leftBar.plan')}</MenuItem>
                        </Link>
                        <Link to="/testReport">
                            <MenuItem className="sub-item" key='/testReport'>{t('leftBar.report')}</MenuItem>
                        </Link>
                    </SubMenu>

                    <Link to="/preset">
                        <MenuItem key='/preset'><SvgPreset className="arco-icon arco-icon-robot" />{t('leftBar.preset')}</MenuItem>
                    </Link>
                    <Link to="/machine">
                        <MenuItem key='/machine'><SvgMachine className="arco-icon arco-icon-robot" />{t('leftBar.machine')}</MenuItem>
                    </Link>
                    <MenuItem onClick={() => {
                        window.open('https://rhl469webu.feishu.cn/docx/Rr0cdBuVUoskdkxE5t6cUo9vnOe', '_blank')
                    }} key='/doc'><SvgDoc className="arco-icon arco-icon-robot" />{t('leftBar.docs')}</MenuItem>
                </Menu>
                <Dropdown
                    ref={refMenu}
                    placement="top-left"
                    onVisibleChange={setVisible}
                    content={
                        <div><MenuList /></div>
                    }
                >
                    <div className={cn('left-settings', { 'menu-list-active': visible })}>
                        <SvgSetting />
                        <p>{t('header.menu')}</p>
                    </div>
                </Dropdown>
            </div>
        </>
    )
};

export default LeftToolbar;
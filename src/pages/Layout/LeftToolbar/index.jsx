import React, { useState } from "react";
import cn from 'classnames';
import { Link } from 'react-router-dom';
import './index.less';
// import { leftBarItems } from './constant';

import { 
    Lately as SvgLately, 
    Apis as SvgApis, 
    Answer as SvgDesign, 
    ShareDoc as SvgShare, 
    Processtest as SvgTest, 
    Project as SvgProject, 
    Doc as SvgDoc, 
    Delete as RecycleIcon
 } from 'adesign-react/icons';
 import SvgHome from '@assets/icons/Home';
 import SvgScene from '@assets/icons/Scene1';
 import SvgPlan from '@assets/icons/Plan1';
 import SvgReport from '@assets/icons/Report1';
 import SvgMachine from '@assets/icons/Machine';
//  import SvgGroup from '@assets/icons/H';

import { useTranslation } from 'react-i18next';


const LeftToolbar = () => {
    let [currentPath, setCurrentPath] = useState(`/${location.hash.split('/')[1]}`);
    const { t } = useTranslation();

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
            type: 'doc',
            title: t('leftBar.docs'),
            icon: SvgDoc,
            link: '/doc',
        },
    ];

    const leftBarList = leftBarItems.map((item, index) => (
        <React.Fragment key={index}>
            <Link to={item.link}>
                <div
                    key={index}
                    className={cn('toolbar-item', {
                        active: currentPath === item.link,
                    })}
                    onClick={() => setCurrentPath(item.link)}
                >
                    <item.icon className='svg-item' />
                    <span className="item-text">{item.title}</span>
                </div>
            </Link>
        </React.Fragment>
    ))

    return (
        <>
            <div className="left-toolbars">{leftBarList}</div>
        </>
    )
};

export default LeftToolbar;
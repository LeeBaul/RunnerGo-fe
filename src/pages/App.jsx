import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { RoutePages } from './routes';
import Header from './Layout/Header';
import LeftToolbar from './Layout/LeftToolbar';

import useGlobal from './hooks/useGlobal';
import useAsyncTask from './hooks/useAsyncTask';
import '@utils/apconfigstore';
import useApt from './hooks/useApt';
import GlobalModule from './globalModule';
import DebugPanel from './debug';
import { getCookie } from '@utils';

const App = () => {
    // 精简模式
    const { SYSCOMPACTVIEW } = useSelector((store) => store.user.config);

    const location = useLocation();
    const [showLayout, setLayout] = useState(false);

    const ignorePage = ['/login', '/register', '/find']

    useEffect(() => {
        // const token = getCookie('token');
        // const expire_time_sec = localStorage.getItem('expire_time_sec');
        // const isExpire = new Date().getTime() > parseInt(expire_time_sec)
        // if (!token || isExpire) {
        //     window.location.href = '/login';
        // }
        // console.log(location);
        if (!ignorePage.includes(location.pathname)) {
            setLayout(true)
        } else if (showLayout) {
            setLayout(false);
            window.team_id = undefined;
        }
    }, [location.pathname])

    useGlobal(null);
    useAsyncTask(); // 使用异步任务
    useApt();
    
    return (
        <>
            { showLayout && <Header /> }
            <div className='section-page'>
                { showLayout && <LeftToolbar /> }
                <div className='main-page'>
                    <Routes>
                        {RoutePages.map((d) => (
                            <Route key={d.name} path={d.path} element={<d.element />}></Route>
                        ))}
                        <Route path='/' element={<Navigate to="login" />} />
                    </Routes>
                </div>
            </div>
        </>
    )
};

export default App;
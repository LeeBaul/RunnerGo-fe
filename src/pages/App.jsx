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
import { Message } from 'adesign-react';
import { useNavigate } from 'react-router-dom'

const App = () => {
    // 精简模式
    const { SYSCOMPACTVIEW } = useSelector((store) => store.user.config);
    const navigate = useNavigate();

    const location = useLocation();
    const [showLayout, setLayout] = useState(false);

    const ignorePage = ['/login', '/register', '/find']

    useEffect(() => {
        const token = getCookie('token');
        const expire_time_sec = localStorage.getItem('expire_time_sec');
        const isExpire = new Date().getTime() > parseInt(expire_time_sec || 0);
        // if (!token || isExpire) {
        //     window.location.href = '/login';
        // }

        if (!ignorePage.includes(location.pathname)) {
            setLayout(true);
            if (isExpire) {
                // window.location.href = '/login';
                navigate('/login');
                Message('error', '请登录!')
            }
        } else {
            setLayout(false);
            // sessionStorage.removeItem('team_id');
            if (!isExpire) {
                // if (window.location.pathname !== location.pathname) {
                // window.location.href = '/index';
                navigate('/index');
                // }
            }
        }
    }, [location.pathname])

    useGlobal(null);
    useAsyncTask(); // 使用异步任务
    useApt();
    return (
        <>
            <Routes>
                {RoutePages.map((d) => (
                    <Route key={d.name} path={d.path} element={<d.element />}></Route>
                ))}
                <Route path='/' element={<Navigate to="login" />} />
            </Routes>
        </>
    )
};

export default App;
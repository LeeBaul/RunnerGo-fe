import React, { useEffect } from 'react';
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

    useEffect(() => {
        // const token = getCookie('token');
        // const expire_time_sec = localStorage.getItem('expire_time_sec');
        // const isExpire = new Date().getTime() > parseInt(expire_time_sec)
        // if (!token || isExpire) {
        //     window.location.href = '/login';
        // }
        
    }, [location.pathname])

    useGlobal(null);
    useAsyncTask(); // 使用异步任务
    useApt();
    
    return (
        <>
            { !(SYSCOMPACTVIEW > 0) && <Header /> }
            <div className='section-page'>
                { !(SYSCOMPACTVIEW > 0) && <LeftToolbar /> }
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
import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { RoutePages } from './routes';
import Header from './Layout/Header';
import LeftToolbar from './Layout/LeftToolbar';

import useGlobal from './hooks/useGlobal';
import useAsyncTask from './hooks/useAsyncTask';
import '@utils/apconfigstore';
import useApt from './hooks/useApt';
import GlobalModule from './globalModule';
import DebugPanel from './debug';

const App = () => {
    // 精简模式
    const { SYSCOMPACTVIEW } = useSelector((store) => store.user.config);

    useGlobal(null);
    useAsyncTask(); // 使用异步任务
    useApt();
    
    return (
        <BrowserRouter>
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
        </BrowserRouter>
    )
};

export default App;
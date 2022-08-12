import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { RoutePages } from './routes';
import Header from './Layout/Header';
import LeftToolbar from './Layout/LeftToolbar';

const App = () => {
    // 精简模式
    const { SYSCOMPACTVIEW } = useSelector((store) => store.user.config);
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
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import LogoSvg from '@assets/login/logo.svg';
import BannerSvg from '@assets/login/banner.svg';
import LoginBox from './login';
import RegisterBox from './register';

import { LoginWrapper } from './style';
import { cloneDeep } from 'lodash';

const Login = (props) => {
    const { children } = props;
    const dispatch = useDispatch();
    const config = useSelector((store) => store.user.config);
    useEffect(() => {
        const newConfig = cloneDeep(config);
        newConfig.SYSCOMPACTVIEW = 1;
        dispatch({
            type: 'user/updateConfig',
            payload: newConfig
        });
    }, []);

    const contentRender = () => {
        return (
            <Routes>
                <Route path="login" element={<LoginBox />}></Route>
                <Route path="register" element={<RegisterBox />}></Route>
            </Routes>
        )
    }

    return (
        <LoginWrapper>
            <div className='left'>
                <div>
                    <div className='logo-box'>
                        <LogoSvg />
                        <div className='app-version'>内测版v6.3</div>
                    </div>
                    <div className='title'>鲲鹏性能测试平台</div>
                    <div className='desc'>新一代jmeter测试工具</div>
                    <BannerSvg />
                </div>
            </div>
            <div className='right'>
                { children }
            </div>
        </LoginWrapper>
    )
};

export default Login;
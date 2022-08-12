import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import LogoSvg from '@assets/login/logo.svg';
import BannerSvg from '@assets/login/banner.svg';
import LoginBox from './login';

import { LoginWrapper } from './style';
import { cloneDeep } from 'lodash';

const Login = () => {
    const dispatch = useDispatch();
    const config = useSelector((store) => store.user.config);
    useEffect(() => {
        const newConfig = cloneDeep(config);
        newConfig.SYSCOMPACTVIEW = 1;
        dispatch({
            type: 'user/updateConfig',
            payload: newConfig
        });
    }, [])
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
                <LoginBox />
            </div>
        </LoginWrapper>
    )
};

export default Login;
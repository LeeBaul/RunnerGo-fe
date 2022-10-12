import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import LogoSvg from '@assets/login/logo.svg';
import BannerSvg from '@assets/login/banner.svg';
import LoginBox from './login';
import RegisterBox from './register';

import { LoginWrapper } from './style';
import { cloneDeep } from 'lodash';
import { useTranslation } from 'react-i18next';

const Login = (props) => {
    const { children } = props;
    const dispatch = useDispatch();
    const config = useSelector((store) => store.user.config);
    const [leftShow, setLeftShow] = useState(true);
    const { t } = useTranslation();
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
    };

    const onWindowResize = ({ currentTarget }) => {
        if (currentTarget.innerWidth < 1100) {
            setLeftShow(false);
        } else {
            setLeftShow(true);
        }
    };

    useEffect(() => {
        window.addEventListener('resize', onWindowResize);
        const firstSize = window.innerWidth;
        if (firstSize < 1100) {
            setLeftShow(false);
        } else {
            setLeftShow(true);
        };

        return () => {
            window.removeEventListener('resize', onWindowResize);
        }
    }, []);

    return (
        <LoginWrapper>
            {
                leftShow && <div className='left'>
                <div>
                    <div className='logo-box'>
                        <LogoSvg />
                    </div>
                    <div className='title'>{ t('sign.title') }</div>
                    <div className='desc'>{ t('sign.slogn') }</div>
                    <BannerSvg width="562" height="345" />
                </div>
            </div>
            }
            <div className='right'>
                { children }
            </div>
        </LoginWrapper>
    )
};

export default Login;
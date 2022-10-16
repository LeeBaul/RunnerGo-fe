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

import SvgLogo1 from '@assets/logo/runner_dark';
import SvgLogo2 from '@assets/logo/runner_white';

const Login = (props) => {
    const { children } = props;
    const dispatch = useDispatch();
    const config = useSelector((store) => store.user.config);
    const theme = useSelector((store) => store.user.theme);
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
                        {
                            theme === 'dark' ? <SvgLogo1 className="logo" /> : <SvgLogo2 className="logo" />
                        }
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
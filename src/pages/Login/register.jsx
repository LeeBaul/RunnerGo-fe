import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode.react';
import cn from 'classnames';
import { from } from 'rxjs';
import { tap, filter, map } from 'rxjs/operators';
import { Input, Button, CheckBox, Message, Select } from 'adesign-react';
import WxiconSvg from '@assets/login/wxicon.svg';
import logoImg from '@assets/logo/qrlogo.png';
import { openUrl, saveLocalData, EamilReg } from '@utils';
import { FE_BASEURL } from '@config/index';
import getVcodefun from '@utils/getVcode';
import {
    fetchUserLoginForEmailRequest,
    fetchUserRegisterForEmailRequest,
    fetchGetWxCodeRequest,
    fetchCheckUserWxCodeRequest
} from '@services/user';

import { global$ } from '@hooks/useGlobal/global';
import qs from 'qs';

const { Option } = Select;


import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { cloneDeep } from 'lodash';
import { useTranslation } from 'react-i18next';


let wxCodeTimer;

const RegisterBox = (props) => {
    const { onCancel } = props;
    const navigate = useNavigate();
    const [panelType, setPanelType] = useState('email');
    // 邮箱
    const [email, setEmail] = useState('');
    // 密码
    const [password, setPassword] = useState('');
    // 确认密码
    const [repeat_password, setRepeatPassword] = useState('');
    // 昵称
    const [nickname, setNickname] = useState('');
    const [checked, setchecked] = useState('checked');
    // 微信二维码超时
    const [timeOver, setTimeOver] = useState(false);
    const [WxUrl, setWxUrl] = useState('');
    // 极验验证码
    const [vcodeObj, setVcodeObj] = useState({});
    const [captchaObj, setCaptchaObj] = useState(null);
    const [emailError, setEmailError] = useState(false);
    const [nameError, setNameError] = useState(false);
    const [pwdDiff, setPwdDiff] = useState(false);
    const [pwdError, setPwdError] = useState(false);

    const { t, i18n } = useTranslation();
    const { search } = useLocation();
    const { role_id, team_id } = qs.parse(search.slice(1));
    // 获取极验内容
    const getVcodeUrl = async () => {
        const { result, captcha } = await getVcodefun();
        setVcodeObj(result);
        setCaptchaObj(captcha);
    };

    useEffect(() => {
        if (panelType === 'email') {
            getVcodeUrl();
            clearInterval(wxCodeTimer);
            if (localStorage.getItem('userInfo')) {
                try {
                    const userObj = JSON.parse(localStorage.getItem('userInfo') || '{}');
                    if (userObj?.email && userObj?.password) {
                        setEmail(userObj.email);
                        setPassword(userObj.password);
                    }
                } catch (error) {
                }
            }
        } else if (panelType === 'wxCode') {
            from(fetchGetWxCodeRequest({}))
                .pipe(
                    filter((resp) => resp.code === 10000),
                    map((resp) => resp.data),
                    tap((data) => {
                        setWxUrl(data?.url);
                    }),
                    tap((data) => {
                        const { ticket, sweep_token: sweepToken } = data || {};
                        wxCodeTimer = setInterval(() => {
                            from(
                                fetchCheckUserWxCodeRequest({
                                    ticket,
                                    sweep_token: sweepToken,
                                })
                            )
                                .pipe(
                                    filter((res) => res.code === 10000),
                                    tap((res) => {
                                        clearInterval(wxCodeTimer);
                                        saveLocalData(res.data);
                                        onCancel();
                                    }),
                                    tap(() => {
                                        global$.next({
                                            action: 'INIT_APPLICATION',
                                        });
                                    })
                                )
                                .subscribe();
                        }, 2000);
                    })
                )
                .subscribe();
        }
        return () => clearInterval(wxCodeTimer);
    }, [panelType]);

    // 渲染微信板块
    const renderWX = () => (
        <>
            <div className="login_wx">
                <div className="login_round">
                    {WxUrl ? (
                        <div style={timeOver ? { filter: 'blur(5px)' } : {}}>
                            <QRCode
                                value={WxUrl}
                                size={192}
                                imageSettings={{
                                    src: logoImg,
                                    x: null,
                                    y: null,
                                    height: 50,
                                    width: 50,
                                    excavate: true,
                                }}
                            />
                        </div>
                    ) : null}
                    {timeOver ? (
                        <div className="time_over">
                            <Button type="primary" size="small">
                                刷新
                            </Button>
                        </div>
                    ) : null}
                </div>
            </div>
        </>
    );

    const registerNow = () => {
        if (Object.keys(vcodeObj).length === 0) {
            return Message('error', t('message.check'));
        }
        if (emailError || nameError || pwdDiff || pwdError || checked === 'uncheck') {
            return;
        }
        fetchUserRegisterForEmailRequest({
            email,
            password,
            repeat_password,
            nickname
        })
            .pipe(
                tap((resp) => {
                    const { data: { token, expire_time_sec }, code } = resp;
                    if (code === 0) {
                        // localStorage.setItem('token', token);
                        // localStorage.setItem('expire_time_sec', expire_time_sec * 1000);
                        Message('success', t('message.registerSuccess'));
                        if (role_id) {
                            navigate(`/login?role_id=${role_id}&team_id=${team_id}`)
                        } else {
                            navigate('/login')
                        }

                    }
                    // if (resp.code !== 10000) {
                    //     captchaObj && captchaObj?.destroy();
                    //     getVcodeUrl();
                    //     setVcodeObj({});
                    //     setCaptchaObj(null);
                    // }
                }),
                filter((resp) => resp.code === 10000),
                map((resp) => resp.data),
                tap((userData) => {
                    saveLocalData(userData);
                    // 关闭弹窗
                    onCancel();
                }),
                tap(() => {
                    global$.next({
                        action: 'INIT_APPLICATION',
                    });
                })
            )
            .subscribe();
    };

    const submit = () => {
        const newConfig = cloneDeep(config);
        newConfig.SYSCOMPACTVIEW = -1;
        dispatch({
            type: 'user/updateConfig',
            payload: newConfig
        })
        navigate('/index');
    }

    const checkEmail = () => {
        console.log(email, EamilReg(email))
        if (!EamilReg(email)) {
            setEmailError(true);
        } else {
            setEmailError(false);
        }
    }

    const checkName = () => {
        if (nickname.length < 2) {
            setNameError(true);
        } else {
            setNameError(false);
        }
    }

    const checkPwd = () => {
        if (password !== repeat_password) {
            setPwdDiff(true);
        } else {
            setPwdDiff(false);
        }
    }

    const openHtml = (name) => {
        const hrefStr = window.location.href;
        const urlParams = new URL(hrefStr);
        const rootPath = urlParams.origin;
        window.open(`${rootPath}/${name}.html`, '_blank');
    }

    return (
        <div className="right-wrapper">
            <div className="title item">
                <p>{t('sign.email_register')}</p>
                <Select value={i18n.language} onChange={(e) => i18n.changeLanguage(e)}>
                    <Option value="cn">中文</Option>
                    <Option value="en">English</Option>
                </Select>
            </div>
            {panelType === 'email' ? (
                <div>
                    <div className={cn('item', { 'input-error': emailError })}>
                        <Input
                            placeholder={t('placeholder.email')}
                            value={email}
                            onChange={(value) => {
                                setEmail(value);
                            }}
                            onBlur={() => checkEmail()}
                        />
                        {emailError && <p className='error-tips'>{t('sign.errorEmail')}</p>}
                    </div>
                    <div className="item">
                        <Input
                            type="password"
                            placeholder={t('placeholder.password')}
                            value={password}
                            onChange={(value) => {
                                setPassword(value);
                            }}
                            onBlur={() => {
                                if (password.length < 6) {
                                    setPwdError(true);
                                } else {
                                    setPwdError(false);
                                }
                            }}
                        />
                        {pwdError && <p className='error-tips'>{t('sign.passwordError')}</p>}
                    </div>
                    <div className={cn('item', { 'input-error': pwdDiff })}>
                        <Input
                            type="password"
                            placeholder={t('placeholder.confirmPwd')}
                            value={repeat_password}
                            onChange={(value) => {
                                setRepeatPassword(value);
                            }}
                            onBlur={() => checkPwd()}
                        />
                        {pwdDiff && <p className='error-tips'>{t('sign.confirmError')}</p>}
                    </div>
                    <div className={cn('item', { 'input-error': nameError })}>
                        <Input
                            placeholder={t('placeholder.nickname')}
                            value={nickname}
                            onChange={(value) => {
                                setNickname(value);
                            }}
                            onBlur={() => checkName()}
                        />
                        {nameError && <p className='error-tips'>{t('sign.nicknameError')}</p>}
                    </div>
                    <div className="item">
                        <div id="captcha"></div>
                    </div>
                    <div className='item' style={{ flexDirection: 'row', height: 'auto', marginBottom: '24px', alignItems: 'center' }}>
                        <CheckBox
                            checked={checked}
                            onChange={(check) => {
                                console.log(check);
                                setchecked(check);
                            }}
                        />
                        <p className='agreement'>{ t('sign.read') }<span onClick={() => openHtml('ServiceAgreement')}> { t('sign.service') } </span>{ t('sign.and') }<span onClick={() => openHtml('PrivacyAgreement')}> { t('sign.privacy') } </span></p>
                    </div>
                    <div className="item">
                        <Button
                            type="primary"
                            className="modal-userreg-btn apipost-blue-btn"
                            size="large"
                            style={{ width: '100%', fontSize: '14px' }}
                            onClick={registerNow}
                        >
                            {t('btn.registerNow')}
                        </Button>
                    </div>
                    <div className="login-have" onClick={() => {
                        if (role_id) {
                            navigate(`/login?role_id=${role_id}&team_id=${team_id}`)
                        } else {
                            navigate('/login')
                        }
                    }}>
                        {t('sign.tologin')}
                    </div>
                </div>
            ) : (
                <div className="qr-code">
                    {renderWX()}
                </div>
            )}
        </div>
    );
};

export default RegisterBox;

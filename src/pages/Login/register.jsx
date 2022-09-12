import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode.react';
import cn from 'classnames';
import { from } from 'rxjs';
import { tap, filter, map } from 'rxjs/operators';
import { Input, Button, CheckBox, Message } from 'adesign-react';
import WxiconSvg from '@assets/login/wxicon.svg';
import logoImg from '@assets/logo/qrlogo.png';
import { openUrl, saveLocalData } from '@utils';
import { FE_BASEURL } from '@config/index';
import getVcodefun from '@utils/getVcode';
import {
    fetchUserLoginForEmailRequest,
    fetchUserRegisterForEmailRequest,
    fetchGetWxCodeRequest,
    fetchCheckUserWxCodeRequest
} from '@services/user';

import { global$ } from '@hooks/useGlobal/global';


import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { cloneDeep } from 'lodash';


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
                    // console.log(error);
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
            return Message('error', '请进行验证');
        }
        fetchUserRegisterForEmailRequest({
            email,
            password,
            repeat_password,
            nickname
        })
            .pipe(
                tap((resp) => {
                    // console.log(resp);
                    const { data: { token, expire_time_sec }, code } = resp;
                    if (code === 0) {
                        // localStorage.setItem('token', token);
                        // localStorage.setItem('expire_time_sec', expire_time_sec * 1000);
                        Message('success', '注册成功!');
                        navigate('/login');

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
                    // console.log(userData);
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

    return (
        <div className="right-wrapper">
            <div className="title item">
                <div className="tabs">
                    <div
                        className={cn({ 'tabs-item': true, active: panelType === 'email' })}
                        onClick={() => {
                            //   getVcodeUrl();
                            setPanelType('email');
                        }}
                    >
                        邮箱注册
                    </div>
                    <div
                        className={cn({ 'tabs-item': true, active: panelType === 'wxCode' })}
                        onClick={() => {
                            setPanelType('wxCode');
                        }}
                    >
                        <WxiconSvg />
                        &nbsp;微信注册
                    </div>
                </div>
            </div>
            {panelType === 'email' ? (
                <div>
                    <div className="item">
                        <Input
                            placeholder="请输入邮箱地址"
                            value={email}
                            onChange={(value) => {
                                setEmail(value);
                            }}
                        />
                    </div>
                    <div className="item">
                        <Input
                            type="password"
                            placeholder="请输入密码"
                            value={password}
                            onChange={(value) => {
                                setPassword(value);
                            }}
                        />
                    </div>
                    <div className="item">
                        <Input
                            type="password"
                            placeholder="请确认密码"
                            value={repeat_password}
                            onChange={(value) => {
                                setRepeatPassword(value);
                            }}
                        />
                    </div>
                    <div className="item">
                        <Input
                            placeholder="请输入昵称"
                            value={nickname}
                            onChange={(value) => {
                                setNickname(value);
                            }}
                        />
                    </div>
                    <div className="item">
                        <div id="captcha"></div>
                    </div>
                    <div className="item">
                        <Button
                            type="primary"
                            className="modal-userreg-btn apipost-blue-btn"
                            size="large"
                            style={{ width: '100%' }}
                            onClick={registerNow}
                        >
                            立即注册
                        </Button>
                    </div>
                    <div className="login-have" onClick={() => navigate('/login')}>
                        登录已有账号
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

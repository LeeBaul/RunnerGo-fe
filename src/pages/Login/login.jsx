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
  fetchGetWxCodeRequest,
  fetchCheckUserWxCodeRequest
} from '@services/user';

import { global$ } from '@hooks/useGlobal/global';


import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { cloneDeep } from 'lodash';


let wxCodeTimer;

const LoginBox = (props) => {
  const { onCancel } = props;
  const navigate = useNavigate();
  const [panelType, setPanelType] = useState('email');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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

  const loginNow = () => {
    if (Object.keys(vcodeObj).length === 0) {
      return Message('error', '请进行验证');
    }
    try {
      // 记住密码
      localStorage.setItem('userInfo', JSON.stringify({ email, password }));
    } catch (err) {
      // console.log(err);
    }
    fetchUserLoginForEmailRequest({
      email,
      password,
      expiry_date: checked === 'checked' ? 30 : 0,
      captcha: vcodeObj,
    })
      .pipe(
        tap((resp) => {
          if (resp.code !== 10000) {
            captchaObj && captchaObj?.destroy();
            getVcodeUrl();
            setVcodeObj({});
            setCaptchaObj(null);
          }
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
            邮箱登录
          </div>
          <div
            className={cn({ 'tabs-item': true, active: panelType === 'wxCode' })}
            onClick={() => {
              console.log(123123123);
              setPanelType('wxCode');
            }}
          >
            <WxiconSvg />
            &nbsp;微信登录
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
            <Button
              type="primary"
              className="modal-userreg-btn apipost-blue-btn"
              size="large"
              style={{ width: '100%' }}
              onClick={loginNow}
            >
              立即登录
            </Button>
          </div>
          <div className="remeber">
            <div className="remeber-left">
              <CheckBox
                checked={checked}
                onChange={(check) => {
                  setchecked(check);
                }}
              />{' '}
              30天内免登录
            </div>
            <div
              className="forget"
              onClick={() => navigate('/find')}
            >
              忘记密码
            </div>
          </div>
          <div
            className="resign"
            onClick={() => navigate('/register')}
          >
            <span>没有账号，立即注册&gt;</span>
          </div>
        </div>
      ) : (
        <div className="qr-code">
          {renderWX()}
          <div
            className="wx-tips"
            onClick={() => navigate('/register')}
          >
              注册新用户
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginBox;

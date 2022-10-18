import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode.react';
import cn from 'classnames';
import { from, of } from 'rxjs';
import { tap, filter, map, concatMap } from 'rxjs/operators';
import { Input, Button, CheckBox, Message, Select } from 'adesign-react';
import WxiconSvg from '@assets/login/wxicon.svg';
import logoImg from '@assets/logo/qrlogo.png';
import { openUrl, saveLocalData, setCookie, EamilReg } from '@utils';
import { FE_BASEURL } from '@config/index';
import getVcodefun from '@utils/getVcode';
import {
  fetchUserLoginForEmailRequest,
  fetchGetWxCodeRequest,
  fetchCheckUserWxCodeRequest,
  fetchUserConfig,
  fetchOpenLink
} from '@services/user';
import Bus from '@utils/eventBus';

import { global$ } from '@hooks/useGlobal/global';
import { getUserConfig$ } from '@rxUtils/user';


import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { cloneDeep } from 'lodash';

import { useTranslation } from 'react-i18next';
import qs from 'qs';

const { Option } = Select;

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
  const [emailError, setEmailError] = useState(false);
  // 获取用户全局配置
  const config = useSelector((store) => store.user.config);
  const dispatch = useDispatch();


  const { i18n, t } = useTranslation();

  const { search } = useLocation();
  const { report_id, role_id, team_id: url_team_id } = qs.parse(search.slice(1));

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
                    // global$.next({
                    //   action: 'INIT_APPLICATION',
                    // });
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
      return Message('error', t('message.check'));
    }
    if (emailError) {
      return;
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
      is_auto_login: checked === 'checked',
      // captcha: vcodeObj,
    })
      .pipe(
        concatMap(({ data, code }) => {
          if (code === 20004) {
            Message('error', '用户名或密码错误!');
            return;
          }
          saveLocalData(data);
          localStorage.setItem('expire_time_sec', data.expire_time_sec * 1000);
          localStorage.setItem('kunpeng-token', data.token);
          Message('success', t('message.loginSuccess'));
          // setCookie('token', userData.token);

          return getUserConfig$();

          // return global$.next({
          //   action: 'INIT_APPLICATION',
          // });
        }),
        concatMap(({ data }) => {
          const team_id = data.settings.current_team_id;
          localStorage.setItem('team_id', team_id);
          dispatch({
            type: 'user/updateTeamId',
            payload: team_id
          });

          if (report_id) {
            navigate(`/report/detail?id=${report_id}`);
          } else if (role_id) {
            const params ={
              role_id: parseInt(role_id),
              team_id: parseInt(url_team_id)
            };
            fetchOpenLink(params).subscribe({
              next: (res) => {
                const { code } = res;
                if (code === 0) {
                  getUserConfig$().pipe(
                    tap(res => {
                      const team_id = res.data.settings.current_team_id;
                      localStorage.setItem('team_id', team_id);
                      dispatch({
                        type: 'user/updateTeamId',
                        payload: team_id
                      });
                      console.log(team_id);
                      navigate('/index');
                    })
                  )
                }
              }
            })
          } else  {
            navigate('/index'); 
          }
          global$.next({ 
            action: 'INIT_APPLICATION',
          });
        }),
        tap(() => {
        })
        // tap(() => {
        //   navigate('/index')
        // })


        // tap((resp) => {
        //   if (resp.code !== 10000) {
        //     captchaObj && captchaObj?.destroy();
        //     getVcodeUrl();
        //     setVcodeObj({});
        //     setCaptchaObj(null);
        //   }
        // }),
        // // filter((resp) => resp.code === 10000),
        // map((resp) => resp.data),
        // tap((userData) => {
        //   saveLocalData(userData);
        //   localStorage.setItem('expire_time_sec', userData.expire_time_sec * 1000);
        //   Message('success', '登录成功!');

        //   // Bus.$emit('getUserConfig');

        //   // const newConfig = cloneDeep(config);
        //   // newConfig.SYSCOMPACTVIEW = -1;
        //   // dispatch({
        //   //   type: 'user/updateConfig',
        //   //   payload: newConfig
        //   // });
        // global$.next({
        //   action: 'INIT_APPLICATION',
        // });

        //   // 关闭弹窗
        //   // onCancel();
        // }),
        // tap(() => {

        //   // fetchUserConfig().pipe(
        //   //     tap((res) => {
        //   //     })
        //   // )
        //   // let timer = null;
        //   // timer = setInterval(() => {
        //   //   if (sessionStorage.getItem('team_id')) {
        //   //     navigate('/index');
        //   //     clearInterval(timer);
        //   //   }
        //   // }, 100);
        // }),
        // concatMap(() => {
        //   fetchUserConfig().pipe(
        //     tap((res) => {
        //     })
        //   )
        // }),
        // tap(() => {
        //   navigate('/index');
        // })
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
    if (!EamilReg(email)) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }
  }

  return (
    <div className="right-wrapper">
      <div className="title item">
        {/* <div className="tabs">
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
              setPanelType('wxCode');
            }}
          >
            <WxiconSvg />
            &nbsp;微信登录
          </div>
        </div> */}
        <p>{ t('sign.email_login') }</p>
        <Select value={ i18n.language } onChange={(e) => i18n.changeLanguage(e)}>
          <Option value="cn">中文</Option>
          <Option value="en">English</Option>
        </Select>
      </div>
      {panelType === 'email' ? (
        <div>
          <div className={ cn('item', { 'input-error': emailError }) }>
            <Input
              placeholder={ t('placeholder.email') }
              value={email}
              onChange={(value) => {
                setEmail(value);
              }}
              onBlur={() => checkEmail()}
            />
            { emailError && <p className='error-tips'>{ t('sign.errorEmail') }</p> }
          </div>
          <div className="item">
            <Input
              type="password"
              placeholder={ t('placeholder.password') }
              value={password}
              onChange={(value) => {
                setPassword(value);
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
              onClick={loginNow}
            >
              { t('btn.loginNow') }
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
              { t('sign.nologin') }
            </div>
            <div
              className="forget"
              onClick={() => navigate('/find')}
            >
              { t('sign.forgetPwd') }
            </div>
          </div>
          <div
            className="resign"
            onClick={() => {
              if (role_id) {
                navigate(`/register?role_id=${role_id}}&team_id=${url_team_id}`)
              } else {
                navigate('/register')
              }
            }}
          >
            <span>{ t('sign.toRegister') }&gt;</span>
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

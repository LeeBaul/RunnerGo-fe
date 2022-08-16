import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { cloneDeep } from 'lodash';
import QRCode from 'qrcode.react';
import cn from 'classnames';
import { Input, Button } from 'adesign-react';
import WxiconSvg from '@assets/login/wxicon.svg';
import logoImg from '@assets/logo/qrlogo.png';
// import getVcodefun from '@utils/getVcode';
// import { isElectron } from '@utils';

const LoginBox = (props) => {
  const [panelType, setPanelType] = useState('email');

  // 微信二维码超时
  const [timeOver, setTimeOver] = useState(false);
  const [WxUrl, setWxUrl] = useState('');

  const [vcodeObj, setVcodeObj] = useState({});
  const [captchaObj, setCaptchaObj] = useState(null);

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const config = useSelector((store) => store.user.config);

  // 获取极验内容
//   const getVcodeUrl = async () => {
//     const { result, captcha } = await getVcodefun();
//     setVcodeObj(result);
//     setCaptchaObj(captcha);
//   };
//   useEffect(() => {
//     getVcodeUrl();
//   }, []);

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
            <Input placeholder="请输入邮箱地址" />
          </div>
          <div className="item">
            <Input placeholder="请输入密码" />
          </div>
          {/* {isElectron() ? (
            ''
          ) : (
            <div className="item">
              <div id="captcha"></div>
            </div>
          )} */}
          <div className="item">
            <Button
              type="primary"
              className="modal-userreg-btn apipost-blue-btn"
              size="large"
              style={{ width: '100%', width: '335px', height: '41px' }}
              onClick={submit}
            >
              立即登陆
            </Button>
          </div>
        </div>
      ) : (
        <div className="qr-code">
          <div className="login_wx">{renderWX()}</div>
          <div className="tips">
            {timeOver ? '二维码已失效，请刷新使用' : '微信扫码登录ApiPost'}
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginBox;

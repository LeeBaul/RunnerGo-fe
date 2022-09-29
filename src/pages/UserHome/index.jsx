import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'dva';
import './index.less';
import { clearUserData } from '@Utils/utils';
import { Team as TeamIcon, Project as ProjectIcon } from '@apipost-icons';
import { ApiButton } from '../../../component/Button';
import IconEdit from '../../../assets/img/iconEdit.svg';
import prevIcon from '../../../assets/img/prev.svg';
import userAvatar from '@assets/logo/avatar.svg';
import WXUrl from '../../../assets/img/weixin.svg';
import Modal from '../../../component/Modal';
import SeniorModal from '../../../component/SeniorModal';
import APiForm from '../../../component/Form';
import { logUserOut } from '../../../services/user';
import Message from '../../../component/message';
import { getProcress } from '../../../env';
import { openUrl } from '../../../utils/utils';
// import Toptool from '../../../component/Toptool';
import {
  ModifyAvatarAndUserName,
  SendSMS,
  UnBindWX,
  getBindWxVcode,
  vcodeIsScan,
  BindNewEmail,
  BindChangeEmail,
  ChangeEmailPassword,
  bindMobile,
  GetUserInfo,
  canLogOff, // 预注销
  logOffApi, // 注销
} from '../../../services/userhome';

const { Filed } = APiForm;
const Index = (props) => {
  const { dispatch } = props;
  console.log(props.history);
  // 高级弹窗统一控制
  const [visible, setVisible] = useState(false);
  // 高级弹窗类型
  const [modalType, setModalType] = useState('');
  const [sendSmSText, setSendSmSText] = useState('获取验证码');
  // 短信倒计时
  const [SmSwait, setSmSwait] = useState(0);
  // 发送的手机号
  const [phoneNum, setPhoneNum] = useState('');
  // 手机号提交弹窗控制
  const [phonevisible, setphonevisible] = useState(false);
  // 微信绑定弹窗控制
  const [wxbindvisible, setwxbindvisible] = useState(false);

  // 微信二维码链接
  const [wximgSrc, setwximgSrc] = useState('');
  // 扫码失败后蒙层及字体替换（失效状态）
  const [wxinvalid, setwxinvalid] = useState(false);
  // 用户信息对象
  const [userData, setuserData] = useState({});
  // 二维码过期
  const [timeOut, settimeOut] = useState(false);
  // 注销账号弹窗
  const [logOffvisible1, setlogOffvisible1] = useState(false);
  const [logOffvisible2, setlogOffvisible2] = useState(false);
  const [teamListLogOff, setteamListLogOff] = useState([]);
  const showSeniorModal = (type) => {
    setModalType(type);
    setVisible(true);
  };

  useEffect(() => {
    setSmSwait(0);
    setSendSmSText('获取验证码');
  }, [phonevisible]);
  useEffect(() => {
    let timer = null;
    if (SmSwait > 0) {
      timer = setInterval(() => {
        setSmSwait(SmSwait - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [SmSwait]);
  useEffect(() => {
    GetUserInfo().then((res) => {
      const { code } = res || {};
      if (code === 10000) setuserData(res.data);
    });
  }, []);
  // 获取微信二维码事件
  // const bindWx = () => {
  //   getBindWxVcode().then((res) => {
  //   });
  //   setwximgSrc('');
  //   setwxbindvisible(true);
  // };
  // 轮询扫码
  useEffect(() => {
    let timer = null;
    if (wxbindvisible && !timeOut && !wxinvalid) {
      // setTimeOver(false);
      getBindWxVcode().then((res) => {
        if (res?.code === 10000) {
          const getwxurl = encodeURI(`https://mp.weixin.qq.com/a/cgi-bin/showqrcode?ticket=${res.data.ticket}`);
          setwximgSrc(getwxurl);
        }
        const { ticket, sweep_token: sweepToken } = res.data;
        timer = setInterval(() => {
          vcodeIsScan({
            ticket,
            sweep_token: sweepToken,
          }).then((data) => {
            if (data.code === 10000) {
              clearInterval(timer);
              Message('success', '微信绑定成功');
              setuserData({ ...userData, had_openid: 1 });
              setwxbindvisible(false);
            } else if (data.code === 11006) {
              settimeOut(true);
              clearInterval(timer);
            } else if (data.code === 11023) {
              setwxinvalid(true);
              clearInterval(timer);
            }
          });
        }, 2000);
      });
    }
    return () => clearInterval(timer);
  }, [wxbindvisible, timeOut, wxinvalid]);
  // 刷新二维码
  const resetVode = () => {
    settimeOut(false);
    setwxinvalid(false);
  };
  // 退出登录
  const logOut = () => {
    logUserOut().then((res) => {
      if (res?.code === 10000) {
        clearUserData();
        props.history.push('/login');
      }
    });
  };
  const logOff = () => {
    canLogOff().then((res) => {
      console.log(res);
      if (res?.code === 10000) {
        if (Array.isArray(res?.data) && res?.data.length > 0) {
          setlogOffvisible1(true);
          setteamListLogOff(res?.data);
        } else {
          setlogOffvisible2(true);
        }
      }
    });
  };
  const confirmLogOff = () => {
    logOffApi().then((res) => {
      setlogOffvisible2(false);
      if (res?.code === 10000) {
        Message('success', '注销成功');
        clearUserData();
        props.history.push('/login');
      }
    });
  };
  // 解绑微信
  const unBindWx = () => {
    if (userData.email) {
      UnBindWX().then((res) => {
        if (res?.code === 10000) {
          Message('success', '解绑成功');
          setuserData({ ...userData, had_openid: 0 });
          setVisible(false);
        }
      });
    } else {
      Message('error', '未绑定邮箱，唯一账号不能解绑');
    }
  };
  // 提交修改用户名
  const changeUserName = (info) => {
    ModifyAvatarAndUserName(info).then((res) => {
      if (res?.code === 10000) {
        setuserData(res.data);
        setVisible(false);
      }
    });
  };
  // 提交修改手机号
  const changePhone = (info, error) => {
    if (error) return;
    bindMobile(info).then((res) => {
      if (res?.code === 10000) {
        Message('success', '绑定手机号成功！');
        setuserData(res.data);
        setphonevisible(false);
      } else {
        setSmSwait(60);
      }
    });
  };
  // 设置手机号
  const changePhoneNum = (type, value) => {
    if (type === 'mobile') {
      setPhoneNum(value);
    }
  };
  // 提交绑定邮箱
  const bindEmail = (info) => {
    if (info.confirmpassword && info.confirmpassword !== info.password) {
      Message('error', '密码不一致！');
      return true;
    } else {
      BindNewEmail(info).then((res) => {
        if (res?.code === 10000) {
          Message('success', '绑定成功');
          setuserData(res.data);
          setVisible(false);
          dispatch({
            type: 'user/getUsetInfo',
          });
        }
      });
    }
  };
  // 提交修改邮箱密码
  const changeEmailPwd = (data) => {
    if (data.new_confirmpwd && data.new_pwd !== data.new_confirmpwd) {
      Message('error', '密码不一致！');
      return true;
    } else {
      ChangeEmailPassword(data).then((res) => {
        if (res?.code === 10000) {
          Message('success', '修改成功');
          setVisible(false);
        }
      });
    }
  };
  // 提交修改邮箱
  const changeEmail = (info, error) => {
    if (error) return false;
    BindChangeEmail(info).then((res) => {
      if (res?.code === 10000) {
        Message('success', '绑定成功');
        setuserData(res.data);
        setVisible(false);
        dispatch({
          type: 'user/getUsetInfo',
        });
      }
    });
  };
  // 获取手机号验证码
  const getPhoneVcode = () => {
    if (/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/.test(phoneNum)) {
      SendSMS({ mobile: phoneNum }).then((res) => {
        if (res?.code === 10000) {
          Message('success', '验证短信已发送，请注意查收！');
          setSmSwait(60);
          setSendSmSText('重新发送');
        }
      });
    } else {
      Message('error', '手机号格式不正确!');
    }
  };
  // 修改手机号弹窗
  const phoneModal = () => (
    <Modal
      className="user_center_modal"
      visible={phonevisible}
      onCancel={() => { setphonevisible(false); setPhoneNum(''); }}
      bodyStyle={
        {
          width: '380px',
          height: '323px',
        }
      }
    >
      <div className="modal_title" >修改手机号</div>
      <APiForm
        onSubmit={changePhone}
        onChange={changePhoneNum}
        rules={[
          {
            name: 'mobile',
            required: true,
            message: '手机号不能为空',
          },
          {
            name: 'code',
            required: true,
            message: '验证码不能为空',
          },
        ]}
      >
        <Filed name="mobile" placeholder="请输入手机号" />
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ flex: 1 }}>
            <Filed name="code" placeholder="请输入验证码" />
          </div>
          {
            SmSwait ? (
              <ApiButton style={{ width: 100, height: '44px', padding: '12px 14px 13px', marginLeft: '16px', lineHeight: '1', borderRadius: '5px' }}>
                {SmSwait}
                s
              </ApiButton>
            )
              : (
                <ApiButton style={{ width: 100, height: '44px', padding: '12px 14px 13px', marginLeft: '16px', lineHeight: '1', borderRadius: '5px' }} onClick={getPhoneVcode} >
                  {sendSmSText}
                </ApiButton>
              )
          }

        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <ApiButton
            style={{
              width: '110px',
              height: '44px',
              borderRadius: '5px',
            }}
            onClick={() => { setphonevisible(false); }}
          >
            取消
          </ApiButton>
          <Filed>
            {
              ({ submit, submitDislable }) => (
                <ApiButton
                  type="primary"
                  className="login_btn"
                  onClick={submit}
                  disabled={submitDislable}
                  style={{
                    width: '110px',
                    height: '44px',
                    marginLeft: '12px',
                    borderRadius: '5px',
                    color: '#fff',
                  }}
                >
                  确定
                </ApiButton>
              )
            }
          </Filed>
        </div>
      </APiForm>
    </Modal>
  );
  // 微信绑定弹窗
  const wxbindModal = () => (
    <Modal
      visible={wxbindvisible}
      onCancel={() => { setwxbindvisible(false); }}
      bodyStyle={
        {
          width: '380px',
          height: '415px',
        }
      }
    >
      <div className="modal_title">绑定微信</div>
      <div className="modal_bingwx">
        <div className="modal_round">
          {
            wximgSrc ? <img src={wximgSrc} style={wxinvalid || timeOut ? { filter: 'blur(5px)' } : {}} alt="" /> : null
          }
          {
            wxinvalid || timeOut ? (
              <div
                className="time_over"
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  // width: '58px',
                  height: '23px',
                }}
              >
                <ApiButton type="primary" style={{ borderRadius: '4px' }} onClick={resetVode}>{timeOut ? '刷新' : '重新绑定'}</ApiButton>
              </div>
            ) : null
          }
        </div>
      </div>
      {
        wxinvalid ? <div className="modal_wxtip"> 该微信已注册 </div> : <div className="modal_wxtip"> 微信扫码绑定 </div>
      }
      <div className="modal_wxtipInfo">
        <span className="blue_circle"></span>
        <span className="desc">绑定微信后，可实时收到评论@通知</span>
      </div>
      <div className="modal_wxtipInfo">
        <span className="blue_circle"></span>
        <span className="desc">微信扫码即可登录</span>
      </div>
    </Modal >
  );
  const uploadPortrait = async (uploadRef) => {
    const url = await uploadRef.current.handleSubmit();
    if (url) {
      ModifyAvatarAndUserName({
        portrait: url,
      }).then((res) => {
        const { code, data } = res;
        if (code === 10000) {
          setuserData(data);
          setVisible(false);
        }
      });
    }
  };
  const seniorModal = {
    changeUserName,
    changeEmailPwd,
    unBindWx,
    changeEmail,
    bindEmail,
    uploadPortrait,
  };
  return (
    <>
      <ApiButton
        type="primary"
        onClick={() => {
          if (document?.referrer !== '') {
            props.history.goBack();
          } else {
            props.history.push('/project');
          }
        }}
        style={{ zIndex: 1, width: 74, height: 36, borderRadius: '5px', lineHeight: '36px', fontWeight: '400', background: 'var(--bg1)', color: '#2b2b2b', position: 'fixed', top: '70px', left: '100px' }}
      >
        <img src={prevIcon} alt="" style={{ width: 20, height: 20, marginRight: '4px', marginTop: '-2px' }} />
        返回
      </ApiButton>
      <div className="userHome">
        {phonevisible ? phoneModal() : null}
        <SeniorModal
          type={modalType}
          visible={visible}
          setVisible={setVisible}
          onSubmit={seniorModal[modalType]}
          avatar={userData.portrait ? userData.portrait : userAvatar}
        />
        {/* {
          logOffvisible && (
            <Modal
              visible={logOffvisible}
              onCancel={() => setlogOffvisible(false)}
              bodyStyle={{
                padding: 30,
                width: 391,
                height: 214,
                boxShadow: ' 0px 15px 30px rgba(52, 52, 52, 0.1)',
                textAlign: 'left',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div className="modal_title" style={{ margin: 0 }}>注销账号</div>
              <div style={{ flex: 1, display: 'flex', alignItems: 'center', color: 'var(--fn2)' }}>
                请将私有团队内的人员全部移除，否则无法注销账号
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <ApiButton
                  type="primary"
                  style={{
                    color: '#fff',
                    borderRadius: 5,
                    padding: 12,
                    width: 117,
                    height: 41,
                  }}
                  onClick={() => setlogOffvisible(false)}
                >
                  知道了
                </ApiButton>
              </div>
            </Modal>
          )
        } */}
        {
          logOffvisible1 && (
            <Modal
              visible={logOffvisible1}
              onCancel={() => setlogOffvisible1(false)}
              bodyStyle={{
                padding: 30,
                width: 816,
                height: 670,
                boxShadow: ' 0px 15px 30px rgba(52, 52, 52, 0.1)',
                textAlign: 'left',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div className="modal_title" >
                注销账号
                <div style={{ color: 'var(--error)', fontWeight: 400, fontSize: 12 }}>
                  注销账号，将会把该账号下您管理的团队和团队下的项目一并删除；如需保留数据，请先将团队移交给其他协作者
                </div>
              </div>
              <div style={{ flex: 1, maxHeight: 450, overflowY: 'auto', fontSize: 12 }}>

                {
                  Array.isArray(teamListLogOff) && teamListLogOff?.map((it) => (
                    <ul style={{ width: '100%' }}>
                      <p style={{ display: 'flex', alignItems: 'center', height: 30, margin: '10px 0' }}>
                        <TeamIcon style={{ fill: '#2b2b2b', marginRight: 8, minWidth: 16 }} />
                        <span>{it?.name}</span>
                        <span style={{ display: 'inline-block', background: '#FFF5F7', padding: 4, borderRadius: 3, color: '#FF4C4C', marginLeft: 8 }}>
                          团队人员：
                          {it?.place_count}
                          人
                        </span>
                      </p>
                      {
                        Array.isArray(it?.project) && it?.project?.map((it1) => (
                          <li style={{
                            display: 'flex',
                            alignItems: 'center',
                            height: 30,
                            margin: '8px 0',
                            width: ' 100%',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            paddingLeft: 20,
                          }}
                          >
                            <ProjectIcon style={{ fill: '#2b2b2b', marginRight: 8, minWidth: 16 }} />
                            {it1?.name}
                          </li>
                        ))
                      }
                    </ul>
                  ))
                }
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <ApiButton
                  type="primary"
                  style={{
                    color: '#fff',
                    borderRadius: 5,
                    padding: 12,
                    width: 117,
                    height: 41,
                  }}
                  onClick={() => { setlogOffvisible1(false); setlogOffvisible2(true); }}
                >
                  下一步
                </ApiButton>
              </div>
            </Modal>
          )
        }
        {
          logOffvisible2 && (
            <Modal
              visible={logOffvisible2}
              onCancel={() => setlogOffvisible2(false)}
              bodyStyle={{
                padding: 30,
                width: 580,
                height: 446,
                boxShadow: ' 0px 15px 30px rgba(52, 52, 52, 0.1)',
                textAlign: 'left',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div className="modal_title" >
                注销须知
              </div>
              <div style={{
                display: 'flex',
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'space-evenly',
                color: '#666',
                lineHeight: 1.4,
              }}
              >
                <p>在你提交注销申请之前，请先确认以下信息，以保证你的帐号、财产安全：</p>
                <ul>
                  <li>1.帐号处于安全状态</li>
                  <li>2.帐号为正常使用中，且未发生过被盗、被封禁的限制。</li>
                  <li>3.账号数据已转移或删除</li>
                  <li>4.账号所有项目内的接口、文档、笔记数据均已转移或删除。</li>
                  <li>5.账号财产已结清</li>
                  <li>6.没有资产、欠款、未结清的资金和虚拟权益，本帐号及通过本帐号接入的第三方中没有未完成或存在争议的服务。</li>
                  <li>7.帐号无任何纠纷，包括投诉举报</li>
                </ul>
                <p>
                  点击“确认注销”按钮，即表示你已阅读并同意
                  <ApiButton
                    type="link"
                    style={{ width: '99px', height: '47px', color: '#287Eff' }}
                    onClick={() => {
                      const { FE_URL } = getProcress();
                      openUrl(`${FE_URL}/reminder.html`);
                    }}
                  >
                    《重要提醒》
                  </ApiButton>
                </p>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <ApiButton
                  style={{
                    color: '#999',
                    borderRadius: 5,
                    padding: 12,
                    width: 117,
                    height: 41,
                  }}
                  onClick={() => setlogOffvisible2(false)}
                >
                  取消
                </ApiButton>
                <ApiButton
                  type="primary"
                  style={{
                    color: '#fff',
                    borderRadius: 5,
                    padding: 12,
                    width: 117,
                    height: 41,
                    marginLeft: 16,
                  }}
                  onClick={confirmLogOff}
                >
                  确认注销
                </ApiButton>
              </div>
            </Modal>
          )
        }
        {wxbindModal()}
        <div className="headPortrait" style={{ cursor: 'pointer' }} onClick={() => { showSeniorModal('uploadPortrait'); }}>
          <img src={userData.portrait ? userData.portrait : userAvatar} alt="" />
        </div>
        <div className="userName">
          <span className="userName_name">{userData?.nick_name ? userData.nick_name : '用户名'}</span>
          <span className="userName_icon" onClick={() => { showSeniorModal('changeUserName'); }}><img src={IconEdit} alt="" /></span>
        </div>
        <div className="userEmail">
          {userData?.email}
        </div>
        <div className="content_layout">
          <div className="content_layout_left">
            <div className="content_layout_left_title">手机号</div>
            <div className="content_layout_left_email">{userData?.mobile ? userData.mobile : '未绑定'}</div>
          </div>
          <div className="content_layout_right1">
            {userData?.mobile ? <ApiButton type="link" style={{ width: '99px', height: '47px', color: '#287Eff' }} onClick={() => { setphonevisible(true); }}>编辑</ApiButton> : <ApiButton style={{ width: '92px', height: '44px', borderRadius: '5px' }} onClick={() => { setphonevisible(true); }}>绑定</ApiButton>}
          </div>
        </div>
        <div className="userBr"></div>
        <div className="content_layout">
          <div className="content_layout_left">
            <div className="content_layout_left_title">
              邮箱
              <span className="content_layout_left_time">{userData.email && userData.ch_email_count ? `${userData.ch_email_count}次机会` : ''}</span>
            </div>
            <div className="content_layout_left_email">{userData.email ? userData.email : '未绑定'}</div>
          </div>
          {
            (() => {
              if (userData.ch_email_count <= 0) {
                return <div className="content_layout_right1"></div>;
              } else {
                return (
                  <div className="content_layout_right1">
                    {
                      userData.email ? <ApiButton type="link" style={{ width: '99px', height: '47px', color: '#287Eff' }} onClick={() => { showSeniorModal('changeEmail'); }}>编辑</ApiButton> : <ApiButton style={{ width: '92px', height: '44px', borderRadius: '5px' }} onClick={() => { showSeniorModal('bindEmail'); }}>绑定</ApiButton>
                    }
                  </div>
                );
              }
            })()
          }
        </div>
        <div className="userBr"></div>
        <div className="content_layout">
          <div className="content_layout_left">
            <div className="content_layout_left_title">密码 </div>
            <div className="content_layout_left_email">{userData.had_password ? '******' : ''}</div>
          </div>
          <div className="content_layout_right1">
            <ApiButton
              type="link"
              style={{ width: '99px', height: '47px', color: '#287Eff' }}
              onClick={() => {
                if (userData.had_password) {
                  showSeniorModal('changeEmailPwd');
                } else {
                  Message('error', '请先绑定邮箱');
                }
              }}
            >
              编辑
            </ApiButton>
          </div>
        </div>
        <div className="userBr"></div>
        <div className="content_layout">
          <div className="content_layout_left">
            <div className="content_layout_left_title">
              微信
              <span className="content_layout_left_icon"><img src={WXUrl} alt="" /></span>
            </div>
            <div className="content_layout_left_email">{userData.had_openid ? userData.nick_name : '未绑定'}</div>
          </div>
          <div className="content_layout_right1">
            {userData.had_openid ? <ApiButton style={{ width: '92px', height: '44px', borderRadius: '5px' }} onClick={() => { showSeniorModal('unBindWx'); }}>解绑</ApiButton> : <ApiButton style={{ width: '92px', height: '44px', borderRadius: '5px' }} onClick={() => { setwxbindvisible(true); }} >绑定</ApiButton>}
          </div>
        </div>
        <div className="userBr"></div>
        <div className="logOut">
          <ApiButton
            style={{
              width: '110px',
              height: '44px',
              color: 'var(--error)',
              borderColor: 'var(--error)',
              borderRadius: '5px',
            }}
            onClick={logOut}
          >
            退出登录
          </ApiButton>
          <ApiButton
            type="link"
            style={{
              width: '110px',
              height: '44px',
              color: 'var(--fn2)',
              borderRadius: '5px',
            }}
            onClick={logOff}
          >
            注销账号
          </ApiButton>
        </div>
      </div>
    </>
  );
};
export default connect(({ user }) => ({
  userInfo: user.userInfo,
}))(withRouter(Index));

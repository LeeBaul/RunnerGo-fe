import React from "react";
import './index.less';
import { Button } from 'adesign-react';
import { Left as SvgLeft, Answer as SvgAnswer } from 'adesign-react/icons';
import avatar from '@assets/logo/avatar.png';
import SvgWx from '@assets/img/weixin.svg';
import { useNavigate } from 'react-router-dom';

const Userhome = () => {
    const navigate = useNavigate();
    return (
        <div className="user-page">
            <Button className='return-btn' preFix={<SvgLeft />} onClick={() => navigate('/index')}>返回</Button>
            <div className="user-page-container">
                <div className="user-page-container-info">
                    <img className="avatar" src={avatar} />
                    <div className="handle-name">
                        <span className="name">用户名</span>
                        <SvgAnswer />
                    </div>
                    <p className="email">17710709463@163.com</p>
                </div>
                <div className="user-page-container-list">
                    <div className="user-page-container-list-item">
                        <div className="phone-left common-item">
                            <p className="label">手机号</p>
                            <p>未绑定</p>
                        </div>
                        <Button>绑定</Button>
                    </div>
                    <div className="user-page-container-list-item">
                        <div className="email-left common-item">
                            <p className="email"><span className="label">邮箱</span><span className="change-num">2次机会</span></p>
                            <p>未绑定</p>
                        </div>
                        <Button>绑定</Button>
                    </div>
                    <div className="user-page-container-list-item">
                        <div className="pwd-left common-item">
                            <p className="label">密码</p>
                        </div>
                        <Button>编辑</Button>
                    </div>
                    <div className="user-page-container-list-item">
                        <div className="wx-left common-item">
                            <p className="wx">
                                <span className="label">微信</span>
                                <SvgWx />
                            </p>
                            <p>未绑定</p>
                        </div>
                        <Button>绑定</Button>
                    </div>
                </div>
                <div className="user-page-container-bottom">
                    <Button>退出登录</Button>
                    <p>注销账号</p>
                </div>
            </div>
        </div>
    )
};

export default Userhome;
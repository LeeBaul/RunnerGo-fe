import React from 'react';
import { Input, Button } from 'adesign-react';
import './index.less';
import { useNavigate } from 'react-router-dom';

const FindPassword = () => {
    const navigate = useNavigate();
    return (
        <div className='find-password'>
            <div className='title'>找回密码</div>
            <Input placeholder='请输入邮箱' />
            <Button>发送重置密码</Button>
            <div className='to-login' onClick={() => navigate('/login')}>去登录</div>
        </div>
    )
};

export default FindPassword;
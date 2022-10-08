import React from 'react';
// import { Input } from 'adesign-react';
import AuthInput from '../authInput';

const BasicAuth = (props) => {
  const { value, type, handleAttrChange } = props;

  return (
    <>
      {value?.basic && (
        <div className="apipost-auth-content">
          <div className="auth-item">
            <div className="title">username</div>
            <AuthInput
              size="mini"
              placeholder="用户名（支持变量）"
              // value={value?.basic?.username}
              onChange={(val) => {
                handleAttrChange(type, 'username', val);
              }}
            />
          </div>
          <div className="auth-item">
            <div className="title">password</div>
            <AuthInput
              size="mini"
              placeholder="密码（支持变量）"
              // value={value?.basic?.password}
              onChange={(val) => {
                handleAttrChange(type, 'password', val);
              }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default BasicAuth;

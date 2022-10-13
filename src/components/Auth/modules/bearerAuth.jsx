import React from 'react';
// import { Input } from 'adesign-react';
import AuthInput from '../authInput';

const BearerAuth = (props) => {
  const { value, type, handleAttrChange } = props;

  return (
    <>
      {value?.bearer && (
        <div className="apipost-auth-content">
          <div className="auth-item">
            <div className="title">token</div>
            <AuthInput
              size="mini"
              placeholder="Token（支持变量）"
              value={value.bearer.key}
              onChange={(val) => {
                handleAttrChange(type, 'key', val);
              }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default BearerAuth;

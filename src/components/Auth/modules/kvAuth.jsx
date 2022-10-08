import React from 'react';
import { Input } from 'adesign-react';
import AuthInput from '../authInput';

const KvAuth = (props) => {
  const { value, type, handleAttrChange } = props;
  return (
    <>
      {value?.kv && (
        <div className="apipost-auth-content">
          <div className="auth-item">
            <div className="title">key</div>
            <AuthInput
              size="mini"
              placeholder="键"
              // value={value.kv.key}
              onChange={(val) => {
                handleAttrChange(type, 'key', val);
              }}
            />
          </div>
          <div className="auth-item">
            <div className="title">value</div>
            <AuthInput
              size="mini"
              placeholder="值（支持变量）"
              // value={value.kv.value}
              onChange={(val) => {
                handleAttrChange(type, 'value', val);
              }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default KvAuth;

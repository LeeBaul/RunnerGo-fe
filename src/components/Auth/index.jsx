import React, { useEffect } from 'react';
import { Select } from 'adesign-react';
import { AUTH, defaultAuth } from '@constants/Auth';
import OAuth1 from './modules/OAuth1';
import { AuthWrapper } from './style';
import KvAuth from './modules/kvAuth';
import BearerAuth from './modules/bearerAuth';
import BasicAuth from './modules/basicAuth';
import DigestAuth from './modules/digestAuth';
import AWSAuth from './modules/awsAuth';
import HawkAuth from './modules/hawkAuth';
import NtlmAuth from './modules/ntlmAuth';
import EdgeridAuth from './modules/edgeridAuth';
import './index.less';

const Option = Select.Option;

const PERFIXNAME = 'apipost-auth';

const Authen = (props) => {
  const { value = {}, onChange = () => undefined } = props;

  useEffect(() => {
    let isDifferent = false;
    const newValue = {};
    for (const key in defaultAuth) {
      if (!value?.hasOwnProperty(key)) isDifferent = true;
      if (key !== 'type') {
        newValue[key] = Object.assign({}, defaultAuth[key], value?.[key]);
      } else {
        newValue[key] = value?.[key] || defaultAuth[key];
      }
    }
    if (isDifferent) {
      setTimeout(() => {
        onChange('auth', { ...newValue });
      }, 300);
    }
  }, []);

  const { type = 'noauth' } = value || {};

  if (!type) return <></>;

  const handleAuthTypeChange = (authType) => {
    onChange('authType', authType);
  };

  const handleAttrChange = (authType, attr, attrValue) => {
    onChange('authValue', attrValue, `${authType}.${attr}`);
  };
  const authTypeBox = () => {
    switch (type) {
      case 'kv':
        return <KvAuth value={value} type={type} handleAttrChange={handleAttrChange}></KvAuth>;
      case 'bearer':
        return (
          <BearerAuth value={value} type={type} handleAttrChange={handleAttrChange}></BearerAuth>
        );
      case 'basic':
        return (
          <BasicAuth value={value} type={type} handleAttrChange={handleAttrChange}></BasicAuth>
        );
      case 'digest':
        return (
          <DigestAuth value={value} type={type} handleAttrChange={handleAttrChange}></DigestAuth>
        );
      case 'hawk':
        return <HawkAuth value={value} type={type} handleAttrChange={handleAttrChange}></HawkAuth>;
      case 'awsv4':
        return <AWSAuth value={value} type={type} handleAttrChange={handleAttrChange}></AWSAuth>;
      case 'ntlm':
        return <NtlmAuth value={value} type={type} handleAttrChange={handleAttrChange}></NtlmAuth>;
      case 'edgegrid':
        return (
          <EdgeridAuth value={value} type={type} handleAttrChange={handleAttrChange}></EdgeridAuth>
        );
      case 'oauth1':
        return <OAuth1 value={value} type={type} handleAttrChange={handleAttrChange}></OAuth1>;

      default:
        return '该接口不需要认证';
    }
  };

  return (
    <AuthWrapper className={PERFIXNAME}>
      <Select className={`${PERFIXNAME}-select`} value={type} onChange={handleAuthTypeChange}>
        {Object.entries(AUTH).map((item) => (
          <Option value={item[0]} key={item[0]}>
            {item[1]}
          </Option>
        ))}
      </Select>
      <div className="apipost-auth-type-content">{authTypeBox()}</div>
    </AuthWrapper>
  );
};

export default Authen;

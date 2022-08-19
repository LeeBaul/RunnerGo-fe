import ajax, { RxAjaxObservable } from './ajax';

// 用户邮箱登陆
export const fetchUserLoginForEmailRequest = (
  params
) => ajax('post', '/management/api/v1/auth/login', 'json', false, params);
// 用户邮箱注册
export const fetchUserRegisterForEmailRequest = (
  params
) => ajax('post', '/management/api/v1/auth/signup', 'json', false, params);
// 获取微信二维码
export const fetchGetWxCodeRequest = (
  params
) => ajax('post', '/login/get_wx_code', 'json', false, params);
// 检查用户是否扫码
export const fetchCheckUserWxCodeRequest = (
  params
) => ajax('post', '/login/has_sweep_wx', 'json', false, params);

// 检查用户配置信息
export const fetchUserConfigRequest = () =>
  ajax('post', '/sys/get_user_configure', 'json', false, null);

// 修改配置信息
export const setSysConfig = (params) =>
  ajax('post', '/sys/save_user_configure', 'json', false, params);

// 刷新用户identity
export const refreshIdentity = () =>
  ajax('post', '/user/identity', 'json', false, null);

// 获取团队成员列表
export const fetchProjectUserListRequest = (
  params
) => ajax('post', '/apis_project/user_list', 'json', false, params);

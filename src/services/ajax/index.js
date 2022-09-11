import { Observable } from 'rxjs';
import { Message } from 'adesign-react';
import { ajax, AjaxResponse } from 'rxjs/ajax';
import { catchError, map } from 'rxjs/operators';
import Bus from '@utils/eventBus';
import { isElectron, clearUserData } from '@utils';
import { isLogin } from '@utils/common';
import { RD_BASE_URL, APP_VERSION, REQUEST_TIMEOUT } from '@config/index';
import { getCookie } from '../../utils/cookie';
import { ContentType } from '@constants/ajax';
import { fetchTokenRefresh } from '../user';
import { tap } from 'rxjs';


// const path = isElectron() ? APP_VERSION : 'api';
const ignoreCodeArr = [11001, 11007, 11006, 11023, 10080, 11090, 11095];
const defaultHeaders = {
    is_silent: -1,
    appversion: APP_VERSION,
    // timeout: REQUEST_TIMEOUT,
    terminal: isElectron() ? 'client' : 'web',
    platform: 'Mac',
    clientid: window.sessionStorage.clientId ? window.sessionStorage.clientId : 'NOLOGIN',
    machineid: localStorage.getItem('machineid') || 'NOLOGIN',
};

// (method, url, contentType = null, loading, params, headers)
export const rxAjax = (
    method = 'GET',
    url,
    contentType,
    loading,
    params,
    query
) => {
    let ignoreUrl = ['/management/api/v1/auth/login'];
    let request = ajax({
        method,
        url: `${RD_BASE_URL}${url}`,
        headers: ignoreUrl.includes(url) ? {
            // ...defaultHeaders,
            // token: getCookie('token') || 'NOLOGIN',
            // Authorization: getCookie('token') || '',
            // clientid: sessionStorage.getItem('clientId') || 'NOLOGIN',
            // contentType: ContentType[contentType],
        } : {
            Authorization: localStorage.getItem('kunpeng-token'),
        },
        body: params,
        queryParams: query,
    });
    const reg = /^\/apis/;
    const regPro = /^\/project/;
    request = request.pipe(
        map((resp, a) => {
            if (resp?.status === 200) {
                if (resp.response.code === 0) {
                    return resp?.response;
                }
                if (resp.response.code === 20003) {
                    Message('error', '请先登录!');
                    window.location.href = '/login';
                }
                // if (resp.response.code === 0000) {
                //     fetchTokenRefresh()
                //     .pipe(
                //         tap((userData) => {
                //             saveLocalData(userData);
                //             localStorage.setItem('expire_time_sec', userData.expire_time_sec * 1000);
                //         })
                //     )
                //     .subscribe()
                // }
                // 11000;   //token已过期或退出登录 (已登陆)提示 + 弹窗
                // 11090;   //token必传 弹窗
                // 11091;   //token被顶替（已登陆）提示 + 弹窗
                if (
                    resp.response.code === 11000 ||
                    resp.response.code === 11090 ||
                    resp.response.code === 11091
                ) {
                    // web 端 跳登陆页面
                    if (resp.response.code === 11000 || resp.response.code === 11091) {
                        isLogin() && Message('error', resp.response?.msg);
                        isLogin() && Bus.$emit('openModal', 'LoginModal');
                    }
                    // console.log('是否登陆', isLogin(), resp.response.code);

                    // 判断登陆状态
                    if (isLogin()) {
                        clearUserData();
                    } else {
                        return resp?.response;
                    }
                }
                // 当前操作人不在项目中
                if (
                    resp.response.code === 11061 ||
                    resp.response.code === 11044 ||
                    resp.response.code === 11027 ||
                    resp.response.code === 11028
                ) {
                    // TODO 修改跳转页面
                    if (reg.test(window.location.pathname)) {
                        // window.location.href = '/apis';
                        return;
                    }
                    if (regPro.test(window.location.pathname)) {
                        // window.location.href = '/project';
                    }
                    // window.location.reload();
                }
                if (!ignoreCodeArr.includes(resp.response.code)) {
                    // 不能在这里添加全局弹窗提示
                    setTimeout(() => {
                        Message('error', resp.response?.msg);
                    }, 150);
                }
                // 冲突逻辑处理
                if (resp?.response.code === 10100) {
                    // console.log('error, 冲突啦');
                    const responseUrl = resp.request.url || '';
                    const server_json = resp?.response?.data?.conflict?.server || {};
                    const local_json = JSON.parse(resp?.request?.body);
                    const version = resp?.response?.data?.version || '';
                    Bus.$emit('compareJson', {
                        responseUrl,
                        server_json,
                        local_json,
                        version,
                    });
                }

                catchError((error) => {
                    throw error;
                });
                // 接口
            }
            catchError((error) => {
                throw error;
            });
            // 接口状态码不为10000也要返回响应内容（TODO）
            return resp?.response;
        }),
        catchError((error) => {
            throw error;
        })
    );
    return request;
};

export default rxAjax;

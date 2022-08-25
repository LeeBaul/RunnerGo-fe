/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { Opens, Collection, Recently_Save } from '@indexedDB/project';
import { v4 as uuidv4 } from 'uuid';
// import { User } from '@indexedDB/user';
import Bus, { useEventBus } from '@utils/eventBus';
import { Message } from 'adesign-react';
import {
    isObject,
    isUndefined,
    cloneDeep,
    isEmpty,
    isString,
    set,
    isArray,
    findIndex,
    isPlainObject,
    max,
} from 'lodash';
import { global$ } from '@hooks/useGlobal/global';
import { pushTask } from '@asyncTasks/index';
import {
    versionCheck,
    targetParameter2Obj,
    isURL,
    createUrl,
    GetUrlQueryToArray,
    completionTarget,
} from '@utils';
import * as jsondiffpatch from 'jsondiffpatch';
import { urlParseLax } from '@utils/common';
import { from, lastValueFrom } from 'rxjs';
import { CONFILCTURL } from '@constants/confilct';
import { SaveTargetRequest, saveApiBakRequest } from '@services/apis';
import { getBaseCollection } from '@constants/baseCollection';

// 新建接口
const useOpens = () => {
    const dispatch = useDispatch();
    const { open_apis } = useSelector((store) => store?.opens);
    const { desktop_proxy } = useSelector((store) => store?.desktopProxy);
    const workspace = useSelector((store) => store?.workspace);
    const { CURRENT_PROJECT_ID, CURRENT_TARGET_ID } = workspace;

    // 重新排序
    const targetReorder = async (target) => {
        if (isObject(target) && target.hasOwnProperty('parent_id')) {
            const parentKey = target.parent_id || '0';
            const project_id = target?.project_id;
            const projectNodes = await Collection.where('project_id').anyOf(project_id).toArray();
            let sort = 0;
            const rootNodes = projectNodes.filter((item) => item.parent_id === parentKey);
            const nodeSort = rootNodes.map((item) => item.sort);
            sort = max(nodeSort) || 0;
            target.sort = sort + 1;
        }
        return target;
    };
    // 过滤key为空的值
    const filterEmptyKey = async (target) => {
        const { target_type } = target;
        if (target_type === 'api' || target_type === 'websocket') {
            if (target?.request) {
                if (isArray(target?.request?.header?.parameter)) {
                    target.request.header.parameter = target.request.header.parameter.filter(
                        (ite) => ite.key !== ''
                    );
                }
                if (isArray(target?.request?.body?.parameter)) {
                    target.request.body.parameter = target.request.body.parameter?.filter(
                        (ite) => ite.key !== ''
                    );
                    target.request.body.parameter?.forEach((ite) => {
                        // 过滤文件对象
                        if (ite.type === 'File' && ite.key !== '' && typeof ite?.value !== 'string') {
                            try {
                                ite.value = ite?.value?.map((it) => it.name).toString();
                            } catch (error) {
                                ite.value = '';
                            }
                        }
                    });
                }
                if (isArray(target?.request?.query?.parameter)) {
                    target.request.query.parameter = target.request.query.parameter.filter(
                        (ite) => ite.key !== ''
                    );
                }
            }
        }
        if (target_type === 'folder') {
            target.request.header =
                target?.request?.header?.filter((ite) => ite.key !== '') || target.request.header;
            target.request.body =
                target?.request?.body?.filter((ite) => ite.key !== '') || target.request.body;
            target.request.query =
                target?.request?.query?.filter((ite) => ite.key !== '') || target.request.query;
        }
        return target;
    };

    // 小红点判断
    const targetIfChanged = async (newTarget, pathExpression) => {
        const diffPaths = {
            name: 'name',
            method: 'method',
            mark: 'mark',
            client_mock_url: 'client_mock_url',
            server_mock_url: 'server_mock_url',
            request: 'request',
            response: 'response',
            socketConfig: 'socketConfig',
            script: 'script',
        };
        if (
            isString(pathExpression) &&
            pathExpression.length > 0 &&
            diffPaths.hasOwnProperty(pathExpression.split('.')[0])
        ) {
            const path = pathExpression.split('.')[0];
            const updateData = newTarget[diffPaths[path]];
            const change_json = {};
            if (isObject(updateData)) {
                change_json[path] = targetParameter2Obj(updateData);
            } else {
                change_json[path] = updateData;
            }
            const collectionTarget = await Collection.get(newTarget?.target_id);
            if (!collectionTarget) {
                newTarget.is_changed = 1;
            } else {
                const source_json = {};
                const updateSourceData = collectionTarget[diffPaths[path]];
                if (isObject(updateData)) {
                    source_json[path] = targetParameter2Obj(updateSourceData);
                } else {
                    source_json[path] = updateSourceData;
                }
                // 开始比对
                const delta_diffs = jsondiffpatch
                    .create({
                        objectHash: (obj) => obj._key || obj.key,
                        propertyFilter: (name) => name !== 'value' && name !== 'is_checked',
                        textDiff: {
                            minLength: 600000,
                        },
                    })
                    .diff(change_json, source_json);
                if (delta_diffs) {
                    newTarget.is_changed = 1;
                } else {
                    newTarget.is_changed = -1;
                }
            }
        }
    };

    const addOpensByObj = async (Obj, selected = false, callback) => {
        const tempOpenApis = cloneDeep(open_apis);
        // console.log(Obj);
        // console.log(open_apis);
        tempOpenApis[Obj.target_id] = Obj;
        // await Opens.put(Obj, Obj.target_id).then(() => {
            dispatch({
                type: 'opens/coverOpenApis',
                payload: tempOpenApis,
            });
            selected && Bus.$emit('updateTargetId', Obj.target_id);
            callback && callback();
            const openNavs =
                apGlobalConfigStore.get(`project_current:${CURRENT_PROJECT_ID}`)?.open_navs || [];
            openNavs.push(Obj.target_id);
            apGlobalConfigStore.set(`project_current:${CURRENT_PROJECT_ID}`, {
                open_navs: openNavs,
            });
            // console.log(apGlobalConfigStore);
        // });
    };

    const updateOpensById = async (req) => {
        const { id, data } = req;
        // const opensApi = await Opens.get(id);
        // TODO 修改本地库
        // if (open_apis.hasOwnProperty(id) && isObject(open_apis[id]) && isObject(opensApi)) {
        //     let target_temp = cloneDeep(open_apis[id]);
        //     target_temp = { ...target_temp, ...data };
        //     await Opens.put(target_temp, target_temp.target_id);
        //     dispatch({
        //         type: 'opens/coverOpenApis',
        //         payload: { ...open_apis, [id]: target_temp },
        //     });
        // }
    };

    const updateCollectionById = async (req) => {
        const { id, data, notFindIdNew } = req;
        let target = await Collection.get(id);
        if (target && isObject(target)) {
            target = { ...target, ...data };
            await Collection.put(target, target.target_id);
            // 刷新左侧目录列表
            global$.next({
                action: 'RELOAD_LOCAL_COLLECTIONS',
                payload: CURRENT_PROJECT_ID,
            });
        } else if (notFindIdNew) {
            await Collection.put(data, data?.target_id);
            // 刷新左侧目录列表
            global$.next({
                action: 'RELOAD_LOCAL_COLLECTIONS',
                payload: CURRENT_PROJECT_ID,
            });
        }
    };

    const updateTarget = async (data) => {
        const { target_id, pathExpression, value } = data;
        const tempOpenApis = open_apis;
        if (!tempOpenApis.hasOwnProperty(target_id)) {
            return;
        }
        // TODO 修改本地库
        set(tempOpenApis[target_id], pathExpression, value);
        // url兼容处理
        if (pathExpression === 'request.url') {
            let reqUrl = value;
            let queryList = [];
            const restfulList = [];
            if (reqUrl) {
                // 自动拼接url http://
                if (!isURL(reqUrl)) {
                    reqUrl = `http://${reqUrl}`;
                }
                const urlObj = createUrl(reqUrl);
                if (isArray(tempOpenApis[target_id]?.request?.query?.parameter)) {
                    // 提取query
                    const searchParams = GetUrlQueryToArray(urlObj?.search || '');
                    queryList = tempOpenApis[target_id].request.query.parameter.filter(
                        (item) => item?.is_checked < 0
                    );
                    searchParams.forEach((item) => {
                        const key = item?.key;
                        const value = item?.value;
                        let obj = {};
                        const i = findIndex(tempOpenApis[target_id].request.query.parameter, { key });
                        if (i !== -1) obj = tempOpenApis[target_id].request.query.parameter[i];
                        queryList.push({
                            description: obj?.description || '', // 字段描述
                            is_checked: obj?.is_checked || 1, // 是否启用
                            key: key?.trim(), // 参数名
                            type: obj?.type || 'Text', // 字段类型
                            not_null: obj?.not_null || 1, // 必填｜-1选填
                            field_type: obj?.field_type || 'String', // 类型
                            value: value?.trim(), // 参数值
                        });
                    });
                    set(tempOpenApis[target_id], 'request.query.parameter', queryList);
                }

                if (isArray(tempOpenApis[target_id]?.request?.resful?.parameter)) {
                    // 提取restful
                    const paths = urlObj.pathname.split('/');
                    paths.forEach((p) => {
                        if (p.substring(0, 1) === ':' && p.length > 1) {
                            let obj = {};
                            const i = findIndex(tempOpenApis[target_id]?.request?.resful?.parameter, {
                                key: p.substring(1, p.length),
                            });
                            if (i !== -1) obj = tempOpenApis[target_id]?.request?.resful?.parameter[i];
                            restfulList.push({
                                key: p.substring(1, p.length),
                                description: obj?.description || '',
                                is_checked: 1,
                                type: 'Text',
                                not_null: 1,
                                field_type: 'String',
                                value: obj?.value || '',
                            });
                        }
                    });
                    set(tempOpenApis[target_id], 'request.resful.parameter', restfulList);
                }
            }
            // 自动生成mockurl
            if (tempOpenApis[target_id].target_type === 'api') {
                const userInfo = await User.get(localStorage.getItem('uuid') || '-1');
                if (isPlainObject(userInfo?.config) && userInfo.config?.AUTO_GEN_MOCK_URL > 0) {
                    set(tempOpenApis[target_id], 'mock_url', urlParseLax(value)?.pathname || '');
                }
            }
            set(tempOpenApis[target_id], 'url', value);
        } else if (pathExpression === 'request.query.parameter') {
            let paramsStr = '';
            const url = tempOpenApis[target_id]?.request?.url || '';
            if (
                isArray(tempOpenApis[target_id]?.request?.query?.parameter) &&
                tempOpenApis[target_id]?.request?.query?.parameter.length > 0
            ) {
                tempOpenApis[target_id].request.query.parameter.forEach((ite) => {
                    if (ite.key !== '' && ite.is_checked == 1)
                        paramsStr += `${paramsStr === '' ? '' : '&'}${ite.key}=${ite.value}`;
                });
                const newUrl = `${url.split('?')[0]}${paramsStr !== '' ? '?' : ''}${paramsStr}`;
                set(tempOpenApis[target_id], 'url', newUrl);
                set(tempOpenApis[target_id], 'request.url', newUrl);
            }
        }
        // 小红点判断
        await targetIfChanged(tempOpenApis[target_id], pathExpression);
        // 修改opens 数据 （包括indexedDB和redux）
        await updateOpensById({ id: target_id, data: tempOpenApis[target_id] });
    };

    // 通过id克隆接口
    const cloneTargetById = async (id) => {
        let newTarget = null;
        const tempOpenApis = cloneDeep(open_apis);
        if (tempOpenApis.hasOwnProperty(id)) {
            newTarget = cloneDeep(open_apis[id]);
        } else {
            const collectionTarget = await Collection.get(id);
            newTarget = collectionTarget;
        }
        if (!newTarget && !isObject(newTarget)) {
            return;
        }
        if (newTarget) {
            // 克隆目标
            newTarget.target_id = uuidv4();
            newTarget.is_changed = 1;
            newTarget.is_example = 0;
            if (newTarget?.name === '') newTarget.name = '新建';
            newTarget.name += ' 副本';
            tempOpenApis[newTarget.target_id] = newTarget;
            // Opens.put(newTarget, newTarget.target_id).then(() => {
            //     dispatch({
            //         type: 'opens/coverOpenApis',
            //         payload: tempOpenApis,
            //     });
            //     User.get(localStorage.getItem('uuid') || '-1').then((userInfo) => {
            //         if (isPlainObject(userInfo?.config) && userInfo.config?.AUTO_OPEN_CLONE_NEWAPI_TAB > 0) {
            //             Bus.$emit('updateTargetId', newTarget.target_id);
            //         }
            //     });

            //     const openNavs =
            //         apGlobalConfigStore.get(`project_current:${CURRENT_PROJECT_ID}`)?.open_navs || [];
            //     openNavs.push(newTarget.target_id);
            //     apGlobalConfigStore.set(`project_current:${CURRENT_PROJECT_ID}`, {
            //         open_navs: openNavs,
            //     });
            // });
            Message('success', '克隆成功');
        }
    };
    // 通过对象克隆接口
    const cloneTargetByObj = async (data, showMessage = true) => {
        const newTarget = cloneDeep(data);
        const tempOpenApis = cloneDeep(open_apis);
        if (!newTarget && !isObject(newTarget)) {
            return;
        }
        if (newTarget) {
            // 克隆目标
            newTarget.target_id = uuidv4();
            newTarget.is_changed = 1;
            newTarget.is_example = 0;
            if (newTarget?.name === '') newTarget.name = '新建';
            tempOpenApis[newTarget.target_id] = newTarget;
            // Opens.put(newTarget, newTarget.target_id).then(() => {
            //     dispatch({
            //         type: 'opens/coverOpenApis',
            //         payload: tempOpenApis,
            //     });
            //     User.get(localStorage.getItem('uuid') || '-1').then((userInfo) => {
            //         if (isPlainObject(userInfo?.config) && userInfo.config?.AUTO_OPEN_CLONE_NEWAPI_TAB > 0) {
            //             Bus.$emit('updateTargetId', newTarget.target_id);
            //         }
            //     });

            //     const openNavs =
            //         apGlobalConfigStore.get(`project_current:${CURRENT_PROJECT_ID}`)?.open_navs || [];
            //     openNavs.push(newTarget.target_id);
            //     apGlobalConfigStore.set(`project_current:${CURRENT_PROJECT_ID}`, {
            //         open_navs: openNavs,
            //     });
            // });
            showMessage && Message('success', '克隆成功');
        }
    };

    const addOpenItem = async (data) => {
        // console.log('添加addOpenItem');

        const { type, id, pid } = data;
        let newApi = '';
        if (id) {
            if (open_apis.hasOwnProperty(id)) {
                Bus.$emit('updateTargetId', id);
                return;
            }
            // await Collection.get(id).then((res) => {
            //     newApi = completionTarget(res);
            // });
        } else {
            // console.log(type);
            newApi = getBaseCollection(type);
            newApi.project_id = CURRENT_PROJECT_ID || '-1';
            newApi.is_changed = 1;
            // const userInfo = await User.get(localStorage.getItem('uuid') || '-1');
            if (type === 'api') {
                // 默认请求method
                // newApi.method = userInfo.config?.AJAX_DEFAULT_METHOD || 'POST';
                newApi.method = 'POST'
                // 默认请求方式
                // newApi.request.body.mode = userInfo.config?.AJAX_DEFAULT_MODE || 'none';
                newApi.request.body.mode = 'none';
            }
        }
        if (!newApi) return;

        if (isString(pid) && pid.length > 0) {
            newApi.parent_id = pid;
        }

        addOpensByObj(newApi, true);
    };

    const updateTargetId = async (id) => {
        const uuid = localStorage.getItem('uuid');
        // User.update(uuid, { 'workspace.CURRENT_TARGET_ID': id }).then(() => {
            apGlobalConfigStore.set(`project_current:${CURRENT_PROJECT_ID}`, { CURRENT_TARGET_ID: id });
            dispatch({
                type: 'workspace/updateWorkspaceState',
                payload: { CURRENT_TARGET_ID: id },
            });
        // });
    };

    const addOpenItemByObj = async ({
        Obj,
        pid,
        callback,
    }) => {
        let newItem = cloneDeep(Obj);
        newItem = { ...newItem, target_id: uuidv4(), project_id: CURRENT_PROJECT_ID };
        if (pid && isString(pid)) newItem.parent_id = pid;
        addOpensByObj(newItem, true, callback);
    };

    const removeOpenItem = async (id) => {
        // 判断是否为socket 关闭连接
        // const target = await Opens.get(id);
        if (target?.target_type === 'websocket') {
            // 关闭socket连接
            if (desktop_proxy && desktop_proxy?.connected) {
                desktop_proxy.emit('websocket', {
                    action: 'disconnect',
                    target,
                });
            }
        }
        // await Opens.delete(id).then(() => {
        //     dispatch({
        //         type: 'opens/removeApiById',
        //         payload: { target_id: id },
        //     });

        //     const openNavs =
        //         apGlobalConfigStore.get(`project_current:${CURRENT_PROJECT_ID}`)?.open_navs || [];
        //     const index_1 = openNavs.indexOf(id);
        //     if (id === CURRENT_TARGET_ID) {
        //         let newId = '';
        //         if (index_1 > 0) {
        //             newId = openNavs[index_1 - 1];
        //         } else {
        //             newId = openNavs[index_1 + 1];
        //         }
        //         // 更新当前id
        //         newId && updateTargetId(newId);
        //     }

        //     index_1 > -1 && openNavs.splice(index_1, 1);
        //     apGlobalConfigStore.set(`project_current:${CURRENT_PROJECT_ID}`, { open_navs: openNavs });
        // });
    };

    const saveTargetById = async (data, options = { is_socket: 1 }) => {
        const { id, pid, callback } = data;
        const target_id = id || CURRENT_TARGET_ID;
        const tempOpenApis = cloneDeep(open_apis);
        const tempTarget = tempOpenApis[target_id];
        if (pid && isObject(tempTarget)) tempTarget.parent_id = pid;
        if (!isUndefined(tempTarget) && isObject(tempTarget)) {
            tempTarget.update_day = new Date(new Date().toLocaleDateString()).getTime();
            tempTarget.update_dtime = ~~(new Date().getTime() / 1000);
            tempTarget.is_changed = -1;
            tempTarget.modifier_id = localStorage.getItem('uuid');
            switch (tempTarget?.target_type) {
                case 'api':
                    if (tempTarget.name === '') tempTarget.name = '新建接口';
                    if (isEmpty(tempTarget.mock)) tempTarget.mock = '{}';
                    break;
                case 'doc':
                    if (tempTarget.name === '') tempTarget.name = '新建文本';
                    break;
                case 'websocket':
                    if (tempTarget.name === '') tempTarget.name = '新建webSocket';
                    break;
                default:
                    break;
            }
            // sort 排序
            if (tempTarget?.sort == -1) await targetReorder(tempTarget);

            // 过滤key为空的数据
            filterEmptyKey(tempTarget);

            // 添加最新保存记录
            Recently_Save.put(tempTarget);

            if (options?.is_archive > 0) {
                tempTarget.is_example = 1;
            }

            // 更新collection
            await updateCollectionById({
                id: tempTarget?.target_id,
                data: tempTarget,
                notFindIdNew: true,
            });
            // 更新opens
            await updateOpensById({
                id: tempTarget?.target_id,
                data: tempTarget,
            });
            // 执行接口 失败添加异步任务
            if (tempTarget?.target_type) {
                try {
                    const resp = await lastValueFrom(SaveTargetRequest({ ...tempTarget, ...options }));
                    if (resp?.code === 10000) {
                        // 更新本地数据库版本
                        await updateCollectionById({
                            id: tempTarget?.target_id,
                            data: {
                                ...tempTarget,
                                version: resp?.data?.version,
                            },
                            notFindIdNew: true,
                        });
                        await updateOpensById({
                            id: tempTarget?.target_id,
                            data: {
                                ...tempTarget,
                                version: resp?.data?.version,
                            },
                        });

                        // console.log(resp);
                    } else {
                        // 添加异步任务
                        pushTask(
                            {
                                task_id: tempTarget.target_id,
                                action: 'SAVE',
                                model: tempTarget?.target_type.toUpperCase(),
                                payload: tempTarget.target_id,
                                project_id: CURRENT_PROJECT_ID,
                            },
                            -1
                        );
                    }
                } catch (error) {
                    // 添加异步任务
                    pushTask(
                        {
                            task_id: tempTarget.target_id,
                            action: 'SAVE',
                            model: tempTarget?.target_type.toUpperCase(),
                            payload: tempTarget.target_id,
                            project_id: CURRENT_PROJECT_ID,
                        },
                        -1
                    );
                }
            }

            callback && callback();
        }
    };

    const saveTargetByObj = async (data) => {
        const { Obj, callback, IncompleteObject } = data;
        let tempTarget = {};
        const tempOpenApis = cloneDeep(open_apis);
        if (isPlainObject(IncompleteObject) && isString(IncompleteObject?.target_id)) {
            if (tempOpenApis.hasOwnProperty(IncompleteObject.target_id)) {
                tempTarget = { ...tempOpenApis[IncompleteObject.target_id], ...IncompleteObject };
            } else {
                const collection = await Collection.get(IncompleteObject.target_id);
                if (!isUndefined(collection) && isPlainObject(collection)) {
                    tempTarget = { ...collection, ...IncompleteObject };
                }
            }
        } else {
            tempTarget = Obj;
        }
        // 传入对象 直接存 不走open库
        if (!isUndefined(tempTarget) && isObject(tempTarget) && isString(tempTarget?.target_id)) {
            tempTarget.update_day = new Date(new Date().toLocaleDateString()).getTime();
            tempTarget.update_dtime = ~~(new Date().getTime() / 1000);
            tempTarget.is_changed = -1;
            tempTarget.modifier_id = localStorage.getItem('uuid');
            switch (tempTarget?.target_type) {
                case 'api':
                    if (tempTarget.name === '') tempTarget.name = '新建接口';
                    if (isEmpty(tempTarget.mock)) tempTarget.mock = '{}';
                    break;
                case 'doc':
                    if (tempTarget.name === '') tempTarget.name = '新建文本';
                    break;
                case 'websocket':
                    if (tempTarget.name === '') tempTarget.name = '新建webSocket';
                    break;
                default:
                    break;
            }
            // sort 排序
            if (tempTarget?.sort == -1) await targetReorder(tempTarget);

            // 过滤key为空的数据
            filterEmptyKey(tempTarget);

            // 最近保存记录
            Recently_Save.put(tempTarget);

            // 更新collection
            await updateCollectionById({ id: tempTarget?.target_id, data: tempTarget });

            // open库中有的话 更新
            if (tempOpenApis.hasOwnProperty(tempTarget?.target_id)) {
                await updateOpensById({ id: tempTarget?.target_id, data: tempTarget });
            }

            // 执行接口 失败添加异步任务
            if (tempTarget?.target_type) {
                from(SaveTargetRequest({ ...tempTarget, is_socket: 1 })).subscribe({
                    next(resp) {
                        if (resp?.code === 10000) {
                            // 更新本地数据库版本
                            updateCollectionById({
                                id: tempTarget?.target_id,
                                data: {
                                    ...tempTarget,
                                    version: resp?.data?.version,
                                },
                                notFindIdNew: true,
                            });

                            updateOpensById({
                                id: tempTarget?.target_id,
                                data: {
                                    ...tempTarget,
                                    version: resp?.data?.version,
                                },
                            });
                        } else {
                            // 添加异步任务
                            pushTask(
                                {
                                    task_id: tempTarget.target_id,
                                    action: 'SAVE',
                                    model: tempTarget?.target_type.toUpperCase(),
                                    payload: tempTarget.target_id,
                                    project_id: CURRENT_PROJECT_ID,
                                },
                                -1
                            );
                        }
                    },
                    error() {
                        // 添加异步任务
                        pushTask(
                            {
                                task_id: tempTarget.target_id,
                                action: 'SAVE',
                                model: tempTarget?.target_type.toUpperCase(),
                                payload: tempTarget.target_id,
                                project_id: CURRENT_PROJECT_ID,
                            },
                            -1
                        );
                    },
                });
            }

            callback && callback();
        }
    };

    const backupTargetById = (id) => {
        const tempTarget = open_apis[id];
        if (tempTarget.is_changed > 0) {
            return Message('error', '请先保存当前数据后再备份');
        }
        saveApiBakRequest({
            target_id: id,
            project_id: CURRENT_PROJECT_ID,
        }).subscribe({
            next(resp) {
                if (resp?.code === 10000) Message('success', '备份成功');
            },
        });
    };

    const compareJson = (data) => {
        const { responseUrl, server_json, local_json, version } = data;
        const url = `/${responseUrl.split('/api/')[1]}`;
        let type = CONFILCTURL[url];
        if (type === 'save') {
            type = local_json.target_type;
        }
        if (type === 'env') {
            local_json.env_vars = Object.keys(local_json.env_vars).map((k) => {
                return {
                    ...local_json.env_vars[k],
                    key: k,
                };
            });
            server_json.env_vars = Object.keys(server_json.env_vars).map((k) => {
                return {
                    ...server_json.env_vars[k],
                    key: k,
                };
            });
        }
        const diffList = versionCheck(server_json, local_json, type, version);
        const conflictData = {
            diff: diffList,
            type,
            isArchive: false,
        };
        dispatch({
            type: 'conflict/setConflict',
            payload: conflictData,
        });
        Bus.$emit('openModal', 'ConfilctModal');
    };

    const reloadOpens = () => {
        const openNavs =
            apGlobalConfigStore.get(`project_current:${CURRENT_PROJECT_ID}`)?.open_navs || [];
        // Opens.bulkGet(openNavs).then((res) => {
        //     const open_init_apis = {};
        //     if (res && res.length > 0) {
        //         res.forEach((i) => {
        //             if (i) {
        //                 res.push(i);
        //                 open_init_apis[i.target_id] = completionTarget(i);
        //             }
        //         });
        //     }
        //     dispatch({
        //         type: 'opens/coverOpenApis',
        //         payload: open_init_apis,
        //     });
        // });

        // 恢复上次打开的targetID
        const current_target_id = apGlobalConfigStore.get(
            `project_current:${CURRENT_PROJECT_ID}`
        )?.CURRENT_TARGET_ID;
        dispatch({
            type: 'workspace/updateWorkspaceState',
            payload: { CURRENT_TARGET_ID: current_target_id },
        });
    };

    // 新建open tabs item   参数 type:api/doc/websocket/folder/grpc id:打开的target_id
    useEventBus('addOpenItem', addOpenItem, [CURRENT_PROJECT_ID, open_apis]);

    // 修改当前选中targetID
    useEventBus('updateTargetId', updateTargetId, [CURRENT_PROJECT_ID]);

    // 修改当前target的值
    useEventBus('updateTarget', updateTarget, [open_apis]);

    // 添加open tabs item  通过obj
    useEventBus('addOpenItemByObj', addOpenItemByObj, [open_apis, CURRENT_PROJECT_ID]);

    // 移除opens 某一项
    useEventBus('removeOpenItem', removeOpenItem, [
        CURRENT_PROJECT_ID,
        CURRENT_TARGET_ID,
        desktop_proxy,
    ]);

    // 保存接口 ByID
    useEventBus('saveTargetById', saveTargetById, [open_apis, CURRENT_PROJECT_ID, CURRENT_TARGET_ID]);

    // 保存接口 ByObject （不修改open库）
    useEventBus('saveTargetByObj', saveTargetByObj, [open_apis, CURRENT_PROJECT_ID]);

    // 备份接口
    useEventBus('backupTargetById', backupTargetById, [open_apis, CURRENT_PROJECT_ID]);

    // 修改opens 数据 （包括indexedDB和redux）
    useEventBus('updateOpensById', updateOpensById, [open_apis]);

    // 修改Collection 数据 （包括indexedDB和redux）
    useEventBus('updateCollectionById', updateCollectionById, [CURRENT_PROJECT_ID]);

    // 克隆目标 ByID
    useEventBus('cloneTargetById', cloneTargetById, [open_apis, CURRENT_PROJECT_ID]);

    // 克隆目标 ByObj
    useEventBus('cloneTargetByObj', cloneTargetByObj, [open_apis, CURRENT_PROJECT_ID]);

    // 冲突数据对比
    useEventBus('compareJson', compareJson, []);

    // 重新加载标签页
    useEventBus('reloadOpens', reloadOpens, [CURRENT_PROJECT_ID]);

    // 初始化tabs
    useEffect(() => {
        reloadOpens();
    }, [CURRENT_PROJECT_ID]);
};

export default useOpens;
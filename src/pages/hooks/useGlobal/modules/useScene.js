import { useEffect } from 'react';
import Bus, { useEventBus } from '@utils/eventBus';
import { cloneDeep, isArray, set } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { tap } from 'rxjs';
import { fetchDeleteApi } from '@services/apis';
import { fetchCreateGroup, fetchCreateScene, fetchSceneDetail, fetchCreateSceneFlow, fetchSceneFlowDetail, fetchCreatePre } from '@services/scene';
import { formatSceneData, isURL, createUrl, GetUrlQueryToArray } from '@utils';
import { getBaseCollection } from '@constants/baseCollection';
import { fetchApiDetail } from '@services/apis';

import { global$ } from '../global';

const useScene = () => {
    const dispatch = useDispatch();
    // const nodes = useSelector((store) => store.scene.nodes);
    // const edges = useSelector((store) => store.scene.edges);
    const { id_apis, api_now, open_scene } = useSelector((store) => store.scene);
    // console.log(id_apis);
    const createApiNode = () => {
        const new_node = {
            id: `${nodes.length + 1}`,
            type: 'list',
            data: {
                showOne: nodes.length === 0 ? true : false,
            },
            position: { x: 50, y: 50 }
        };

        const _nodes = cloneDeep(nodes);

        _nodes.push(new_node);

        console.log(_nodes);

        dispatch({
            type: 'scene/updateNodes',
            payload: _nodes
        });
    };

    const updateSceneGroup = (req, callback) => {
        const { id, data, oldValue, from, plan_id } = req;
        console.log(req);

        const group = cloneDeep(oldValue);
        const params = {
            ...group,
            ...data
        };
        fetchCreateGroup(params).subscribe({
            next: (res) => {
                const { code } = res;
                if (code === 0) {
                    callback && callback();
                    // 刷新左侧目录列表
                    global$.next({
                        action: 'RELOAD_LOCAL_SCENE',
                    });
                }
            }
        })
    };

    const updateSceneItem = (req, callback) => {
        const { id, data, oldValue, from, plan_id } = req;
        console.log(req);

        const scene = cloneDeep(oldValue);
        const params = {
            ...scene,
            ...data
        };
        fetchCreateScene(params).subscribe({
            next: (res) => {
                const { code } = res;
                if (code === 0) {
                    callback && callback();
                    // 刷新左侧目录列表
                    global$.next({
                        action: 'RELOAD_LOCAL_SCENE',
                    });
                }
            }
        })
    };

    const dragUpdateScene = ({ ids, targetList }) => {
        const query = {
            team_id: sessionStorage.getItem('team_id'),
            target_id: ids
        };
        const targetDatas = {};
        targetList.forEach(item => {
            targetDatas[item.target_id] = item;
        })
        fetchSceneDetail(query).pipe(
            tap((res) => {
                const { code, data: { scenes } } = res;
                if (code === 0) {
                    scenes.forEach(item => {
                        let newItem = {
                            ...item,
                            parent_id: targetDatas[item.target_id].parent_id,
                            sort: targetDatas[item.target_id].sort
                        }
                        fetchCreateScene(newItem).subscribe();
                    });
                    setTimeout(() => {
                        global$.next({
                            action: 'RELOAD_LOCAL_SCENE',
                        });
                    }, 100);
                    // return targets;
                }
            }),

        )
            .subscribe();
    }

    const saveScene = (nodes, edges, id_apis, node_config, open_scene, callback) => {
        const get_pre = (id, edges) => {
            const pre_list = [];
            edges.forEach(item => {
                if (item.target === id) {
                    pre_list.push(item.source);
                }
            })

            return pre_list;
        }

        const get_next = (id, edges) => {
            const next_list = [];
            edges.forEach(item => {
                if (item.source === id) {
                    next_list.push(item.target);
                }
            })

            return next_list;
        };

        const _nodes = nodes.map(item => {
            const api = id_apis[item.id];
            if (api) {
                return {
                    ...item,
                    api,
                    ...node_config[item.id],
                    pre_list: get_pre(item.id, edges),
                    next_list: get_next(item.id, edges),
                }
            } else {
                return {
                    ...item,
                    ...node_config[item.id],
                    pre_list: get_pre(item.id, edges),
                    next_list: get_next(item.id, edges),
                }
            }
        });
        console.log(open_scene);
        const params = {
            scene_id: parseInt(open_scene.target_id),
            team_id: parseInt(sessionStorage.getItem('team_id')),
            version: 1,
            nodes: _nodes,
            edges,
            // multi_level_nodes: JSON.stringify(formatSceneData(nodes, edges))
            // songsong: formatSceneData(nodes, edges),
        };

        console.log(params);

        // callback && callback();

        // return;

        fetchCreateSceneFlow(params).subscribe({
            next: (res) => {
                const { code } = res;
                if (code === 0) {
                    callback && callback();
                }
            }
        })
    }

    const addNewSceneControl = (id, node_config = {}) => {
        console.log(998998)
        const new_nodes = cloneDeep(node_config);
        new_nodes[id] = {};

        console.log('addNewSceneControl', node_config);

        dispatch({
            type: 'scene/updateNodeConfig',
            payload: new_nodes,
        })
    }

    const addNewSceneApi = (id, id_apis = {}, node_config = {}, api = {}) => {
        console.log(id, id_apis);

        let newApi = cloneDeep(api);

        console.log('newApi', api, newApi, Object.entries(api));

        if (Object.entries(api).length === 0) {
            newApi = getBaseCollection('api');
            newApi.method = 'POST';
            newApi.request.body.mode = 'none';
            newApi.is_changed = false;

            delete newApi['target_id'];
            delete newApi['parent_id'];
        } else {

        }

        let new_apis = cloneDeep(id_apis);
        new_apis[id] = newApi;

        console.log(new_apis);

        dispatch({
            type: 'scene/updateIdApis',
            payload: new_apis,
        })

        let new_nodes = cloneDeep(node_config);

        new_nodes[id] = {};

        dispatch({
            type: 'scene/updateNodeConfig',
            payload: new_nodes,
        })

    }

    const updateNodeConfig = (type, value, id, node_config) => {
        const _node_config = cloneDeep(node_config);
        console.log(_node_config[id], 6666);
        switch (type) {
            case 'weight':
                _node_config[id].weight = value;
                break;
            case 'error_threshold':
                _node_config[id].error_threshold = value;
                break;
            case 'response_threshold':
                _node_config[id].response_threshold = value;
                break;
            case 'request_threshold':
                _node_config[id].request_threshold = value;
                break;
            case 'percent_age':
                _node_config[id].percent_age = value;
                break;
            case 'wait_ms':
                _node_config[id].wait_ms = value;
                break;
            case 'var':
                _node_config[id].var = value;
                break;
            case 'compare':
                _node_config[id].compare = value;
                break;
            case 'val':
                _node_config[id].val = value;
                break;
            case 'remark':
                _node_config[id].val = value;
                break;
            default:
                break;
        }
        dispatch({
            type: 'scene/updateNodeConfig',
            payload: _node_config
        })
    }

    const updateSceneApi = (data, id_apis) => {
        const { id, pathExpression, value } = data;

        set(id_apis[id], pathExpression, value);

        console.log(pathExpression, value);

        console.log(data, id_apis);

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
                if (isArray(id_apis[id].request?.query?.parameter)) {
                    // 提取query
                    const searchParams = GetUrlQueryToArray(urlObj?.search || '');
                    queryList = id_apis[id].request.query.parameter.filter(
                        (item) => item?.is_checked < 0
                    );
                    searchParams.forEach((item) => {
                        const key = item?.key;
                        const value = item?.value;
                        let obj = {};
                        const i = findIndex(id_apis[id].request.query.parameter, { key });
                        if (i !== -1) obj = id_apis[id].request.query.parameter[i];
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
                    set(id_apis[id], 'request.query.parameter', queryList);
                }

                if (isArray(id_apis[id].request?.resful?.parameter)) {
                    // 提取restful
                    const paths = urlObj.pathname.split('/');
                    paths.forEach((p) => {
                        if (p.substring(0, 1) === ':' && p.length > 1) {
                            let obj = {};
                            const i = findIndex(id_apis[id].request?.resful?.parameter, {
                                key: p.substring(1, p.length),
                            });
                            if (i !== -1) obj = id_apis[id].request?.resful?.parameter[i];
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
                    set(id_apis[id], 'request.resful.parameter', restfulList);
                }
            }
            set(id_apis[id], 'url', value);
        } else if (pathExpression === 'request.query.parameter') {
            let paramsStr = '';
            const url = id_apis[id].request?.url || '';
            if (
                isArray(id_apis[id].request?.query?.parameter) &&
                id_apis[id].request?.query?.parameter.length > 0
            ) {
                id_apis[id].request.query.parameter.forEach((ite) => {
                    if (ite.key !== '' && ite.is_checked == 1)
                        paramsStr += `${paramsStr === '' ? '' : '&'}${ite.key}=${ite.value}`;
                });
                const newUrl = `${url.split('?')[0]}${paramsStr !== '' ? '?' : ''}${paramsStr}`;
                set(id_apis[id], 'url', newUrl);
                set(id_apis[id], 'request.url', newUrl);
            }
        } else if (pathExpression === 'name') {
            set(id_apis[id], 'name', value);
        }

        set(id_apis[id], 'is_changed', true);
        console.log(id_apis);
        // dispatch({
        //     type: 'scene/updateIdApis',
        //     payload: id_apis,
        // });
        let _api_now = cloneDeep(id_apis[id]);
        _api_now.id = id;
        console.log(_api_now);
        dispatch({
            type: 'scene/updateApiNow',
            payload: _api_now
        });
    }

    const saveSceneApi = (api_now, id_apis, callback) => {
        const _id_apis = cloneDeep(id_apis);
        api_now.is_changed = false;
        const id = api_now.id;
        delete api_now['id'];
        _id_apis[id] = api_now;
        console.log(_id_apis);
        dispatch({
            type: 'scene/updateIdApis',
            payload: _id_apis,
        });

        callback && callback();
    }

    const importApiList = (ids) => {
        const query = {
            team_id: sessionStorage.getItem('team_id'),
            target_ids: ids,
        };
        fetchApiDetail(query).subscribe({
            next: (res) => {
                const { code, data: { targets } } = res;
                // 1. 添加nodes节点
                // 2. 添加id_apis映射
                dispatch({
                    type: 'scene/updateImportNode',
                    payload: targets,
                })
            }
        })
    }

    const addOpenScene = (id, data) => {
        console.log(id, data);
        const { target_id } = id;
        const query = {
            team_id: sessionStorage.getItem('team_id'),
            scene_id: target_id,
        };
        fetchSceneFlowDetail(query).subscribe({
            next: (res) => {
                const { data } = res;

                dispatch({
                    type: 'scene/updateOpenScene',
                    payload: data || { target_id, },
                })
            }
        })
    }

    const deleteScene = (id, callback) => {
        const params = {
            target_id: parseInt(id),
        };
        fetchDeleteApi(params).subscribe({
            next: (res) => {
                global$.next({
                    action: 'RELOAD_LOCAL_SCENE',
                });
                callback && callback(res.code);
            }
        })
    }

    useEventBus('createApiNode', createApiNode);
    useEventBus('updateSceneGroup', updateSceneGroup);
    useEventBus('updateSceneItem', updateSceneItem);
    useEventBus('dragUpdateScene', dragUpdateScene);
    useEventBus('saveScene', saveScene);
    useEventBus('addNewSceneApi', addNewSceneApi);
    useEventBus('updateSceneApi', updateSceneApi);
    useEventBus('saveSceneApi', saveSceneApi);
    useEventBus('updateNodeConfig', updateNodeConfig);
    useEventBus('addNewSceneControl', addNewSceneControl);
    useEventBus('importApiList', importApiList);
    useEventBus('addOpenScene', addOpenScene);
    useEventBus('deleteScene', deleteScene);
};

export default useScene;
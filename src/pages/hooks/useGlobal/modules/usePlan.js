import { useEffect } from 'react';
import Bus, { useEventBus } from '@utils/eventBus';
import { cloneDeep, isArray, set } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { tap, filter, map, concatMap, switchMap, from } from 'rxjs';
import { fetchSceneFlowDetail, fetchCreateSceneFlow, fetchSceneDetail, fetchCreateScene, fetchBatchFlowDetail } from '@services/scene';
import { fetchCreatePre, fetchCreatePlan, fetchDeletePlan } from '@services/plan';
import { formatSceneData, isURL, createUrl, GetUrlQueryToArray } from '@utils';
import { getBaseCollection } from '@constants/baseCollection';
import { fetchApiDetail } from '@services/apis';
import { getSceneList$ } from '@rxUtils/scene';
import { getUserConfig$ } from '@rxUtils/user';
import QueryString from 'qs';

import { global$ } from '../global';

const usePlan = () => {
    const dispatch = useDispatch();
    const savePreConfig = ({ task_type, mode, cron_expr, mode_conf }, callback) => {
        const params = {
            team_id: parseInt(localStorage.getItem('team_id')),
            task_type,
            mode,
            cron_expr,
            mode_conf
        };

        fetchCreatePre(params).subscribe({
            next: (res) => {
                console.log(res);

                callback && callback();
            }
        })
    };

    const createPlan = ({ name, remark }, callback) => {
        const params = {
            team_id: parseInt(localStorage.getItem('team_id')),
            name,
            remark,
        };

        fetchCreatePlan(params).subscribe({
            next: (res) => {
                console.log(res);
                const { code, data } = res;

                if (code === 0) {
                    dispatch({
                        type: 'plan/updateRefreshList',
                        payload: true
                    })
                }
                callback && callback(code);
            }
        })
    }

    const deletePlan = (id, callback) => {
        console.log(id);
        const params = {
            team_id: parseInt(localStorage.getItem('team_id')),
            plan_id: parseInt(id),
        };
        fetchDeletePlan(params).subscribe({
            next: (res) => {
                const { code } = res;
                if (code === 0) {
                    dispatch({
                        type: 'plan/updateRefreshList',
                        payload: true
                    })
                }
                callback && callback(code);
            }
        })
    };

    const addOpenPlanScene = (id, id_apis, node_config) => {
        console.log(id, id_apis, node_config);
        dispatch({
            type: 'plan/updateOpenScene',
            payload: {},
        })
        const { target_id } = id;
        const query = {
            team_id: localStorage.getItem('team_id'),
            scene_id: target_id,
        };
        fetchSceneFlowDetail(query).subscribe({
            next: (res) => {
                const { data } = res;
                console.log('1111111111', data);

                if (data && data.nodes.length > 0) {
                    const { nodes } = data;
                    const idList = [];
                    const apiList = [];
                    const configList = [];
                    nodes.forEach(item => {
                        const {
                            id,
                            // api配置
                            api,
                            // node其他配置
                            // api
                            weight,
                            mode,
                            error_threshold,
                            response_threshold,
                            request_threshold,
                            percent_age,
                            // 等待控制器
                            wait_ms,
                            // 条件控制器
                            var: _var,
                            compare,
                            val,
                            remark,
                        } = item;
                        const config = {
                            weight,
                            mode,
                            error_threshold,
                            response_threshold,
                            request_threshold,
                            percent_age,
                            wait_ms,
                            var: _var,
                            compare,
                            val,
                            remark
                        };
                        if (api) {
                            api.id = id;
                            apiList.push(api);
                        }
                        // api && apiList.push(api);
                        config.id = id;
                        configList.push(config);
                        idList.push(id);

                    });
                    console.log('222222222222222222222', data);
                    Bus.$emit('addNewPlanApi', idList, id_apis, node_config, apiList, configList, 'plan');
                }

                dispatch({
                    type: 'plan/updateOpenScene',
                    payload: data || { target_id, },
                })
            }
        })
    };

    const addNewPlanApi = (id, id_apis = {}, node_config = {}, api = {}, config = {}, from) => {
        console.log(id, id_apis, node_config, api, config);

        let newApi = cloneDeep(api);

        let _id = isArray(id) ? id : [id];
        let _api = isArray(api) ? api : [api];
        let _config = isArray(config) ? config : [config];
        let length = _config.length;
        let new_apis = cloneDeep(id_apis);
        let new_nodes = cloneDeep(node_config);

        for (let i = 0; i < _api.length; i++) {
            let newApi = cloneDeep(_api[i]);

            // console.log('newApi', api, newApi, Object.entries(_api[i]));

            if (Object.entries(_api[i]).length === 0) {
                newApi = getBaseCollection('api');
                newApi.method = 'POST';
                newApi.request.body.mode = 'none';
                newApi.is_changed = false;

                delete newApi['target_id'];
                delete newApi['parent_id'];
            } else {

            }

            new_apis[newApi.id] = newApi;

            console.log(new_apis);

            if (from === 'scene') {
                dispatch({
                    type: 'scene/updateIdApis',
                    payload: new_apis,
                })
            } else {
                dispatch({
                    type: 'plan/updateIdApis',
                    payload: new_apis,
                })
            }
        }

        for (let i = 0; i < _config.length; i++) {

            new_nodes[_id[i]] = _config[i];

            if (from === 'scene') {
                dispatch({
                    type: 'scene/updateNodeConfig',
                    payload: new_nodes,
                })
            } else {
                dispatch({
                    type: 'plan/updateNodeConfig',
                    payload: new_nodes,
                })
            }

        }
    };

    const saveScenePlan = (nodes, edges, id_apis, node_config, open_scene, id, callback) => {
        const get_pre = (id, edges) => {
            const pre_list = [];
            edges.forEach(item => {
                if (item.target === id) {
                    pre_list.push(item.source);
                }
            })

            return pre_list;
        };

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
            scene_id: parseInt(open_scene.target_id ? open_scene.target_id : open_scene.scene_id),
            team_id: parseInt(localStorage.getItem('team_id')),
            version: 1,
            nodes: _nodes,
            edges,
            source: 2,
            plan_id: id,
            // multi_level_nodes: JSON.stringify(formatSceneData(nodes, edges))
            // songsong: formatSceneData(nodes, edges),
        };

        console.log(params);

        fetchCreateSceneFlow(params).subscribe({
            next: (res) => {
                const { code } = res;
                if (code === 0) {
                    callback && callback();
                }
            }
        })
    };

    const copyPlan = (data, callback) => {
        const { name, remark } = data;
        // 1. 创建计划
        // 2. 查询原计划的菜单列表
        // 3. 遍历查询每个分组/场景详情
        // 4. 遍历创建每个分组/场景
        // 5. 遍历查询每个场景流程详情
        // 6. 遍历创建每个场景流程详情
        // 7. 创建任务配置

        const params = {
            name,
            remark,
            team_id: parseInt(localStorage.getItem('team_id')),
        };
        fetchCreatePlan(params).pipe(
            concatMap((res) => {
                const { data: { plan_id } } = res;
                const query = {
                    page: 1,
                    size: 100,
                    team_id: localStorage.getItem('team_id'),
                    source: 2,
                    plan_id,
                };

                return getSceneList$(query, 'plan');
            }),
            concatMap((res) => {
                const { data: { targets } } = res;
                targets.forEach(item => {
                    const _item = cloneDeep(item);
                    delete _item['target_id'];
                    delete _item['created_user_id'];
                    delete _item['recent_user_id'];


                })
            })
        ).subscribe();
    };

    const updatePlanApi = (data, id_apis) => {
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
            type: 'plan/updateApiNow',
            payload: _api_now
        });
    }

    useEffect(() => {
        global$
            .pipe(
                filter((d) => d.action === 'RELOAD_LOCAL_PLAN'),
                map((d) => {
                    console.log(d);
                    return {
                        params: d.payload,
                        id: d.id
                    }
                }),
                concatMap((e) => getSceneList$(e.params, 'plan', e.id)),
                // tap(e => console.log(e)),
                tap(e => {
                    const { data: { targets } } = e;
                    const tempPlanList = {};
                    if (targets instanceof Array) {
                        for (let i = 0; i < targets.length; i++) {
                            tempPlanList[targets[i].target_id] = targets[i];
                        }
                    }
                    console.log('计划左侧菜单栏', tempPlanList);
                    dispatch({
                        type: 'plan/updatePlanMenu',
                        payload: tempPlanList
                    })
                })
            )
            .subscribe();
    }, []);

    const dragUpdatePlan = ({ ids, targetList }) => {
        const query = {
            team_id: localStorage.getItem('team_id'),
            target_id: ids,
            // source: 2,
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
    };

    const importSceneList = (ids, plan_id) => {
        console.log(ids);
        const query = {
            team_id: localStorage.getItem('team_id'),
            target_id: ids,
        };
        // 被拷贝的场景list
        let _scenes = [];
        // 被拷贝的场景流程list
        let _flows = [];
        // 1. 批量获取场景基本信息
        // 2. 批量获取场景流程信息
        // 3. 批量创建基本场景
        // 4. 批量创建场景流程
        fetchSceneDetail(QueryString.stringify(query, { indices: false })).pipe(
            concatMap(res => {
                const { data: { scenes } } = res;
                _scenes = scenes;
                const query = {
                    team_id: localStorage.getItem('team_id'),
                    scene_id: ids,
                };
                return from(fetchBatchFlowDetail(QueryString.stringify(query, { indices: false }))).pipe(
                    tap(res => {
                        const { data: { flows } } = res;
                        _flows = flows;
                        console.log('_flows', _flows);
                        return res;
                    })
                )
            }),
            concatMap(res => {
                console.log('resresresres', res);
                _scenes.forEach(item => {
                    const _target_id = item.target_id;
                    const _scene = cloneDeep(item);
                    delete _scene['target_id'];
                    _scene.parent_id = 0;
                    _scene.source = 2;
                    _scene.plan_id = parseInt(plan_id);

                    fetchCreateScene(_scene).pipe(
                        tap(res => {
                            const { data: { target_id } } = res;
                            const flow_item = _flows.find(item => item.scene_id === _target_id);
                            console.log(flow_item, 'flow_itemmmmmmmm');
                            flow_item.nodes.forEach(item => {
                                item.data.from = 'plan';
                            });

                            const new_flow = {
                                ...flow_item,
                                scene_id: target_id,
                            };
                            console.log(new_flow, 'new_flowwwwwwwwwwwww');

                            fetchCreateSceneFlow(new_flow).subscribe();
                        })
                    ).subscribe();
                })
                return getUserConfig$();
            }),
            concatMap(res => {
                global$.next({
                    action: 'RELOAD_LOCAL_PLAN',
                    id: plan_id,
                });
            })
        ).subscribe();
    };

    const addNewPlanControl = (id, node_config = {}) => {
        const new_nodes = cloneDeep(node_config);
        new_nodes[id] = {};

        console.log('addNewPlanControl', new_nodes);

        dispatch({
            type: 'plan/updateNodeConfig',
            payload: new_nodes,
        })
    };

    const importSceneApi = (ids) => {
        const query = {
            team_id: localStorage.getItem('team_id'),
            target_ids: ids,
        };
        fetchApiDetail(QueryString.stringify(query, { indices: false })).subscribe({
            next: (res) => {
                const { code, data: { targets } } = res;
                // 1. 添加nodes节点
                // 2. 添加id_apis映射
                dispatch({
                    type: 'plan/updateImportNode',
                    payload: targets,
                })
            }
        })
    };

    const savePlanApi = (api_now, id_apis, callback) => {
        const _id_apis = cloneDeep(id_apis);
        api_now.is_changed = false;
        const id = api_now.id;
        delete api_now['id'];
        _id_apis[id] = api_now;
        console.log('savePlanApi', _id_apis);
        dispatch({
            type: 'plan/updateIdApis',
            payload: _id_apis,
        });

        callback && callback();
    }

    useEventBus('savePreConfig', savePreConfig);
    useEventBus('createPlan', createPlan);
    useEventBus('deletePlan', deletePlan);
    useEventBus('addOpenPlanScene', addOpenPlanScene);
    useEventBus('addNewPlanApi', addNewPlanApi);
    useEventBus('saveScenePlan', saveScenePlan);
    useEventBus('copyPlan', copyPlan);
    useEventBus('dragUpdatePlan', dragUpdatePlan);
    useEventBus('importSceneList', importSceneList);
    useEventBus('addNewPlanControl', addNewPlanControl);
    useEventBus('importSceneApi', importSceneApi);
    useEventBus('savePlanApi', savePlanApi);
    useEventBus('updatePlanApi', updatePlanApi);
};

export default usePlan;
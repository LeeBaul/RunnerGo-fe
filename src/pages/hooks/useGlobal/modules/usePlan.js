import { useEffect } from 'react';
import Bus, { useEventBus } from '@utils/eventBus';
import { cloneDeep, isArray, set } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { tap, filter, map, concatMap, switchMap } from 'rxjs';
import { fetchSceneFlowDetail } from '@services/scene';
import { fetchCreatePre, fetchCreatePlan, fetchDeletePlan } from '@services/plan';
import { formatSceneData, isURL, createUrl, GetUrlQueryToArray } from '@utils';
import { getBaseCollection } from '@constants/baseCollection';
import { fetchApiDetail } from '@services/apis';
import { getSceneList$ } from '@rxUtils/scene';

import { global$ } from '../global';

const usePlan = () => {
    const dispatch = useDispatch();
    const savePreConfig = ({ task_type, mode, cron_expr, mode_conf }, callback) => {
        const params = {
            team_id: parseInt(sessionStorage.getItem('team_id')),
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
            team_id: parseInt(sessionStorage.getItem('team_id')),
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
            team_id: parseInt(sessionStorage.getItem('team_id')),
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

    const addOpenPlanScene = (id, data) => {
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
                    type: 'plan/updateOpenScene',
                    payload: data || { target_id, },
                })
            }
        })
    };

    const addNewPlanApi = (id, id_apis = {}, node_config = {}, api = {}) => {
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
            type: 'plan/updateIdApis',
            payload: new_apis,
        })

        let new_nodes = cloneDeep(node_config);

        new_nodes[id] = {};

        dispatch({
            type: 'plan/updateNodeConfig',
            payload: new_nodes,
        })
    };

    const saveScenePlan = (nodes, edges, id_apis, node_config, open_scene, callback) => {
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
            team_id: parseInt(sessionStorage.getItem('team_id')),
            version: 1,
            nodes: _nodes,
            edges,
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
    }, [])

    useEventBus('savePreConfig', savePreConfig);
    useEventBus('createPlan', createPlan);
    useEventBus('deletePlan', deletePlan);
    useEventBus('addOpenPlanScene', addOpenPlanScene);
    useEventBus('addNewPlanApi', addNewPlanApi);
    useEventBus('saveScenePlan', saveScenePlan);
};

export default usePlan;
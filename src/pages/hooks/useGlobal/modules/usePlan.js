import { useEffect } from 'react';
import Bus, { useEventBus } from '@utils/eventBus';
import { cloneDeep, isArray, set } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { tap, filter, map, concatMap, switchMap } from 'rxjs';
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
};

export default usePlan;
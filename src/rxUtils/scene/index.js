import { fetchSceneList } from '@services/scene';
import { from, tap } from 'rxjs';

export const getSceneList$ = (params, _from = 'scene', plan_id) => {
    console.log('getSceneList$', params, _from, plan_id);
    let defaultParams = {};
    if (_from === 'scene') {
        defaultParams = {
            page: 1,
            size: 100,
            team_id: localStorage.getItem('team_id'),
            source: 1,
        };
    } else {
        defaultParams = {
            page: 1,
            size: 100,
            team_id: localStorage.getItem('team_id'),
            source: 2,
            plan_id,
        };
    }
    console.log('defaultParams', defaultParams);
    return from(fetchSceneList(params ? params : defaultParams).pipe(
        tap((res) => {
            console.log(res);
            // return res;
        })
    ))
}
import { fetchSceneList } from '@services/scene';
import { from, tap } from 'rxjs';

export const getSceneList$ = (params) => {
    const defaultParams = {
        page: 1,
        size: 20,
        team_id: sessionStorage.getItem('team_id'),
    };
    return from(fetchSceneList(params ? params : defaultParams))
}
import ajax from './ajax';

// 创建/修改分组
export const fetchCreateGroup = (
    params
) => ajax('post', '/management/api/v1/group/save', 'json', false, params);

// 创建/修改场景
export const fetchCreateScene = (
    params
) => ajax('post', '/management/api/v1/scene/save', 'json', false, params);

// 获取分组/场景列表
export const fetchSceneList = (
    query
) => ajax('get', '/management/api/v1/scene/list', 'json', false, {}, query);

// 获取场景流程
export const fetchSceneFlow = (
    query
) => ajax('get', '/management/api/v1/scene/flow/get', 'json', false, {}, query);

// 创建/修改场景流程
export const fetchCreateSceneFlow = (
    params
) => ajax('post', '/management/api/v1/scene/flow/save', 'json', false, params);
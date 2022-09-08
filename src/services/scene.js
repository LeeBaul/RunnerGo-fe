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

// 获取场景详情
export const fetchSceneDetail = (
    query
) => ajax('get', '/management/api/v1/scene/detail', 'json', false, {}, query);

// 获取分组详情
export const fetchGroupDetail = (
    query
) => ajax('get', '/management/api/v1/group/detail', 'json', false, {}, query);

// 获取场景流程详情
export const fetchSceneFlowDetail = (
    query
) => ajax('get', '/management/api/v1/scene/flow/get', 'json', false, {}, query);

// 批量获取场景流程
export const fetchBatchFlowDetail = (
    query
) => ajax('get', '/management/api/v1/scene/flow/batch/get', 'json', false, {}, query);

// 获取场景变量
export const fetchSceneVar = (
    query
) => ajax('get', '/management/api/v1/variable/scene/list', 'json', false, {}, query);

// 同步场景变量
export const fetchChangeVar = (
    params
) => ajax('post', '/management/api/v1/variable/scene/sync', 'json', false, params);

// 导入场景变量
export const fetchImportVar = (
    params
) => ajax('post', '/management/api/v1/variable/scene/import', 'json', false, params);

// 获取导入场景变量历史
export const fetchImportList = (
    query
) => ajax('get', '/management/api/v1/variable/scene/import/list', 'json', false, {}, query);
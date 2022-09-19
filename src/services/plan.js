import ajax from './ajax';

// 获取计划列表
export const fetchPlanList = (
    query
) => ajax('get', '/management/api/v1/plan/list', 'json', false, {}, query);

// 获取计划详情
export const fetchPlanDetail = (
    query
) => ajax('get', '/management/api/v1/plan/detail', 'json', false, {}, query);

// 创建/修改计划
export const fetchCreatePlan = (
    params
) => ajax('post', '/management/api/v1/plan/save', 'json', false, params);

// 获取预设配置
export const fetchPreConfig = (
    query
) => ajax('get', '/management/api/v1/plan/preinstall/detail', 'json', false, {}, query);

// 创建/修改预设配置
export const fetchCreatePre = (
    params
) => ajax('post', '/management/api/v1/plan/preinstall/save', 'json', false, params);

// 删除计划
export const fetchDeletePlan = (
    params
) => ajax('post', '/management/api/v1/plan/delete', 'json', false, params);

// 保存计划
export const fetchSavePlan = (
    params
) => ajax('post', '/management/api/v1/plan/task/save', 'json', false, params);

// 执行计划
export const fetchRunPlan = (
    params
) => ajax('post', '/management/api/v1/plan/run', 'json', false, params);

// 停止计划
export const fetchStopPlan = (
    params
) => ajax('post', '/management/api/v1/plan/stop', 'json', false, params);
import ajax from './ajax';

// 获取首页控制台相关内容
export const fetchDashBoardInfo = (
    query
) => ajax('get', '/management/api/v1/dashboard/default', 'json', false, {}, query);

// 获取运行中的计划
export const fetchRunningPlan = (
    query
) => ajax('get', '/management/api/v1/dashboard/underway_plans', 'json', false, {}, query);

// 获取操作日志列表
export const fetchOperationLog = (
    query
) => ajax('get', '/management/api/v1/operation/list', 'json', false, {}, query);
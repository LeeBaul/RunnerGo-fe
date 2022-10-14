import ajax from './ajax';

// 获取报告列表
export const fetchReportList = (
    query
) => ajax('get', '/management/api/v1/report/list', 'json', false, {}, query);

// 压力机监控
export const fetchMachine = (
    query
) => ajax('get', '/management/api/v1/report/machine', 'json', false, {}, query);

// 删除报告
export const fetchDeleteReport = (
    params
) => ajax('post', '/management/api/v1/report/delete', 'json', false, params);

// 获取报告详情
export const fetchReportDetail = (
    query
) => ajax('get', '/management/api/v1/report/detail', 'json', false, {}, query);

// 获取debug日志
export const fetchDebugLog = (
    query
) => ajax('get', '/management/api/v1/report/debug', 'json', false, {}, query);

// 获取报告任务详情
export const fetchReportInfo = (
    query
) => ajax('get', '/management/api/v1/report/task_detail', 'json', false, {}, query);

// 设置debug模式
export const fetchSetDebug = (
    params
) => ajax('post', '/management/api/v1/report/debug/setting', 'json', false, params);

// 停止报告
export const fetchStopReport = (
    params
) => ajax('post', '/management/api/v1/report/stop', 'json', false, params);

// 获取当前用户选择的debug模式
export const fetchGetDebug = (
    query
) => ajax('get', '/management/api/v1/report/debug/detail', 'json', false, {}, query);
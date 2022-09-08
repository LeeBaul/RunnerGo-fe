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
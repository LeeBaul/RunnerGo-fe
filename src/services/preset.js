import ajax from './ajax';

// 保存预设配置
export const fetchSavePreset = (
    params
) => ajax('post', '/management/api/v1/preinstall/save', 'json', false, params);

// 获取预设配置列表
export const fetchPresetList = (
    params
) => ajax('post', '/management/api/v1/preinstall/list', 'json', false, params);

// 获取预设配置详情
export const fetchPresetDetail = (
    params
) => ajax('post', '/management/api/v1/preinstall/detail', 'json', false, params);
 
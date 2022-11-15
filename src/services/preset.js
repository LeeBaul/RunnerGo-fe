import ajax from './ajax';

// 保存预设配置
export const fetchSavePreset = (
    params
) => ajax('post', '/management/api/v1/preinstall/save', 'json', false, params);

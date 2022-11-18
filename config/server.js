// 后端接口地址
export const RD_BaseURL = {
    // development: '172.17.101.188:20123/',
    development: '',
    test: '',
    production: '',
};

// 后端文件存储地址
export const RD_FileURL = '';


export const RD_BASE_URL = RD_BaseURL[NODE_ENV];

export default {
    RD_BASE_URL,
};

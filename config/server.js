// 后端接口地址
const RD_BaseURL = {
    // development: '172.17.101.188:20123/',
    development: 'https://kpmanage.apipost.cn',
    test: 'https://kpmanage.apipost.cn',
    production: 'https://v7-beta-api.apipost.cn/',
};

// 后端文档分享地址
const RD_ShareURL = {
    development: 'https://console-docs.apipost.cn/preview/',
    test: 'https://console-docs.apipost.cn/preview/',
    production: 'https://v7-beta-doc.apipost.cn/preview/',
};

// 后端Mock服务地址
const RD_mockUrl = {
    development: 'https://console-mock.apipost.cn/app/mock/project',
    test: 'https://console-mock.apipost.cn/app/mock/project',
    production: 'https://console-mock.apipost.cn/app/mock/project',
};

// 协作websocke地址
const RD_websocketUrl = {
    development: 'wss://dev_tools_env_test_socket.apipost.cn/v6/apipost.io',
    test: 'wss://dev_tools_env_test_socket.apipost.cn/v6/apipost.io',
    production: 'wss://v7-beta-socket.apipost.cn/v6/apipost.io',
};

// 云端代理scoket地址
const Cloud_proxyUrl = {
    // development: 'http://127.0.0.1:10036',
    development: 'https://v7-test-proxy.apipost.cn',
    test: 'https://v7-test-proxy.apipost.cn',
    production: 'https://v7-test-proxy.apipost.cn',
};

// 统计在线用户socket地址
const Live_socket_url = {
    development: 'ws://172.17.101.188:8089/v7/live.io',
    test: 'ws://172.17.101.188:8089/v7/live.io',
    production: 'ws://172.17.101.188:8089/v7/live.io',
};

export const RD_BASE_URL = RD_BaseURL[NODE_ENV];

export const RD_SHARE_URL = RD_ShareURL[NODE_ENV];

export const RD_MOCK_URL = RD_mockUrl[NODE_ENV];

export const RD_WEBSOCKET_URL = RD_websocketUrl[NODE_ENV];

export const CLOUD_PROXY_URL = Cloud_proxyUrl[NODE_ENV];

export const LIVE_SOCKET_URL = Live_socket_url[NODE_ENV];

export default {
    RD_BASE_URL,
    RD_SHARE_URL,
    RD_MOCK_URL,
    RD_WEBSOCKET_URL,
    CLOUD_PROXY_URL,
    LIVE_SOCKET_URL,
};

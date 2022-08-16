import Beta from '@assets/icons/beta.svg';

export const FOLDER_MENUS = [
    {
        type: 'create',
        title: '新建',
        action: '',
        children: [
            {
                type: 'createApi',
                title: '新建接口',
                action: 'createApi',
            },
            {
                type: 'createText',
                title: '新建文本',
                action: 'createText',
            },
            {
                type: 'createChildFolder',
                title: '新建子目录',
                action: 'createChildFolder',
            },
            {
                type: 'createWebsocket',
                title: '新建websocket',
                action: 'createWebsocket',
                tips: (
                    <Beta
                        style={{ marginLeft: '4px', width: 20, height: 14, verticalAlign: 'text-bottom' }}
                    />
                ),
            },
            {
                type: 'createGrpc',
                title: '新建Grpc',
                action: 'createGrpc',
            },
        ],
    },
    {
        type: 'pasteToCurrent',
        title: '粘贴至该目录',
        action: 'pasteToCurrent',
        // tips: `${ctrl} + V`,
    },
    {
        type: 'modifyFolder',
        title: '编辑目录',
        action: 'modifyFolder',
    },
    {
        type: 'shareFolder',
        title: '分享目录',
        action: 'shareFolder',
    },
    {
        type: 'copyFolder',
        title: '复制目录',
        action: 'copyFolder',
        // tips: `${ctrl} + C`,
    },
    {
        type: 'deleteFolder',
        title: '删除目录',
        action: 'deleteFolder',
    },
];

export default FOLDER_MENUS;

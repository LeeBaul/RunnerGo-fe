import Beta from '@assets/icons/beta.svg';

export const FOLDER_MENUS = [
    // {
    //     type: 'create',
    //     title: '新建',
    //     action: '',
    // },
    // {
    //     type: 'pasteToCurrent',
    //     title: '粘贴至该目录',
    //     action: 'pasteToCurrent',
    //     // tips: `${ctrl} + V`,
    // },
    {
        type: 'modifyFolder',
        title: '编辑目录',
        action: 'modifyFolder',
    },
    // {
    //     type: 'shareFolder',
    //     title: '分享目录',
    //     action: 'shareFolder',
    // },
    // {
    //     type: 'copyFolder',
    //     title: '复制目录',
    //     action: 'copyFolder',
    //     // tips: `${ctrl} + C`,
    // },
    {
        type: 'deleteFolder',
        title: '删除目录',
        action: 'deleteFolder',
    },
];

export default FOLDER_MENUS;



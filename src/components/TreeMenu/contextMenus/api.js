import { isMac } from '@utils/common';

const ctrl = isMac() ? 'Cmd' : 'Ctrl';

export const API_MENUS = [
    // {
    //     type: 'shareApi',
    //     title: '分享接口',
    //     action: 'shareApi',
    // },
    // {
    //     type: 'cloneApi',
    //     title: '克隆接口',
    //     action: 'cloneApi',
    //     tips: `${ctrl} + D`,
    // },
    {
        type: 'cloneApi',
        title: '克隆接口',
        action: 'cloneApi',
        // tips: `${ctrl} + C`,
    },
    {
        type: 'copyApi',
        title: '复制接口',
        action: 'copyApi'
    },
    {
        type: 'deleteApi',
        title: '删除接口',
        action: 'deleteApi',
    },
];

export default API_MENUS;

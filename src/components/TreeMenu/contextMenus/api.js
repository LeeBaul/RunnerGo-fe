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
        type: 'copyApi',
        title: '克隆接口',
        action: 'copyApi',
        // tips: `${ctrl} + C`,
    },
    {
        type: 'deleteApi',
        title: '删除接口',
        action: 'deleteApi',
    },
];

export default API_MENUS;

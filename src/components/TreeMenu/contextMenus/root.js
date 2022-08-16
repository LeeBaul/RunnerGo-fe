import { isMac } from '@utils/common';

const ctrl = isMac() ? 'Cmd' : 'Ctrl';

export const ROOT_MENUS = [
    {
        type: 'createApis',
        title: '新建接口',
        action: 'createApis',
        tips: `${ctrl} + T`,
    },
    {
        type: 'pasteToRoot',
        title: '粘贴接口/目录',
        action: 'pasteToRoot',
        // tips: `${ctrl} + V`,
    },
];

export default ROOT_MENUS;

import { 
    Lately as SvgLately, 
    Apis as SvgApis, 
    Answer as SvgDesign, 
    ShareDoc as SvgShare, 
    Processtest as SvgTest, 
    Project as SvgProject, 
    Doc as SvgDoc, 
    Delete as RecycleIcon
 } from 'adesign-react/icons';

export const leftBarItems = [
    {
        type: 'index',
        title: '首页',
        icon: SvgApis,
        link: '/index',
    },
    {
        type: 'apis',
        title: '接口管理',
        icon: SvgApis,
        link: '/apis',
    },
    {
        type: 'scene',
        title: '场景管理',
        icon: SvgApis,
        link: '/scene',
    },
    {
        type: 'plan',
        title: '计划管理',
        icon: SvgApis,
        link: '/plan',
    },
    {
        type: 'report',
        title: '报告管理',
        icon: SvgApis,
        link: '/report',
    },
    {
        type: 'machine',
        title: '机器管理',
        icon: SvgApis,
        link: '/machine',
    },
    {
        type: 'doc',
        title: '使用文档',
        icon: SvgApis,
        link: '/doc',
    },
];


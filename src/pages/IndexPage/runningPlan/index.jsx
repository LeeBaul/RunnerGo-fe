import React from 'react';
import './index.less';
import { Right as SvgRight } from 'adesign-react/icons';

const RunningPlan = () => {
    const planList = [
        {
            id: 101,
            name: '测试计划01',
        },
        {
            id: 102,
            name: '测试计划02',
        },
        {
            id: 103,
            name: '测试计划03',
        },
        {
            id: 104,
            name: '测试计划04',
        },
        {
            id: 105,
            name: '测试计划05',
        },
    ];
    return (
        <div className='running-plan'>
            <div className='running-top'>
                <div className='running-top-left'>
                    运行中
                </div>
                <div className='running-top-right'>
                    查看更多
                    <SvgRight />
                </div>
            </div>
            <div className='running-bottom'>
                {
                    planList.map((item, index) => (
                        <div className='plan-detail' key={index}>
                            <p>{ item.name }</p>
                            <div className='progress'></div>
                            <p>查看详情</p>
                        </div>
                    ))
                }
            </div>
        </div>
    )
};

export default RunningPlan;
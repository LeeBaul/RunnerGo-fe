import React from 'react';
import './index.less';
import Info from './info';
import RunningPlan from './runningPlan';
import HandleLog from './handleLog';
import RecentReport from './recentReport';

const IndexPage = () => {
    return (
        <div className='index-page'>
            <div className='index-top'>
                <Info />
                <RunningPlan />
                <HandleLog />
            </div>
            <div className='index-bottom'>
                <RecentReport />
            </div>
        </div>
    )
};

export default IndexPage;
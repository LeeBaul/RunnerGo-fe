import React, { useState } from 'react';
import './index.less';
import Info from './info';
import RunningPlan from './runningPlan';
import HandleLog from './handleLog';
import RecentReport from './recentReport';
import AsyncData from '@modals/asyncData';

const IndexPage = () => {
    const [showAsync, setShowAsync] = useState(false);

    const handleShowAsync = (bool) => {
        setShowAsync(bool);
    }
    return (
        <div className='index-page'>
            <AsyncData showAsync={showAsync} handleShowAsync={handleShowAsync} />
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
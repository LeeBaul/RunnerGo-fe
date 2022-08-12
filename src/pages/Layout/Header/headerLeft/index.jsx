import React from 'react';
import './index.less';
import TeamProject from './teamProject';
import GlobalConfig from './globalConfig';
import RunningShow from './runningShow';

const HeaderLeft = () => {
    return (
        <div className='header-left'>
            <TeamProject />
            <GlobalConfig />
            <RunningShow />
        </div>
    )
};

export default HeaderLeft;
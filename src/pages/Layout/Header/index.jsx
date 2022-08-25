import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import './index.less';
import HeaderLeft from './headerLeft';
import HeaderRight from './headerRight';
import Bus from '@utils/eventBus';

const Header = () => {
    const team_id = useSelector((store) => store.user.team_id);

    useEffect(() => {
        Bus.$emit('getTeamList');
        Bus.$emit('getRunningPlan');
    }, [team_id]);
    return (
        <div className='header-menus-panel'>
            {/* <div className='header-left'> */}
                <HeaderLeft />
            {/* </div> */}
            {/* <div className='header-right'> */}
                <HeaderRight />
            {/* </div> */}
        </div>
    )
};

export default Header;
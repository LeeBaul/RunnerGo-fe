import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import './index.less';
import HeaderLeft from './headerLeft';
import HeaderRight from './headerRight';
import Bus from '@utils/eventBus';
import { global$ } from '@hooks/useGlobal/global';

const Header = () => {
    // const team_id = useSelector((store) => store.user.team_id);

    useEffect(() => {
        // global$.next({
        //     action: 'INIT_APPLICATION',
        // });
    }, []);
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
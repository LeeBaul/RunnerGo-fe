import React from 'react';
import './index.less';
import HeaderLeft from './headerLeft';
import HeaderRight from './headerRight';

const Header = () => {
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
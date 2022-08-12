import React from 'react';
import './index.less';
import { 
    Desc as SvgDesc
 } from 'adesign-react/icons';

const GlobalConfig = () => {
    return (
        <div className='global-config'>
            <div className='config-item'>
                <SvgDesc />
                <span>全局变量</span>
            </div>
            <div className='config-item'>
                <SvgDesc />
                <span>公共函数</span>
            </div>
        </div>
    )
};

export default GlobalConfig;
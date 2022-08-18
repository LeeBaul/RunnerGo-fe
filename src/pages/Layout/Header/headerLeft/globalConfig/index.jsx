import React, { useState } from 'react';
import './index.less';
import { 
    Desc as SvgDesc
 } from 'adesign-react/icons';
 import CommonFunction from '@modals/CommonFunc';
 import GlobalVar from '@modals/GlobalVar';

const GlobalConfig = () => {
    const [showFunc, setShowFunc] = useState(false);
    const [showVar, setShowVar] = useState(false);
    return (
        <div className='global-config'>
            <div className='config-item' onClick={() => setShowVar(true)}>
                <SvgDesc />
                <span>全局变量</span>
            </div>
            <div className='config-item' onClick={() => setShowFunc(true)}>
                <SvgDesc />
                <span>公共函数</span>
            </div>
            { showFunc && <CommonFunction onCancel={() => setShowFunc(false)} /> }
            { showVar && <GlobalVar onCancel={() => setShowVar(false)} /> }
        </div>
    )
};

export default GlobalConfig;
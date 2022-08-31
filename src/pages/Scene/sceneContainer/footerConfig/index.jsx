import React, { useState } from 'react';
import { Apis as SvgApis, Add as SvgAdd } from 'adesign-react/icons';
import './index.less';

const FooterConfig = () => {
    const [showControl, setShowControl] = useState(false);
    return (
        <div className='footer-config'>
            {showControl && <div className='add-controller'>
                <div className='assert'>
                    <SvgAdd />
                    <span>全局断言</span>
                </div>
                <div className='wait'>
                    <SvgAdd />
                    <span>等待控制器</span>
                </div>
                <div className='condition'>
                    <SvgAdd />
                    <span>条件控制器</span>
                </div>
            </div>
            }
            <div className='common-config'>
                <div className='config-item'>
                    <SvgApis />
                    <span>新建接口</span>
                </div>
                <span className='line'></span>
                <div className='config-item' onClick={() => setShowControl(!showControl)}>
                    <SvgApis />
                    <span>添加控制器</span>
                </div>
                <span className='line'></span>
                <div className='config-item'>
                    <SvgApis />
                    <span>导入接口</span>
                </div>
            </div>
        </div>
    )
};

export default FooterConfig;
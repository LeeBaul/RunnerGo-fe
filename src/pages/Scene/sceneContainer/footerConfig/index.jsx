import React, { useState } from 'react';
import { Apis as SvgApis, Add as SvgAdd } from 'adesign-react/icons';
import './index.less';
import Bus from '@utils/eventBus';
import { useDispatch } from 'react-redux';

const FooterConfig = (props) => {
    const { onChange } = props;
    const [showControl, setShowControl] = useState(false);
    const dispatch = useDispatch();
    return (
        <div className='footer-config'>
            {showControl && <div className='add-controller'>
                <div className='wait' onClick={() => {
                    dispatch({
                        type: 'scene/updateType',
                        payload: ['add', 'wait_controller']
                    })
                }}>
                    <SvgAdd />
                    <span>等待控制器</span>
                </div>
                <div className='condition' onClick={() => {
                    dispatch({
                        type: 'scene/updateType',
                        payload: ['add', 'condition_controller']
                    })
                }}>
                    <SvgAdd />
                    <span>条件控制器</span>
                </div>
            </div>
            }
            <div className='common-config'>
                <div className='config-item' onClick={() => {
                    dispatch({
                        type: 'scene/updateType',
                        payload: ['add', 'api']
                    })
                }}>
                    <SvgApis />
                    <span>新建接口</span>
                </div>
                <span className='line'></span>
                <div className='config-item' onClick={() => setShowControl(!showControl)}>
                    <SvgApis />
                    <span>添加控制器</span>
                </div>
                <span className='line'></span>
                <div className='config-item' onClick={() => onChange(true)}>
                    <SvgApis />
                    <span>导入接口</span>
                </div>
            </div>
        </div>
    )
};

export default FooterConfig;
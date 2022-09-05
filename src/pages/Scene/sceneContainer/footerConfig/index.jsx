import React, { useState } from 'react';
import { Apis as SvgApis, Add as SvgAdd } from 'adesign-react/icons';
import './index.less';
import Bus from '@utils/eventBus';
import { useDispatch } from 'react-redux';

const FooterConfig = (props) => {
    const { onChange, from = 'scene' } = props;
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
                    if (from ==='scene') {
                      dispatch({
                        type: 'scene/updateType',
                        payload: ['add', 'condition_controller']
                      })
                    } else {
                      dispatch({
                        type: 'plan/updateType',
                        payload: ['add', 'condition_controller']
                      })
                    }
                }}>
                    <SvgAdd />
                    <span>条件控制器</span>
                </div>
            </div>
            }
            <div className='common-config' style={{ width: from === 'plan' ? '360px' : '288px' }}>
                <div className='config-item' onClick={() => {
                    if (from === 'scene') {
                        dispatch({
                        type: 'scene/updateType',
                        payload: ['add', 'api']
                      })
                    } else {
                        dispatch({
                            type: 'plan/updateType',
                            payload: ['add', 'api']
                        })
                    }
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
                {
                    from === 'plan' && (
                        <>
                            <span className='line'></span>
                            <div className='config-item' onClick={() => onChange(true)}>
                                <SvgApis />
                                <span>导入场景</span>
                            </div>
                        </>
                    )
                }
            </div>
        </div>
    )
};

export default FooterConfig;
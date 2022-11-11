import React, { useState, useEffect } from 'react';
import { Apis as SvgApis, Add as SvgAdd, Download as SvgDownload } from 'adesign-react/icons';
import './index.less';
import Bus from '@utils/eventBus';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

const FooterConfig = (props) => {
    const { onChange, from = 'scene' } = props;
    const { t } = useTranslation();
    const [showControl, setShowControl] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        document.addEventListener('click', (e) => clickOutSide(e))

        return () => {
            document.removeEventListener('click', (e) => clickOutSide(e));
        }
    }, []);

    const clickOutSide = (e) => {
        let _box = document.querySelector('.footer-config');

        if (_box && !_box.contains(e.target)) {
            setShowControl(false);
        }
    }

    return (
        <div className='footer-config'>
            {showControl && <div className='add-controller'>
                <div className='wait' onClick={() => {
                    if (from === 'scene') {
                        dispatch({
                            type: 'scene/updateAddNew',
                            payload: 'wait_controller'
                        })
                        // dispatch({
                        //     type: 'scene/updateType',
                        //     payload: ['add', 'wait_controller']
                        // })
                    } else {
                        dispatch({
                            type: 'plan/updateAddNew',
                            payload: 'wait_controller'
                        })
                        // dispatch({
                        //     type: 'plan/updateType',
                        //     payload: ['add', 'wait_controller']
                        // })
                    }
                }}>
                    <SvgAdd />
                    <span>{t('scene.waitControl')}</span>
                </div>
                <div className='condition' onClick={() => {
                    if (from === 'scene') {
                        dispatch({
                            type: 'scene/updateAddNew',
                            payload: 'condition_controller'
                        })
                        // dispatch({
                        //     type: 'scene/updateType',
                        //     payload: ['add', 'condition_controller']
                        // })
                    } else {
                        dispatch({
                            type: 'plan/updateAddNew',
                            payload: 'condition_controller'
                        })
                        // dispatch({
                        //     type: 'plan/updateType',
                        //     payload: ['add', 'condition_controller']
                        // })
                    }
                }}>
                    <SvgAdd />
                    <span>{t('scene.conditionControl')}</span>
                </div>
            </div>
            }
            <div className='common-config' style={{ 'min-width': from === 'plan' ? '360px' : '288px' }}>
                <div className='config-item' onClick={() => {
                    if (from === 'scene') {
                        dispatch({
                            type: 'scene/updateAddNew',
                            payload: 'api'
                        })
                        //     dispatch({
                        //     type: 'scene/updateType',
                        //     payload: ['add', 'api']
                        //   })
                    } else {
                        dispatch({
                            type: 'plan/updateAddNew',
                            payload: 'api'
                        })
                        // dispatch({
                        //     type: 'plan/updateType',
                        //     payload: ['add', 'api']
                        // })
                    }
                }}>
                    <SvgApis />
                    <span>{t('scene.createApi')}</span>
                </div>
                <span className='line'></span>
                <div className='config-item' onClick={() => setShowControl(!showControl)}>
                    <SvgAdd />
                    <span>{t('scene.createControl')}</span>
                </div>
                <span className='line'></span>
                <div className='config-item' onClick={() => onChange('api', true)}>
                    <SvgDownload />
                    <span>{t('scene.importApi')}</span>
                </div>
                {/* {
                    from === 'plan' && (
                        <>
                            <span className='line'></span>
                            <div className='config-item' onClick={() => onChange('scene', true)}>
                                <SvgApis />
                                <span>导入场景</span>
                            </div>
                        </>
                    )
                } */}
            </div>
        </div>
    )
};

export default FooterConfig;
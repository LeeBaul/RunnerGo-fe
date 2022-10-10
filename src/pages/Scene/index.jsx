import React, { useState, useEffect } from 'react';
import { Scale, Button } from 'adesign-react';
import { useSelector, useDispatch } from 'react-redux';
import { isObject } from 'lodash';
import Bus from '@utils/eventBus';
import TreeMenu from '@components/TreeMenu';
import { ApisWrapper, ApiManageWrapper } from './style';
import { Routes, Route, Navigate } from 'react-router-dom';
import SceneHeader from './sceneHeader';
import SceneContainer from './sceneContainer';
import SvgEmpty from '@assets/img/empty';
import SvgScene from '@assets/icons/Scene1';
import { useTranslation } from 'react-i18next';
import CreateScene from '@modals/CreateScene';

const { ScalePanel, ScaleItem } = Scale;

const Scene = () => {
    const { t } = useTranslation();
    const sceneDatas = useSelector((store) => store.scene.sceneDatas);
    const [showCreate, setShowCreate] = useState(false);
    const dispatch = useDispatch();


    useEffect(() => {
        const open_scene = localStorage.getItem('open_scene');
        if (open_scene) {
            const val = JSON.parse(open_scene);
            setTimeout(() => {
                dispatch({
                    type: 'scene/updateOpenName',
                    payload: val.name,
                })
                Bus.$emit('addOpenScene', val);
            })
        }
    }, []);

    // useEffect(() => {
    //     setTimeout(() => {
    //          Bus.$emit('openRecordScene');
    //     })
    //  }, []);
 
    //  useEffect(() => {
    //      return () => {
    //          Bus.$emit('recordOpenScene');
    //      }
    //  }, []);

    return (
        <>
        <ScalePanel
            realTimeRender
            className={ApisWrapper}
            defaultLayouts={{ 0: { width: 270 }, 1: { flex: 1, width: 0 } }}
        >
            <ScaleItem className="left-menus" minWidth={250} maxWidth={350}>
                <TreeMenu type='scene' />
            </ScaleItem>
            <ScaleItem className="right-apis" enableScale={false}>
                {
                    Object.entries(sceneDatas || {}).length > 0? <>
                        <SceneHeader from='scene' />
                        <SceneContainer from='scene' />
                    </> : <div className='empty'>
                        {/* <SvgEmpty />
                            <p>没有数据</p> */}
                        <Button preFix={<SvgScene />} onClick={() => setShowCreate(true)}>{t('btn.createScene')}</Button>
                    </div>
                }
            </ScaleItem>
        </ScalePanel>
        { showCreate && <CreateScene from="scene" onCancel={() => setShowCreate(false)} /> }
        </>
    )
};

export default Scene;
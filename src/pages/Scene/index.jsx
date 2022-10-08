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
    const open_scene = useSelector((store) => store.scene.open_scene);
    const [showCreate, setShowCreate] = useState(false);

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
                    open_scene ? <>
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
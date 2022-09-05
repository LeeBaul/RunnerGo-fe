import React, { useState } from 'react';
import { Scale } from 'adesign-react';
import { useSelector } from 'react-redux';
import { isObject } from 'lodash';
import Bus from '@utils/eventBus';
import TreeMenu from '@components/TreeMenu';
import { ApisWrapper, ApiManageWrapper } from './style';
import { Routes, Route, Navigate } from 'react-router-dom';
import SceneHeader from './sceneHeader';
import SceneContainer from './sceneContainer';

const { ScalePanel, ScaleItem } = Scale;

const Scene = () => {

    const [sceneName, setSceneName] = useState('');
    const open_scene = useSelector((store) => store.scene.open_scene);

    return (
        <ScalePanel
            realTimeRender
            className={ApisWrapper}
            defaultLayouts={{ 0: { width: 270 }, 1: { flex: 1, width: 0 } }}
        >
            <ScaleItem className="left-menus" minWidth={250} maxWidth={350}>
                <TreeMenu getSceneName={(name) => {
                    setSceneName(name);
                    console.log(name);
                }} type='scene' />
            </ScaleItem>
            <ScaleItem className="right-apis" enableScale={false}>
                {
                    open_scene ? <>
                        <SceneHeader from='scene' sceneName={sceneName} />
                        <SceneContainer from = 'scene' />
                    </> : <p className='empty'>没有数据</p>
                }
            </ScaleItem>
        </ScalePanel>
    )
};

export default Scene;
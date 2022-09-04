import React from 'react';
import { Scale } from 'adesign-react';
import { useSelector } from 'react-redux';
import { isObject } from 'lodash';
import Bus from '@utils/eventBus';
import TreeMenu from '@components/TreeMenu';
import { ApisWrapper, ApiManageWrapper } from './style';
import { Routes, Route, Navigate } from 'react-router-dom';
import SceneHeader from '@pages/Scene/sceneHeader';
import SceneContainer from '@pages/Scene/sceneContainer';
import DetailHeader from './header';
import TaskConfig from './taskConfig';

const { ScalePanel, ScaleItem } = Scale;

const PlanDetail = () => {
    return (
        <>
            <DetailHeader />
            <ScalePanel
                style={{ marginTop: '2px' }}
                realTimeRender
                className={ApisWrapper}
                defaultLayouts={{ 0: { width: 250 }, 1: { width: 905, flex: 1 }, 2: { width: 630 } }}
            >
                <ScaleItem className="left-menus" minWidth={250} maxWidth={350}>
                    <TreeMenu type='scene' />
                </ScaleItem>
                <ScaleItem className="right-apis" enableScale={true}>
                    <SceneHeader from='plan' />
                    <SceneContainer />
                </ScaleItem>
                <ScaleItem enableScale={true}>
                    <TaskConfig />
                </ScaleItem>
            </ScalePanel>
        </>
    )
};

export default PlanDetail;
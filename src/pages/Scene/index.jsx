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
    const open_scene = useSelector((store) => store.scene.open_scene);
    const [showCreate, setShowCreate] = useState(false);
    const dispatch = useDispatch();
    const [storageScene, setStorageScene] = useState(null);

    useEffect(() => {
        const open_scene = localStorage.getItem('open_scene');
        setStorageScene(open_scene);
        if (open_scene) {
            const val = JSON.parse(open_scene);
            setTimeout(() => {
                dispatch({
                    type: 'scene/updateOpenName',
                    payload: val.name,
                })
                Bus.$emit('addOpenScene', val);
            })
        } else {
            dispatch({
                type: 'scene/updateOpenScene',
                payload: null
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

    const EmptyContent = () => {
        return <div className="welcome-page">
            <div className="newTarget">
                <Button
                    type="primary"
                    onClick={() => {
                        setShowCreate(true)
                    }}
                >
                    <SvgScene />
                    <h3>{t('btn.createScene')}</h3>
                </Button>
                {/* <Button
                type="primary"
                onClick={() => {
                    Bus.$emit('addOpenItem', { type: 'doc' });
                }}
            >
                <SvgMarkdown />
                <h3>新建 Markdown 文本</h3>
            </Button>
            <Button
                type="primary"
                onClick={() => {
                    Bus.$emit('addOpenItem', { type: 'grpc' });
                }}
            >
                <SvgGrpc />
                <h3>新建 Grpc 接口</h3>
            </Button> */}
                {/* <Button
                type="primary"
                onClick={() => {
                    Bus.$emit('addOpenItem', { type: 'websocket' });
                }}
            >
                <SvgWebsocket />
                <h3>新建 WebSocket 接口</h3>
            </Button> */}
            </div>
            {/* <div className="importProject">
            <Button
                type="primary"
                className="apipost-blue-btn"
                onClick={() => {
                    Bus.$emit('openModal', 'ImportProject');
                }}
            >
                快速导入项目
            </Button>
        </div> */}
        </div>
    };

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
                        Object.entries(open_scene || {}).length > 0 ? <>
                            <SceneHeader from='scene' />
                            <SceneContainer from='scene' />
                        </> : <EmptyContent />
                    }
                </ScaleItem>
            </ScalePanel>
            {showCreate && <CreateScene from="scene" onCancel={() => setShowCreate(false)} />}
        </>
    )
};

export default Scene;
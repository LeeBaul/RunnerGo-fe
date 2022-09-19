import React, { useEffect, useState } from 'react';
import { Scale, Drawer, Input, Button } from 'adesign-react';
import { Close as SvgClose } from 'adesign-react/icons'
import { useSelector, useDispatch } from 'react-redux';
import { isObject } from 'lodash';
import Bus from '@utils/eventBus';
import TreeMenu from '@components/TreeMenu';
import { ApisWrapper, ApiManageWrapper } from './style';
import { Routes, Route, Navigate, useParams } from 'react-router-dom';
import SceneHeader from '@pages/Scene/sceneHeader';
import SceneContainer from '@pages/Scene/sceneContainer';
import DetailHeader from './header';
import TaskConfig from './taskConfig';
import { global$ } from '@hooks/useGlobal/global';
import ApiPicker from '@pages/Scene/sceneContainer/apiPicker';
import ApiManage from '@pages/ApisWarper/modules/ApiManage';
import { getPathExpressionObj } from '@constants/pathExpression';
import ScenePicker from './scenePicker';
import './index.less';

const { ScalePanel, ScaleItem } = Scale;

const PlanDetail = () => {

    const { id } = useParams();
    const [sceneName, setSceneName] = useState('');
    const [importApi, setImportApi] = useState(false);
    const [importScene, setImportScene] = useState(false);
    const [configApi, setConfigApi] = useState(false);
    const open_plan_scene = useSelector((store) => store.plan.open_plan_scene);
    const api_now = useSelector((store) => store.plan.api_now);
    const apiConfig = useSelector((store) => store.plan.showApiConfig);
    const id_apis = useSelector((store) => store.plan.id_apis);

    const [apiName, setApiName] = useState(api_now ? api_now.name : '新建接口');
    const dispatch = useDispatch();
    useEffect(() => {
        global$.next({
            action: 'RELOAD_LOCAL_PLAN',
            id,
        });
    }, []);

    useEffect(() => {
        setConfigApi(apiConfig);
    }, [apiConfig])

    useEffect(() => {
        setApiName(api_now.name)
    }, [api_now])

    const onTargetChange = (type, value) => {

        Bus.$emit('updatePlanApi', {
            id: api_now.id,
            pathExpression: getPathExpressionObj(type),
            value,
        }, id_apis);
    };

    const closeApiConfig = () => {
        Bus.$emit('savePlanApi', api_now, id_apis, () => {
            // setDrawer(false)
            dispatch({
                type: 'plan/updateApiConfig',
                payload: false
            })
        });
    };

    const DrawerHeader = () => {
        return (
            <div className='drawer-header'>
                <div className='drawer-header-left'>
                    <Button style={{ marginRight: '8px' }} onClick={(() => closeApiConfig())} >
                        {/* <SvgClose width="16px" height="16px" /> */}
                        <p style={{ fontSize: '16px' }}>x</p>
                    </Button>
                    <Input size="mini" value={apiName} placeholder="请输入接口名称" onChange={(e) => onTargetChange('name', e)} />
                </div>
                <div className='drawer-header-right'>
                    <Button onClick={() => {
                        Bus.$emit('savePlanApi', api_now, id_apis);
                    }}>保存</Button>
                </div>
            </div>
        )
    };

    return (
        <div className='plan-detail'>
            <DetailHeader />
            {importApi && <ApiPicker onCancel={() => setImportApi(false)} />}
            {importScene && <ScenePicker onCancel={() => setImportScene(false)} />}
            {
                configApi &&
                <div className='api-config'>
                    <Drawer
                        visible={true}
                        title={<DrawerHeader />}
                        onCancel={() => setDrawer(false)}
                        footer={null}
                        mask={false}
                    >
                        <ApiManage from="plan" apiInfo={api_now} showInfo={false} onChange={(type, val) => onTargetChange(type, val)} />
                    </Drawer>
                </div>
            }
            <ScalePanel
                style={{ marginTop: '2px' }}
                realTimeRender
                className={ApisWrapper}
                defaultLayouts={{ 0: { width: 280 }, 1: { width: 905, flex: 1 }, 2: { width: 630 } }}
            >
                <ScaleItem className="left-menus" minWidth={250} maxWidth={350}>
                    <TreeMenu type='plan' plan_id={id} getSceneName={(e) => setSceneName(e)} onChange={(e) => setImportScene(e)} />
                </ScaleItem>
                <ScaleItem className="right-apis">
                    {
                        open_plan_scene ? <>
                            <SceneHeader from='plan' sceneName={sceneName} />
                            <SceneContainer from='plan' onChange={(type, e) => {
                                if (type === 'api') {
                                    setImportApi(e)
                                } else if (type === 'scene') {
                                    setImportScene(e)
                                }
                            }} />
                        </> : <p className='empty'>还没有数据</p>
                    }
                </ScaleItem>
                <ScaleItem enableScale={false}>
                    <TaskConfig from='default' />
                </ScaleItem>
            </ScalePanel>
        </div>
    )
};

export default PlanDetail;
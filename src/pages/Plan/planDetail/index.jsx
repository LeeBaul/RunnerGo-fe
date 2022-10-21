import React, { useEffect, useState, useCallback } from 'react';
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
import SvgScene from '@assets/icons/Scene1';
import { useTranslation } from 'react-i18next';
import CreateScene from '@modals/CreateScene';

const { ScalePanel, ScaleItem } = Scale;

const PlanDetail = () => {
    const { t } = useTranslation();

    const { id } = useParams();
    const [sceneName, setSceneName] = useState('');
    const [importApi, setImportApi] = useState(false);
    const [importScene, setImportScene] = useState(false);
    const [configApi, setConfigApi] = useState(false);
    const open_plan_scene = useSelector((store) => store.plan.open_plan_scene);
    const api_now = useSelector((store) => store.plan.api_now);
    const apiConfig = useSelector((store) => store.plan.showApiConfig);
    console.log(1, open_plan_scene, api_now, apiConfig);

    const [apiName, setApiName] = useState(api_now ? api_now.name : '新建接口');
    const [showCreate, setShowCreate] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        global$.next({
            action: 'RELOAD_LOCAL_PLAN',
            id,
        });
    }, []);

    useEffect(() => {

        // const open_plan = JSON.parse(localStorage.getItem('open_plan') || '{}');
        // if (open_plan && open_plan[id]) {
        //     console.log(open_plan, open_plan_scene, id)
        //     if (open_plan_scene) {
        //         if (`${open_plan_scene.scene_id}` !== `${open_plan[id]}`) {
        //             Bus.$emit('addOpenPlanScene', { target_id: open_plan[id] })
        //         }
        //     } else {
        //         Bus.$emit('addOpenPlanScene', { target_id: open_plan[id] })
        //     }
        // }
    }, [open_plan_scene]);


    useEffect(() => {
        if (apiConfig !== configApi) {
            setConfigApi(apiConfig);
        }
    }, [apiConfig])

    useEffect(() => {
        setApiName(api_now.name)
    }, [api_now])

    const onTargetChange = (type, value) => {

        Bus.$emit('updatePlanApi', {
            id: api_now.id,
            pathExpression: getPathExpressionObj(type),
            value,
        });
    };

    const closeApiConfig = () => {
        Bus.$emit('savePlanApi', api_now, () => {
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
                    <Input size="mini" value={apiName} placeholder={t('placeholder.apiName')} onBlur={(e) => onTargetChange('name', e.target.value)} />
                </div>
                <div className='drawer-header-right'>
                    {/* <Button onClick={() => {
                        Bus.$emit('savePlanApi', api_now);
                    }}>{ t('btn.save') }</Button> */}
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
                        className='plan-drawer'
                        visible={true}
                        title={<DrawerHeader />}
                        // onCancel={() => setDrawer(false)}
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
                defaultLayouts={ Object.entries(open_plan_scene || {}).length > 0 ? { 0: { width: 325 }, 1: { width: 905, flex: 1 }, 2: { width: 420 } } : { 0: { width: 325 }, 1: { width: 0, flex: 1 } }}
            >
                <ScaleItem className="left-menus" minWidth={325} maxWidth={350}>
                    <TreeMenu type='plan' getSceneName={(e) => setSceneName(e)} onChange={(e) => setImportScene(e)} />
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
                        </> : <div className='empty'><Button className="create-btn" preFix={<SvgScene />} onClick={() => setShowCreate(true)}>{t('btn.createScene')}</Button></div>
                    }
                </ScaleItem>
                <ScaleItem enableScale={false}>
                    {
                        open_plan_scene && <TaskConfig from='default' refresh={ open_plan_scene }/>
                    }
                </ScaleItem>
            </ScalePanel>
            {showCreate && <CreateScene from="plan" onCancel={() => setShowCreate(false)} />}
        </div>
    )
};

export default PlanDetail;
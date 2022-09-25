import React, { useState, useEffect } from 'react';
import './index.less';
import {
    Setting1 as SvgSetting,
    Save as SvgSave,
    CaretRight as SvgCaretRight
} from 'adesign-react/icons';
import { Button, Message } from 'adesign-react';
import { useSelector, useDispatch } from 'react-redux';
import CreateApi from '@modals/CreateApi';
import SceneConfig from '@modals/SceneConfig';
import { fetchStopScene } from '@services/scene';
import Bus from '@utils/eventBus';
import { useParams } from 'react-router-dom';
import { cloneDeep } from 'lodash';
import { MarkerType } from 'react-flow-renderer';
import SvgStop from '@assets/icons/Stop';

const SceneHeader = (props) => {
    const { from } = props;
    const [showSceneConfig, setSceneConfig] = useState(false);
    const dispatch = useDispatch();
    const { id } = useParams();
    // const saveScene = useSelector((store) => store.scene.saveScene);
    const {
        nodes: nodes_scene,
        edges: edges_scene,
        id_apis: id_apis_scene,
        node_config: node_config_scene,
        open_scene: open_scene_scene,
        init_scene: init_scene_scene,
        to_loading: to_loading_scene,
        run_res: run_res_scene,
        run_status: run_status_scene,
    } = useSelector((store) => store.scene);
    const {
        nodes: nodes_plan,
        edges: edges_plan,
        id_apis: id_apis_plan,
        node_config: node_config_plan,
        open_plan_scene: open_scene_plan,
        init_scene: init_scene_plan,
        to_loading: to_loading_plan,
        run_res: run_res_plan,
        run_status: run_status_plan,
    } = useSelector((store) => store.plan);
    const nodes = from === 'scene' ? nodes_scene : nodes_plan;
    const edges = from === 'scene' ? edges_scene : edges_plan;
    const id_apis = from === 'scene' ? id_apis_scene : id_apis_plan;
    const node_config = from === 'scene' ? node_config_scene : node_config_plan;
    const open_scene = from === 'scene' ? open_scene_scene : open_scene_plan;
    const init_scene = from === 'scene' ? init_scene_scene : init_scene_plan;

    const to_loading = from === 'scene' ? to_loading_scene : to_loading_plan;
    // const run_res = from === 'scene' ? (run_res_scene ? run_res_scene[open_scene.scene_id] : {}) : (run_res_plan ? run_res_plan[open_scene.scene_id] : {});
    const run_status = from === 'scene' ? run_status_scene : run_status_plan;

    useEffect(() => {
        if (from === 'scene') {
            dispatch({
                type: 'scene/updateToLoading',
                payload: false,
            })
            dispatch({
                type: 'scene/updateSuccessEdge',
                payload: [],
            });
            dispatch({
                type: 'scene/updateFailedEdge',
                payload: [],
            });
            // console.log(1);
            // dispatch({
            //     type: 'scene/updateType',
            //     payload: [],
            // });
            // console.log(2);
        } else {
            dispatch({
                type: 'plan/updateToLoading',
                payload: false,
            })
            dispatch({
                type: 'plan/updateSuccessEdge',
                payload: [],
            });
            dispatch({
                type: 'plan/updateFailedEdge',
                payload: [],
            });
            // dispatch({
            //     type: 'plan/updateType',
            //     payload: [],
            // })
        }
    }, []);

    const open_scene_name = useSelector((store) => store.scene.open_scene_name);
    const runScene = () => {
        const { scene_id } = open_scene;
        if (from === 'scene') {
            dispatch({
                type: 'scene/updateRunStatus',
                payload: 'running',
            })
            dispatch({
                type: 'scene/updateRunningScene',
                payload: scene_id,
            })
            dispatch({
                type: 'scene/updateToLoading',
                payload: false,
            })
            // dispatch({
            //     type: 'scene/updateInitScene',
            //     payload: false,
            // });
            // dispatch({
            //     type: 'scene/updateInitScene',
            //     payload: true,
            // });
            dispatch({
                type: 'scene/updateRunRes',
                payload: [],
            })
            dispatch({
                type: 'scene/updateSuccessEdge',
                payload: [],
            });
            dispatch({
                type: 'scene/updateFailedEdge',
                payload: [],
            })
            setTimeout(() => {
                dispatch({
                    type: 'scene/updateToLoading',
                    payload: true,
                })
            }, 200)
        } else {
            dispatch({
                type: 'plan/updateRunStatus',
                payload: 'running',
            })
            dispatch({
                type: 'plan/updateRunningScene',
                payload: scene_id,
            })
            dispatch({
                type: 'plan/updateToLoading',
                payload: false,
            })
            // dispatch({
            //     type: 'plan/updateInitScene',
            //     payload: true
            // })
            dispatch({
                type: 'plan/updateRunRes',
                payload: []
            })
            dispatch({
                type: 'plan/updateSuccessEdge',
                payload: [],
            });
            dispatch({
                type: 'plan/updateFailedEdge',
                payload: [],
            })
            setTimeout(() => {
                dispatch({
                    type: 'plan/updateToLoading',
                    payload: true,
                })
            }, 200);
        };
        const _callback = () => {
            Bus.$emit('runScene', scene_id, open_scene.nodes.length, from);
        }
        saveScene(_callback);

    

        // const _edges = cloneDeep(edges);
        // // _edges[0].animated = true;
        // // _edges[0].style = {
        // //     stroke: 'blue',
        // // };
        // // _edges[0].markerEnd = {
        // //     type: MarkerType.ArrowClosed,
        // // };

        // dispatch({
        //     type: 'scene/updateChangeEdge',
        //     payload: _edges[0]
        // })
    };

    const saveScene = (callback) => {
        if (from === 'scene') {
            Bus.$emit('saveScene', nodes, edges, id_apis, node_config, open_scene, callback);
        } else {
            Bus.$emit('saveScenePlan', nodes, edges, id_apis, node_config, open_scene, id, callback);
        }
    };

    return (
        <div className='scene-header'>
            <div className='scene-header-left'>{open_scene_name}</div>
            <div className='scene-header-right'>
                <div className='config' onClick={() => setSceneConfig(true)}>
                    <SvgSetting />
                    <span>场景设置</span>
                </div>
                <Button className='saveBtn' preFix={<SvgSave />} onClick={() => saveScene(() => {
                            Message('success', '保存成功!');
                        })}>保存</Button>
                {
                    run_status === 'running'
                        ? <Button className='stopBtn' preFix={<SvgStop />} onClick={() => Bus.$emit('stopScene', open_scene.scene_id, from, () => {
                            Message('success', '停止成功!');
                        })}>停止运行</Button>
                        : <Button className='runBtn' preFix={<SvgCaretRight />} onClick={() => runScene()}>开始运行</Button>
                }
            </div>
            {showSceneConfig && <SceneConfig from={from} onCancel={() => setSceneConfig(false)} />}
        </div>
    )
};

export default SceneHeader;
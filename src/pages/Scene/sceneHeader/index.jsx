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
import { useTranslation } from 'react-i18next';

const SceneHeader = (props) => {
    const { from } = props;
    const { t } = useTranslation();
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

    console.log(open_scene);

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
    const open_scene_desc = useSelector((store) => store.scene.open_scene_desc);
    const runScene = () => {
        const { scene_id, target_id } = open_scene;
        if (!nodes || nodes.length === 0) {
            Message('error', t('message.emptyScene'));
            return;
        }
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
            Bus.$emit('runScene', scene_id ? scene_id : target_id, nodes.length, from);
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

    const keyDown = (e) => {
        if (e.keyCode == 83 && (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)){
            e.preventDefault();
            saveScene(() => {
                Message('success', t('message.saveSuccess'));
            })
         }
    }

    useEffect(() => {
        return () => {
            // saveScene();
        }
    }, [nodes, edges, node_config, id_apis, open_scene])

    
    useEffect(() => {

        document.addEventListener('keydown', keyDown);

        return () => {
            document.removeEventListener('keydown', keyDown);
        }
    }, [nodes, edges, node_config, id_apis, open_scene]);

    const saveScene = (callback) => {
        if (from === 'scene') {
            Bus.$emit('saveScene', callback);
        } else {
            Bus.$emit('saveScenePlan', nodes, edges, id_apis, node_config, open_scene, id, callback);
        }
    };

    console.log(open_scene_name, open_scene_desc);

    const formatData = (a, b) => {
        let result = [];
        let root = [];
        a.forEach(item => {
            if (b.findIndex(elem => elem.target === item.id) === -1) {
                root.push(item);
            }
        })
        result.push(root);

        const findValue = (id) => {
            return a.find(item => item.id === id);
        }
    
        let loop = (result, arr) => {
            let res = [];
            arr.forEach(item => {
               let data =  b.filter(elem => elem.source === item.id).map(elem1 => {
                result.forEach(item => {
                    let _index = item.findIndex(elem2 => elem2.id === elem1.target);
                    if (_index !== -1){
                        item.splice(_index, 1);
                    }
                })
                 return { ...findValue(elem1.target) }
               });
               res.push(...data);
            })
    
            if (res.length > 0) {
                result.push(res);
                return loop(result, res);
            } else {
                return result;
            }
        }
    
        return loop(result, root);
    };

    const toBeautify = () => {
        const result = formatData(nodes, edges);
        console.log(nodes, edges, result);
        result.forEach((item, index) => {
            // const rootY = item[0].position.y;
            let Y = 50 + (index) * 220;

            item.forEach(elem => {
                elem.position.y = Y;
                elem.positionAbsolute.y = Y;
            })
        })

        let _result = [];
        result.forEach(item => {
            item.forEach(elem => {
                _result.push(elem);
            })
        });
        console.log(result, _result);
        if (from === 'scene') {
            dispatch({
                type: 'scene/updateNodes',
                payload: _result
            });
            dispatch({
                type: 'scene/updateBeautify',
                payload: true
            })
        } else {
            dispatch({
                type: 'plan/updateNodes',
                payload: _result
            });
            dispatch({
                type: 'plan/updateBeautify',
                payload: true
            }) 
        }

    };

    const initScene = () => {
        dispatch({
            type: 'scene/updateRunRes',
            payload: null,
        });
        dispatch({
            type: 'scene/updateRunningScene',
            payload: '',
        });
        dispatch({
            type: 'scene/updateSuccessEdge',
            payload: [],
        });
        dispatch({
            type: 'scene/updateFailedEdge',
            payload: [],
        });
        dispatch({
            type: 'scene/updateBeautify',
            payload: false
        });
        dispatch({
            type: 'scene/updateInitScene',
            payload: !init_scene
        })
    }

    return (
        <div className='scene-header'>
            <div className='scene-header-left'>
                <p className='name'>{open_scene_name}</p>
                <p className='desc' style={{ maxWidth: from === 'scene' ? '62vw' : '20vw' }}>{ t('scene.sceneDesc') }：{open_scene_desc}</p>
            </div>
            <div className='scene-header-right'>
                <div className='config' onClick={() => setSceneConfig(true)}>
                    <SvgSetting />
                    <span>{ t('scene.sceneConfig') }</span>
                </div>
                {/* <Button className='saveBtn' onClick={() => initScene()}>初始化调试结果</Button> */}
                <Button className='saveBtn' onClick={() => toBeautify()}>{ t('btn.toBeautify') }</Button>
                <Button className='saveBtn' preFix={<SvgSave />} onClick={() => saveScene(() => {
                            Message('success', t('message.saveSuccess')); 
                        })}>{ t('btn.save') }</Button>
                {
                    run_status === 'running'
                        ? <Button className='stopBtn' preFix={<SvgStop />} onClick={() => Bus.$emit('stopScene', open_scene.scene_id, from, () => {
                            Message('success', t('message.stopSuccess'));
                        })}>{ t('btn.stopRun') }</Button>
                        : <Button className='runBtn' style={{ background: from === 'plan' ? '#2BA58F' : 'var(--run-green)' }} preFix={<SvgCaretRight />} onClick={() => runScene()}>{ from === 'scene' ? t('btn.run') : t('btn.runScene') }</Button>
                }
            </div>
            {showSceneConfig && <SceneConfig from={from} onCancel={() => setSceneConfig(false)} />}
        </div>
    )
};

export default SceneHeader;
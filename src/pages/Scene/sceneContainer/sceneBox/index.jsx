import React, { useEffect, useRef, useState, useCallback } from "react";
import { Message } from 'adesign-react';
import './index.less';
import { cloneDeep } from 'lodash';
import Box from "./box";
import ConditionController from "./controller/condition";
import WaitController from "./controller/wait";
import ReactFlow, {
    addEdge,
    MiniMap,
    Controls,
    Background,
    useNodesState,
    useEdgesState,
    MarkerType,
} from "react-flow-renderer";
import { useSelector, useDispatch } from 'react-redux';
import Bus from '@utils/eventBus';
import { v4 } from 'uuid';
import { edges as initialEdges } from './mock';
import CustomEdge from "./customEdge";
import { useTranslation } from 'react-i18next';

import SvgMouse from '@assets/icons/mouse.svg';

const nodeTypes = {
    api: Box,
    condition_controller: ConditionController,
    wait_controller: WaitController
};

const edgeTypes = {
    common: CustomEdge,
}

const onLoad = (reactFlowInstance) => {
    reactFlowInstance.fitView();
};

const onInit = (reactFlowInstance) => console.log('flow loaded:', reactFlowInstance);

const SceneBox = (props) => {
    const { from } = props;

    const refBox = useRef();
    const refContainer = useRef();
    const dispatch = useDispatch();

    const type_now_scene = useSelector((store) => store.scene.type);
    const saveScene = useSelector((store) => store.scene.saveScene);
    const id_apis_scene = useSelector((store) => store.scene.id_apis);
    const node_config_scene = useSelector((store) => store.scene.node_config);
    const import_node_scene = useSelector((store) => store.scene.import_node);
    const delete_node_scene = useSelector((store) => store.scene.delete_node);
    const clone_node_scene = useSelector((store) => store.scene.clone_node);
    const success_edge_scene = useSelector((store) => store.scene.success_edge);
    const failed_edge_scene = useSelector((store) => store.scene.failed_edge);
    const init_scene_scene = useSelector((store) => store.scene.init_scene);
    const run_res_scene = useSelector((store) => store.scene.run_res);
    const to_loading_scene = useSelector((store) => store.scene.to_loading);
    const scene_nodes = useSelector((store) => store.scene.nodes);
    const scene_edges = useSelector((store) => store.scene.edges);
    const scene_beautify = useSelector((store) => store.scene.beautify);

    const type_now_plan = useSelector((store) => store.plan.type);
    const id_apis_plan = useSelector((store) => store.plan.id_apis);
    const node_config_plan = useSelector((store) => store.plan.node_config);
    const import_node_plan = useSelector((store) => store.plan.import_node);
    const delete_node_plan = useSelector((store) => store.plan.delete_node);
    const clone_node_plan = useSelector((store) => store.plan.clone_node);
    const success_edge_plan = useSelector((store) => store.plan.success_edge);
    const failed_edge_plan = useSelector((store) => store.plan.failed_edge);
    const init_scene_plan = useSelector((store) => store.plan.init_scene);
    const run_res_plan = useSelector((store) => store.plan.run_res);
    const to_loading_plan = useSelector((store) => store.plan.to_loading);
    const plan_nodes = useSelector((store) => store.plan.nodes);
    const plan_edges = useSelector((store) => store.plan.edges);
    const plan_beautify = useSelector((store) => store.plan.beautify);


    const open_scene = useSelector((store) => store.scene.open_scene);
    const open_plan_scene = useSelector((store) => store.plan.open_plan_scene);

    const open_data = from === 'scene' ? open_scene : open_plan_scene;

    const id_apis = from === 'scene' ? id_apis_scene : id_apis_plan;
    const node_config = from === 'scene' ? node_config_scene : node_config_plan;
    const type_now = from === 'scene' ? type_now_scene : type_now_plan;
    const delete_node = from === 'scene' ? delete_node_scene : delete_node_plan;
    const clone_node = from === 'scene' ? clone_node_scene : clone_node_plan;
    const update_edge = useSelector((store) => store.scene.update_edge);
    const import_node = from === 'scene' ? import_node_scene : import_node_plan;

    const success_edge = from === 'scene' ? success_edge_scene : success_edge_plan;
    const failed_edge = from === 'scene' ? failed_edge_scene : failed_edge_plan;

    const _nodes = from === 'scene' ? scene_nodes : plan_nodes;
    const beautify = from === 'scene' ? scene_beautify : plan_beautify;
    const _edges = from === 'scene' ? scene_edges : plan_edges;





    const init_scene = from === 'scene' ? init_scene_scene : init_scene_plan;
    const run_res = from === 'scene' ? run_res_scene : run_res_plan;
    const to_loading = from === 'scene' ? to_loading_scene : to_loading_plan;

    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);

    const { t } = useTranslation();

    useEffect(() => {
        if (_nodes && _nodes.length > 0 && beautify) {
            setNodes(_nodes);

            if (from === 'scene') {
                dispatch({
                    type: 'scene/updateBeautify',
                    payload: false
                })
            } else {
                dispatch({
                    type: 'plan/updateBeautify',
                    payload: false
                })
            }
        }
    }, [_nodes]);

    const getFather = (a, b) => {
        let obj = {};
        a.forEach(item => {
            obj[item.id] = [];
        })
        b.forEach(item => {
            obj[item.target].push(item.source);
        })

        return obj;
    }

    const onConnect = useCallback((params) => {

        const _params = cloneDeep(params);
        _params.type = 'common';
        let id_obj = getFather(nodes, edges);
        const res = check([_params.source], _params.target, id_obj);
        if (res) {

            return setEdges((eds) => {

                return addEdge(_params, eds)
            })
        } else {
            Message('error', t('message.closeLoop'))
        }

    }, [nodes, edges, from]);

    const check = (sources, target, id_obj) => {
        for (const source of sources) {
            if (id_obj[source].length > 0) {
                if (id_obj[source].includes(target)) {
                    return false;
                } else {
                    return check(id_obj[source], target, id_obj);
                }
            } else {
                return true;
            }
        }
    }

    // const checkConnect = (source, target) => {
    //     if (source === target) {
    //         return false;
    //     }

    //     for (let i = 0; i < edges.length; i++) {
    //         if (edges[i].source === target && (edges.findIndex(item => item.target === source) !== -1)) {
    //             console.log(source, target, edges[i], edges.findIndex(item => item.target === source), edges);
    //             return false;
    //         }
    //         if (edges[i].target === source) {
    //             // arr.push(edges[i].source);
    //             checkConnect(edges[i].source, target);
    //         }
    //     };
    //     return true;
    // };

    // const _nodes = [
    //     { id: 'a' },
    //     { id: 'b' },
    //     { id: 'c' },
    // ];
    // const _edges = [
    //     { source: 'a', target: 'b' },
    //     { source: 'b', target: 'c' },
    // ];

    // const connect = { source: 'c', target: 'a' }; // 不允许

    useEffect(() => {
        if (edges.length > 0 && to_loading) {
            const _edges = cloneDeep(edges);
            _edges.forEach(item => {
                item.style = {};
                item.markerEnd = {};
            });
            setEdges(_edges);
        }
    }, [to_loading]);

    useEffect(() => {
        if (edges.length) {
            const _edges = cloneDeep(edges);
            _edges.forEach(item => {
                item.style = {};
                item.markerEnd = {};
            });
            setEdges(_edges);
        }
    }, [init_scene])


    const getNewCoordinate = (nodes) => {
        let position = {
            x: 50,
            y: 50,
        };
        nodes.forEach(item => {
            if (item.position.x > position.x - 10 || item.position.x < position.x + 10) {
                position.x += 30;
            }
            if (item.position.y > position.y - 10 || item.position.y < position.y + 10) {
                position.y += 30;
            }
        });
        return position;
    }

    // useEffect(() => {
    //     formatSuccess();
    // }, [success_edge_scene]);

    useEffect(() => {
        // formatSuccess();

        if (nodes.length > 0 || edges.length > 0) {

            if (from === 'scene') {
                dispatch({
                    type: 'scene/updateNodes',
                    payload: nodes,
                });
                dispatch({
                    type: 'scene/updateEdges',
                    payload: edges,
                })
            } else {
                dispatch({
                    type: 'plan/updateNodes',
                    payload: nodes,
                });
                dispatch({
                    type: 'plan/updateEdges',
                    payload: edges,
                })
            }
        }
    }, [nodes, edges]);

    useEffect(() => {
        const _open_data = cloneDeep(open_data);
        let ids = [];
        if (import_node && import_node.length) {
            let _position = [];
            import_node.forEach(item => {
                const id = v4();
                let position = getNewCoordinate(nodes.concat(_position));
                _position.push({ position })
                const new_node = {
                    id,
                    type: 'api',
                    data: {
                        id,
                        from,
                    },
                    position,
                    dragHandle: '.drag-content',
                }
                item.id = id;
                ids.push(id);
                setNodes((nds) => nds.concat(new_node));


                // if (_open_data.nodes) {
                //     _open_data.nodes.push(new_node);
                // } else {
                //     _open_data.nodes = [new_node];
                //     _open_data.edges = [];
                // }
            });
            if (from === 'scene') {
                Bus.$emit('addNewSceneApi', ids, id_apis, node_config, import_node, {}, from);
                dispatch({
                    type: 'scene/updateImportNode',
                    payload: [],
                })
            } else {
                Bus.$emit('addNewPlanApi', ids, id_apis, node_config, import_node, {}, from);
                dispatch({
                    type: 'plan/updateImportNode',
                    payload: [],
                })
                // dispatch({
                //     type: 'plan/updateOpenScene',
                //     payload: _open_data,
                // })
            }
        }
    }, [import_node]);

    useEffect(() => {

        formatSuccess();
        formatFailed();
    }, [nodes, success_edge, failed_edge])

    useEffect(() => {
        if (Object.entries((open_data || {})).length > 0) {
            const { nodes, edges } = open_data;
            // 1. 对nodes进行赋值, 渲染视图
            // 2. 对id_apis进行赋值, 建立id和api的映射关系
            // 3. 对node_config进行赋值, 建立id和config的映射关系
            const old_nodes = nodes && nodes.map(item => {
                const {
                    // node基本配置
                    data,
                    dragging,
                    height,
                    id,
                    is_check,
                    position,
                    positionAbsolute,
                    selected,
                    type,
                    width,
                    dragHandle,
                } = item;
                return {
                    data,
                    dragging,
                    height,
                    id,
                    is_check,
                    position,
                    positionAbsolute,
                    selected,
                    type,
                    width,
                    dragHandle,
                };
            });
            // edges && (edges[0].animated = true);
            setNodes(old_nodes || []);
            setEdges(edges || []);

            if (from === 'scene') {
                dispatch({
                    type: 'scene/updateNodes',
                    payload: nodes,
                });
                dispatch({
                    type: 'scene/updateEdges',
                    payload: edges,
                })
            } else {
                dispatch({
                    type: 'plan/updateNodes',
                    payload: nodes,
                });
                dispatch({
                    type: 'plan/updateEdges',
                    payload: edges,
                })
            }

        }
    }, [open_data]);

    useEffect(() => {
        if (delete_node.length > 0) {
            const node_index = nodes.findIndex(item => item.id === delete_node);
            const edge_index = edges.map((item, index) => {
                if (item.source === delete_node || item.target === delete_node) {
                    return index;
                }
            });
            let _nodes = cloneDeep(nodes);
            let _edges = cloneDeep(edges);
            _nodes.splice(node_index, 1);

            setNodes(_nodes);
            // edge_index.forEach(item => {
            //     typeof item === 'number' && _edges.splice(item, 1);
            // })
            _edges = _edges.filter((item, index) => !edge_index.includes(index));
            setEdges(_edges);
            // if (_nodes.length === 0) {
            if (from === 'scene') {
                dispatch({
                    type: 'scene/updateNodes',
                    payload: _nodes,
                });
                dispatch({
                    type: 'scene/updateEdges',
                    payload: _edges,
                })
                dispatch({
                    type: 'scene/updateDeleteNode',
                    payload: '',
                });
            } else {
                dispatch({
                    type: 'plan/updateNodes',
                    payload: _nodes,
                });
                dispatch({
                    type: 'plan/updateEdges',
                    payload: _edges,
                })
                dispatch({
                    type: 'plan/updateDeleteNode',
                    payload: '',
                });
            }
            // }
        }

    }, [delete_node]);

    useEffect(() => {
        if (Object.entries(clone_node).length > 0) {
            const _nodes = cloneDeep(nodes);
            _nodes.splice(_nodes.length - 1, 1);
            const index = _nodes.findIndex(item => item.id === clone_node.id);

            if (index === -1) {
                _nodes.push(clone_node);
                setNodes(_nodes);
                // setNodes((nds) => nds.concat(clone_node));
            }
            // setNodes(nodes);
        }
    }, [clone_node]);

    useEffect(() => {
        if (Object.entries(update_edge).length > 0) {
            const _edges = cloneDeep(edges);
            const index = _edges.findIndex(item => item.id === update_edge.id);
            _edges[index] = update_edge;
            setEdges(_edges);
        }
    }, [update_edge]);

    const formatSuccess = () => {
        if (success_edge.length > 0 && edges.length > 0) {
            // const _edges = cloneDeep(edges);
            // _edges.forEach(item => {
            //     if (success_edge.includes(item.id)) {
            //         item.style = {
            //             stroke: '#2BA58F',
            //         };
            //         item.markerEnd = {
            //             type: MarkerType.ArrowClosed,
            //         };
            //     }
            // });
            // setEdges(_edges);
            setEdges((nds) => {
                const _nds = cloneDeep(nds);
                _nds.forEach(item => {
                    if (success_edge.includes(item.id)) {
                        item.style = {
                            stroke: '#2BA58F',
                        };
                        item.markerEnd = {
                            type: MarkerType.ArrowClosed,
                        };
                    }
                })
                return _nds;
            });
        }
    }

    const formatFailed = () => {
        if (failed_edge.length > 0 && edges.length > 0) {
            // const _edges = cloneDeep(edges);
            // _edges.forEach(item => {
            //     if (failed_edge.includes(item.id)) {
            //         item.style = {
            //             stroke: 'var(--delete-red)',
            //         };
            //         item.markerEnd = {
            //             type: MarkerType.ArrowClosed,
            //         };
            //     }
            // })
            // setEdges(_edges);

            setEdges((nds) => {
                const _nds = cloneDeep(nds);
                _nds.forEach(item => {
                    if (failed_edge.includes(item.id)) {
                        item.style = {
                            stroke: 'var(--delete-red)',
                        };
                        item.markerEnd = {
                            type: MarkerType.ArrowClosed,
                        };
                    }
                })
                return _nds;
            });
        }
    }

    useEffect(() => {
        // if (success_edge.length > 0 && edges.length > 0) {
        //     const _edges = cloneDeep(edges);
        //     _edges.forEach(item => {
        //         if (success_edge.includes(item.id)) {
        //             item.style = {
        //                 stroke: '#2BA58F',
        //             };
        //             item.markerEnd = {
        //                 type: MarkerType.ArrowClosed,
        //             };
        //         }
        //     });
        //     setEdges(_edges);
        // }
    }, [success_edge]);

    useEffect(() => {
        // if (failed_edge.length > 0 && edges.length > 0) {
        //     const _edges = cloneDeep(edges);
        //     _edges.forEach(item => {
        //         if (failed_edge.includes(item.id)) {
        //             item.style = {
        //                 stroke: 'var(--delete-red)',
        //             };
        //             item.markerEnd = {
        //                 type: MarkerType.ArrowClosed,
        //             };
        //         }
        //     })
        //     setEdges(_edges);
        // }
    }, [failed_edge]);

    
    const [showMouse, setShowMouse] = useState(false);
    const [position, setPosition] = useState([]);

    useEffect(() => {
        const [action, type] = type_now;

        const id = v4();
        if (action === 'add' && type === 'api') {
            const apiList = nodes.filter(item => item.type === 'api');
            const new_node = {
                id,
                type: 'api',
                data: {
                    id,
                    from,
                },
                position: {
                    x: position[0],
                    y: position[1]
                },
                positionAbsolute: {
                    x: position[0],
                    y: position[1]
                },
                dragHandle: '.drag-content',
            }
            setPosition([]);
            const _open_data = cloneDeep(open_data);
            if (_open_data.nodes) {
                _open_data.nodes.push(new_node);
            } else {
                _open_data.nodes = [new_node];
                _open_data.edges = [];
            }
            if (from === 'scene') {
                Bus.$emit('addNewSceneApi', new_node.id, id_apis, node_config, { id }, { id }, from);
                // dispatch({
                //     type: 'scene/updateOpenScene',
                //     payload: _open_data,
                // })
            } else {
                Bus.$emit('addNewPlanApi', new_node.id, id_apis, node_config, { id }, { id }, from);
                // dispatch({
                //     type: 'plan/updateOpenScene',
                //     payload: _open_data,
                // })
            }
            setNodes((nds) => nds.concat(new_node));
        } else if (action === 'add' && type === 'condition_controller') {
            const new_node = {
                id,
                type: 'condition_controller',
                data: {
                    id,
                    from,
                },
                position: {
                    x: position[0],
                    y: position[1]
                },
                positionAbsolute: {
                    x: position[0],
                    y: position[1]
                },
                dragHandle: '.drag-content',
            }

            setPosition([]);

            // const _open_data = cloneDeep(open_data);
            // if (_open_data.nodes) {
            //     _open_data.nodes.push(new_node);
            // } else {
            //     _open_data.nodes = [new_node];
            //     _open_data.edges = [];
            // }

            if (from === 'scene') {
                Bus.$emit('addNewSceneControl', new_node.id, node_config);
                // dispatch({
                //     type: 'scene/updateOpenScene',
                //     payload: _open_data,
                // })
            } else {
                Bus.$emit('addNewPlanControl', new_node.id, node_config);
                // dispatch({
                //     type: 'plan/updateOpenScene',
                //     payload: _open_data,
                // })
            }

            setNodes((nds) => nds.concat(new_node));
        } else if (action === 'add' && type === 'wait_controller') {
            const new_node = {
                id,
                type: 'wait_controller',
                data: {
                    id,
                    from,
                },
                position: {
                    x: position[0],
                    y: position[1]
                },
                positionAbsolute: {
                    x: position[0],
                    y: position[1]
                },
                dragHandle: '.drag-content',
            }
            setPosition([]);
            // const _open_data = cloneDeep(open_data || []);
            // if (_open_data.nodes) {
            //     _open_data.nodes.push(new_node);
            // } else {
            //     _open_data.nodes = [new_node];
            //     _open_data.edges = [];
            // }

            if (from === 'scene') {
                Bus.$emit('addNewSceneControl', new_node.id, node_config);
                // dispatch({
                //     type: 'scene/updateOpenScene',
                //     payload: _open_data,
                // })
            } else {
                Bus.$emit('addNewPlanControl', new_node.id, node_config);
                // dispatch({
                //     type: 'plan/updateOpenScene',
                //     payload: _open_data,
                // })
            }

            setNodes((nds) => nds.concat(new_node));
        }

        if (type_now.length > 0) {
            if (from === 'scene') {
                dispatch({
                    type: 'scene/updateType',
                    payload: [],
                });
            } else {
                dispatch({
                    type: 'plan/updateType',
                    payload: [],
                });
            }
        }

        if (from === 'scene') {
            dispatch({
                type: 'scene/updateBeautify',
                payload: false
            })
        } else {
            dispatch({
                type: 'plan/updateBeautify',
                payload: false
            })
        }
    }, [type_now, position]);

    const scene_edge_right = useSelector((store) => store.scene.edge_right_id);
    const plan_edge_right = useSelector((store) => store.plan.edge_right_id);

    const edge_right = from === 'scene' ? scene_edge_right : plan_edge_right;

    useEffect(() => {
        const rightMenu = document.getElementsByClassName('scene-right-menu')[0];

        if (rightMenu) {
            rightMenu.addEventListener('click', (e) => {
                const __edges = cloneDeep(_edges);
                if (edge_right) {
                    const _index = __edges.findIndex(item => item.id === edge_right);
                    if (_index !== -1) {
                        __edges.splice(_index, 1);

                        if (from === 'scene') {
                            dispatch({
                                type: 'scene/updateEdges',
                                payload: __edges
                            });
                        } else {

                            dispatch({
                                type: 'plan/updateEdges',
                                payload: __edges
                            });
                        }
                    }

                    setEdges(__edges);
                }
            })
        }

        return () => {
            rightMenu.removeEventListener('click', (e) => {
                const __edges = cloneDeep(_edges);
                if (edge_right) {
                    const _index = __edges.findIndex(item => item.id === edge_right);
                    if (_index !== -1) {
                        __edges.splice(_index, 1);

                        if (from === 'scene') {
                            dispatch({
                                type: 'scene/updateEdges',
                                payload: __edges
                            });
                        } else {

                            dispatch({
                                type: 'plan/updateEdges',
                                payload: __edges
                            });
                        }
                    }

                    setEdges(__edges);
                }
            })
        }
    }, [edge_right, _edges, from]);

    const add_new_scene = useSelector((store) => store.scene.add_new);
    const add_new_plan = useSelector((store) => store.plan.add_new);
    const add_new = from === 'scene' ? add_new_scene : add_new_plan;

    const svgMouse = document.getElementsByClassName('svg-mouse')[0];

    const [zoom, setZoom] = useState(1);
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);


    if (add_new === 'api' || add_new === 'wait_controller' || add_new === 'condition_controller') {

        svgMouse && (svgMouse.style.display = 'block')
    }  else if (!add_new) {
        svgMouse && (svgMouse.style.display = 'none')
    }

    useEffect(() => {

        const flow = document.getElementsByClassName('react-flow')[0];

        const mousemove = (e) => {
            // console.log(e);
            // console.log(svgMouse);
            const { pageX, pageY, offsetX, offsetY } = e;
            // console.log(offsetX, offsetY);
            if (add_new === 'api' || add_new === 'wait_controller' || add_new === 'condition_controller') {
                setShowMouse(true);

                svgMouse.style.top = offsetY + 'px';
                svgMouse.style.left = offsetX + 'px';
                // svgMouse.style.display = 'block';
            }
        }

        const click = (e) => {
            const { offsetX, offsetY } = e;
            // console.log(offsetX, offsetY);
            if (add_new === 'api') {
                setPosition([offsetX * zoom - x, offsetY * zoom - y]);
                if (from === 'scene') {
                    dispatch({
                        type: 'scene/updateType',
                        payload: ['add', 'api']
                    })
                    dispatch({
                        type: 'scene/updateAddNew',
                        payload: ''
                    })
                } else {
                    dispatch({
                        type: 'plan/updateType',
                        payload: ['add', 'api']
                    })
                    dispatch({
                        type: 'plan/updateAddNew',
                        payload: ''
                    })
                }
                svgMouse.style.display = 'none';
            } else if (add_new === 'wait_controller') {
                setPosition([offsetX * zoom - x, offsetY * zoom - y]);
                if (from === 'scene') {
                    dispatch({
                        type: 'scene/updateType',
                        payload: ['add', 'wait_controller']
                    })
                    dispatch({
                        type: 'scene/updateAddNew',
                        payload: ''
                    })
                } else {
                    dispatch({
                        type: 'plan/updateType',
                        payload: ['add', 'wait_controller']
                    })
                    dispatch({
                        type: 'plan/updateAddNew',
                        payload: ''
                    })
                }
                svgMouse.style.display = 'none';
            } else if (add_new === 'condition_controller') {
                setPosition([offsetX * zoom - x, offsetY * zoom - y]);
                if (from === 'scene') {
                    dispatch({
                        type: 'scene/updateType',
                        payload: ['add', 'condition_controller']
                    })
                    dispatch({
                        type: 'scene/updateAddNew',
                        payload: ''
                    })
                } else {
                    dispatch({
                        type: 'plan/updateType',
                        payload: ['add', 'condition_controller']
                    })
                    dispatch({
                        type: 'plan/updateAddNew',
                        payload: ''
                    })
                }
                svgMouse.style.display = 'none';
            }
        }

        flow.addEventListener('mousemove', mousemove);

        flow.addEventListener('click', click);

        flow.oncontextmenu = () => {
            if (add_new) {
                if (from === 'scene') {
                    dispatch({
                        type: 'scene/updateAddNew',
                        payload: ''
                    })
                } else {
                    dispatch({
                        type: 'plan/updateAddNew',
                        payload: ''
                    })
                }
                svgMouse.style.display = 'none';
            }
        }

        return () => {
            flow.removeEventListener('mousemove', mousemove);
            flow.removeEventListener('click', click);
        }
    }, [add_new, zoom]);



    return (
        <div ref={refContainer} style={{ width: '100%', height: '100%' }}>
            {/* <div className="scene-box" ref={refBox}>
                <div className="scene-box-item">
                    <div className="scene-box-top"></div>
                    SceneBox
                    <div className="scene-box-bottom"></div>
                </div>
            </div> */}
            {/* <Box /> */}
            {/* <WaitController /> */}
            <ReactFlow
                nodeTypes={nodeTypes}
                edgeTypes={edgeTypes}
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onInit={onInit}
                onMove={(e, viewport) => {
                    const { x, y, zoom } = viewport;
                    setX(x);
                    setY(y);
                    setZoom(zoom);
                }}
            // fitView
            >
                {/* <MiniMap
                    nodeStrokeColor={(n) => {
                        if (n.style?.background) return n.style.background;
                        if (n.type === 'input') return '#0041d0';
                        if (n.type === 'output') return '#ff0072';
                        if (n.type === 'default') return '#1a192b';

                        return '#eee';
                    }}
                    nodeColor={(n) => {
                        if (n.style?.background) return n.style.background;

                        return 'var(--font-1)';
                    }}
                    nodeBorderRadius={2}
                >
                    <Controls />
                    <Background color="#aaa" gap={16} />
                </MiniMap> */}
                {/* <Controls /> */}
                <Background />
            </ReactFlow>

            {
                <SvgMouse className='svg-mouse' />
            }

            <div className="scene-right-menu" style={{ display: 'none' }}>
                {t('index.delete')}
            </div>
        </div>
    )
};

export default SceneBox;
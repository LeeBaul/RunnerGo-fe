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
} from "react-flow-renderer";
import { useSelector, useDispatch } from 'react-redux';
import Bus from '@utils/eventBus';
import { v4 } from 'uuid';
import { edges as initialEdges } from './mock';

const nodeTypes = {
    api: Box,
    condition_controller: ConditionController,
    wait_controller: WaitController
}

const onLoad = (reactFlowInstance) => {
    // console.log('flow loaded: ', reactFlowInstance);
    reactFlowInstance.fitView();
};

const onInit = (reactFlowInstance) => console.log('flow loaded:', reactFlowInstance);

const SceneBox = (props) => {
    const { from } = props;
    console.log('0+++', from);

    const refBox = useRef();
    const refContainer = useRef();
    const dispatch = useDispatch();

    const type_now_scene = useSelector((store) => store.scene.type); 3
    const saveScene = useSelector((store) => store.scene.saveScene);
    const id_apis_scene = useSelector((store) => store.scene.id_apis);
    const node_config_scene = useSelector((store) => store.scene.node_config);
    const import_node = useSelector((store) => store.scene.import_node);
    const delete_node_scene = useSelector((store) => store.scene.delete_node);
    const clone_node_scene = useSelector((store) => store.scene.clone_node);

    const type_now_plan = useSelector((store) => store.plan.type);
    const id_apis_plan = useSelector((store) => store.plan.id_apis);
    const node_config_plan = useSelector((store) => store.plan.node_config);
    const delete_node_plan = useSelector((store) => store.plan.delete_node);
    const clone_node_plan = useSelector((store) => store.plan.clone_node);

    const open_scene = useSelector((store) => store.scene.open_scene);
    const open_plan_scene = useSelector((store) => store.plan.open_plan_scene);
    console.log('1+++', open_scene);
    console.log('2+++', open_plan_scene);

    const open_data = from === 'scene' ? open_scene : open_plan_scene;
    const id_apis = from === 'scene' ? id_apis_scene : id_apis_plan;
    const node_config = from === 'scene' ? node_config_scene : node_config_plan;
    const type_now = from === 'scene' ? type_now_scene : type_now_plan;
    const delete_node = from === 'scene' ? delete_node_scene : delete_node_plan;
    const clone_node = from === 'scene' ? clone_node_scene : clone_node_plan;
    const update_edge = useSelector((store) => store.scene.update_edge);

    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);

    useEffect(() => {
        const [action, type] = type_now;
        console.log(action, type);
        const id = v4();
        if (action === 'add' && type === 'api') {
            console.log(nodes.length);
            const apiList = nodes.filter(item => item.type === 'api');
            const new_node = {
                id,
                type: 'api',
                data: {
                    id,
                    from,
                },
                position: { x: 50, y: 50 },
                dragHandle: '.box-item',
            }
            console.log(id_apis, ']]]]]]]]]')

            if (from === 'scene') {
                Bus.$emit('addNewSceneApi', new_node.id, id_apis, node_config);
            } else {
                Bus.$emit('addNewPlanApi', new_node.id, id_apis, node_config);
            }
            console.log('new_node', new_node);
            setNodes((nds) => nds.concat(new_node));
            console.log(nodes);
        } else if (action === 'add' && type === 'condition_controller') {
            const new_node = {
                id,
                type: 'condition_controller',
                data: {
                    id,
                },
                position: { x: 50, y: 50 }
            }

            Bus.$emit('addNewSceneControl', new_node.id, node_config);

            setNodes((nds) => nds.concat(new_node));
        } else if (action === 'add' && type === 'wait_controller') {
            const new_node = {
                id,
                type: 'wait_controller',
                data: {
                    id,
                },
                position: { x: 50, y: 50 }
            }

            Bus.$emit('addNewSceneControl', new_node.id, node_config);

            setNodes((nds) => nds.concat(new_node));
        }
    }, [type_now]);

    useEffect(() => {
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
            console.log(123123123123123, nodes, edges);
        }
    }, [nodes, edges]);

    useEffect(() => {

        import_node && import_node.forEach(item => {
            const id = v4();
            const new_node = {
                id,
                type: 'api',
                data: {
                    id,
                },
                position: { x: 50, y: 50 }
            }
            // console.log(id_apis, ']]]]]]]]]')

            Bus.$emit('addNewSceneApi', new_node.id, id_apis, node_config, item);

            setNodes((nds) => nds.concat(new_node));
        })
    }, [import_node]);

    useEffect(() => {
        if (Object.entries((open_data) || {}).length > 0) {
            console.log(open_data);
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
                };
            });
            // edges && (edges[0].animated = true);
            setNodes(old_nodes || []);
            setEdges(edges || []);
        }
    }, [open_data]);

    useEffect(() => {
        console.log(nodes, delete_node);
        if (delete_node.length > 0) {
            const node_index = nodes.findIndex(item => item.id === delete_node);
            const edge_index = edges.map((item, index) => {
                if (item.source === delete_node || item.target === delete_node) {
                    return index;
                }
            });
            const _nodes = cloneDeep(nodes);
            const _edges = cloneDeep(edges);
            _nodes.splice(node_index, 1);
            console.log(_nodes);
            setNodes(_nodes);
            edge_index.forEach(item => {
                typeof item === 'number' && _edges.splice(item, 1);
            })
            setEdges(_edges);
            if (_nodes.length === 0) {
                if (from === 'scene') {
                    dispatch({
                        type: 'scene/updateNodes',
                        payload: _nodes,
                    });
                    dispatch({
                        type: 'scene/updateEdges',
                        payload: _edges,
                    })
                } else {
                    dispatch({
                        type: 'plan/updateNodes',
                        payload: _nodes,
                    });
                    dispatch({
                        type: 'plan/updateEdges',
                        payload: _edges,
                    })
                }
            }
        }

    }, [delete_node]);

    useEffect(() => {
        if (Object.entries(clone_node).length > 0) {
            const _nodes = cloneDeep(nodes);
            _nodes.splice(_nodes.length - 1, 1);
            console.log('clone_node_______________________', _nodes);
            const index = _nodes.findIndex(item => item.id === clone_node.id);
            console.log('indexindexindex', index);

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
            console.log(_edges[index], '*****************************');
            setEdges(_edges);
        }
    }, [update_edge])


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
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onInit={onInit}
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

                        return '#fff';
                    }}
                    nodeBorderRadius={2}
                >
                    <Controls />
                    <Background color="#aaa" gap={16} />
                </MiniMap> */}

            </ReactFlow>
        </div>
    )
};

export default SceneBox;
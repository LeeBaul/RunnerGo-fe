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

const SceneBox = () => {

    const refBox = useRef();
    const refContainer = useRef();
    const dispatch = useDispatch();

    const type_now = useSelector((store) => store.scene.type);
    const saveScene = useSelector((store) => store.scene.saveScene);
    const id_apis = useSelector((store) => store.scene.id_apis);
    const node_config = useSelector((store) => store.scene.node_config);
    const import_node = useSelector((store) => store.scene.import_node);

    const open_scene = useSelector((store) => store.scene.open_scene);

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
                },
                position: { x: 50, y: 50 }
            }
            console.log(id_apis, ']]]]]]]]]')

            Bus.$emit('addNewSceneApi', new_node.id, id_apis, node_config);

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
            dispatch({
                type: 'scene/updateNodes',
                payload: nodes,
            });
            dispatch({
                type: 'scene/updateEdges',
                payload: edges,
            })
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
       if (Object.entries(open_scene || {}).length > 0) {
            const { nodes, edges } = open_scene;
            setNodes(nodes || []);
            setEdges(edges || []);
       }
    }, [open_scene])


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
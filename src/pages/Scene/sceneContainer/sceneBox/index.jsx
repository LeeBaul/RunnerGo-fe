import React, { useEffect, useRef, useState, useCallback } from "react";
import './index.less';
import { cloneDeep } from 'lodash';
import Box from "./box";
import ReactFlow, {
    addEdge,
    MiniMap,
    Controls,
    Background,
    useNodesState,
    useEdgesState,
} from "react-flow-renderer";
import { nodes as initialNodes, edges as initialEdges } from './mock';

const onLoad = (reactFlowInstance) => {
    // console.log('flow loaded: ', reactFlowInstance);
    reactFlowInstance.fitView();
};

const onInit = (reactFlowInstance) => console.log('flow loaded:', reactFlowInstance);

const SceneBox = () => {
    const refBox = useRef();
    const refContainer = useRef();


    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);

    return (
        <div ref={refContainer} style={{ width: '100%', height: '100%' }}>
            {/* <div className="scene-box" ref={refBox}>
                <div className="scene-box-item">
                    <div className="scene-box-top"></div>
                    SceneBox
                    <div className="scene-box-bottom"></div>
                </div>
            </div> */}
            <Box />
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onInit={onInit}
                fitView
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
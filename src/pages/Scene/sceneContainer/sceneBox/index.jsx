import React, { useEffect, useRef, useState, useCallback } from "react";
import './index.less';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
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
    const [canDrag, setCanDrag] = useState(true);


    // useEffect(() => {
    //     const bottomBox = document.querySelector('.scene-box-bottom');
    //     bottomBox.onmousedown = function (e) {
    //         setCanDrag(false);
    //         document.onmousemove = function (e) {
    //             console.log(e);
    //         };

    //         document.onmouseup = function () {
    //             document.onmouseup = null;
    //             document.onmousemove = null;
    //             setCanDrag(true);
    //         }
    //     }
    // }, []);

    const [{ isDragging }, drag] = useDrag({
        type: 'card',
        item: { name: 'box1', type: 'sceneBox' },
        end(item, monitor) {
            // monitor.getDropResult()   //获取拖拽对象所处容器的数据
            // monitor.didDrop()    // 当前容器能否放置拖拽对象

            const droptarget = monitor.getDropResult();
            // console.log(droptarget);
            const top = refBox.current.offsetTop;
            const left = refBox.current.offsetLeft;
            // console.log(top, left);
            // refBox.current.style.top = '100px';
            refBox.current.style.top = (top + droptarget.top) + 'px';
            refBox.current.style.left = (left + droptarget.left) + 'px';
        },
        canDrag,
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        })
    });

    const handleHover = (item, monitor) => {
        // console.log(item, monitor);
        // console.log(refBox.current.getBoundingClientRect());
        // console.log(refBox.current.offsetTop);
        // refBox.current.offsetTop = 200;
        // refBox.current.style.top = '-10px';
        const clientOffset = monitor.getClientOffset();
        // console.log(clientOffset);
    }

    const [{ canDrop, isOver }, drop] = useDrop({
        accept: 'card',
        collect: (monitor) => ({
            isOver: monitor.isOver({ shallow: true }),
            canDrop: monitor.canDrop(),
        }),
        // hover: handleHover,
        // hover: handleHover,
        drop: (item, monitor) => ({
            dropname: '测试',
            top: monitor.getDifferenceFromInitialOffset().y,
            left: monitor.getDifferenceFromInitialOffset().x
        }),
    });

    drag(refBox);
    drop(refContainer);

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
                attributionPosition="top-right"
            >
                <MiniMap
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
                </MiniMap>

            </ReactFlow>
        </div>
    )
};

export default SceneBox;
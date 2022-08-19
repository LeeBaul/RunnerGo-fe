import React, { useEffect, useRef, useState } from "react";
import './index.less';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { cloneDeep } from 'lodash';

const SceneBox = () => {
    const refBox = useRef();
    const refContainer = useRef();
    const [canDrag, setCanDrag] = useState(true);
    

    useEffect(() => {
           const bottomBox = document.querySelector('.scene-box-bottom');
           bottomBox.onmousedown = function(e) {
                setCanDrag(false);
                document.onmousemove = function(e) {
                    console.log(e);
                };

                document.onmouseup = function() {
                    document.onmouseup = null;
                    document.onmousemove = null;
                    setCanDrag(true);
                }
           }
    }, []);

    const [{ isDragging }, drag] = useDrag({
        type: 'card',
        item: { name: 'box1', type: 'sceneBox' },
        end(item, monitor) {
            // monitor.getDropResult()   //获取拖拽对象所处容器的数据
            // monitor.didDrop()    // 当前容器能否放置拖拽对象

            const droptarget = monitor.getDropResult();
            console.log(droptarget);
            const top = refBox.current.offsetTop;
            const left = refBox.current.offsetLeft;
            console.log(top, left);
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
        console.log(item, monitor);
        console.log(refBox.current.getBoundingClientRect());
        console.log(refBox.current.offsetTop);
        // refBox.current.offsetTop = 200;
        // refBox.current.style.top = '-10px';
        const clientOffset = monitor.getClientOffset();
        console.log(clientOffset);
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

    return (
        <div ref={refContainer} style={{ width: '1000px', height: '1000px' }}>
            <div className="scene-box" ref={refBox}>
                <div className="scene-box-item">
                    <div className="scene-box-top"></div>
                    SceneBox
                    <div className="scene-box-bottom"></div>
                </div>
            </div>
        </div>
    )
};

export default SceneBox;
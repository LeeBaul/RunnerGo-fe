import React, { useState, useEffect } from "react";
import './index.less';
import { getBezierPath, getSmoothStepPath, getEdgeCenter, getMarkerEnd } from 'react-flow-renderer';
import cn from 'classnames';

const CustomEdge = (props) => {
    const { 
        id,
        sourceX,
        sourceY,
        targetX,
        targetY,
        sourcePosition,
        targetPosition,
        borderRadius = 3,
        style = {},
        data,
        arrowHeadType,
        markerEndId,
    } = props;
    console.log(sourceX, sourceY, sourcePosition, targetX, targetY, targetPosition, borderRadius)

    const edgePath = getBezierPath({
        sourceX,
        sourceY,
        sourcePosition,
        targetX,
        targetY,
        targetPosition,
        borderRadius,
    });

    const markerEnd = getMarkerEnd(arrowHeadType, markerEndId);

    const [click, setClick] = useState(false);

    useEffect(() => {
        document.addEventListener('click', (e) => clickOutSide(e));

        return () => {
            document.removeEventListener('click', (e) => clickOutSide(e));
        }
    }, []);

    const clickOutSide = (e) => {
        let _path = document.querySelector('.click');

        if (_path && !_path.contains(e.target)) {
            setClick(false);
        }
    }

    console.log(edgePath);

    const handleContextMenu = (e) => {
        e.preventDefault();
        console.log(e);

        const x = e.clientX;
        const y = e.clientY;
        const rightMenu = document.getElementsByClassName('scene-right-menu')[0];
        rightMenu.style.display = 'block';
        rightMenu.style.left = x - 200 + 'px'; // 设置弹窗位置
        rightMenu.style.top = y - 30 + 'px';
        document.onclick = function() {
            rightMenu.style.display = 'none';
        }
    }

    useEffect(() => {
        const pathDom = document.getElementsByClassName('react-flow__edge-path')[0];
        pathDom.addEventListener('contextmenu', handleContextMenu);
        return () => {
            pathDom.removeEventListener('contextmenu', handleContextMenu);
        }
    }, []);

    return (
        <>
          <path
            id={id}
            style={style}
            className={cn('react-flow__edge-path', {
                click: click
            })}
            d={edgePath}
            onClick={(e) => setClick(true)}
          />


          <div className="scene-right-menu" style={{ display: 'none' }}>
            删除
          </div>
        </>
    );
};

export default CustomEdge;
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
        </>
    );
};

export default CustomEdge;
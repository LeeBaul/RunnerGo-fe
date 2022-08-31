import React from 'react';
import './index.less';
import { useSelector } from 'react-redux';
import cn from 'classnames';
import { isArray } from 'lodash';

const RunningShow = () => {
    const planData = useSelector((store) => store.plan.planData);
    const renderColor = () => {
        const arr = new Array(11).fill(0);
        if (!isArray(planData)) return;
        return arr.map((item, index) => <p className={ cn({ 'running': planData[index] }) } key={index}></p>)
    };
    return (
        <div className='running-show'>
            <div className='color-show'>
                { renderColor() }
            </div>
            <div className='number-show'>运行中 （{planData && planData.length}）</div>
        </div>
    );
};

export default RunningShow;
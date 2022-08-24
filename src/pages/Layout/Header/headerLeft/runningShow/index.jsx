import React from 'react';
import './index.less';
import { useSelector } from 'react-redux';

const RunningShow = () => {
    const renderColor = () => {
        const arr = new Array(11).fill(0);
        return arr.map((item, index) => <p key={index}></p>)
    };
    const planData = useSelector((store) => store.plan.planData)
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
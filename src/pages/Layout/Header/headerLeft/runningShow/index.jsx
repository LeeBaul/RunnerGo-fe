import React from 'react';
import './index.less';

const RunningShow = () => {
    const renderColor = () => {
        const arr = new Array(11).fill(0);
        return arr.map((item, index) => <p key={index}></p>)
    };
    return (
        <div className='running-show'>
            <div className='color-show'>
                { renderColor() }
            </div>
            <div className='number-show'>运行中 （5）</div>
        </div>
    );
};

export default RunningShow;
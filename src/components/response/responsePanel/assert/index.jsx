import React from 'react';
import './index.less';

const ResAssert = (props) => {
    const { data } = props;

    const assertion = data.assertion || [];
    return (
        <div className='res-assert'>
            {
                assertion.length ? assertion.map(item => (
                    <div className='assert-item'
                        style={{ 
                            backgroundColor: item.IsSucceed ? 'rgba(60, 192, 113, 0.1)' : 'rgba(255, 76, 76, 0.1)',
                            color: item.IsSucceed ? '#3CC071' : '#FF4C4C'
                         }}
                    >
                        {item.Msg}
                    </div>
                )) : <p>没有数据</p>
            }
        </div>
    )
};

export default ResAssert;
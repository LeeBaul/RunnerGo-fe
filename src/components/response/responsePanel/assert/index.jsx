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
                            backgroundColor: item.isSucceed ? 'rgba(60, 192, 113, 0.1)' : 'rgba(255, 76, 76, 0.1)',
                            color: item.isSucceed ? 'var(--run-green)' : 'var(--delete-red)'
                        }}
                    >
                        {item.msg}
                    </div>
                )) : <p>没有数据</p>
            }
        </div>
    )
};

export default ResAssert;
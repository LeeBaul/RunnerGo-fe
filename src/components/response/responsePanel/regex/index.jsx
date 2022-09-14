import React, { useEffect, useState } from 'react';
import './index.less';

const ResRegex = (props) => {
    const { data } = props;
    const regex = data.regex || [];
    const [regexList, setRegexList] = useState([]);
    const _regexList = [];
    if (regex) {

        regex.forEach(item => {
            for (let i in item) {
                _regexList.push(`${i}=${item[i]}`)
            }
        })
    }


    // useEffect(() => {

    // }, [regex]);

    return (
        <div className='res-regex'>
            {
                _regexList.length > 0 ? (
                    _regexList.map(item => (
                        <p className='res-regex-item'>{item}</p>
                    ))
                ) : <p>还没有数据</p>
            }
        </div>
    )
};

export default ResRegex;
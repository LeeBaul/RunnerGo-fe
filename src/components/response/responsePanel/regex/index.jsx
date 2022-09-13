import React, { useEffect, useState } from 'react';
import './index.less';

const ResRegex = (props) => {
    const { data } = props;
    const regex = data.regex || [];
    const [regexList, setRegexList] = useState([]);
    console.log(1);
    const _regexList = [];
    if (regex) {
        console.log(regex);

        regex.forEach(item => {
            for (let i in item) {
                _regexList.push(`${i}=${item[i]}`)
            }
        })

        // for (let i in regex) {
        //     console.log(i, regex[i]);
        //     for (let j in regex[i]) {
        //         let Key = j;
        //         let Value = regex[i][j];
        //         _regexList.push(`${Key}=${Value}`);
        //         console.log(_regexList);
        //     }
        // }
        // setRegexList(_regexList);
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
import React, { useEffect, useState } from 'react';
import './index.less';
import { useTranslation } from 'react-i18next';

const ResRegex = (props) => {
    const { data } = props;
    const regex = data.regex || [];
    const [regexList, setRegexList] = useState([]);
    const _regexList = [];
    const { t } = useTranslation();
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
                ) : <p>{ t('apis.noData') }</p>
            }
        </div>
    )
};

export default ResRegex;
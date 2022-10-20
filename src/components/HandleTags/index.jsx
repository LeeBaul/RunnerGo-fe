import React from 'react';
import './index.less';
import { useTranslation } from 'react-i18next';
/**
 * type:
 * 新建 - #2BA58F - create
 * 修改 - var(--log-blue) - update
 * 删除 - var(--theme-color) - delete
 * 运行 - var(--run-green) - run
 */

const HandleTags = (props) => {
    const { t } = useTranslation();
    const tagList = {
        '1': ['var(--log-cyan)', t('index.create')],
        '2': ['var(--log-blue)', t('index.update')],
        '3': ['var(--log-orange)', t('index.delete')],
        '4': ['var(--log-green)', t('index.run')]
    };
    const { type } = props;
    const [color, text] = tagList[type];

    return (
        <div className='handle-tag' style={{ backgroundColor: color }}>
            {text}
        </div>
    )
};

export default HandleTags;
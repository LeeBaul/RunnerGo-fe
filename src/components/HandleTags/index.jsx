import React from 'react';
import './index.less';
/**
 * type:
 * 新建 - #2BA58F - create
 * 修改 - var(--log-blue) - update
 * 删除 - var(--theme-color) - delete
 * 运行 - var(--run-green) - run
 */
const tagList = {
    '1': ['var(--log-cyan)', '新建'],
    '2': ['var(--log-blue)', '修改'],
    '3': ['var(--log-orange)', '删除'],
    '4': ['var(--log-green)', '运行']
};

const HandleTags = (props) => {
    const { type } = props;
    const [color, text] = tagList[type];
    return (
        <div className='handle-tag' style={{ backgroundColor: color }}>
            {text}
        </div>
    )
};

export default HandleTags;
import React from 'react';
import './index.less';
/**
 * type:
 * 新建 - #2BA58F - create
 * 修改 - #3A86FF - update
 * 删除 - #EC663C - delete
 * 运行 - #3CC071 - run
 */
const tagList = {
    '1': ['#2BA58F', '新建'],
    '2': ['#3A86FF', '修改'],
    '3': ['#EC663C', '删除'],
    '4': ['#3CC071', '运行']
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
import React, { useState } from 'react';
import './index.less';
import { Apis as SvgApis } from 'adesign-react/icons';
import CreateGroup from '@modals/CreateGroup';
import CreateScene from '@modals/CreateScene';

const SceneBox = () => {
    const [showCreateGroup, setCreateGroup] = useState(false);
    const [showCreateScene, setCreateScene] = useState(false);

    return (
        <div className='scene-box'>
            <div className='scene-box-item' onClick={() => setCreateGroup(true)}>
                <SvgApis width="18" height="18" />
                <p>新建分组</p>
            </div>
            <div className='line'></div>
            <div className='scene-box-item' onClick={() => setCreateScene(true)}>
                <SvgApis width="18" height="18" />
                <p>新建场景</p>
            </div>

            { showCreateGroup && <CreateGroup onCancel={() => setCreateGroup(false)} /> }
            { showCreateScene && <CreateScene onCancel={() => setCreateScene(false)} /> }
        </div>
    )
};

export default SceneBox;
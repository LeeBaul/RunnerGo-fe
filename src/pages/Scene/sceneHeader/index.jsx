import React, { useState } from 'react';
import './index.less';
import { 
    Setting1 as SvgSetting,
    Save as SvgSave,
    CaretRight as SvgCaretRight
 } from 'adesign-react/icons';
import { Button } from 'adesign-react';
import CreateApi from '@modals/CreateApi';

const SceneHeader = () => {
    const [showCreateApi, setCreateApi] = useState(false);
    return (
        <div className='scene-header'>
            <div className='scene-header-left'>场景设置</div>
            <div className='scene-header-right'>
                <div className='config' onClick={() => setCreateApi(true)}>
                    <SvgSetting />
                    <span>场景设置</span>
                </div>
                <Button className='saveBtn' preFix={<SvgSave />}>保存</Button>
                <Button className='runBtn' preFix={<SvgCaretRight />}>开始运行</Button>
            </div>
            { showCreateApi && <CreateApi onCancel={() => setCreateApi(false)} /> }
        </div>
    )
};

export default SceneHeader;
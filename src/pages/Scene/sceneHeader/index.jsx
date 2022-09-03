import React, { useState } from 'react';
import './index.less';
import { 
    Setting1 as SvgSetting,
    Save as SvgSave,
    CaretRight as SvgCaretRight
 } from 'adesign-react/icons';
import { Button, Message } from 'adesign-react';
import { useSelector, useDispatch } from 'react-redux';
import CreateApi from '@modals/CreateApi';
import Bus from '@utils/eventBus';

const SceneHeader = (props) => {
    const { from } = props;
    const [showCreateApi, setCreateApi] = useState(false);
    const dispatch = useDispatch();
    // const saveScene = useSelector((store) => store.scene.saveScene);
    const { nodes, edges, id_apis, node_config } = useSelector((store) => store.scene);
    console.log(nodes, edges, id_apis, node_config);
    return (
        <div className='scene-header'>
            <div className='scene-header-left'>场景设置</div>
            <div className='scene-header-right'>
                <div className='config' onClick={() => setCreateApi(true)}>
                    <SvgSetting />
                    <span>场景设置</span>
                </div>
                <Button className='saveBtn' preFix={<SvgSave />} onClick={() => {
                    Bus.$emit('saveScene', nodes, edges, id_apis, node_config, () => {
                        Message('success', '保存成功!');
                    });
                }}>保存</Button>
                { from === 'scene' && <Button className='runBtn' preFix={<SvgCaretRight />}>开始运行</Button> }
            </div>
            { showCreateApi && <CreateApi onCancel={() => setCreateApi(false)} /> }
        </div>
    )
};

export default SceneHeader;
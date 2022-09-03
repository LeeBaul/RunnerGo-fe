import React, { useState } from 'react';
import { Switch, InputNumber } from 'adesign-react';
import { More as SvgMore } from 'adesign-react/icons';
import './index.less';
import { Handle } from 'react-flow-renderer';
import Bus from '@utils/eventBus';
import { useSelector } from 'react-redux';

const WaitController = (props) => {
    const { data: { id } } = props;
    const [wait_ms, setWait] = useState(0);
    const node_config = useSelector((store) => store.scene.node_config);

    const onTargetChange = (type, value) => {
        Bus.$emit('updateNodeConfig', type, value, id, node_config);
    }

    return (
        <>
            <Handle
                type="target"
                position="top"
                id="a"
                className="my_handle"
            />
            <div className='controller-wait'>
                <div className='controller-wait-header'>
                    <div className='type'>
                        等待控制器
                    </div>
                    <div className='header-right'>
                        <Switch defaultChecked />
                        <SvgMore />
                    </div>
                </div>
                <div className='controller-wait-main'>
                    <div className='item'>
                        <InputNumber value={wait_ms} onChange={(e) => {
                            onTargetChange('wait_ms', parseInt(e));
                            setWait(e);
                        }} />
                        <p>ms</p>
                    </div>
                </div>
            </div>
            <Handle
                type="source"
                position="bottom"
                id="b"
                className="my_handle"
            />
        </>
    )
};

export default WaitController;
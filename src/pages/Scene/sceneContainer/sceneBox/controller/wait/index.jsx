import React, { useState, useEffect, useRef } from 'react';
import { Switch, InputNumber, Dropdown } from 'adesign-react';
import { More as SvgMore } from 'adesign-react/icons';
import './index.less';
import { Handle } from 'react-flow-renderer';
import Bus from '@utils/eventBus';
import { useSelector, useDispatch } from 'react-redux';

const WaitController = (props) => {
    const { data: { id } } = props;
    const [wait_ms, setWait] = useState(0);
    const refDropdown = useRef(null);
    const node_config = useSelector((store) => store.scene.node_config);
    const dispatch = useDispatch();

    useEffect(() => {
        const my_config = node_config[id];
        if (my_config) {
            const { wait_ms } = my_config;

            wait_ms && setWait(wait_ms);
        }
    }, [node_config]);

    const onTargetChange = (type, value) => {
        Bus.$emit('updateNodeConfig', type, value, id, node_config);
    }

    const DropContent = () => {
        return (
            <div className='drop-content'>
                <p onClick={() => {
                    dispatch({
                        type: 'scene/updateDeleteNode',
                        payload: id,
                    });
                    refDropdown.current.setPopupVisible(false);
                }}>删除控制器</p>
            </div>
        )
    };

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
                        {/* <Switch defaultChecked /> */}
                        {/* <SvgMore /> */}
                        <Dropdown
                            ref={refDropdown}
                            content={
                                <div>
                                    <DropContent />
                                </div>
                            }
                        // style={{ zIndex: 1050 }}
                        >
                            <div><SvgMore className='more-svg' /></div>
                        </Dropdown>
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
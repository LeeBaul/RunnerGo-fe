import React, { useState, useEffect, useRef } from 'react';
import { Switch, InputNumber, Dropdown } from 'adesign-react';
import { More as SvgMore } from 'adesign-react/icons';
import './index.less';
import { Handle } from 'react-flow-renderer';
import Bus from '@utils/eventBus';
import { useSelector, useDispatch } from 'react-redux';

import SvgSuccess from '@assets/logo/success';
import SvgFailed from '@assets/logo/failed';
import SvgRunning from '@assets/logo/running';

const WaitController = (props) => {
    const { data: { id, from } } = props;
    const [wait_ms, setWait] = useState(0);
    const refDropdown = useRef(null);
    const run_res_scene = useSelector((store) => store.scene.run_res);
    const node_config_scene = useSelector((store) => store.scene.node_config);
    const edges_scene = useSelector((store) => store.scene.edges);
    const init_scene_scene = useSelector((store) => store.scene.init_scene);

    const run_res_plan = useSelector((store) => store.plan.run_res);
    const edges_plan = useSelector((store) => store.plan.edges);
    const node_config_plan = useSelector((store) => store.plan.node_config);
    const init_scene_plan = useSelector((store) => store.plan.init_scene);

    const run_res = from === 'scene' ? run_res_scene : run_res_plan;
    const edges = from === 'scene' ? edges_scene : edges_plan;
    const node_config = from === 'scene' ? node_config_scene : node_config_plan;
    const init_scene = from === 'scene' ? init_scene_scene : init_scene_plan;
    const dispatch = useDispatch();

    // 当前节点状态
    const [status, setStatus] = useState('default');

    useEffect(() => {
        const my_config = node_config[id];
        if (my_config) {
            const { wait_ms } = my_config;

            wait_ms && setWait(wait_ms);
        }
    }, [node_config]);

    useEffect(() => {
        setStatus('default');
    }, [init_scene]);

    useEffect(() => {
        if (run_res) {
            const now_res = run_res.filter(item => item.event_id === id)[0];
            console.log(run_res, now_res, id);
            if (now_res) {
                const { status } = now_res;
                setStatus(status);

                update(edges, status);
            }
        }
    }, [run_res]);

    const onTargetChange = (type, value) => {
        Bus.$emit('updateNodeConfig', type, value, id, node_config, from);
    }

    const update = (edges, status) => {
        console.log('edges', edges, status);
        if (status === 'success') {
            // 以当前节点为顶点的线id
            const successEdge = [];
            // const Node = [];

            edges.forEach(item => {
                if (item.source === id) {
                    successEdge.push(item.id);
                }
            })

            console.log('successEdge', successEdge);

            if (successEdge.length > 0) {
                if (from === 'scene') {
                    dispatch({
                        type: 'scene/updateSuccessEdge',
                        payload: successEdge,
                    })
                } else {
                    dispatch({
                        type: 'plan/updateSuccessEdge',
                        payload: successEdge,
                    })
                }
            }
        } else if (status === 'failed') {
            const failedEdge = [];

            edges.forEach(item => {
                if (item.source === id) {
                    failedEdge.push(item.id);
                }
            })

            console.log('failedEdge', failedEdge);

            if (failedEdge.length > 0) {
                if (from === 'scene') {
                    dispatch({
                        type: 'scene/updateFailedEdge',
                        payload: failedEdge,
                    })
                } else {
                    dispatch({
                        type: 'plan/updateFailedEdge',
                        payload: failedEdge,
                    })
                }
            }
        }
    }


    const DropContent = () => {
        return (
            <div className='drop-content'>
                <p onClick={() => {
                    if (from === 'scene') {
                        dispatch({
                            type: 'scene/updateDeleteNode',
                            payload: id,
                        });
                    } else {
                        dispatch({
                            type: 'plan/updateDeleteNode',
                            payload: id,
                        });
                    }
                    refDropdown.current.setPopupVisible(false);
                }}>删除控制器</p>
            </div>
        )
    };

    const topBgStyle = {
        'default': '',
        'success': '#11811C',
        'failed': '#892020',
    }

    const topStatus = {
        'default': <></>,
        'success': <SvgSuccess className='default' />,
        'failed': <SvgFailed className='default' />,
        'running': <SvgRunning className='default' />,
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
                <div className='controller-wait-header' style={{ backgroundColor: topBgStyle[status] }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div className='type'>
                            等待控制器
                        </div>
                        {
                            topStatus[status]
                        }
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
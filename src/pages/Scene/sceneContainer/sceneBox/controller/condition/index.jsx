import React, { useState, useEffect, useRef } from 'react';
import { Switch, Input, Select, Dropdown, Button } from 'adesign-react';
import { More as SvgMore } from 'adesign-react/icons';
import './index.less';
import { Handle, MarkerType } from 'react-flow-renderer';
// import { COMPARE_IF_TYPE } from '@constants/compare';
import { useSelector, useDispatch } from 'react-redux';
import Bus from '@utils/eventBus';

import SvgSuccess from '@assets/logo/success';
import SvgFailed from '@assets/logo/failed';
import SvgRunning from '@assets/logo/running';
import { cloneDeep } from 'lodash';
import cn from 'classnames';
import { useTranslation } from 'react-i18next';
import SvgClose from '@assets/logo/close';

const { Option } = Select;

const ConditionController = (props) => {
    const { data: { id, from } } = props;
    const refDropdown = useRef(null);
    const { t } = useTranslation();

    const COMPARE_IF_TYPE = [
        { type: 'eq', title: t('apis.compareSelect.eq') },
        { type: 'uneq', title: t('apis.compareSelect.uneq') },
        { type: 'gt', title: t('apis.compareSelect.gt') },
        { type: 'gte', title: t('apis.compareSelect.gte') },
        { type: 'lt', title: t('apis.compareSelect.lt') },
        { type: 'lte', title: t('apis.compareSelect.lte') },
        { type: 'includes', title: t('apis.compareSelect.includes') },
        { type: 'unincludes', title: t('apis.compareSelect.unincludes') },
        { type: 'null', title: t('apis.compareSelect.null') },
        { type: 'notnull', title: t('apis.compareSelect.notnull') },
    ];
    // const dispatch = useDispatch();
    // const node_config = useSelector((store) => store.scene.node_config);

    const run_res_scene = useSelector((store) => store.scene.run_res);
    const node_config_scene = useSelector((store) => store.scene.node_config);
    const edges_scene = useSelector((store) => store.scene.edges);
    const init_scene_scene = useSelector((store) => store.scene.init_scene);
    const success_edge_scene = useSelector((store) => store.scene.success_edge);
    const failed_edge_scene = useSelector((store) => store.scene.failed_edge);
    const to_loading_scene = useSelector((store) => store.scene.to_loading);
    const open_scene_scene = useSelector((store) => store.scene.open_scene);
    const running_scene_scene = useSelector((store) => store.scene.running_scene);
    const select_box_scene = useSelector((store) => store.scene.select_box);

    const run_res_plan = useSelector((store) => store.plan.run_res);
    const edges_plan = useSelector((store) => store.plan.edges);
    const node_config_plan = useSelector((store) => store.plan.node_config);
    const init_scene_plan = useSelector((store) => store.plan.init_scene);
    const success_edge_plan = useSelector((store) => store.plan.success_edge);
    const failed_edge_plan = useSelector((store) => store.plan.failed_edge);
    const to_loading_plan = useSelector((store) => store.plan.to_loading);
    const open_scene_plan = useSelector((store) => store.plan.open_plan_scene);
    const running_scene_plan = useSelector((store) => store.plan.running_scene);
    const select_box_plan = useSelector((store) => store.plan.select_box);

    const run_res = from === 'scene' ? run_res_scene : run_res_plan;
    const edges = from === 'scene' ? edges_scene : edges_plan;
    const node_config = from === 'scene' ? node_config_scene : node_config_plan;
    const init_scene = from === 'scene' ? init_scene_scene : init_scene_plan;
    const success_edge = from === 'scene' ? success_edge_scene : success_edge_plan;
    const failed_edge = from === 'scene' ? failed_edge_scene : failed_edge_plan;
    const to_loading = from === 'scene' ? to_loading_scene : to_loading_plan;
    const open_scene = from === 'scene' ? open_scene_scene : open_scene_plan;
    const running_scene = from === 'scene' ? running_scene_scene : running_scene_plan;
    const select_box = from === 'scene' ? select_box_scene : select_box_plan;
    const dispatch = useDispatch();
    // 变量
    const [_var, setVar] = useState('');
    // 关系
    const [compare, setCompare] = useState('');
    // 变量值
    const [val, setVal] = useState('');
    // 备注
    const [remark, setRemark] = useState('');

    const [status, setStatus] = useState('default');

    useEffect(() => {
        const my_config = node_config[id];
        if (my_config) {
            const { var: _var, compare, val, remark } = my_config;
            _var && setVar(_var);
            compare && setCompare(compare);
            val && setVal(val);
            remark && setRemark(remark);
        }
    }, [node_config]);

    useEffect(() => {
        setStatus('default');
    }, [init_scene]);

    useEffect(() => {

        if (open_scene) {
            if (to_loading && running_scene === open_scene.scene_id) {
                setStatus('running');
            }
        }
    }, [to_loading])

    useEffect(() => {
        if (run_res) {
            const now_res = run_res.filter(item => item.event_id === id)[0];
            if (now_res) {
                const { status } = now_res;
                setStatus(status);

                update(edges, status);
            }
        }
    }, [run_res]);

    useEffect(() => {
        if (status === 'success' || status === 'failed') {
            update();
        }
    }, [open_scene]);

    const update = (edges, status) => {
        // const _open_scene = cloneDeep(open_scene);
        let temp = false;
        if (status === 'success') {
            // 以当前节点为顶点的线id
            // const successEdge = [];
            // const Node = [];

            edges.forEach(item => {
                if (item.source === id && !success_edge.includes(item.id)) {
                    temp = true;
                    success_edge.push(item.id);
                }
            })
            // _open_scene.edges.forEach(item => {
            //     if (item.source === id) {
            //         // success_edge.push(item.id);
            //         temp = true;
            //         item.style = {
            //             stroke: '#2BA58F',
            //         };
            //         item.markerEnd = {
            //             type: MarkerType.ArrowClosed,
            //         };
            //     }
            // })

            if (success_edge.length > 0 && temp) {
                if (from === 'scene') {
                    dispatch({
                        type: 'scene/updateSuccessEdge',
                        payload: success_edge,
                    })
                } else {
                    dispatch({
                        type: 'plan/updateSuccessEdge',
                        payload: success_edge,
                    })
                }
            }

            // if (from === 'scene' && temp) {
            //     // dispatch({
            //     //     type: 'scene/updateSuccessEdge',
            //     //     payload: success_edge,
            //     // })
            //     dispatch({
            //         type: 'scene/updateOpenScene',
            //         payload: _open_scene,
            //     })
            // } else if (from === 'plan' && temp) {
            //     // dispatch({
            //     //     type: 'plan/updateSuccessEdge',
            //     //     payload: success_edge,
            //     // })
            //     dispatch({
            //         type: 'plan/updateOpenScene',
            //         payload: _open_scene,
            //     })
            // }
        } else if (status === 'failed') {
            // const failed_edge = [];

            edges.forEach(item => {
                if (item.source === id) {
                    temp = true;
                    // item.style = {
                    //     stroke: 'var(--delete-red)',
                    // };
                    // item.markerEnd = {
                    //     type: MarkerType.ArrowClosed,
                    // };
                    failed_edge.push(item.id);
                }
            })

            // if (from === 'scene' && temp) {
            //     // dispatch({
            //     //     type: 'scene/updateSuccessEdge',
            //     //     payload: success_edge,
            //     // })
            //     dispatch({
            //         type: 'scene/updateOpenScene',
            //         payload: _open_scene,
            //     })
            // } else if (from === 'plan' && temp) {
            //     // dispatch({
            //     //     type: 'plan/updateSuccessEdge',
            //     //     payload: success_edge,
            //     // })
            //     dispatch({
            //         type: 'plan/updateOpenScene',
            //         payload: _open_scene,
            //     })
            // }

            if (failed_edge.length > 0 && temp) {
                if (from === 'scene') {
                    dispatch({
                        type: 'scene/updateFailedEdge',
                        payload: failed_edge,
                    })
                } else {
                    dispatch({
                        type: 'plan/updateFailedEdge',
                        payload: failed_edge,
                    })
                }
            }
        }
    }

    const DropContent = () => {
        return (
            <div className='drop-content'>
                <p onClick={() => {
                    // if (from === 'scene') {
                    //     dispatch({
                    //         type: 'scene/updateDeleteNode',
                    //         payload: id,
                    //     });
                    // } else {
                    //     dispatch({
                    //         type: 'plan/updateDeleteNode',
                    //         payload: id,
                    //     });
                    // }
                    // refDropdown.current.setPopupVisible(false);
                    // const _open_scene = cloneDeep(open_scene);
                    // const index = _open_scene.nodes.findIndex(item => item.id === id);
                    // _open_scene.nodes.splice(index, 1);
                    // const edges_index = [];
                    // _open_scene.edges.forEach((item, index) => {
                    //     if (item.source !== id && item.target !== id) {
                    //         edges_index.push(index);
                    //     }
                    // });
                    // _open_scene.edges = _open_scene.edges.filter((item, index) => !edges_index.includes(index));
                    // _open_scene.edges = edges;

                    if (from === 'scene') {
                        dispatch({
                            type: 'scene/updateDeleteNode',
                            payload: id,
                        });
                        // dispatch({
                        //     type: 'scene/updateOpenScene',
                        //     payload: _open_scene,
                        // })
                    } else {
                        dispatch({
                            type: 'plan/updateDeleteNode',
                            payload: id,
                        });
                        // dispatch({
                        //     type: 'plan/updateOpenScene',
                        //     payload: _open_scene,
                        // })
                    }
                }}>删除控制器</p>
            </div>
        )
    };

    const onTargetChange = (type, value) => {

        Bus.$emit('updateNodeConfig', type, value, id, node_config, from);
    }

    const topBgStyle = {
        'default': '',
        'success': 'var(--run-green)',
        'failed': 'var(--run-red)',
        'running': '',
    };

    const topStatus = {
        'default': <></>,
        'success': <SvgSuccess className='default' />,
        'failed': <SvgFailed className='default' />,
        'running': <SvgRunning className='default' />,
    };

    const [selectBox, setSelectBox] = useState(false);

    useEffect(() => {
        document.addEventListener('click', (e) => clickOutSide(e))

        return () => {
            document.removeEventListener('click', (e) => clickOutSide(e));
        }
    }, []);

    const clickOutSide = (e) => {
        let _box = document.querySelector('.selectBox');

        if (_box && !_box.contains(e.target)) {
            setSelectBox(false);
        }
    }

    useEffect(() => {

        if (select_box === id && selectBox === false) {

            setSelectBox(true);
        } else if (select_box !== id) {

            setSelectBox(false);
        }
    }, [select_box]);


    return (
        <div className={cn({
            selectBox: selectBox
        })} onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setSelectBox(true);

            if (from === 'scene') {
                dispatch({
                    type: 'scene/updateSelectBox',
                    payload: id,
                })
            } else {
                dispatch({
                    type: 'plan/updateSelectBox',
                    payload: id,
                })
            }

        }}>
            <Handle
                type="target"
                position="top"
                id="a"
                className="my_handle"
            />
            <div className="controller-condition"
            >

                <div className={cn('controller-condition-header', { 'white-run-color': status === 'success' || status === 'failed' })} style={{ backgroundColor: topBgStyle[status] }} >
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div className='type'>
                            {t('scene.condition')}
                        </div>
                        {
                            topStatus[status]
                        }
                    </div>
                    <div className='drag-content'></div>
                    <div className='header-right'>
                        {/* <Switch defaultChecked /> */}
                        {/* <SvgMore /> */}
                        {/* <Dropdown
                            ref={refDropdown}
                            content={
                                <div>
                                    <DropContent />
                                </div>
                            }
                        // style={{ zIndex: 1050 }}
                        >
                            <div><SvgMore className='more-svg' /></div>
                        </Dropdown> */}
                        <SvgClose onClick={() => {
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
                        }} />
                    </div>
                </div>
                <div className='controller-condition-main'>
                    <div className='item'>
                        <p>if</p>
                        <Input value={_var} size="mini" placeholder={t('placeholder.varName')} onChange={(e) => {
                            onTargetChange('var', e);
                            setVar(e);
                        }} />
                    </div>
                    <div className='item'>
                        <Select
                            value={compare}
                            placeholder={t('placeholder.plsSelect')}
                            onChange={(e) => {
                                onTargetChange('compare', e);
                                setCompare(e);
                            }}
                        >
                            {
                                COMPARE_IF_TYPE.map(item => (
                                    <Option value={item.type}>{item.title}</Option>
                                ))
                            }
                        </Select>
                    </div>
                    <div className='item'>
                        <Input size="mini" disabled={compare === 'null' || compare === 'notnull'} value={val} onChange={(e) => {
                            setVal(e);
                            onTargetChange('val', e);
                        }} placeholder={t('placeholder.varVal')} />
                    </div>
                    <div className='item'>
                        <Input size="mini" value={remark} onChange={(e) => {
                            setRemark(e);
                            onTargetChange('remark', e);
                        }} placeholder={t('placeholder.remark')} />
                    </div>
                </div>
            </div>
            <Handle
                type="source"
                position="bottom"
                id="b"
                className="my_handle"
            />
        </div>
    )
};

export default ConditionController;
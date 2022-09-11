import React, { useState, useRef, useEffect } from 'react';
import './index.less';
import {
    Apis as SvgApi,
    Down as SvgDown,
    More as SvgMore,
    Right as SvgRight
} from 'adesign-react/icons';
import {
    Button,
    Collapse as Col,
    Input,
    Select,
    Dropdown,
} from 'adesign-react';
import { useDispatch, useSelector } from 'react-redux';
import { Handle } from 'react-flow-renderer';
import { cloneDeep } from 'lodash';
import Bus from '@utils/eventBus';
import SvgSuccess from '@assets/logo/success';
import SvgFailed from '@assets/logo/failed';
import SvgRunning from '@assets/logo/running';

const { CollapseItem, Collapse } = Col;

const { Option } = Select;

const nodeBaseStyle = {
    background: "#0FA9CC",
    width: '8px',
    height: '8px',
};

const nodeLeftTopStyle = {
    ...nodeBaseStyle,
    top: 60,
};

// 点
// 1. 普通, 未涉及任何操作
// 2. 运行中, 正在跑这个接口
// 3. 成功, 接口跑通过
// 4. 失败, 接口跑失败
// 5. 未进行, 此节点的依赖节点跑失败, 未运行到这里

// 线
// 1. 普通, 为涉及任何操作
// 2. 运行中, 蓝色的流动的带箭头的线
// 3. 成功, 此线的前节点跑成功
// 4. 失败, 此线的千节点跑失败


const Box = (props) => {
    const { data: { showOne, id, from } } = props;
    console.log('Box id', id);
    const dispatch = useDispatch();
    const refInput = useRef(null);
    const refDropdown = useRef(null);
    const {
        nodes: nodes_scene,
        id_apis: id_apis_scene,
        node_config: node_config_scene,
        open_scene: open_scene_scene,
        run_res: run_res_scene,

        edges: edges_scene,
        init_scene: init_scene_scene,
    } = useSelector((store) => store.scene);

    const {
        nodes: nodes_plan,
        id_apis: id_apis_plan,
        node_config: node_config_plan,
        open_scene: open_scene_plan,
        run_res: run_res_plan,
        edges: edges_plan,
        init_scene: init_scene_plan,
    } = useSelector((store) => store.plan);

    const nodes = from === 'scene' ? nodes_scene : nodes_plan;
    const id_apis = from === 'scene' ? id_apis_scene : id_apis_plan;
    const node_config = from === 'scene' ? node_config_scene : node_config_plan;
    const open_scene = from === 'scene' ? open_scene_scene : open_scene_plan;
    const run_res = from === 'scene' ? run_res_scene : run_res_plan;

    const edges = from === 'scene' ? edges_scene : edges_plan;
    const init_scene = from === 'scene' ? init_scene_scene : init_scene_plan;

    console.log('run_res', run_res_scene, run_res);
    const [showApi, setShowApi] = useState(true);
    const [showMode, setShowMode] = useState(false);
    const [showModeTime, setShowModeTime] = useState(false);
    // 1. 默认模式
    // 2. 错误率模式
    // 3. 每秒事务数模式
    // 4. 响应时间模式
    // 5. 每秒请求数模式
    const [mode, setMode] = useState('1');
    const [menuList, setMenuList] = useState([90, 95, 100]);
    // 接口权重
    const [weight, setWeight] = useState(0);
    // 错误率阈值
    const [error_threshold, setError] = useState(0);
    // 响应时间阈值
    const [response_threshold, setRes] = useState(0);
    // 请求数阈值
    const [request_threshold, setReq] = useState(0);
    // 响应时间占比
    const [percent_age, setPercent] = useState(0);

    // 当前节点状态
    const [status, setStatus] = useState('default');

    useEffect(() => {
        const my_config = node_config[id];
        if (my_config) {
            const { weight, error_threshold, response_threshold, request_threshold, percent_age } = my_config;
            weight && setWeight(weight);
            error_threshold && setError(error_threshold);
            response_threshold && setRes(response_threshold);
            request_threshold && setReq(request_threshold);
            percent_age && setPercent(percent_age);
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

    const DropContent = () => {
        return (
            <div className='drop-content'>
                <p onClick={() => {
                    changeApiConfig(id);
                    refDropdown.current.setPopupVisible(false);
                }}>编辑接口</p>
                <p onClick={() => {
                    const _open_scene = cloneDeep(open_scene);
                    const index = _open_scene.nodes.findIndex(item => item.id === id);
                    _open_scene.nodes.splice(index, 1);
                    const edges = [];
                    _open_scene.edges.forEach((item, index) => {
                        if (item.source !== id && item.target !== id) {
                            edges.push(index);
                        }
                    });
                    _open_scene.edges = edges;

                    if (from === 'scene') {
                        dispatch({
                            type: 'scene/updateDeleteNode',
                            payload: id,
                        });
                        dispatch({
                            type: 'scene/updateOpenScene',
                            payload: _open_scene,
                        })
                    } else {
                        dispatch({
                            type: 'plan/updateDeleteNode',
                            payload: id,
                        });
                        dispatch({
                            type: 'plan/updateOpenScene',
                            payload: _open_scene,
                        })
                    }


                    refDropdown.current.setPopupVisible(false);
                }}>删除接口</p>
                <p onClick={() => {
                    Bus.$emit('cloneNode', id, nodes, node_config, id_apis, open_scene, from);
                    refDropdown.current.setPopupVisible(false);
                }}>复制接口</p>
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

    // 1. 运行场景
    // 2. 所有根节点进入running状态
    // 3. 轮询查结果, 查到结果都更新到redux
    // 4. 结果集中有更新后, 节点中进行自身检查, 结果集中是否有本节点的信息, 如果有, 根据status进行自身更新  
    // 5. 如果当前节点状态是success, 将此节点和所有next_list中的节点有关联的线变成绿色, 所有next_list中的节点为顶点的线变为loading
    // 6. 如果当前节点状态是failed, 将此节点和所有next_list中的节点有关联的线变成红色

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


    const Header = () => {
        return (
            <div className='box-item' style={{ backgroundColor: topBgStyle[status] }}>
                <div className='box-item-left'>
                    <SvgApi />
                    <span>{id_apis[id] ? id_apis[id]?.name : '新建接口'}</span>
                    {
                        topStatus[status]
                    }
                </div>
                <div className='box-item-right'>
                    <p className='drop-down' onClick={() => setShowApi(!showApi)}>
                        {showApi ? <SvgDown /> : <SvgRight />}
                    </p>
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
        )
    };

    // 错误率模式
    const ErrMode = () => {
        return (
            <div className='common-flex'>
                <span>错误率阈值</span>
                <Input size="mini" value={error_threshold} onChange={(e) => {
                    setError(parseInt(e));
                    onTargetChange('error_threshold', parseInt(e));
                }} placeholder="阈值" />
            </div>
        )
    };

    // 响应时间模式
    const ResTimeMode = () => {
        return (
            <div className='time-mode'>
                <Select
                    data-module="select-diy-example"
                    dropdownRender={(menu) => (
                        <>
                            <div className="menulist">{menu}</div>
                            <div className="diybox">
                                <input size="mini" ref={refInput} className="input" />
                                <Button
                                    size="mini"
                                    type="primary"
                                    className="add"
                                    onClick={() => {
                                        console.log(refInput);
                                        if (!refInput?.current?.value) {
                                            return;
                                        }
                                        setMenuList([...menuList, refInput?.current?.value]);
                                        if (refInput?.current) {
                                            refInput.current.value = '';
                                        }
                                    }}
                                >
                                    添加
                                </Button>
                            </div>
                        </>
                    )}
                    onChange={(e) => {
                        setPercent(parseInt(e));
                        onTargetChange('percent_age', parseInt(e));
                    }}
                    defaultValue={90}
                >
                    {menuList.map((d, index) => (
                        <Option key={index} value={d}>
                            {d}
                        </Option>
                    ))}
                </Select>
                <div className='common-flex'>
                    <span>响应时间阈值</span>
                    <Input size="mini" value={response_threshold} onChange={(e) => {
                        setRes(parseInt(e));
                        onTargetChange('response_threshold', parseInt(e));
                    }} placeholder="阈值" />
                </div>
                <div className='common-flex'>
                    <span>请求数阈值</span>
                    <Input size="mini" value={request_threshold} onChange={(e) => {
                        setReq(parseInt(e));
                        onTargetChange('request_threshold', parseInt(e));
                    }} placeholder="阈值" />
                </div>
            </div>
        )
    }

    // 每秒请求数模式
    const ReqCountMode = () => {
        return (
            <div className='common-flex'>
                <span>请求数阈值</span>
                <Input size="mini" placeholder="阈值" />
            </div>
        )
    };

    const RenderContent = () => {
        const obj = {
            '1': <></>,
            '2': <ErrMode />,
            '3': <></>,
            '4': <ResTimeMode />,
            '5': <ReqCountMode />
        };

        console.log(obj[mode]);

        return obj[mode];
    };

    const changeApiConfig = (id) => {
        // e.preventDefault();
        // e.stopPropagation();
        console.log(id_apis);
        const api_now = cloneDeep(id_apis[id]);
        console.log(id_apis, id, api_now, from);
        api_now.id = id;

        console.log(api_now, id);

        if (from === 'scene') {
            dispatch({
                type: 'scene/updateApiNow',
                payload: api_now,
            })
            dispatch({
                type: 'scene/updateApiConfig',
                payload: true
            })
            dispatch({
                type: 'scene/updateIdNow',
                payload: id,
            })
        } else {
            dispatch({
                type: 'plan/updateApiNow',
                payload: api_now,
            })
            dispatch({
                type: 'plan/updateApiConfig',
                payload: true
            })
            dispatch({
                type: 'plan/updateIdNow',
                payload: id,
            })
        }
    };

    const onTargetChange = (type, value) => {
        Bus.$emit('updateNodeConfig', type, value, id, node_config);
    }

    return (
        <div className='box'>
            <Handle
                type="target"
                position="top"
                id="a"
                className="my_handle"
            />

            <div className='collapse'>
                <Header />
                {showApi && <div className='collapse-body'>
                    <div className='api-weight'>
                        <span>接口权重</span>
                        <Input size="mini" value={weight} onChange={(e) => {
                            setWeight(parseInt(e));
                            onTargetChange('weight', parseInt(e));
                            console.log(nodes);
                        }} placeholder="数值" />
                    </div>
                    <Select
                        formatRender={(value, childList, text) => (
                            <>
                                <SvgApi />
                                <span style={{ paddingLeft: '10px' }}>{text}</span>
                            </>
                        )}
                        defaultValue="1"
                        onChange={(e) => setMode(e)}
                    >
                        <Option value="1">默认模式</Option>
                        <Option value="2">错误率模式</Option>
                        <Option value="3">每秒事务数模式</Option>
                        <Option value="4">响应时间模式</Option>
                        <Option value="5">每秒请求数模式</Option>
                    </Select>
                    {<RenderContent />}
                </div>}
                {
                    (status === 'success' || status === 'failed') &&
                    <div className='show-result'>
                        <Button onClick={() => changeApiConfig(id)}>查看结果</Button>
                    </div>
                }
            </div>

            {/* <Collapse defaultActiveKey="api" onChange={() => setShowApi(!showApi)}>
                <CollapseItem name="api" header={<Header />}>
                    <div className='api-weight'>
                        <span>接口权重</span>
                        <Input size="mini" placeholder="数值" />
                    </div>
                    <Select
                        formatRender={(value, childList, text) => (
                            <>
                                <SvgApi />
                                <span style={{ paddingLeft: '10px' }}>{text}</span>
                            </>
                        )}
                        defaultValue="1"
                        onChange={(e) => setMode(e)}
                    >
                        <Option value="1">默认模式</Option>
                        <Option value="2">错误率模式</Option>
                        <Option value="3">每秒事务数模式</Option>
                        <Option value="4">响应时间模式</Option>
                        <Option value="5">每秒请求数模式</Option>
                    </Select>
                    {<RenderContent />}
                </CollapseItem>
            </Collapse> */}
            <Handle
                type="source"
                position="bottom"
                id="b"
                className="my_handle"
            />
        </div>
    )
};

export default React.memo(Box);
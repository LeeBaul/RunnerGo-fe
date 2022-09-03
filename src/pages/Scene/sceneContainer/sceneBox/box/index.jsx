import React, { useState, useRef } from 'react';
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

const Box = (props) => {
    const { data: { showOne, id } } = props;
    const dispatch = useDispatch();
    const refInput = useRef(null);
    const refDropdown = useRef(null);
    const id_apis = useSelector((store) => store.scene.id_apis);
    const node_config = useSelector((store) => store.scene.node_config);
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

    const DropContent = () => {
        return (
            <div className='drop-content'>
                <p onClick={() => changeApiConfig()}>编辑接口</p>
                <p>删除接口</p>
            </div>
        )
    };


    const Header = () => {
        return (
            <div className='box-item'>
                <div className='box-item-left'>
                    <SvgApi />
                    <span>{id_apis[id] ? id_apis[id]?.name : '新建接口'}</span>
                </div>
                <div className='box-item-right'>
                    <p className='drop-down' onClick={() => setShowApi(!showApi)}>
                        {showApi ? <SvgDown /> : <SvgRight />}
                    </p>
                    <Dropdown
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

    const changeApiConfig = (e) => {
        // e.preventDefault();
        // e.stopPropagation();
        const api_now = cloneDeep(id_apis[id]);
        api_now.id = id;
        console.log(api_now, id);
        dispatch({
            type: 'scene/updateApiNow',
            payload: api_now,
        })
        dispatch({
            type: 'scene/updateApiConfig',
            payload: true
        })
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
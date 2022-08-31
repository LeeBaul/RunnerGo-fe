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
    Select
} from 'adesign-react';

const { CollapseItem, Collapse } = Col;

const { Option } = Select;

const Box = () => {
    const refInput = useRef(null);
    const [showApi, setShowApi] = useState(false);
    const [showMode, setShowMode] = useState(false);
    const [showModeTime, setShowModeTime] = useState(false);
    // 1. 默认模式
    // 2. 错误率模式
    // 3. 每秒事务数模式
    // 4. 响应时间模式
    // 5. 每秒请求数模式
    const [mode, setMode] = useState('1');
    const [menuList, setMenuList] = useState(['90%', '95%', '99%']);


    const Header = () => {
        return (
            <div className='box-item'>
                <div className='box-item-left'>
                    <SvgApi />
                    <span>首页</span>
                </div>
                <div className='box-item-right'>
                    {showApi ? <SvgDown /> : <SvgRight />}
                    <SvgMore />
                </div>
            </div>
        )
    };

    // 错误率模式
    const ErrMode = () => {
        return (
            <div className='common-flex'>
                <span>错误率阈值</span>
                <Input size="mini" placeholder="阈值" />
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
                    defaultValue="90%"
                >
                    {menuList.map((d, index) => (
                        <Option key={index} value={d}>
                            {d}
                        </Option>
                    ))}
                </Select>
                <div className='common-flex'>
                    <span>响应时间阈值</span>
                    <Input size="mini" placeholder="阈值" />
                </div>
                <div className='common-flex'>
                    <span>请求数阈值</span>
                    <Input size="mini" placeholder="阈值" />
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


    const changeCol = (e) => {
        e === 'api' ? setShowApi(true) : setShowApi(false);
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
    }

    return (
        <div className='box'>
            <Collapse onChange={(e) => changeCol(e)}>
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
            </Collapse>
        </div>
    )
};

export default Box;
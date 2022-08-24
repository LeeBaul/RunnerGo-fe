import React, { useState } from 'react';
import './index.less';
import {
    Apis as SvgApi,
    Down as SvgDown,
    More as SvgMore,
    Right as SvgRight
} from 'adesign-react/icons';
import {
    Collapse as Col,
    Input
} from 'adesign-react';

const { CollapseItem, Collapse } = Col;

const Box = () => {

    const [showApi, setShowApi] = useState(false);
    const [showMode, setShowMode] = useState(false);
    const [showModeTime, setShowModeTime] = useState(false);
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

    const ModeHeader = () => {
        return (
            <div className='mode-header'>
                <div className='mode-header-left'>
                    <SvgApi />
                    <span>响应时间模式</span>
                </div>
                <div className='mode-header-right'>
                    {showMode ? <SvgDown /> : <SvgRight />}
                </div>
            </div>
        )
    };

    const ModeTimeHeader = () => {
        return (
            <div className='mode-header'>
                <div className='mode-header-left'>
                    <span>90%</span>
                </div>
                <div className='mode-header-right'>
                    {showModeTime ? <SvgDown /> : <SvgRight />}
                </div>
            </div>
        )
    }

    const changeCol = (e) => {
        e === 'api' ? setShowApi(true) : setShowApi(false);
    };

    const changeCol1 = (e) => {
        e === 'api-mode' ? setShowMode(true) : setShowMode(false);
    }

    const changeCol2 = (e) => {
        e === 'api-mode-time' ? setShowModeTime(true) : setShowModeTime(false);
    }

    return (
        <div className='box'>
            <Collapse onChange={(e) => changeCol(e)}>
                <CollapseItem name="api" header={<Header />}>
                    <div className='api-weight'>
                        <span>接口权重</span>
                        <Input size="mini" placeholder="数值" />
                    </div>
                    <Collapse className='api-mode' onChange={(e) => changeCol1(e)}>
                        <CollapseItem name="api-mode" header={<ModeHeader />}>
                            <Collapse className='api-mode-time' onChange={(e) => changeCol2(e)}>
                                <CollapseItem name="api-mode-time" header={<ModeTimeHeader />}>
                                    <div className='api-weight'>
                                        <span>响应时间阈值</span>
                                        <Input size="mini" placeholder="数值" />
                                    </div>
                                </CollapseItem>
                            </Collapse>
                        </CollapseItem>
                    </Collapse>
                </CollapseItem>
            </Collapse>
        </div>
    )
};

export default Box;
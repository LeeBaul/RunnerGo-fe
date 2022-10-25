import React from "react";
import './index.less';
import { Radio, Input } from 'adesign-react';
const { Group } = Radio;

const Machine = () => {
    return (
        <div className="machine">
            <div className="left">
                <div className="left-container">
                    <p>并发模式</p>
                    <p className="select">阶梯模式</p>
                    <p>错误率模式</p>
                    <p>响应时间模式</p>
                    <p>每秒请求数模式</p>
                </div>
            </div>
            <div className="right">
                <div className="delta"></div>
                <div className="right-container">
                    <div className="right-item">
                        <span>起始并发数</span>
                        <Input />
                    </div>
                    <div className="right-item">
                        <span>并发数步长</span>
                        <Input />
                    </div>
                    <div className="right-item">
                        <span>步长执行时长</span>
                        <Input />
                    </div>
                    <div className="right-item">
                        <span>稳定持续时长</span>
                        <Input />
                    </div>
                    <div className="right-item" style={{ marginBottom: 0 }}>
                        <span>最大并发数</span>
                        <Input />
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Machine;
import React from "react";
import './index.less';
import { Radio, Input } from 'adesign-react';
const { Group } = Radio;

const Machine = () => {
    return (
        <div className="machine">
            <div className="left">
                <p>并发模式</p>
                <p>阶梯模式</p>
                <p>错误率模式</p>
                <p>响应时间模式</p>
                <p>每秒请求数模式</p>
            </div>
            <div className="right">
                <div className="right-container">
                    <Group value="A">
                        <Radio value="A">
                            <span>持续时长</span>
                            <Input />
                        </Radio>
                        <Radio value="B" disabled>
                            <span>轮次</span>
                            <Input />
                        </Radio>
                    </Group>
                    <div className="common-item">
                        <span>并发数</span>
                        <Input />
                    </div>
                    <div className="common-item">
                        <span>预热</span>
                        <Input />
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Machine;
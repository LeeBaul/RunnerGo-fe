import React from 'react';
import './index.less';
import { Input, Button } from 'adesign-react';
import {
    Search as SvgSearch,
    Add as SvgAdd
} from 'adesign-react/icons';

const PlanHeader = () => {
    return (
        <div className='plan-header'>
            <div className='plan-header-left'>
                <Input
                    className="textBox"
                    beforeFix={<SvgSearch />}
                    placeholder="搜索计划名称/执行者"
                />
            </div>
            <div className='plan-header-right'>
                <Button className='createBtn' preFix={<SvgAdd />}>新建任务</Button>
            </div>
        </div>
    )
};

export default PlanHeader;
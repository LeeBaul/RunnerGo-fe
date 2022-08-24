import React from 'react';
import './index.less';
import { Input, Button } from 'adesign-react';
import {
    Search as SvgSearch,
    Add as SvgAdd
} from 'adesign-react/icons';
import { useNavigate } from 'react-router-dom';

const PlanHeader = () => {
    const navigate = useNavigate();
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
                <Button className='createBtn' preFix={<SvgAdd />} onClick={() => navigate('/plan/detail')}>新建计划</Button>
            </div>
        </div>
    )
};

export default PlanHeader;
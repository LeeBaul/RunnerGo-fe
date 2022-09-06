import React, { useState } from 'react';
import './index.less';
import { Input, Button } from 'adesign-react';
import {
    Search as SvgSearch,
    Add as SvgAdd
} from 'adesign-react/icons';
import { useNavigate } from 'react-router-dom';
import CreatePlan from '@modals/CreatePlan';

const PlanHeader = () => {
    const [showPlan, setShowPlan] = useState(false);
    const [keyword, setKeyword] = useState('');
    const navigate = useNavigate();
    return (
        <div className='plan-header'>
            {
                showPlan && <CreatePlan onCancel={() => setShowPlan(false)} />
            }
            <div className='plan-header-left'>
                <Input
                    className="textBox"
                    value={keyword}
                    onChange={(e) => setKeyword(e)}
                    beforeFix={<SvgSearch />}
                    placeholder="搜索计划名称/执行者"
                />
                <Button className='searchBtn'>搜索</Button>
            </div>
            <div className='plan-header-right'>
                <Button className='createBtn' preFix={<SvgAdd />} onClick={() => setShowPlan(true)}>新建计划</Button>
            </div>
        </div>
    )
};

export default PlanHeader;
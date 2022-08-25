import React from 'react';
import './index.less';
import { Input, Button } from 'adesign-react';
import {
    Search as SvgSearch,
    Add as SvgAdd
} from 'adesign-react/icons';
import { useNavigate } from 'react-router-dom';

const ReportListHeader = () => {
    const navigate = useNavigate();
    return (
        <div className='report-header'>
            <div className='report-header-left'>
                <Input
                    className="textBox"
                    beforeFix={<SvgSearch />}
                    placeholder="搜索计划名称/执行者"
                />
            </div>
            <div className='report-header-right'>
                <Button className='createBtn' preFix={<SvgAdd />} onClick={() => navigate('/plan/detail')}>新建计划</Button>
            </div>
        </div>
    )
};

export default ReportListHeader
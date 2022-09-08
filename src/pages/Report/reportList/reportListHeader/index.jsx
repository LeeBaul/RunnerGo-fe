import React, { useState } from 'react';
import './index.less';
import { Input, Button } from 'adesign-react';
import {
    Search as SvgSearch,
    Add as SvgAdd
} from 'adesign-react/icons';
import { useNavigate } from 'react-router-dom';

const ReportListHeader = (props) => {
    const { onChange } = props;
    const navigate = useNavigate();
    const [keyword, setKeyword] = useState('');
    return (
        <div className='report-header'>
            <div className='report-header-left'>
                <Input
                    value={keyword}
                    className="textBox"
                    beforeFix={<SvgSearch />}
                    placeholder="搜索计划名称/执行者"
                    onChange={(e) => setKeyword(e)}
                />
                <Button className='searchBtn' onClick={() => onChange(keyword)}>搜索</Button>
            </div>
            {/* <div className='report-header-right'>
                <Button className='createBtn' preFix={<SvgAdd />} onClick={() => navigate('/plan/detail')}>新建计划</Button>
            </div> */}
        </div>
    )
};

export default ReportListHeader
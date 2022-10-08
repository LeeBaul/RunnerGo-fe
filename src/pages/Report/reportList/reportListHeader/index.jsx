import React, { useState } from 'react';
import './index.less';
import { Input, Button } from 'adesign-react';
import {
    Search as SvgSearch,
    Add as SvgAdd
} from 'adesign-react/icons';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const ReportListHeader = (props) => {
    const { onChange } = props;
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [keyword, setKeyword] = useState('');
    return (
        <div className='report-header'>
            <div className='report-header-left'>
                <Input
                    value={keyword}
                    className="textBox"
                    beforeFix={<SvgSearch />}
                    placeholder={ t('placeholder.searchPlan') }
                    onChange={(e) => {
                        setKeyword(e);
                        onChange(e);
                    }}
                />
                {/* <Button className='searchBtn' onClick={() => onChange(keyword)}>搜索</Button> */}
            </div>
            {/* <div className='report-header-right'>
                <Button className='createBtn' preFix={<SvgAdd />} onClick={() => navigate('/plan/detail')}>新建计划</Button>
            </div> */}
        </div>
    )
};

export default ReportListHeader
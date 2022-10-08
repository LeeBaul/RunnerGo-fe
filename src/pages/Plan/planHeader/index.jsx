import React, { useState } from 'react';
import './index.less';
import { Input, Button } from 'adesign-react';
import {
    Search as SvgSearch,
    Add as SvgAdd
} from 'adesign-react/icons';
import { useNavigate } from 'react-router-dom';
import CreatePlan from '@modals/CreatePlan';
import { useTranslation } from 'react-i18next';

const PlanHeader = (props) => {
    const { onChange } = props;
    const { t } = useTranslation();
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
                    onChange={(e) => {
                        setKeyword(e);
                        onChange(e);
                    }}
                    beforeFix={<SvgSearch />}
                    placeholder={ t('placeholder.searchPlan') }
                />
                {/* <Button className='searchBtn' onClick={() => onChange(keyword)}>搜索</Button> */}
            </div>
            <div className='plan-header-right'>
                <Button className='createBtn' preFix={<SvgAdd />} onClick={() => setShowPlan(true)}>{ t('btn.createPlan') }</Button>
            </div>
        </div>
    )
};

export default PlanHeader;
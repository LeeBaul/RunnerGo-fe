import React, { useState, useEffect } from 'react';
import './index.less';
import { Input, Button } from 'adesign-react';
import {
    Search as SvgSearch,
    Add as SvgAdd
} from 'adesign-react/icons';
import { useNavigate } from 'react-router-dom';
import CreatePlan from '@modals/CreatePlan';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { isArray } from 'lodash';

import { DatePicker } from '@arco-design/web-react';
const { RangePicker } = DatePicker;

const PlanHeader = (props) => {
    const { onChange, onDateChange } = props;
    const { t } = useTranslation();
    const [showPlan, setShowPlan] = useState(false);
    const [keyword, setKeyword] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const theme = useSelector((store) => store.user.theme);
    const navigate = useNavigate();

    const DateChange = (dateString, date) => {
        if (isArray(dateString)) {
            const [start, end] = dateString;

            onDateChange(new Date(start).getTime() / 1000, new Date(end).getTime() / 1000);
        } else {
            onDateChange('', '');
        }
    }

    useEffect(() => {
        if (theme === 'dark') {
            document.body.setAttribute('arco-theme', 'dark');
        } else {
            document.body.removeAttribute('arco-theme');
        }
    }, [theme]);

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
                    placeholder={t('placeholder.searchPlan')}
                />
                <RangePicker
                    mode="date"
                    onChange={DateChange}
                    showTime="true"
                />
                {/* <Button className='searchBtn' onClick={() => onChange(keyword)}>搜索</Button> */}
            </div>
            <div className='plan-header-right'>
                <Button className='createBtn' preFix={<SvgAdd />} onClick={() => setShowPlan(true)}>{t('btn.createPlan')}</Button>
            </div>
        </div>
    )
};

export default PlanHeader;
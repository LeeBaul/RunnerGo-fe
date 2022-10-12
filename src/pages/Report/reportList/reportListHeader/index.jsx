import React, { useState, useEffect } from 'react';
import './index.less';
import { Input, Button } from 'adesign-react';
import {
    Search as SvgSearch,
    Add as SvgAdd
} from 'adesign-react/icons';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { isArray } from 'lodash';

import { DatePicker } from '@arco-design/web-react';
const { RangePicker } = DatePicker;

const ReportListHeader = (props) => {
    const { onChange, onDateChange } = props;
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [keyword, setKeyword] = useState('');

    const theme = useSelector((store) => store.user.theme);

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
        <div className='report-header'>
            <div className='report-header-left'>
                <Input
                    value={keyword}
                    className="textBox"
                    beforeFix={<SvgSearch />}
                    placeholder={t('placeholder.searchPlan')}
                    onChange={(e) => {
                        setKeyword(e);
                        onChange(e);
                    }}
                />

                <RangePicker
                    mode="date"
                    onChange={DateChange}
                    showTime="true"
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
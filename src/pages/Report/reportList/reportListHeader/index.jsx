import React, { useState, useEffect } from 'react';
import './index.less';
import { Input, Button, Tooltip, Message } from 'adesign-react';
import {
    Search as SvgSearch,
    Add as SvgAdd
} from 'adesign-react/icons';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { isArray } from 'lodash';
import enUS from '@arco-design/web-react/es/locale/en-US';
import cnUS from '@arco-design/web-react/es/locale/zh-CN';

import { DatePicker, ConfigProvider } from '@arco-design/web-react';
const { RangePicker } = DatePicker;

const ReportListHeader = (props) => {
    const { onChange, onDateChange, selectReport } = props;
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [keyword, setKeyword] = useState('');

    const theme = useSelector((store) => store.user.theme);
    const language = useSelector((store) => store.user.language);

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

    const toContrast = () => {
        let task_mode = '';

        if (selectReport.filter(item => item.status === t('report.statusList.2')).length !== selectReport.length) {
            Message('error', t('message.contrastRunning'));
            return;
        }
        for (let i = 0; i < selectReport.length; i++) {
            if (i === 0) {
                task_mode = selectReport[i].task_mode;
            } else {
                if (task_mode !== selectReport[i].task_mode) {
                    Message('error', t('message.contrastMode'))
                    return;
                }
            }
        }
        const _selectReport = selectReport.map((item, index) => {
            return {
                report_id: item.report_id,
                plan_name: item.plan_name.props.content.props.children,
                scene_name: item.scene_name.props.content.props.children,
            }
        });
        navigate(`/reportContrast?contrast=${JSON.stringify(_selectReport)}`)
    }
    return (
        <div className='report-header-list'>
            <div className='report-header-list-left'>
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
                {
                    selectReport.length < 2 || selectReport.length > 5 ?
                        <Tooltip
                            bgColor={theme === 'dark' ? '#39393D' : '#E9E9E9'}
                            className='tooltip-diy'
                            content={selectReport.length < 2 || selectReport.length > 4 ? t('index.contrastText') : ''}
                        >
                            <Button
                                className='contrast-btn'
                                style={{ backgroundColor: selectReport.length < 2 || selectReport.length > 4 ? 'var(--bg-4)' : '', color: selectReport.length < 2 || selectReport.length > 4 ? 'var(--font-1)' : '' }}
                                disabled={selectReport.length < 2 || selectReport.length > 4}
                                onClick={() => toContrast()}
                            >
                                {t('btn.contrast')}
                            </Button>
                        </Tooltip>
                        : <Button
                            className='contrast-btn'
                            disabled={selectReport.length < 2 || selectReport.length > 4}
                            onClick={() => toContrast()}
                        >
                            {t('btn.contrast')}
                        </Button>
                }

            </div>
            {/* <div className='report-header-right'>
                <Button className='createBtn' preFix={<SvgAdd />} onClick={() => navigate('/plan/detail')}>新建计划</Button>
            </div> */}
        </div>
    )
};

export default ReportListHeader
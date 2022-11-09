import React from "react";
import './index.less';
import { Button } from 'adesign-react';
import { Left as SvgLeft } from 'adesign-react/icons';
import { useTranslation } from 'react-i18next';

const ContrastHeader = () => {
    const { t } = useTranslation();
    return (
        <div className="contrast-header">
            <div className="title">
                <Button>
                    <SvgLeft />
                </Button>
                <p>{ t('report.contrastReport') }</p>
            </div>
            <div className="name">
                <p>计划名称/场景名称</p>&nbsp;|&nbsp;
                <p>计划名称/场景名称</p>&nbsp;|&nbsp;
                <p>计划名称/场景名称</p>&nbsp;|&nbsp;
                <p>计划名称/场景名称</p>
            </div>
        </div>
    )
};

export default ContrastHeader;
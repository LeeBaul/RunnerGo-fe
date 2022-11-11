import React from "react";
import './index.less';
import { Button } from 'adesign-react';
import { Left as SvgLeft } from 'adesign-react/icons';
import { useTranslation } from 'react-i18next';

const ContrastHeader = (props) => {
    const { name } = props;
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
                {
                    name.map((item, index) => <p>{ item }&nbsp; { index !== name.length - 1 && '|' } &nbsp;</p>)
                }
            </div>
        </div>
    )
};

export default ContrastHeader;
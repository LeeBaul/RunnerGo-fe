import React from "react";
import './index.less';
import ContrastHeader from './contrastHeader';
import ContrastDetail from './contrastDetail';

const ReportContrast = () => {
    return (
        <div className="report-contrast">
            <ContrastHeader />
            <ContrastDetail />
        </div>
    )
};

export default ReportContrast;
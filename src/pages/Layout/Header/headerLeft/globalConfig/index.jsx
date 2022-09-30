import React, { useState } from 'react';
import './index.less';
import { 
    Desc as SvgDesc
 } from 'adesign-react/icons';
 import CommonFunction from '@modals/CommonFunc';
 import GlobalVar from '@modals/GlobalVar';
 import SvgGlobalVar from '@assets/icons/GlobalVar';
 import { useTranslation } from 'react-i18next';

const GlobalConfig = () => {
    const [showFunc, setShowFunc] = useState(false);
    const [showVar, setShowVar] = useState(false);
    const { t } = useTranslation();

    return (
        <div className='global-config'>
            <div className='config-item' onClick={() => setShowVar(true)}>
                <SvgGlobalVar />
                <span>{ t('header.globalVar') }</span>
            </div>
            <div className='config-item' onClick={() => setShowFunc(true)}>
                <SvgDesc />
                <span>{ t('header.commonFunc') }</span>
            </div>
            { showFunc && <CommonFunction onCancel={() => setShowFunc(false)} /> }
            { showVar && <GlobalVar onCancel={() => setShowVar(false)} /> }
        </div>
    )
};

export default GlobalConfig;
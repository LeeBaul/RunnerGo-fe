import React, { useEffect, useRef, useState } from 'react';
import { Button, Dropdown } from 'adesign-react';
import { Apis as SvgApis } from 'adesign-react/icons';
import './index.less';
import TeamProject from './teamProject';
import GlobalConfig from './globalConfig';
import RunningShow from './runningShow';
import ImportApi from '@modals/ImportApi';
import { useTranslation } from 'react-i18next';

const HeaderLeft = () => {
    const refDropdown = useRef();
    const [importApi, setImportApi] = useState(false);
    const { t } = useTranslation();
    const DropContent = () => {
        return (
            <div className='drop-content'>
                <div className='drop-content-item' onClick={() => {
                    setImportApi(true);
                    refDropdown.current.setPopupVisible(false);
                }}>
                    <SvgApis />
                    <span>{ t('header.asyncImport') }</span>
                </div>
                <div className='line'></div>
                <div className='drop-content-item' onClick={() => {
                    refDropdown.current.setPopupVisible(false);
                }}>
                    <SvgApis />
                    <span>{ t('header.otherImport') }</span>
                </div>
            </div>
        )
    }

    return (
        <div className='header-left'>
            { importApi && <ImportApi onCancel={() => setImportApi(false)} /> }
            <TeamProject />
            {/* <Dropdown
                className='import-dropdown'
                ref={refDropdown}
                content={
                    <div>
                        <DropContent />
                    </div>
                }
            >
                <Button className="import-btn">{ t("header.import") }</Button>
            </Dropdown> */}
            <GlobalConfig />
            <RunningShow />
        </div>
    )
};

export default HeaderLeft;
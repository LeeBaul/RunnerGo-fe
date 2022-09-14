import React, { useEffect, useRef, useState } from 'react';
import { Button, Dropdown } from 'adesign-react';
import { Apis as SvgApis } from 'adesign-react/icons';
import './index.less';
import TeamProject from './teamProject';
import GlobalConfig from './globalConfig';
import RunningShow from './runningShow';
import ImportApi from '@modals/ImportApi';

const HeaderLeft = () => {
    const refDropdown = useRef();
    const [importApi, setImportApi] = useState(false);
    const DropContent = () => {
        return (
            <div className='drop-content'>
                <div className='drop-content-item' onClick={() => setImportApi(true)}>
                    <SvgApis />
                    <span>同步Apipost</span>
                </div>
                <div className='line'></div>
                <div className='drop-content-item'>
                    <SvgApis />
                    <span>导入其他项目</span>
                </div>
            </div>
        )
    }

    return (
        <div className='header-left'>
            { importApi && <ImportApi onCancel={() => setImportApi(false)} /> }
            <TeamProject />
            <Dropdown
                className='import-dropdown'
                ref={refDropdown}
                content={
                    <div>
                        <DropContent />
                    </div>
                }
            >
                <Button>导入</Button>
            </Dropdown>
            <GlobalConfig />
            <RunningShow />
        </div>
    )
};

export default HeaderLeft;
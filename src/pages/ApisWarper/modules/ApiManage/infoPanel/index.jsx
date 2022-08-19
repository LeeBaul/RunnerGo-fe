import React, { useState } from 'react';
import { Input, Button } from 'adesign-react';
import { Right as SvgRight } from 'adesign-react/icons';
import ApiStatus from '@components/ApiStatus';
import APIModal from '@components/ApisDescription';
import ManageGroup from '@components/ManageGroup';
// import { TYPE_MODAL_TYPE } from './types';
import './index.less';

const ApiInfoPanel = (props) => {
    const { data, showGenetateCode, onChange } = props;

    const [modalType, setModalType] = useState ('');

    return (
        <>
            {modalType === 'description' && (
                <APIModal
                    value={data?.request?.description || ''}
                    onChange={onChange}
                    onCancel={setModalType.bind(null, '')}
                />
            )}
            <div className="api-manage">
                <div className="api-info-panel">
                    <div className="api-name-group">
                        {/* <ApiStatus
                            value={data?.mark}
                            onChange={(value) => {
                                onChange('mark', value);
                            }}
                        ></ApiStatus> */}
                        <Input
                            size="mini"
                            className="api-name"
                            placeholder="请输入接口名称"
                            value={data?.name || ''}
                            onChange={(value) => {
                                onChange('name', value);
                            }}
                        />
                    </div>
                    <Button
                        className="api-explain"
                        size="mini"
                        onClick={setModalType.bind(null, 'description')}
                        afterFix={<SvgRight />}
                    >
                        接口说明
                    </Button>
                    {/* <ManageGroup target={data} showGenetateCode={showGenetateCode} /> */}
                </div>
                <Button className='save-btn'>保存</Button>
            </div>
        </>
    );
};

export default ApiInfoPanel;

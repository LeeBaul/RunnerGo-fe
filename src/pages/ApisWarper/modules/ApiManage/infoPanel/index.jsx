import React, { useState } from 'react';
import { Input, Button } from 'adesign-react';
import { Right as SvgRight } from 'adesign-react/icons';
import ApiStatus from '@components/ApiStatus';
import APIModal from '@components/ApisDescription';
import ManageGroup from '@components/ManageGroup';
// import { TYPE_MODAL_TYPE } from './types';
import Bus from '@utils/eventBus';
import './index.less';
import { useSelector } from 'react-redux';
import { fetchHandleApi } from '@services/apis';
import { cloneDeep } from 'lodash';
import { tap } from 'rxjs';

const ApiInfoPanel = (props) => {
    const { data, showGenetateCode, onChange } = props;

    const [modalType, setModalType] = useState('');
    const { open_apis, open_api_now } = useSelector((store) => store.opens);

    const saveApi = () => {
        const apiData = cloneDeep(open_apis[open_api_now]);
        delete apiData['target_id'];
        apiData.parent_id = parseInt(apiData.parent_id);
        apiData.team_id = parseInt(sessionStorage.getItem('team_id'));
        apiData.is_changed = -1;
        console.log(apiData);
        fetchHandleApi(apiData)
        .pipe(
            tap((res) => {
                console.log(res);
            })
        )
        .subscribe();
    }   

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
                    {/* <Button
                        className="api-explain"
                        size="mini"
                        onClick={setModalType.bind(null, 'description')}
                        afterFix={<SvgRight />}
                    >
                        接口说明
                    </Button> */}
                    {/* <ManageGroup target={data} showGenetateCode={showGenetateCode} /> */}
                </div>
                <Button className='save-btn' onClick={() => saveApi()}
                >保存</Button>
            </div>
        </>
    );
};

export default ApiInfoPanel;

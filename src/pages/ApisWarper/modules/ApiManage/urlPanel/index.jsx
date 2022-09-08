import React, { useRef } from 'react';
import { Input, Select, Button, Dropdown } from 'adesign-react';
import { Down } from 'adesign-react/icons';
import { API_METHODS } from '@constants/methods';
import isFunction from 'lodash/isFunction';
import useApi from '../../../hooks/useApi';
import UrlInput from './urlInput';
import { useSelector } from 'react-redux';
import Bus from '@utils/eventBus';
import './index.less';

const Option = Select.Option;
const ApiURLPanel = (props) => {
    const { data, onChange, tempData } = props;
    const { apiSend } = useApi();
    const open_api_now = useSelector((store) => store.opens.open_api_now);
    const open_res = useSelector((store) => store.opens.open_res);

    console.log('open_api_now', open_api_now);
    const refDropdown = useRef(null);

    return (
        <div className="api-url-panel">
            <div className="api-url-panel-group">
                <Select
                    className="api-status"
                    size="middle"
                    value={data?.method || 'GET'}
                    onChange={(value) => {
                        onChange('method', value);
                    }}
                >
                    {API_METHODS.map((item) => (
                        <Option key={item} value={item}>
                            {item}
                        </Option>
                    ))}
                </Select>
                {/* <MetionInput /> */}
                <UrlInput
                    placeholder="请输入接口地址"
                    onChange={(value) => onChange('url', value)}
                    value={data?.url || ''}
                />
            </div>
            <div style={{ marginLeft: 8 }} className="btn-send">
                <Button
                    type="primary"
                    size="middle"
                    onClick={() => {
                        // apiSend(data);
                        Bus.$emit('sendApi', open_api_now);
                    }}
                    disabled={tempData?.sendStatus === 'sending'}
                >
                    {open_res[open_api_now] ? (open_res[open_api_now].status === 'running' ? '发送中...' : '发送') : '发送'}
                    {/* 发送 */}
                </Button>
                <Dropdown
                    ref={refDropdown}
                    placement="bottom-end"
                    className="request-download-btn"
                    content={<></>}
                >
                    <div className="right">
                        <div className="split-line" />
                        <Down width={16} className="arrow-icon" />
                    </div>
                </Dropdown>
            </div>
        </div>
    );
};

export default ApiURLPanel;

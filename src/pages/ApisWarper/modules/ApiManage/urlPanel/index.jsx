import React, { useRef } from 'react';
import { Input, Select, Button, Dropdown } from 'adesign-react';
import { Down } from 'adesign-react/icons';
import { API_METHODS } from '@constants/methods';
import isFunction from 'lodash/isFunction';
import useApi from '../../../hooks/useApi';
import UrlInput from './urlInput';
import './index.less';

const Option = Select.Option;
const ApiURLPanel = (props) => {
    const { data, onChange, tempData } = props;
    const { apiSend } = useApi();

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
                    value={data?.request?.url || data?.url || ''}
                />
            </div>
            <div style={{ marginLeft: 8 }} className="btn-send">
                <Button
                    type="primary"
                    size="middle"
                    onClick={() => {
                        apiSend(data);
                    }}
                    disabled={tempData?.sendStatus === 'sending'}
                >
                    {tempData?.sendStatus === 'sending' ? '发送中...' : '发送'}
                </Button>
                <Dropdown
                    ref={refDropdown}
                    placement="bottom-end"
                    className="request-download-btn"
                    content={
                        <div className="DropWrapper">
                            <div
                                className="drop-item"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    // console.log('发送并保存响应');
                                    apiSend(data, true);
                                    isFunction(refDropdown?.current?.setPopupVisible) &&
                                        refDropdown.current.setPopupVisible(false);
                                }}
                            >
                                发送并保存响应
                            </div>
                        </div>
                    }
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

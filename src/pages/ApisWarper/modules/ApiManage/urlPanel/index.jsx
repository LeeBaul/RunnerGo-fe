import React, { useRef, useState } from 'react';
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
    const { data, onChange, tempData, from = 'apis' } = props;
    const { apiSend } = useApi();
    const [btnName, setBtnName] = useState('发送');
    const open_api_now = useSelector((store) => store.opens.open_api_now);
    const open_res = useSelector((store) => store.opens.open_res);

    const open_scene_res = useSelector((store) => store.scene.run_api_res)
    const open_scene = useSelector((store) => store.scene.open_scene);

    const open_plan_res = useSelector((store) => store.plan.run_api_res);
    const open_plan_scene = useSelector((store) => store.plan.open_plan_scene);

    const id_now = useSelector((store) => store.scene.id_now);
    const id_now_plan = useSelector((store) => store.plan.id_now);

    console.log(open_plan_res, id_now_plan);

    // if (from === 'apis') {
    //     if (open_res || open_res[open_api_now] || open_res[open_api_now].status === 'running') {
    //         setBtnName('发送中...');
    //     } else {
    //         setBtnName('发送');
    //     }
    // } else if (from === 'scene') {
    //     if (open_scene_res || open_scene_res[id_now] || open_scene_res[id_now].status === 'running') {
    //         setBtnName('发送中...');
    //     } else {
    //         setBtnName('发送');
    //     }
    // } else if (from === 'plan') {
    //     if (open_plan_res && open_plan_res[id_now_plan] && open_plan_res[id_now_plan].status === 'running') {
    //         setBtnName('发送中...');
    //     } else {
    //         setBtnName('发送');
    //     }
    // }

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
                        if (from === 'scene') {
                            Bus.$emit('sendSceneApi', open_scene.scene_id, id_now, open_scene_res || {}, 'scene');
                        } else if (from === 'plan') {
                            console.log('()()()', open_plan_scene, id_now_plan, open_plan_res);
                            Bus.$emit('sendSceneApi', open_plan_scene.scene_id, id_now_plan, open_plan_res || {}, 'plan');
                        } else {
                            Bus.$emit('sendApi', open_api_now);
                        }
                    }}
                // disabled={
                //     from === 'scene' ? open_scene_res && open_scene_res[id_now]?.status === 'running' : open_res && open_res[open_api_now]?.status === 'running'
                // }
                >
                    {btnName}
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

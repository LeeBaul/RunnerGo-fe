import React, { useRef, useState, useEffect } from 'react';
import { Input, Select, Button, Dropdown } from 'adesign-react';
import { Down } from 'adesign-react/icons';
import { API_METHODS } from '@constants/methods';
import isFunction from 'lodash/isFunction';
import useApi from '../../../hooks/useApi';
import UrlInput from './urlInput';
import { useSelector, useDispatch } from 'react-redux';
import Bus from '@utils/eventBus';
import { useParams } from 'react-router-dom';
import './index.less';
import { debounce } from 'lodash';

const Option = Select.Option;
const ApiURLPanel = (props) => {
    const { data, onChange, tempData, from = 'apis' } = props;
    const { apiSend } = useApi();
    const { id } = useParams();
    const [btnName, setBtnName] = useState('发送');
    const dispatch = useDispatch();
    const open_api_now = useSelector((store) => store.opens.open_api_now);
    const open_res = useSelector((store) => store.opens.open_res);

    const open_scene_res = useSelector((store) => store.scene.run_api_res)
    const open_scene = useSelector((store) => store.scene.open_scene);

    const open_plan_res = useSelector((store) => store.plan.run_api_res);
    const open_plan_scene = useSelector((store) => store.plan.open_plan_scene);

    const id_now = useSelector((store) => store.scene.id_now);
    const id_now_plan = useSelector((store) => store.plan.id_now);


    const res_list = {
        'apis': open_res && open_res[open_api_now],
        'scene': open_scene_res && open_scene_res[id_now],
        'plan': open_plan_res && open_plan_res[id_now_plan],
    };

    const res_now = res_list[from];

    useEffect(() => {
        if (res_now && res_now.status === 'finish') {
            setBtnName('发送');
        }
    }, [res_now]);

    const {
        nodes: nodes_scene,
        edges: edges_scene,
        id_apis: id_apis_scene,
        node_config: node_config_scene,
        open_scene: open_scene_scene,
    } = useSelector((store) => store.scene);
    const {
        nodes: nodes_plan,
        edges: edges_plan,
        id_apis: id_apis_plan,
        node_config: node_config_plan,
        open_plan_scene: open_scene_plan,
    } = useSelector((store) => store.plan);
    const nodes = from === 'scene' ? nodes_scene : nodes_plan;
    const edges = from === 'scene' ? edges_scene : edges_plan;
    const id_apis = from === 'scene' ? id_apis_scene : id_apis_plan;
    const node_config = from === 'scene' ? node_config_scene : node_config_plan;
    // const open_scene = from === 'scene' ? open_scene_scene : open_scene_plan;

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
                    disabled={btnName === '发送中...'}
                    onClick={() => {
                        // apiSend(data);
                        setBtnName('发送中...');
                        if (from === 'scene') {
                            Bus.$emit('saveScene', nodes, edges, id_apis, node_config, open_scene_scene, () => {
                                Bus.$emit('sendSceneApi', open_scene_scene.scene_id || open_scene_scene.target_id, id_now, open_scene_res || {}, 'scene');
                            });
                        } else if (from === 'plan') {
                            Bus.$emit('saveScenePlan', nodes, edges, id_apis, node_config, open_plan_scene, id, () => {
                                Bus.$emit('sendSceneApi', open_plan_scene.scene_id, id_now_plan, open_plan_res || {}, 'plan');
                            });
                        } else {
                            Bus.$emit('saveTargetById', {
                                id: open_api_now,
                            }, {}, (code, id) => {
                                console.log(code, id);
                                dispatch({
                                    type: 'opens/updateOpenApiNow',
                                    payload: id,
                                })
                                Bus.$emit('sendApi', id);
                            })
                        }
                    }}
                // disabled={
                //     from === 'scene' ? open_scene_res && open_scene_res[id_now]?.status === 'running' : open_res && open_res[open_api_now]?.status === 'running'
                // }
                >
                    {btnName}
                    {/* 发送 */}
                </Button>
                {/* <Dropdown
                    ref={refDropdown}
                    placement="bottom-end"
                    className="request-download-btn"
                    content={<></>}
                >
                    <div className="right">
                        <div className="split-line" />
                        <Down width={16} className="arrow-icon" />
                    </div>
                </Dropdown> */}
            </div>
        </div>
    );
};

export default ApiURLPanel;

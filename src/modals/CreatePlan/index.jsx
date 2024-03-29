import React, { useState, useEffect } from "react";
import {
    Input,
    Select,
    Tabs as TabComponent,
    Modal,
    Switch,
    Table,
    Message,
    Button
} from 'adesign-react';
import { Delete as SvgDelete } from 'adesign-react/icons';
import Authen from "@components/Auth";
import ScriptBox from "@components/ScriptBox";
import ApiInput from "@components/ApiInput";
import { HEADERTYPELIST } from '@constants/typeList';
import Bus from '@utils/eventBus';
import { newDataItem, dataItem } from '@constants/dataItem';
import useFolders from '@hooks/useFolders';
import { isArray, cloneDeep, isPlainObject, isString, set, trim } from 'lodash';
import { findSon } from '@utils';
import DescChoice from '@components/descChoice';
import { FolderWrapper, FolderModal } from './style';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

const { Tabs, TabPan } = TabComponent;
const Option = Select.Option;
const Textarea = Input.Textarea;

const CreatePlan = (props) => {
    const { onCancel, group } = props;
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { apiFolders } = useFolders();
    const [script, setScript] = useState({
        pre_script: '',
        // pre_script_switch: 1,
        test: '',
        // test_switch: 1,
    });
    const { t } = useTranslation();

    const [request, setRequest] = useState(
        group?.request || {
            header: {
                parameter: []
            },
            query: {
                parameter: []
            },
            body: {
                parameter: []
            },
            auth: {
                type: 'noauth',
                kv: { key: '', value: '' },
                bearer: { key: '' },
                basic: { username: '', password: '' },
            },
            description: '',
        }
    );
    const [groupName, setGroupName] = useState('');
    const [tabActiveId, setTabActiveId] = useState('0');
    const [parent_id, setParent_id] = useState(0);

    const [planName, setPlanName] = useState('');
    const [planDesc, setPlanDesc] = useState('');

    useEffect(() => {
        const init = () => {
            if (isPlainObject(group)) {
                const { request, name, script: folderScript, parent_id } = group;
                parent_id && setParent_id(parent_id);
                folderScript && setScript(folderScript);
                name && setGroupName(name);
                request && setRequest(request);
            } else {
                setRequest({
                    header: [],
                    query: [],
                    body: [],
                    auth: {
                        type: 'noauth',
                        kv: { key: '', value: '' },
                        bearer: { key: '' },
                        basic: { username: '', password: '' },
                    },
                    description: '',
                });
            }
        };
        init();
    }, [group]);

    const handleChange = (rowData, rowIndex, newVal) => {
        const requestKey = {
            '0': 'header',
            '1': 'query',
            '2': 'body',
        };
        const type = requestKey[tabActiveId];
        if (isArray(request[type].parameter)) {
            const newList = [...request[type].parameter];
            if (
                newVal.hasOwnProperty('key') ||
                newVal.hasOwnProperty('value') ||
                newVal.hasOwnProperty('description')
            ) {
                delete rowData.static;
            }
            newList[rowIndex] = {
                ...rowData,
                ...newVal,
            };
            setRequest((lastState) => {
                const newState = cloneDeep(lastState);
                newState[type].parameter = newList;
                return newState;
            });
        }
    };

    const handleTableDelete = (index) => {
        const requestKey = {
            '0': 'header',
            '1': 'query',
            '2': 'body',
        };
        const type = requestKey[tabActiveId];
        if (isArray(request[type])) {
            const newList = [...request[type]];
            if (newList.length > 0) {
                newList.splice(index, 1);
                setRequest((lastState) => {
                    const newState = cloneDeep(lastState);
                    newState[type] = newList;
                    return newState;
                });
            }
        }
    };

    const columns = [
        {
            title: '',
            width: 10,
            dataIndex: 'is_checked',
            render: (text, rowData, rowIndex) => (
                <Switch
                    size="small"
                    checked={text > 0}
                    onChange={(e) => {
                        handleChange(rowData, rowIndex, { is_checked: e ? '1' : '0' });
                    }}
                />
            ),
        },
        {
            title: '参数名',
            dataIndex: 'key',
            enableResize: true,
            width: 84,
            render: (text, rowData, rowIndex) => {
                return (
                    <Input
                        size="mini"
                        placeholder='参数名'
                        value={text}
                        onChange={(newVal) => {
                            handleChange(rowData, rowIndex, { key: newVal });
                        }}
                    />
                );
            },
        },
        {
            title: '参数值',
            dataIndex: 'value',
            enableResize: true,
            width: 300,
            render: (text, rowData, rowIndex) => {
                return (
                    <Input
                        size="mini"
                        placeholder='参数值'
                        value={text}
                        onChange={(newVal) => {
                            handleChange(rowData, rowIndex, { value: newVal });
                        }}
                    />
                );
            },
        },
        // {
        //     title: '必填',
        //     dataIndex: 'not_null',
        //     width: 55,
        //     render: (text, rowData, rowIndex) => {
        //         return (
        //             <Switch
        //                 size="small"
        //                 checked={text > 0}
        //                 onChange={(e) => {
        //                     handleChange(rowData, rowIndex, { not_null: e ? 1 : -1 });
        //                 }}
        //             />
        //         );
        //     },
        // },
        // {
        //     title: '类型',
        //     dataIndex: 'field_type',
        //     enableResize: false,
        //     width: 100,
        //     render: (text, rowData, rowIndex) => {
        //         return (
        //             <Select
        //                 value={HEADERTYPELIST.includes(rowData?.field_type) ? rowData?.field_type : 'String'}
        //                 onChange={(newVal) => {
        //                     handleChange(rowData, rowIndex, { field_type: newVal });
        //                 }}
        //             >
        //                 {HEADERTYPELIST.map((item) => (
        //                     <Option key={item} value={item}>
        //                         {item}
        //                     </Option>
        //                 ))}
        //             </Select>
        //         );
        //     },
        // },
        {
            title: '参数描述',
            dataIndex: 'description',
            width: 300,
            render: (text, rowData, rowIndex) => {
                return (
                    <Input
                        style={{ width: '300px' }}
                        size="mini"
                        placeholder='请输入参数描述'
                        value={text}
                        onChange={(newVal) => {
                            handleChange(rowData, rowIndex, { description: newVal });
                        }}
                    />
                );
            },
        },
        // {
        //     title: '',
        //     width: 30,
        //     render: (text, rowData, rowIndex) => (
        //         <div>
        //             <DescChoice
        //                 onChange={(newVal) => {
        //                     handleChange(rowData, rowIndex, { description: newVal });
        //                 }}
        //                 filterKey={rowData?.key}
        //             ></DescChoice>
        //         </div>
        //     ),
        // },
        {
            title: '',
            width: 30,
            render: (text, rowData, rowIndex) => (
                <Button
                    onClick={() => {
                        handleTableDelete(rowIndex);
                    }}
                >
                    <SvgDelete style={{ width: 16, height: 16 }} />
                </Button>
            ),
        },
    ];

    const getTableList = (type) => {
        if (isArray(request[type]) && request[type].length > 0) {
            const hasStatic = request[type].some((item) => item.static);
            if (!hasStatic) {
                return [...request[type], { ...dataItem }];
            }
            return [...request[type]];
        }
        return [{ ...newDataItem }];
    };

    const tempPath = (type, extension) => {
        const path = {
            auth: 'auth', // 修改接口认证信息
            authType: 'auth.type', // 修改接口认证类型
            authValue: `auth.${extension}`, // 修改接口认证值
        };
        return path[type];
    };

    const folderSelect = () => {
        if (isPlainObject(group)) {
            const res = [];
            res.push(group);
            findSon(res, apiFolders, folder?.target_id);
            const resObj = {};
            res.forEach((item) => {
                resObj[item?.target_id] = item;
            });
            const newFolders = apiFolders.filter((item) => !resObj.hasOwnProperty(item?.target_id));
            return (
                <>
                    {newFolders.map((item) => (
                        <Option key={item?.target_id} value={item?.target_id}>
                            {`|${new Array(item.level).fill('—').join('')}${item.name}`}
                        </Option>
                    ))}
                </>
            );
        }
        return (
            <>
                {apiFolders.map((item) => (
                    <Option key={item?.target_id} value={item?.target_id}>
                        {`|${new Array(item.level).fill('—').join('')}${item.name}`}
                    </Option>
                ))}
            </>
        );
    };

    return (
        <Modal
            title={isPlainObject(group) ? t('plan.editPlan') : t('plan.createPlan')}
            visible={true}
            onCancel={onCancel}
            className={FolderModal}
            cancelText={ t('btn.cancel') }
            okText={ t('btn.save') }
            onOk={() => {
                if (trim(planName).length <= 0) {
                    Message('error', t('message.PlanNameEmpty'));
                    return;
                }
                if (isPlainObject(group)) {
                    Bus.$emit(
                        'updateSceneGroup',
                        {
                            id: group.target_id,
                            data: {
                                name: groupName,
                                request,
                                script,
                                parent_id,
                            },
                            oldValue: group
                        },
                        () => {
                            onCancel();
                            Message('success', t('message.saveSuccess'));
                        }
                    );
                } else {
                    Bus.$emit(
                        'createPlan',
                        {
                            name: planName,
                            remark: planDesc,
                        },
                        (code, id) => {
                            if (code === 0) {
                                dispatch({
                                    type: 'plan/updateOpenScene',
                                    payload: null,
                                })
                                onCancel();
                                Message('success', t('message.NewSuccess'));
                                navigate(`/plan/detail/${id}`);
                            } else {
                                Message('error', t('message.NewError'));
                            }
                        }
                    );
                }
            }}
        >
            <FolderWrapper>
                <div className="article">
                    <div className="article-item">
                        <p>{ t('plan.planName') }</p>
                        <Input value={planName} placeholder={ t('placeholder.planName') } onChange={(val) => setPlanName(val)} />
                    </div>
                    <div className="article-item">
                        <p>{ t('plan.planDesc') }</p>
                        <Textarea
                            value={planDesc}
                            placeholder={ t('placeholder.planDesc') }
                            onChange={(val) => {
                                // setRequest((lastState) => {
                                //     lastState.description = val;
                                //     return lastState;
                                // })
                                setPlanDesc(val)
                            }}
                        />
                    </div>
                </div>

                {/* <Tabs
                    defaultActiveId={tabActiveId}
                    onChange={(val) => {
                        setTabActiveId(val || '0');
                    }}
                >
                    <TabPan id="0" title="分组共用Header">
                        <Table showHeader={false} showBorder columns={columns} data={getTableList('header')}></Table>
                    </TabPan>
                    <TabPan id="1" title="分组共用Query">
                        <Table showHeader={false} showBorder columns={columns} data={getTableList('query')}></Table>
                    </TabPan>
                    <TabPan id="2" title="分组共用Body">
                        <Table showHeader={false} showBorder columns={columns} data={getTableList('body')}></Table>
                    </TabPan>
                    <TabPan id="3" title="认证">
                        <Authen
                            value={request?.auth || {}}
                            onChange={(type, val, extension) => {
                                const path = tempPath(type, extension);
                                const newReqest = cloneDeep(request);
                                set(newReqest, path, val);
                                setRequest(newReqest);
                            }}
                        ></Authen>
                    </TabPan>
                </Tabs> */}
            </FolderWrapper>

        </Modal>
    )
};

export default CreatePlan;
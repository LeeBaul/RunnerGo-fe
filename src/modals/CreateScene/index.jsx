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

const { Tabs, TabPan } = TabComponent;
const Option = Select.Option;
const Textarea = Input.Textarea;

const CreateScene = (props) => {
    const { onCancel, folder } = props;

    const { apiFolders } = useFolders();
    const [script, setScript] = useState({
        pre_script: '',
        // pre_script_switch: 1,
        test: '',
        // test_switch: 1,
    });

    const [request, setRequest] = useState(
        folder?.request || {
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
    const [folderName, setFolderName] = useState('');
    const [tabActiveId, setTabActiveId] = useState('0');
    const [parent_id, setParent_id] = useState('0');

    useEffect(() => {
        const init = () => {
            if (isPlainObject(folder)) {
                const { request, name, script: folderScript, parent_id } = folder;
                parent_id && setParent_id(parent_id);
                folderScript && setScript(folderScript);
                name && setFolderName(name);
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
    }, [folder]);

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
                        style={{width: '300px'}}
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
        if (isPlainObject(folder)) {
            const res = [];
            res.push(folder);
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
            title='新建场景'
            visible={true}
            onCancel={onCancel}
            className={FolderModal}
            okText='保存'
            onOk={() => {
                console.log(request);
                if (trim(folderName).length <= 0) {
                    Message('error', '场景名称不能为空');
                    return;
                }
                if (isPlainObject(folder)) {

                } else {
                    Bus.$emit(
                        'addSceneItem',
                        {
                            type: 'folder',
                            pid: parent_id || 0,
                            param: {
                                name: folderName,
                                request,
                                script,
                            },
                        },
                        () => {
                            onCancel();
                            Message('success', '新建场景成功');
                        }
                    );
                }
            }}
        >
            <FolderWrapper>
                <div className="article">
                    <div className="article-item">
                        <p>场景名称</p>
                        <Input value={folderName} placeholder='请输入场景名称' onChange={(val) => setFolderName(val)} />
                    </div>
                    <div className="article-item">
                        <p>场景描述</p>
                        <Textarea
                            value={request.description || ''} 
                            placeholder='请输入场景描述'
                            onChange={(val) => {
                                setRequest((lastState) => {
                                    lastState.description = val;
                                    return lastState;
                                })
                            }}
                         />
                    </div>
                </div>

                <Tabs
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
                    {/* <TabPan id="4" title="分组共用预执行脚本">
                        <span>
                            预执行脚本已开启{' '}
                            <Switch
                                size="small"
                                checked={script?.pre_script_switch > 0}
                                onChange={(e) => {
                                    setScript((lastState) => {
                                        const newState = cloneDeep(lastState);
                                        newState.pre_script_switch = e ? 1 : -1;
                                        return newState;
                                    });
                                }}
                            />
                        </span>
                        <ScriptBox
                            scriptType="pre"
                            value={script?.pre_script || ''}
                            onChange={(val) => {
                                setScript((lastState) => {
                                    const newState = cloneDeep(lastState);
                                    newState.pre_script = val;
                                    return newState;
                                });
                            }}
                        ></ScriptBox>
                    </TabPan>
                    <TabPan id="5" title="分组共用后执行脚本">
                        <span>
                            后执行脚本已开启{' '}
                            <Switch
                                size="small"
                                checked={script?.test_switch > 0}
                                onChange={(e) => {
                                    setScript((lastState) => {
                                        const newState = cloneDeep(lastState);
                                        newState.test_switch = e ? 1 : -1;
                                        return newState;
                                    });
                                }}
                            />
                        </span>

                        <ScriptBox
                            value={script?.test || ''}
                            scriptType="after"
                            onChange={(val) => {
                                setScript((lastState) => {
                                    const newState = cloneDeep(lastState);
                                    newState.test = val;
                                    return newState;
                                });
                            }}
                        ></ScriptBox>
                    </TabPan> */}
                </Tabs>
            </FolderWrapper>

        </Modal>
    )
};

export default CreateScene;
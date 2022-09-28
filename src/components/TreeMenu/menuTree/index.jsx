import React, { useEffect, useState } from 'react';
import { Button, Tree } from 'adesign-react';
import {
    More as SvgMore,
    Apis as SvgApis,
    Folder as SvgFolder,
    WS as SvgWebSocket,
    Doc as SvgDoc,
} from 'adesign-react/icons';
import GrpcSvg from '@assets/grpc/grpc.svg';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useSelector, useDispatch } from 'react-redux';
import Bus, { useEventBus } from '@utils/eventBus';
import { cloneDeep, isArray, isPlainObject, isString, isUndefined } from 'lodash';
import { setWorkspaceCurrent, getWorkspaceCurrent } from '@rxUtils/user/workspace';
import DragNode from './dragNode';
import { MenuTreeNode } from './style';
import useNodeSort from './hooks/useNodeSort';
import { handleShowContextMenu } from './contextMenu';
import Example from './example';
import MenuStatus from './menuStatus';
import './index.less';
import cn from 'classnames';
import SvgScene from '@assets/icons/Scene1';

const NodeType = {
    api: SvgApis,
    scene: SvgScene,
    doc: SvgDoc,
    websocket: SvgWebSocket,
    folder: SvgFolder,
    grpc: GrpcSvg,
    group: SvgFolder,
};


const MenuTrees = (props, treeRef) => {
    const {
        selectedKeys,
        setSelectedKeys,
        filteredTreeList,
        filteredTreeData,
        getSelfNodeAndChildKeys,
        selectedNewTreeData,
        type,
        getSceneName
    } = props;
    const dispatch = useDispatch();
    const apiData = useSelector((d) => d.apis.apiDatas);
    const sceneData = useSelector((d) => d.scene.sceneDatas);
    const id_apis_scene = useSelector((d) => d.scene.id_apis);
    const id_apis_plan = useSelector((d) => d.plan.id_apis);
    const node_config_scene = useSelector((d) => d.scene.node_config);
    const node_config_plan = useSelector((d) => d.plan.node_config);
    const open_scene_scene = useSelector((d) => d.scene.open_scene);
    const open_plan_scene = useSelector((d) => d.plan.open_plan_scene);

    const open_scene = type === 'scene' ? open_scene_scene : open_plan_scene;

    const planData = useSelector((d) => d.plan.planMenu);
    const treeDataList = {
        'apis': apiData,
        'scene': sceneData,
        'plan': planData
    }
    const treeData = treeDataList[type];
    const CURRENT_TARGET_ID = useSelector((store) => store?.workspace?.CURRENT_TARGET_ID);
    const CURRENT_PROJECT_ID = useSelector((store) => store?.workspace?.CURRENT_PROJECT_ID);
    const open_api_now = useSelector((store) => store.opens.open_api_now);
    const [defaultExpandKeys, setDefaultExpandKeys] = useState([]);
    const uuid = localStorage.getItem('uuid');


    const [markObj, setMarkObj] = useState([]);

    const statusListInit = async () => {
        // const currentProjectInfo = await UserProjects.get(`${CURRENT_PROJECT_ID}/${uuid}`);
        // const markList = currentProjectInfo?.details?.markList || [];
        const markList = [];
        const obj = {};
        isArray(markList) &&
            markList.forEach((m) => {
                obj[m.key] = m;
            });
        setMarkObj(obj);
    };

    useEffect(() => {
        if (type === 'plan') {
            const plan_open_group = JSON.parse(localStorage.getItem('plan_open_group') || '[]');
            setDefaultExpandKeys(plan_open_group);
        }
    }, []);

    useEventBus('statusListInit', statusListInit, [CURRENT_PROJECT_ID]);

    const methodDic = {
        OPTIONS: 'OPT',
        DELETE: 'DEL',
        PROPFIND: 'PROP',
        UNLOCK: 'UNLCK',
        UNLINK: 'UNLNK',
    };
    const renderPreText = (item) => {
        let result = '';
        switch (item?.target_type) {
            case 'api':
                if (!isUndefined(item?.method)) result = item?.method;
                break;
            case 'doc':
                result = '文本';
                break;
            case 'folder':
                result = '目录';
                break;
            case 'websocket':
                result = 'WS';
                break;
            case 'grpc':
                result = 'GRPC';
                break;
            default:
                break;
        }
        return typeof methodDic[result] === 'string' ? methodDic[result] : result;
    };

    const getTargetMethodClassName = (item) => {
        let className = '';
        switch (item.target_type) {
            case 'websocket':
                className = 'method ws';
                break;
            case 'grpc':
                className = 'method grpc';
                break;
            case 'api':
                className = `method ${item.method.toLowerCase()}`;
                break;
            case 'doc':
                className = 'method doc';
                break;
            default:
                break;
        }

        return className;
    };

    useEffect(() => {
        if (isString(CURRENT_TARGET_ID) && CURRENT_TARGET_ID.length > 0) {
            setSelectedKeys([CURRENT_TARGET_ID]);
        } else {
            setSelectedKeys([]);
        }
    }, [CURRENT_TARGET_ID]);

    useEffect(() => {
        getWorkspaceCurrent(uuid, `${CURRENT_PROJECT_ID}.CURRENT_EXPAND_KEYS`).then((expandKeys) => {
            if (Array.isArray(expandKeys)) {
                setDefaultExpandKeys(expandKeys);
            }
        });
        statusListInit();
    }, [CURRENT_PROJECT_ID]);

    const { handleNodeDragEnd } = useNodeSort({ treeData, type });

    const renderIcon = (icon) => {
        const NodeIcon = NodeType?.[icon];
        if (isUndefined(NodeIcon)) {
            return '';
        }
        if (icon === 'grpc') {
            return <NodeIcon viewBox="0 0 24 24" width={12} height={12} style={{ marginLeft: 5 }} />;
        }
        return <NodeIcon width={12} style={{ marginLeft: 5 }} />;
    };

    const renderPrefix = (treeNode) => {
        if (treeNode.target_type !== 'api') {
            return null;
        }
        return <span className={getTargetMethodClassName(treeNode)}>{renderPreText(treeNode)}</span>;
    };

    const handleExpandsChange = (keys) => {
        if (type === 'plan') {
            localStorage.setItem('plan_open_group', JSON.stringify(keys));
            setDefaultExpandKeys(keys);
        }
        setWorkspaceCurrent(uuid, `${CURRENT_PROJECT_ID}.CURRENT_EXPAND_KEYS`, keys);
    };

    const renderTreeNode = (nodeItem, { indent, nodeTitle }) => {
        return (
            <MenuTreeNode>
                <DragNode
                    index={nodeItem.nodeIndex}
                    nodeKey={nodeItem.nodeKey}
                    key={nodeItem.nodeKey}
                    moved={handleNodeDragEnd}
                >
                    <div className={cn('tree-node-inner', { 'tree-node-inner-selected': type === 'apis' ? `${nodeItem.nodeKey}` === `${open_api_now}` : `${nodeItem.nodeKey}` === `${open_scene ? open_scene.scene_id : ''}`})}>
                        {indent}
                        {renderIcon(nodeItem.target_type)}
                        {renderPrefix(nodeItem)}
                        {nodeTitle}
                        {/* {nodeItem?.mark !== 'developing' && (
                            <MenuStatus value={nodeItem} markObj={markObj}></MenuStatus>
                        )} */}
                        {nodeItem?.is_example > 0 && <Example value={nodeItem}></Example>}
                        {/* <Button
                            className="btn-more"
                            size="mini"
                            onClick={(e) => {
                                handleShowContextMenu(
                                    { ...props, project_id: CURRENT_PROJECT_ID },
                                    e,
                                    nodeItem.data,
                                );
                            }}
                        >
                            <SvgMore width="12px" height="12px" />
                        </Button> */}
                    </div>
                </DragNode>
            </MenuTreeNode>
        );
    };

    const handleMultiSelect = (data) => {
        const { target_id, target_type } = data;
        // 非目录节点只对当前节点有效
        let keyList = [];
        if (target_type !== 'folder') {
            if (selectedKeys.includes(target_id)) {
                keyList = selectedKeys.filter((d) => d !== target_id) || [];
            } else {
                keyList = [...selectedKeys, target_id];
            }
        } else {
            const childKeys = getSelfNodeAndChildKeys(filteredTreeData, target_id);
            const isSelected = selectedKeys.includes(target_id);
            if (isSelected) {
                keyList = selectedKeys.filter((item) => childKeys.includes(item) === false);
            } else {
                keyList = [...selectedKeys, ...childKeys];
            }
        }

        const rootList = Object.values(filteredTreeData)?.filter((item) => item.parent_id === '0');
        const newList = [];
        const digFindAll = (childList) => {
            childList && childList.sort((pre, after) => pre.sort - after.sort);
            for (const sItem of childList) {
                if (keyList.includes(sItem.target_id)) {
                    newList.push(sItem.target_id);
                }
                if (sItem.target_type === 'folder' && Array.isArray(sItem?.children)) {
                    digFindAll(sItem.children);
                }
            }
        };
        digFindAll(rootList);
        setSelectedKeys(newList);
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <Tree
                ref={treeRef}
                onRightClick={handleShowContextMenu.bind(null, {
                    ...props,
                    project_id: CURRENT_PROJECT_ID,
                    open_scene,
                    from: type
                })}
                defaultExpandKeys={defaultExpandKeys}
                onExpandKeysChange={handleExpandsChange}
                onMultiSelect={handleMultiSelect}
                onOutSideClick={setSelectedKeys ? setSelectedKeys.bind(null, []) : () => { }}
                nodeSort={(pre, after) => pre.sort - after.sort}
                selectedKeys={selectedKeys}
                className="menu-tree"
                showLine
                fieldNames={{
                    key: 'target_id',
                    title: 'name',
                    parent: 'parent_id',
                }}
                enableVirtualList
                dataList={filteredTreeList}
                render={renderTreeNode}
                onNodeClick={(val) => {
                    if (type !== 'apis' && val.target_type !== 'group') {
                        // getSceneName(val.name);
                        dispatch({
                            type: 'scene/updateOpenName',
                            payload: val.name,
                        })
                    }
                    if (val?.target_type == 'folder' || val.target_type === 'group') {
                        // User.get(uuid || '-1')
                        //     .then((user) => {
                        //         if (isPlainObject(user.config) && user.config?.FOLDER_CLICK_SETTING > 0) {
                        //             if (!isString(val?.target_id)) return;
                        //             // 目录展开
                        //             let newKeys = [];
                        //             if (defaultExpandKeys.includes(val.target_id)) {
                        //                 newKeys = defaultExpandKeys.filter((i) => i !== val.target_id);
                        //             } else {
                        //                 newKeys = [...defaultExpandKeys, val.target_id];
                        //             }

                        //             setDefaultExpandKeys(newKeys);
                        //             setWorkspaceCurrent(uuid, `${CURRENT_PROJECT_ID}.CURRENT_EXPAND_KEYS`, newKeys);
                        //         } else {
                        //             Bus.$emit('addOpenItem', { id: val?.target_id });
                        //         }
                        //     })
                        //     .catch(() => {
                        //         Bus.$emit('addOpenItem', { id: val?.target_id });
                        //     });
                    } else {
                        if (type === 'apis') {
                            Bus.$emit('addOpenItem', { id: parseInt(val.target_id) });
                            console.log(123123);
                        } else if (type === 'scene') {
                            Bus.$emit('addOpenScene', val, id_apis_scene, node_config_scene)
                        } else if (type === 'plan') {
                            Bus.$emit('addOpenPlanScene', val, id_apis_plan, node_config_plan);
                        }
                    }
                }}
                rootFilter={(item) => item.parent_id === 0}
            />
        </DndProvider>
    );
};

export default React.forwardRef(MenuTrees);
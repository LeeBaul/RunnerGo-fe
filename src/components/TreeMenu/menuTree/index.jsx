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
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

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

    console.log(open_scene);

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
    const saveId = useSelector((store) => store.opens.saveId);
    const [defaultExpandKeys, setDefaultExpandKeys] = useState([]);
    const uuid = localStorage.getItem('uuid');

    const nodes_plan = useSelector((store) => store.plan.nodes);
    const edges_plan = useSelector((store) => store.plan.edges);

    const open_first = useSelector((store) => store.plan.open_first);
    const { id } = useParams();


    const [markObj, setMarkObj] = useState([]);
    const { t } = useTranslation();

    const api = [
        // {
        //     type: 'shareApi',
        //     title: '分享接口',
        //     action: 'shareApi',
        // },
        // {
        //     type: 'cloneApi',
        //     title: '克隆接口',
        //     action: 'cloneApi',
        //     tips: `${ctrl} + D`,
        // },
        {
            type: 'cloneApi',
            title: t('apis.cloneApi'),
            action: 'cloneApi',
            // tips: `${ctrl} + C`,
        },
        {
            type: 'copyApi',
            title: t('apis.copyApi'),
            action: 'copyApi'
        },
        {
            type: 'deleteApi',
            title: t('apis.deleteApi'),
            action: 'deleteApi',
        },
    ];

    const folder = [
        // {
        //     type: 'create',
        //     title: '新建',
        //     action: '',
        // },
        // {
        //     type: 'pasteToCurrent',
        //     title: '粘贴至该目录',
        //     action: 'pasteToCurrent',
        //     // tips: `${ctrl} + V`,
        // },
        {
            type: 'modifyFolder',
            title: t('apis.editFolder'),
            action: 'modifyFolder',
        },
        // {
        //     type: 'shareFolder',
        //     title: '分享目录',
        //     action: 'shareFolder',
        // },
        // {
        //     type: 'copyFolder',
        //     title: '复制目录',
        //     action: 'copyFolder',
        //     // tips: `${ctrl} + C`,
        // },
        {
            type: 'deleteFolder',
            title: t('apis.deleteFolder'),
            action: 'deleteFolder',
        },
    ];

    const group = [
        {
            type: 'modifyFolder',
            title: t('scene.editGroup'),
            action: 'modifyFolder',
        },
        // {
        //     type: 'cloneGroup',
        //     title: '克隆分组',
        //     action: 'cloneGroup',
        // },
        {
            type: 'deleteFolder',
            title: t('scene.deleteGroup'),
            action: 'deleteFolder',
        },
    ];

    const scene = [
        {
            type: 'modifyFolder',
            title: t('scene.editScene'),
            action: 'modifyFolder',
        },
        {
            type: 'cloneScene',
            title: t('scene.cloneScene'),
            action: 'cloneScene',
        },
        {
            type: 'deleteFolder',
            title: t('scene.deleteScene'),
            action: 'deleteFolder',
        },
    ];

    const root = [
        {
            type: 'createApis',
            title: t('apis.createApi'),
            action: 'createApis',
        },
        {
            type: 'pasteToRoot',
            title: t('apis.pasteApi'),
            action: 'pasteToRoot',
        },
    ];
    

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

    const { handleNodeDragEnd } = useNodeSort({ treeData, type, id });

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

    // useEffect(() => {
    //     console.log(filteredTreeList, open_first);
    //     if (filteredTreeList && filteredTreeList.length > 0 && open_first) {
    //         dispatch({
    //             type: 'plan/updateOpenFirst',
    //             payload: false
    //         })
    //         console.log(filteredTreeList);
    //         dispatch({
    //             type: 'scene/updateOpenName',
    //             payload: filteredTreeList[0].name,
    //         })
    //         dispatch({
    //             type: 'scene/updateOpenDesc',
    //             payload: filteredTreeList[0].description
    //         })
    //         Bus.$emit('addOpenPlanScene', filteredTreeList[0], id_apis_plan, node_config_plan);
    //     }
    // }, [filteredTreeList, open_first]);

    const renderTreeNode = (nodeItem, { indent, nodeTitle }) => {
        return (
            <MenuTreeNode>
                <DragNode
                    index={nodeItem.nodeIndex}
                    nodeKey={nodeItem.nodeKey}
                    key={nodeItem.nodeKey}
                    moved={handleNodeDragEnd}
                >
                    <div className={cn('tree-node-inner', { 'tree-node-inner-selected': type === 'apis' ? `${nodeItem.nodeKey}` === `${open_api_now}` : `${nodeItem.nodeKey}` === `${open_scene ? open_scene.scene_id || open_scene.target_id : ''}`})}>
                        {indent}
                        {renderIcon(nodeItem.target_type)}
                        {renderPrefix(nodeItem)}
                        {nodeTitle}
                        {/* {nodeItem?.mark !== 'developing' && (
                            <MenuStatus value={nodeItem} markObj={markObj}></MenuStatus>
                        )} */}
                        {/* {nodeItem?.is_example > 0 && <Example value={nodeItem}></Example>} */}
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
                    from: type,
                    plan_id: id,
                    menu: {
                        api,
                        folder,
                        scene,
                        group,
                        root
                    }
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
                    console.log(val);
                    if (type !== 'apis' && val.target_type !== 'group') {
                        // getSceneName(val.name);
                        dispatch({
                            type: 'scene/updateOpenName',
                            payload: val.name,
                        })
                        dispatch({
                            type: 'scene/updateOpenDesc',
                            payload: val.description
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
                        } else if (type === 'scene') {
                            if (open_scene_scene && (open_scene_scene.target_id || open_scene_scene.scene_id ) === val.target_id) {
                                return;
                            }
                            localStorage.setItem('open_scene', JSON.stringify(val));
                            // if (Object.entries(open_scene_scene || {}).length > 0) {
                            //     Bus.$emit('saveScene', () => {
                            //         Bus.$emit('addOpenScene', val)
                            //     })
                            // } else {
                                Bus.$emit('addOpenScene', val)
                            // }
                        } else if (type === 'plan') {
                            console.log(open_plan_scene);
                            if (open_plan_scene && (open_plan_scene.target_id || open_plan_scene.scene_id ) === val.target_id) {
                                return;
                            }
                            // if (Object.entries(open_plan_scene || {}).length > 0) {
                            //     Bus.$emit('saveScenePlan', nodes_plan, edges_plan, id_apis_plan, node_config_plan, open_plan_scene, id, () => {
                            //         Bus.$emit('addOpenPlanScene', val, id_apis_plan, node_config_plan);
                            //     });
                            // } else {
                                Bus.$emit('addOpenPlanScene', val, id_apis_plan, node_config_plan);
                            // }
                            let open_plan = JSON.parse(localStorage.getItem('open_plan') || '{}');
                            open_plan[id] = val.target_id;
                            localStorage.setItem('open_plan', JSON.stringify(open_plan));
                        }
                    }
                }}
                rootFilter={(item) => item.parent_id === 0}
            />
        </DndProvider>
    );
};

export default React.forwardRef(MenuTrees);
import React, { useState, useRef } from 'react';
import { Modal, Button, Collapse as Col, Input, Tree, CheckBox } from 'adesign-react';
import {
    Search as SvgSearch,
    Apis as SvgApis,
    Folder as SvgFolder,
    WS as SvgWebSocket,
    Doc as SvgDoc,
} from 'adesign-react/icons';
import './index.less';
import { isObject, isUndefined } from 'lodash';
import useListData from './hooks/useListData';

const { CollapseItem, Collapse } = Col;

const NodeType = {
    api: SvgApis,
    doc: SvgDoc,
    websocket: SvgWebSocket,
    folder: SvgFolder,
};

const ImportApi = (props) => {
    const { onCancel } = props;
    const refTree = useRef(null);

    const dataList = [
        { id: '0001', parent: '0', title: '用户信息管理' },
        { id: '0002', parent: '0', title: '订单管理' },
        { id: '0003', parent: '0', title: '商品管理' },
        { id: '0004', parent: '0', title: '地址信息管理' },
        { id: '0011', parent: '0001', title: '注册新用户' },
        { id: '0021', parent: '0002', title: '创建订单' },
        { id: '0022', parent: '0002', title: '商城订单管理' },
        { id: '00221', parent: '0022', title: '同步商城订单' },
        { id: '00222', parent: '0022', title: '查询商城订单' },
        { id: '00223', parent: '0022', title: '商城订单详情' },
        { id: '00031', parent: '0003', title: '创建商品分类' },
        { id: '00032', parent: '0003', title: '创建商品信息' },
    ];

    const [newList, setNewList] = useState(dataList);
    const [checkedList, setCheckedList] = useState(['0001', '0011']);
    const [checkAll, setCheckAll] = useState('unCheck');
    const [checkedApiKeys, setCheckedApiKeys] = useState([]);
    const [filterParams, setFilterParams] = useState({
        key: '',
        status: 'all',
    });

    const handleFilter = (key) => {
        const sourceData = _cloneDeep(dataList.reduce((a, b) => ({ ...a, [b.id]: b }), {}));
        const newDatas = {};
        Object.entries(sourceData).forEach(([id, data]) => {
            const includeName = data.title.toLowerCase().indexOf(key.toLowerCase()) !== -1;
            if (includeName === true) {
                newDatas[id] = data;
                let parent = sourceData[data.parent];
                while (parent !== undefined && newDatas[parent.id] !== parent) {
                    newDatas[parent.id] = parent;
                    parent = sourceData[parent.parent];
                }
            }
        });
        setNewList(Object.values(newDatas));
    };

    const renderIcon = (icon) => {
        const NodeIcon = NodeType?.[icon];
        if (isUndefined(NodeIcon)) {
            return '';
        }
        return <NodeIcon width={12} style={{ marginLeft: 5 }} />;
    };

    const renderPrefix = (treeNode) => {
        if (treeNode.target_type !== 'api') {
            return null;
        }
        return <span style={{ marginLeft: 5 }}>{treeNode.method}</span>;
    };

    const handleNodeClick = (itemNode) => {
        if (refTree.current === null) {
            return;
        }
        if (checkedApiKeys.includes(itemNode.target_id)) {
            refTree.current?.handleCheckNode({ key: itemNode.target_id, checked: 'uncheck' });
        } else {
            refTree.current?.handleCheckNode({ key: itemNode.target_id, checked: 'checked' });
        }
    };

    const renderTreeNode = (nodeItem, { indent, nodeTitle, checkbox }) => {
        return (
            <div className='tree-node-inner'>
                {indent}
                {renderIcon(nodeItem.target_type)}
                {renderPrefix(nodeItem)}
                {nodeTitle}
                {checkbox}
            </div>
        )
    }

    const renderRightTree = (nodeItem, { indent, nodeTitle, checkbox }) => {
        return (
            <div className='tree-node-inner'>
                {indent}
                {renderIcon(nodeItem.target_type)}
                {renderPrefix(nodeItem)}
                {nodeTitle}
                <Button>x</Button>
            </div>
        )
    }

    const handleCheckAll = (val) => {
        if (val === 'checked') {
            const checkKeys = isObject(treeList) ? Object.keys(treeList) : [];
            setCheckedApiKeys(checkKeys);
        }
        if (val === 'uncheck') {
            setCheckedApiKeys([]);
        }
        setCheckAll(val);
    };

    const { filteredTreeList } = useListData({ filterParams })
    const treeList = [
        {
            target_id: "1",
            name: '新建接口1',
            parent_id: "0",
            target_type: 'api',
            method: 'POST',
            sort: -1,
        },
        {
            target_id: "2",
            name: '新建接口2',
            parent_id: "3",
            target_type: 'api',
            method: 'GET',
            sort: -1,
        },
        {
            target_id: "3",
            name: '新建分组',
            parent_id: "0",
            target_type: 'folder',
            // method: 'POST',
            sort: -1,
        },
        {
            target_id: "4",
            name: '新建接口3',
            parent_id: "0",
            target_type: 'api',
            method: 'GET',
            sort: -1,
        },
    ];


    return (
        <Modal title={null} visible={true} onCancel={() => onCancel()}>
            <div className='import'>
                <div className='import-left'>
                    <div className='title'>
                        <p>Apipost</p>
                    </div>
                    <div className='import-left-container'>
                        <Collapse defaultActiveKey="a1">
                            <CollapseItem name="a1" header="liuzhichun的团队">
                                <Input placeholder="搜索项目/目录/接口名称" beforeFix={<SvgSearch width="16px" height="16px" />} />
                                <Collapse defaultActiveKey="a11">
                                    <CollapseItem name="a11" header="新闻列表项目">
                                        <div className="check-all">
                                            <p className='name'>名称</p>
                                            <div className='check-all-box'>
                                                <span>全选</span>
                                                <CheckBox
                                                    size="small"
                                                    checked={checkAll}
                                                    onChange={(val) => {
                                                        handleCheckAll(val);
                                                    }}
                                                ></CheckBox>
                                            </div>
                                        </div>
                                        <Tree
                                            showLine
                                            ref={refTree}
                                            showIcon={false}
                                            checkedKeys={checkedList}
                                            onCheck={setCheckedList}
                                            onNodeClick={handleNodeClick}
                                            onCheckAll={(val) => {
                                                setCheckAll(val)
                                            }}
                                            // enableVirtualList
                                            render={renderTreeNode}
                                            enableCheck
                                            fieldNames={{
                                                key: 'target_id',
                                                title: 'name',
                                                parent: 'parent_id',
                                            }}
                                            dataList={treeList}
                                            // nodeSort={(pre, after) => pre.sort - after.sort}
                                            rootFilter={(item) => item.parent_id === "0"}
                                        />
                                    </CollapseItem>
                                </Collapse>
                                {/* 这部分是每个折叠面板折叠或展开的内容，可根据不同业务或用户的使用诉求，进行自定义填充。可以是纯文本、图文、子列表等内容形式。 */}
                            </CollapseItem>
                            <CollapseItem name="a2" header="设置默认展开项">
                                这部分是每个折叠面板折叠或展开的内容，可根据不同业务或用户的使用诉求，进行自定义填充。可以是纯文本、图文、子列表等内容形式。
                            </CollapseItem>
                            <CollapseItem name="a3" header="自定义折叠面板内容">
                                <Button />
                            </CollapseItem>
                        </Collapse>
                    </div>
                </div>
                <div className='import-right'>
                    <div className='title'>
                        <p>鲲鹏测试: 鲲鹏团队一</p>
                        {/* <Button>x</Button> */}
                    </div>
                    <div className='import-right-container'>
                        <div className='import-team'>
                            <p className='title'>Cici的私有团队：</p>
                            <Tree
                                showLine
                                ref={refTree}
                                showIcon={false}
                                checkedKeys={checkedApiKeys}
                                onCheck={setCheckedList}
                                onNodeClick={handleNodeClick}
                                onCheckAll={(val) => {
                                    setCheckAll(val)
                                }}
                                // enableVirtualList
                                render={renderRightTree}
                                enableCheck
                                fieldNames={{
                                    key: 'target_id',
                                    title: 'name',
                                    parent: 'parent_id',
                                }}
                                dataList={treeList}
                                rootFilter={(item) => item.parent_id === "0"}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    )
};

export default ImportApi;
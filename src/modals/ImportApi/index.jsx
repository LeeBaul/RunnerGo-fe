import React, { useState, useRef, useEffect } from 'react';
import { Modal, Button, Collapse as Col, Input, Tree, CheckBox, Select } from 'adesign-react';
import {
    Search as SvgSearch,
    Apis as SvgApis,
    Folder as SvgFolder,
    WS as SvgWebSocket,
    Doc as SvgDoc,
} from 'adesign-react/icons';
import './index.less';
import _, { cloneDeep, isObject, isUndefined } from 'lodash';
import useListData from './hooks/useListData';

const { CollapseItem, Collapse } = Col;
const { Option } = Select;

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
    const [checkedList, setCheckedList] = useState([]);
    const [checkAll, setCheckAll] = useState('unCheck');
    const [checkedApiKeys, setCheckedApiKeys] = useState([]);
    const [filterParams, setFilterParams] = useState({
        key: '',
        status: 'all',
    });
    const [rightList, setRightList] = useState([]);
    const [leftList, setLeftList] = useState([]);
    const [team_now, setTeamNow] = useState('');
    const [apis, setApis] = useState([]);

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

    const handleCheckAll = (val, project_name) => {
        console.log(val);
        if (val === 'checked') {
            // const checkKeys = isObject(treeList) ? Object.keys(treeList) : [];
            const checkKeys = treeList.map(item => item.target_id)
            console.log(checkKeys);
            setCheckedApiKeys(checkKeys);
            // const _rightList = cloneDeep(rightList);
            // rightList.forEach(item => {
            //     if (item.team === team_name) {
            //         const _list = _treeList.filter(item => item.)
            //         item.list.push()
            //     }
            // })
            // 1. 拿到此次全选涉及到的所有api
            const _list = leftList.find(item => item.name === project_name).list;
            // 2. 添加到右侧对应团队下
            const _rightList = cloneDeep(rightList);
            const _index = _rightList.findIndex(item => item.name === team_now);
            if (_index === -1) {
                _rightList.push({
                    name: team_now,
                    list: _list,
                })
            } else {
                _rightList[_index].list = [..._rightList[_index].list, ..._list];
            }
            setRightList(_rightList);
        }
        if (val === 'uncheck') {
            setCheckedApiKeys([]);
        }
        setCheckAll(val);
    };

    const { filteredTreeList } = useListData({ filterParams });
    const _treeList = [
        {
            team: 'A团队',
            project: [
                {
                    name: 'A项目',
                    list: [
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
                    ],
                },
                {
                    name: 'B项目',
                    list: [
                        {
                            target_id: "5",
                            name: '新建接口1',
                            parent_id: "0",
                            target_type: 'api',
                            method: 'POST',
                            sort: -1,
                        },
                        {
                            target_id: "6",
                            name: '新建接口2',
                            parent_id: "3",
                            target_type: 'api',
                            method: 'GET',
                            sort: -1,
                        },
                        {
                            target_id: "7",
                            name: '新建分组',
                            parent_id: "0",
                            target_type: 'folder',
                            // method: 'POST',
                            sort: -1,
                        },
                        {
                            target_id: "8",
                            name: '新建接口3',
                            parent_id: "0",
                            target_type: 'api',
                            method: 'GET',
                            sort: -1,
                        },
                    ],
                },
                {
                    name: 'C项目',
                    list: [
                        {
                            target_id: "9",
                            name: '新建接口1',
                            parent_id: "0",
                            target_type: 'api',
                            method: 'POST',
                            sort: -1,
                        },
                        {
                            target_id: "10",
                            name: '新建接口2',
                            parent_id: "3",
                            target_type: 'api',
                            method: 'GET',
                            sort: -1,
                        },
                        {
                            target_id: "11",
                            name: '新建分组',
                            parent_id: "0",
                            target_type: 'folder',
                            // method: 'POST',
                            sort: -1,
                        },
                        {
                            target_id: "12",
                            name: '新建接口3',
                            parent_id: "0",
                            target_type: 'api',
                            method: 'GET',
                            sort: -1,
                        },
                    ],
                }
            ]
        },
        {
            team: 'B团队',
            project: [
                {
                    name: 'A项目',
                    list: [
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
                    ],
                },
                {
                    name: 'B项目',
                    list: [
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
                    ],
                },
                {
                    name: 'C项目',
                    list: [
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
                    ],
                }
            ]
        }
    ]
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

    const teamList = ['A团队', 'B团队', 'C团队'];

    const setNowList = (name) => {
        console.log(name);
        const list = _treeList.find(item => item.team === name).project;
        console.log(list, _treeList);
        setLeftList(list);
    }

    useEffect(() => {
        setNowList(teamList[0]);
        teamList.length > 0 && setTeamNow(teamList[0])
        let apis = [];
        console.log(_treeList[0].project);
        _treeList[0].project.forEach(item => {
            apis = apis.concat(item.list);
        });
        console.log(apis);
        setApis(apis);
    }, []);

    const selectNodeItem = (e, project_name) => {
        console.log(e, project_name, leftList);
        setCheckedApiKeys(e);
        // const projectList = leftList.find(item => item.name === project_name).list;
        const selectItem = [];
        console.log(apis);
        apis.forEach(item => {
            if (e.includes(item.target_id)) {
                selectItem.push(item);
            }
        });
        const _rightList = cloneDeep(rightList);
        const _index = _rightList.findIndex(item => item.name === team_now);
        if (_index === -1) {
            _rightList.push({
                name: team_now,
                list: selectItem,
            })
        } else {
            // _rightList[_index].list = [..._rightList[_index].list, ...selectItem];
            // _rightList[_index].list = 
            // selectItem.forEach(elem => {
            //     let __index = _rightList[_index].list.findIndex(item => item.target_id === elem.target_id);
            //     if (__index === -1) {
            //         _rightList[_index].list.push(elem);
            //     }
            // })
            _rightList[_index].list = selectItem;
        }
        setRightList(_rightList);
    }


    return (
        <Modal title={null} visible={true} onCancel={() => onCancel()}>
            <div className='import'>
                <div className='import-left'>
                    <div className='title'>
                        <p>Apipost</p>
                        <Select
                            defaultValue={teamList[0]}
                            onChange={(e) => setNowList(e)}
                        >
                            {
                                teamList.map(item => <Option value={item}>{item}</Option>)
                            }
                        </Select>
                    </div>
                    <div className='import-left-container'>
                        {
                            leftList.map(item => (
                                <Collapse defaultActiveKey="a11">
                                    <CollapseItem name={item.name} header={item.name}>
                                        <Input style={{ width: '100%' }} placeholder="搜索项目/目录/接口名称" beforeFix={<SvgSearch width="16px" height="16px" />} />
                                        <div className="check-all">
                                            <p className='name'>名称</p>
                                            <div className='check-all-box'>
                                                <span>全选</span>
                                                <CheckBox
                                                    size="small"
                                                    checked={checkAll}
                                                    onChange={(val) => {
                                                        handleCheckAll(val, item.name);
                                                    }}
                                                ></CheckBox>
                                            </div>
                                        </div>
                                        <Tree
                                            showLine
                                            ref={refTree}
                                            showIcon={false}
                                            checkedKeys={checkedApiKeys}
                                            onCheck={(e) => selectNodeItem(e, item.name)}
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
                                            dataList={item.list}
                                            // nodeSort={(pre, after) => pre.sort - after.sort}
                                            rootFilter={(item) => item.parent_id === "0"}
                                        />
                                    </CollapseItem>
                                </Collapse>
                            ))
                        }
                    </div>
                </div>
                <div className='import-right'>
                    <div className='title'>
                        <p>鲲鹏测试: 鲲鹏团队一</p>
                        {/* <Button>x</Button> */}
                    </div>
                    <div className='import-right-container'>
                        <div className='import-team'>
                            {
                                rightList.map(item => (
                                    <>
                                        <p className='title'>{ item.name }:</p>
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
                                            dataList={item.list}
                                            rootFilter={(item) => item.parent_id === "0"}
                                        />
                                    </>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    )
};

export default ImportApi;
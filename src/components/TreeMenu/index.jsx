import React, { useState, useRef } from 'react';
import FolderCreate from '@components/folder/create';
import { isUndefined } from 'lodash';
import useListData from './menuTree/hooks/useListData';

import FilterBox from './filterBox';
import ButtonBox from './buttonBox';
import MenuTrees from './menuTree';
import SceneBox from './sceneBox';

import { MenuWrapper } from './style';

const TreeMenu = (props) => {
    const { type = 'apis' } = props;
    const [filterParams, setFilterParams] = useState({ key: '', status: 'all' }); // 接口过滤参数
    const [selectedKeys, setSelectedKeys] = useState([]);
    const [modalType, setModalType] = useState('');
    const [modalProps, setModalProps] = useState(undefined);
    const treeRef = useRef(null);

    const listDataParam = useListData({ filterParams, selectedKeys });

    const handleShowModal = (mtype, mProps) => {
        setModalProps(mProps);
        setModalType(mtype);
    };
    return (
        <MenuWrapper>
            <div className='menus-header'>
                <FilterBox type={type} />
                { type === 'apis' ? <ButtonBox /> : <SceneBox /> }
            </div>
            <MenuTrees
                ref={treeRef}
                showModal={handleShowModal}
                {...listDataParam}
                filterParams={filterParams}
                selectedKeys={selectedKeys}
                setSelectedKeys={setSelectedKeys}
            />
        </MenuWrapper>
    )
};

export default TreeMenu;
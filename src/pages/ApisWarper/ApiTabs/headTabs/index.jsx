import React from 'react';
import { Message, Modal } from 'adesign-react';
import { useDispatch } from 'react-redux';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import Bus from '@utils/eventBus';
import cloneDeep from 'lodash/cloneDeep';
import { isArray } from 'lodash';
import TabItem from './tabItem';
import { global$ } from '@hooks/useGlobal/global';

const SortableItem = SortableElement(({ activeTabId, onTabChange, item, handleCloseItem }) => {
    return <TabItem {...{ activeTabId, onTabChange, item, handleCloseItem }} />;
});

const SortableList = SortableContainer(
    ({ tabItemList, activeTabId, onTabChange, handleCloseItem }) => {
        return (
            <div className="api-sortable-warper">
                {tabItemList?.map((item, index) => (
                    <SortableItem
                        key={item.id}
                        {...{
                            item,
                            index,
                            activeTabId,
                            onTabChange,
                            handleCloseItem,
                        }}
                    />
                ))}
            </div>
        );
    }
);

const HeadTabs = (props) => {
    const { tabItemList, activeTabId, onTabChange, onRemoveTabItem } = props;
    const dispatch = useDispatch();

    const handleCloseItem = (item, e) => {
        e.stopPropagation();
        if (item?.ifChanged && item?.ifChanged > 0) {
            Modal.confirm({
                title: '提示',
                content: '当前标签未保存是否确认关闭？',
                okText: '不保存',
                diyText: '保存并关闭',
                onDiy: async () => {
                    Bus.$emit('saveTargetById', {
                        id: item.id,
                        callback: () => {
                            onRemoveTabItem(item.id);
                        },
                    }, {}, (code) => {
                        if (code === 0) {
                            Message('success', '保存成功!');
                        } else {
                            Message('error', '保存失败!');
                        }
                    });
                },
                onOk: () => {
                    onRemoveTabItem(item.id);
                },
            });
        } else {
            onRemoveTabItem(item.id);
        }
    };

    const handleItemSortEnd = (params) => {
        const { oldIndex, newIndex } = params;
        const tempList = cloneDeep(tabItemList);
        const sourceData = tempList[oldIndex];
        tempList.splice(oldIndex, 1);
        tempList.splice(newIndex, 0, sourceData);

        const newOpenApiData = {};

        if (isArray(tempList)) {
            tempList.forEach((item) => {
                newOpenApiData[item.id] = item?.data;
            });
        }
        dispatch({
            type: 'opens/coverOpenApis',
            payload: newOpenApiData,
        });
    };

    return (
        <>
            <SortableList
                {...{
                    tabItemList,
                    axis: 'x',
                    lockAxis: 'x',
                    distance: 2,
                    onSortEnd: handleItemSortEnd,
                    helperClass: 'is-sorting',
                    activeTabId,
                    onTabChange,
                    handleCloseItem,
                }}
            />
        </>
    );
};

export default HeadTabs;

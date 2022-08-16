import React from 'react';
import { Scale, Tree } from 'adesign-react';
import { useSelector } from 'react-redux';
import { isObject } from 'lodash';
import Bus from '@utils/eventBus';
import TreeMenu from '@components/TreeMenu';
import { ApisWrapper, ApiManageWrapper } from './style';
import { Routes, Route, Navigate } from 'react-router-dom';
import ApiTabs from './ApiTabs';
import RunPanel from './apis';
import DesignPanel from './design';

const { ScalePanel, ScaleItem } = Scale;
const Apis = (props) => {
    const openApis = useSelector((store) => store?.opens?.open_apis);
    const CURRENT_TARGET_ID = useSelector((store) => store?.workspace?.CURRENT_TARGET_ID);

    // 切换tabItem
    const handleTabChange = (target_id) => {
        Bus.$emit('updateTargetId', target_id);
    };


    // 被打开的api数据列表
    const apiDataList = isObject(openApis)
        ? Object.values(openApis).map((item) => {
            return {
                id: item?.target_id,
                title: item?.name,
                type: item?.target_type,
                method: item?.method,
                createTime: item?.create_dtime,
                lastUpdate: item?.update_dtime,
                ifChanged: item?.is_changed,
                data: item,
                unSave: true,
            };
        })
        : [];

    // 删除tabItem
    const handleRemoveTab = (id, newID) => {
        id && Bus.$emit('removeOpenItem', id);
        newID && Bus.$emit('updateTargetId', newID);
    };

    const contentRender = ({ activeId }) => {
        return (
            <Routes>
                <Route path="run" element={<RunPanel {...{ tabsList: apiDataList, activeId }} />}></Route>
                <Route
                    path="design"
                    element={<DesignPanel {...{ tabsList: apiDataList, activeId }} />}
                ></Route>
                <Route path="/*" element={<Navigate to="/apis/run" />} />
            </Routes>
        );
    };


    return (
        <ScalePanel
            realTimeRender
            className={ApisWrapper}
            defaultLayouts={{ 0: { width: 270 }, 1: { flex: 1, width: 0 } }}
        >
            <ScaleItem className="left-menus" minWidth={250} maxWidth={350}>
                <TreeMenu />
            </ScaleItem>
            <ScaleItem className="right-apis" enableScale={false}>
                <ApiTabs
                    className={ApiManageWrapper}
                    onChange={handleTabChange}
                    defaultTabId={CURRENT_TARGET_ID}
                    apiList={apiDataList}
                    onRemoveTab={handleRemoveTab}
                    contentRender={contentRender}
                />
            </ScaleItem>
        </ScalePanel>
    )
};

export default Apis;
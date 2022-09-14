import React, { useState, useRef, useMemo, useCallback } from 'react';
import './index.less';
import { Button, Tabs as TabComponents } from 'adesign-react';
import {
    CaretLeft as SvgCaretLeft,
    CaretRight as SvgCaretRight,
    Apis as SvgHttp,
    Mock as SvgMarkdown,
    WS as SvgWebsocket,
    Console as SvgGrpc,
} from 'adesign-react/icons';
import SvgClose from '@assets/apis/close.svg';
import { isFunction, isUndefined } from 'lodash';
import dayjs from 'dayjs';
import Bus from '@utils/eventBus';
import FooterToolbar from '@components/Footer';
import AddMenu from './addMenu';
import MoreMenu from './moreMenu';
import HeadTabs from './headTabs';

const { Tabs, TabPan } = TabComponents;
const ApiTabs = (props) => {
    const {
        defaultTabId,
        apiList = [],
        setApiList = () => undefined,
        onChange = () => undefined,
        onRemoveTab = () => undefined,
        contentRender = () => undefined,
    } = props;


    const [activeId, setActiveId] = useState(defaultTabId);
    const mergedActiveId = 'defaultTabId' in props ? defaultTabId : activeId;
    const activeIndex = useMemo(() => {
        let newIndex = -1;
        apiList.forEach((item, index) => {
            if (item.id === parseInt(mergedActiveId)) {
                newIndex = index;
            }
        });
        return newIndex;
    }, [mergedActiveId, apiList.length]);

    const handleRemoveTabItem = (id) => {
        if (isFunction(onRemoveTab)) {
            onRemoveTab(id);
        } else {
            const newList = apiList.filter((d) => d.id !== id);
            let newActiveId = '';
            const tabIndex = apiList.reduce(
                (a, b, index) => (b.id === id ? index : a),
                -1
            );
            if (tabIndex === -1) {
                return;
            }
            if (id === mergedActiveId) {
                if (tabIndex < apiList.length - 1) {
                    // 如果tabindex不是最后一个，则把下一个设为选中态
                    newActiveId = apiList.find((d, index) => index === tabIndex + 1)?.id || '';
                } else {
                    // 前一个设为选中态
                    newActiveId = apiList.find((d, index) => index === tabIndex - 1)?.id || '';
                }
                setActiveId(newActiveId);
                onChange(newActiveId);
            }
            setApiList([...newList]);
        }
    };

    const apiTabsRef = useRef(null);

    const handleMoveLeft = () => {
        apiTabsRef?.current?.handleMoveLeft();
    };

    const handleMoveRight = () => {
        apiTabsRef?.current?.handleMoveRight();
    };

    const handleTabChange = useCallback((newActiveId) => {
        onChange(newActiveId);
    }, []);

    const HeadTabsList = (
        <HeadTabs
            {...{
                tabItemList: apiList,
                activeTabId: mergedActiveId,
                onTabChange: handleTabChange,
                onRemoveTabItem: handleRemoveTabItem,
            }}
        />
    );

    const renderHeaderPanel = ({ renderScrollItems = () => { }, handleMouseWheel }) => {
        return (
            <div className="apipost-tabs-header" onWheel={handleMouseWheel}>
                {renderScrollItems(HeadTabsList)}
                <div className="extra-panel">
                    <AddMenu />
                    <MoreMenu />
                    <Button size="mini" onClick={handleMoveLeft}>
                        <SvgCaretLeft width="16px" height="16px" />
                    </Button>
                    <Button size="mini" onClick={handleMoveRight}>
                        <SvgCaretRight width="16px" height="16px" />
                    </Button>
                </div>
            </div>
        );
    };

    const emptyContent = (
        <div className="welcome-page">
            <div className="newTarget">
                <Button
                    type="primary"
                    onClick={() => {
                        Bus.$emit('addOpenItem', { type: 'api' });
                    }}
                >
                    <SvgHttp />
                    <h3>新建 Http 接口</h3>
                </Button>
                <Button
                    type="primary"
                    onClick={() => {
                        Bus.$emit('addOpenItem', { type: 'doc' });
                    }}
                >
                    <SvgMarkdown />
                    <h3>新建 Markdown 文本</h3>
                </Button>
                <Button
                    type="primary"
                    onClick={() => {
                        Bus.$emit('addOpenItem', { type: 'grpc' });
                    }}
                >
                    <SvgGrpc />
                    <h3>新建 Grpc 接口</h3>
                </Button>
                <Button
                    type="primary"
                    onClick={() => {
                        Bus.$emit('addOpenItem', { type: 'websocket' });
                    }}
                >
                    <SvgWebsocket />
                    <h3>新建 WebSocket 接口</h3>
                </Button>
            </div>
            {/* <div className="importProject">
                <Button
                    type="primary"
                    className="apipost-blue-btn"
                    onClick={() => {
                        Bus.$emit('openModal', 'ImportProject');
                    }}
                >
                    快速导入项目
                </Button>
            </div> */}
        </div>
    );
    return (
        <>
            <Tabs
                type="card"
                ref={apiTabsRef}
                activeIndex={`${activeIndex}`}
                className="api-page-warper"
                headerAutoScroll
                onChange={handleTabChange}
                onRemoveTab={handleRemoveTabItem}
                activeId={mergedActiveId}
                headerRender={renderHeaderPanel}
                itemWidth={150}
                emptyContent={emptyContent}
                contentRender={contentRender}
            >
                {apiList.map((item) => (
                    <TabPan key={item.id} id={item.id} {...item} removable></TabPan>
                ))}
            </Tabs>
            {/* <FooterToolbar /> */}
        </>
    );
};

export default ApiTabs;

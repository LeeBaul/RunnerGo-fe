import React, { useEffect, useRef } from 'react';
import cn from 'classnames';
import { Tooltip } from 'adesign-react';
import dayjs from 'dayjs';
import SvgClose from '@assets/apis/close.svg';
import isUndefined from 'lodash/isUndefined';
import { handleShowContextMenu } from './contextMenu';
import { useTranslation } from 'react-i18next';

const methodDic = {
    OPTIONS: 'OPT',
    DELETE: 'DEL',
    PROPFIND: 'PROP',
    UNLOCK: 'UNLCK',
    UNLINK: 'UNLNK',
};
const renderPreText = (item) => {
    let result = '';
    switch (item?.type) {
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

const HeadTabItem = (props) => {
    const { activeTabId, onTabChange, item, handleCloseItem } = props;

    const refTooltip = useRef(null);
    const { t } = useTranslation();

    useEffect(() => {
        const listener = () => {
            refTooltip?.current?.setPopupVisible(false);
        };

        document.body.addEventListener('wheel', listener);
        return () => {
            document.body.removeEventListener('wheel', listener);
        };
    }, []);

    const getTargetMethodClassName = (item) => {
        let className = '';
        switch (item.type) {
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

    return (
        <div
            className={cn({
                'api-tab-item': true,
                active: item.id === activeTabId,
            })}
            onClick={onTabChange.bind(null, item.id)}
            onContextMenu={(e) => {
                handleShowContextMenu({ ...item }, e, item.data);
                e.preventDefault();
                e.stopPropagation();
            }}
        >
            <Tooltip
                ref={refTooltip}
                bgColor="var(--background-color-primary)"
                placement="bottom"
                offset={[6, 15]}
                showArrow
                content={
                    <div className="apis-tooltip">
                        <div>
                            <span>{item.method}</span>
                            <span>{item.title}</span>
                        </div>
                        {!isUndefined(item?.createTime) && (
                            <div>
                                { t('apis.createOn') }：
                                {dayjs(item.createTime * 1000).format('YYYY-MM-DD')}
                            </div>
                        )}
                        {!isUndefined(item?.lastUpdate) && (
                            <div>
                                { t('apis.updateOn') }：
                                {dayjs(item.lastUpdate * 1000).format('YYYY-MM-DD')}
                            </div>
                        )}
                    </div>
                }
            >
                <div className="head-title">
                    {item.ifChanged > 0 && <div className="newicon" />}
                    <span className={getTargetMethodClassName(item)}>{renderPreText(item)}</span>
                    {item.title}
                </div>
            </Tooltip>
            <div className="btn-close" onClick={handleCloseItem.bind(null, item)}>
                <SvgClose />
            </div>
        </div>
    );
};

export default React.memo(HeadTabItem);

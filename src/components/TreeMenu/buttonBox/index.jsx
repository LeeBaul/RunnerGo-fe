import React, { useState, useMemo, useEffect, useRef } from "react";
import { useSelector } from 'react-redux';
import './index.less';
import { Button, Tooltip, Dropdown } from 'adesign-react';
import {
    NewApis as SvgNewApis,
    NewFolder as SvgNewFolder,
    Download as SvgDownload,
    Unfold as SvgUnOpen,
    MenuFold as SvgOpen,
    NewWindow as SvgNewWindow,
} from 'adesign-react/icons';
import { isString, isObject, isEmpty } from 'lodash';
import Bus from '@utils/eventBus';
import { DropWrapper } from './style';

const ButtonBox = () => {

    const [isExpandAll, setIsExpandAll] = useState(false);

    const handleExpandAll = () => {
        const newExpandStatus = !isExpandAll;
        setIsExpandAll(newExpandStatus);
        // treeRef.current?.handleExpandItem(newExpandStatus);
        // setWorkspaceCurrent(uuid, `${CURRENT_PROJECT_ID}.IS_EXPAND_ALL`, newExpandStatus ? 1 : -1);
      };

    return (
        <>
            <div className="buttons-box">
                <div className="project-title">默认项目</div>
                <div className="button-list">
                    <Tooltip content="新建接口" placement="top">
                        <Button size="mini">
                            <SvgNewApis width="18px" height="18px" />
                        </Button>
                    </Tooltip>
                    <Tooltip content="新建目录" placement="top">
                        <Button size="mini">
                            <SvgNewFolder width="18px" height="18px" />
                        </Button>
                    </Tooltip>
                    <Tooltip content="导入接口 | 项目" placement="top">
                        <Dropdown
                            placement="bottom-end"
                            content={
                                <div className={DropWrapper}>
                                    <div
                                        className="drop-item"
                                    >
                                        <SvgNewApis width="18px" height="18px" />
                                        <span>导入接口</span>
                                    </div>
                                    <div
                                        className="drop-item"
                                    >
                                        <SvgNewWindow width="18px" height="18px" />
                                        <span>导入项目</span>
                                    </div>
                                </div>
                            }
                        >
                            <Button size="mini">
                                <SvgDownload width="18px" height="18px" />
                            </Button>
                        </Dropdown>
                    </Tooltip>
                    <Tooltip content="全部展开 | 收起" placement="top">
                        <Button size="mini" onClick={handleExpandAll}>
                            {isExpandAll ? (
                                <SvgOpen width="18px" height="18px" />
                            ) : (
                                <SvgUnOpen width="18px" height="18px" />
                            )}
                        </Button>
                    </Tooltip>
                </div>
            </div>
        </>
    )
};

export default ButtonBox;

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
import FolderCreate from '@modals/folder/create';
import ImportApi from "@modals/ImportApi";
import { useTranslation } from 'react-i18next';

const ButtonBox = (props) => {

    const { treeRef, showModal } = props;
    const { t } = useTranslation();

    const [isExpandAll, setIsExpandAll] = useState(false);
    const [showFolder, setShowFolder] = useState(false);
    const currentTeamId = localStorage.getItem('team_id');
    const [showImport, setImport] = useState(false);
    const userTeams = useSelector((store) => store.teams.teamData);

    const currentTeamName = useMemo(() => {
        let currentTeamId = localStorage.getItem('team_id');
        let teamName = userTeams[currentTeamId] ? userTeams[currentTeamId].name : '默认团队';

        return teamName;
    }, [userTeams, currentTeamId]);

    const handleExpandAll = () => {
        const newExpandStatus = !isExpandAll;
        setIsExpandAll(newExpandStatus);
        treeRef.current?.handleExpandItem(newExpandStatus);
        // setWorkspaceCurrent(uuid, `${CURRENT_PROJECT_ID}.IS_EXPAND_ALL`, newExpandStatus ? 1 : -1);
    };

    return (
        <>
            <div className="buttons-box">
                <div className="project-title">{currentTeamName}</div>
                <div className="button-list">
                    <Tooltip content={ t('apis.createApi') } placement="top">
                        <Button size="mini" onClick={() => {
                            Bus.$emit('addOpenItem', { type: 'api' })
                        }}>
                            <SvgNewApis width="18px" height="18px" />
                        </Button>
                    </Tooltip>
                    <Tooltip content={ t('apis.createFolder') } placement="top">
                        <Button size="mini" onClick={() => setShowFolder(true)}>
                            <SvgNewFolder width="18px" height="18px" />
                        </Button>
                    </Tooltip>
                    <Tooltip content={ t('apis.import') } placement="top">
                        <Dropdown
                            placement="bottom-end"
                            content={
                                <div className={DropWrapper}>
                                    <div
                                        className="drop-item"
                                        onClick={() => setImport(true)}
                                    >
                                        <SvgNewApis width="18px" height="18px" />
                                        <span>{ t('apis.importApi') }</span>
                                    </div>
                                    <div
                                        className="drop-item"
                                    >
                                        <SvgNewWindow width="18px" height="18px" />
                                        <span>{ t('apis.importProject') }</span>
                                    </div>
                                </div>
                            }
                        >
                            <Button size="mini">
                                <SvgDownload width="18px" height="18px" />
                            </Button>
                        </Dropdown>
                    </Tooltip>
                    <Tooltip content={ t('apis.expand') } placement="top">
                        <Button size="mini" onClick={handleExpandAll}>
                            {isExpandAll ? (
                                <SvgOpen width="18px" height="18px" />
                            ) : (
                                <SvgUnOpen width="18px" height="18px" />
                            )}
                        </Button>
                    </Tooltip>
                </div>
                { showFolder && <FolderCreate onCancel={() => setShowFolder(false)} /> }
                { showImport && <ImportApi onCancel={() => setImport(false)} /> }
            </div>
        </>
    )
};

export default ButtonBox;

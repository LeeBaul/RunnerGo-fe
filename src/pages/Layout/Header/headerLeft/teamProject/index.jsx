import React, { useRef, useState, useMemo } from 'react';
import { Button, Input, Dropdown } from 'adesign-react';
import { useSelector } from 'react-redux';
import {
  Team as SvgTeam,
  Down as SvgDown,
  StartUpTeam as SvgStartupteam,
  Search as SvgSearch,
} from 'adesign-react/icons';
import { FE_BASEURL } from '@config/client';
import { global$ } from '@hooks/useGlobal/global';
import { isObject, isString } from 'lodash';
import TeamList from './teamList';
import { TeamProjectPanel, DropdownContainer, TeamProjectWrapper } from './style';

const TeamProject = () => {
    const [filterValue, setFilterValue] = useState('');
    const refDropdown = useRef(null);
    const currentTeamId = useSelector((store) => store?.workspace?.CURRENT_TEAM_ID);
    const CURRENT_PROJECT_ID = useSelector((store) => store?.workspace?.CURRENT_PROJECT_ID);
    const userTeams = useSelector((store) => store?.teams?.teamData);

    const currentTeamName = useMemo(() => {
        // let teamName = '离线团队';
        console.log(userTeams, 'userTeams');
        let team_id = window.team_id;
        let teamName = userTeams ?  userTeams[team_id].name : '离线团队';
        // if (isString(currentTeamId) && isObject(userTeams) && currentTeamId !== '-1') {
        //     teamName = userTeams?.[currentTeamId]?.name;
        // }
        // console.log(userTeams);
        // console.log(userTeams);
        return teamName;
    }, [userTeams, currentTeamId]);

    // 用户手动切换项目
    const handleSwitchProject = (project_id) => {
        const uuid = localStorage.getItem('uuid');
        if (`${uuid}` === '' || project_id === '') {
            return;
        }
        //  从本地获取数据
        global$.next({
            action: 'SWITCH_PROJECT',
            payload: project_id,
        });
        refDropdown?.current?.setPopupVisible(false);
    };

    const USER_PROJECT_URL = `${FE_BASEURL}/project/${CURRENT_PROJECT_ID}/lately`;

    return (
        <TeamProjectPanel>
            <SvgTeam />
            <Dropdown
                content={
                    <DropdownContainer>
                        <div className="header">
                            <span>团队/项目</span>
                            {/* <a href={USER_PROJECT_URL} target="_blank" rel="noreferrer">
                                <Button
                                    preFix={<SvgStartupteam width="16" height="16" className="perfix" />}
                                    className="btn-manage"
                                >
                                    管理中心
                                </Button>
                            </a> */}
                        </div>
                        <Input
                            value={filterValue}
                            onChange={setFilterValue}
                            beforeFix={<SvgSearch width="16" height="16" className="perfix" />}
                            className="filter-box"
                            placeholder="请输入项目名称"
                        />
                        <TeamProjectWrapper>
                            <TeamList
                                filterValue={filterValue}
                                currentTeamId={currentTeamId}
                                handleSwitchProject={handleSwitchProject}
                            />
                        </TeamProjectWrapper>
                    </DropdownContainer>
                }
            >
                <Button
                    afterFix={<SvgDown width="16" height="16" className="afterfix" />}
                >
                    { currentTeamName }
                </Button>
            </Dropdown>
        </TeamProjectPanel>
    )
};

export default TeamProject;
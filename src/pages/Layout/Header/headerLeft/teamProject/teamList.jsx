import React, { useEffect, useState } from 'react';
import { Collapse as CollapseComponent } from 'adesign-react';
import { Team as SvgTeam } from 'adesign-react/icons';
import { isArray } from 'lodash';
import { getLatestTeamProjectList$, getLocalDataList$ } from '@rxUtils/project';
import { TeamHeader } from './style';
import ProjectList from './projectList';

const { Collapse, CollapseItem } = CollapseComponent;

const TeamList = (props) => {
  const { filterValue, currentTeamId, handleSwitchProject } = props;

  const [teamList, setTeamList] = useState([]);
  const [projectList, setProjectList] = useState([]);

  const uuid = localStorage.getItem('uuid');

  const filterdProjectList = projectList?.filter(
    (pro) =>
      filterValue === '' ||
      `${pro.name}`.toLowerCase().indexOf(`${filterValue}`.toLowerCase()) !== -1
  );

  const filterdTeamList = teamList?.filter(
    (team) =>
      filterValue === '' ||
      `${team.name}`.toLowerCase().indexOf(`${filterValue}`.toLowerCase()) !== -1 ||
      filterdProjectList.map((d) => d.team_id).includes(team.team_id)
  );

  useEffect(() => {
    if (uuid === null) {
      return;
    }
    getLatestTeamProjectList$(uuid).subscribe((localData) => {
      if (isArray(localData.teamList)) {
        setTeamList(localData.teamList);
      }
      if (isArray(localData.projectList)) {
        setProjectList(localData.projectList);
      }
    });
  }, []);

  return (
    <Collapse
      defaultActiveKey={currentTeamId}
      style={{ border: 'none', overflow: 'auto', margin: '5px 0' }}
    >
      {filterdTeamList?.map((team) => (
        <CollapseItem
          key={team.team_id}
          name={team.team_id}
          header={
            <TeamHeader>
              <SvgTeam className="t-icon" />
              <span className="t-title">{team.name}</span>
              <span className="counts">
                {filterdProjectList?.filter((d) => d.team_id === team.team_id)?.length}
              </span>
            </TeamHeader>
          }
        >
          <ProjectList
            projects={filterdProjectList?.filter((d) => d.team_id === team.team_id)}
            handleSwitchProject={handleSwitchProject}
          />
        </CollapseItem>
      ))}
    </Collapse>
  );
};

export default TeamList;

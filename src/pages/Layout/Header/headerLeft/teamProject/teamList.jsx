import React, { useEffect, useState } from 'react';
import { Collapse as CollapseComponent } from 'adesign-react';
import { Team as SvgTeam } from 'adesign-react/icons';
import { isArray } from 'lodash';
import { getLatestTeamProjectList$, getLocalDataList$ } from '@rxUtils/project';
import { TeamHeader } from './style';
import ProjectList from './projectList';
import { fetchTeamList } from '@services/user';
import { tap } from 'rxjs';
import { useDispatch } from 'react-redux';

const { Collapse, CollapseItem } = CollapseComponent;

const TeamList = (props) => {
  const { filterValue, currentTeamId, handleSwitchProject } = props;

  const [teamList, setTeamList] = useState([]);
  const [projectList, setProjectList] = useState([]);

  const dispatch = useDispatch();

  const uuid = localStorage.getItem('uuid');

  const filterdProjectList = projectList?.filter(
    (pro) =>
      // filterValue === '' ||
      // `${pro.name}`.toLowerCase().indexOf(`${filterValue}`.toLowerCase()) !== -1
      pro
  );

  const filterdTeamList = teamList.filter(
    (team) =>
      filterValue === '' ||
      `${team.name}`.toLowerCase().indexOf(`${filterValue}`.toLowerCase()) !== -1
      //  || filterdProjectList.map((d) => d.team_id).includes(team.team_id)
  );

  useEffect(() => {
    // if (uuid === null) {
    //   return;
    // }
    // getLatestTeamProjectList$(uuid).subscribe((localData) => {
    //   if (isArray(localData.teamList)) {
    //     setTeamList(localData.teamList);
    //   }
    //   if (isArray(localData.projectList)) {
    //     setProjectList(localData.projectList);
    //   }
    // });
    fetchTeamList()
      .pipe(
        tap((res) => {
          const { code, data } = res;
          if (code === 0) {
            const { teams } = data;
            // console.log(teams, 6666666666);
          
            if (isArray(teams)) {
              setTeamList(teams);
              const teamData = {};
              // console.log(teams, 6666666666);
              teams.forEach((data) => {
                teamData[data.team_id] = data;
              });
              dispatch({
                type: 'teams/updateTeamData',
                payload: teamData,
              });
            }
          }
        })
      )
      .subscribe();
  }, []);

  return (
    <Collapse
      defaultActiveKey={currentTeamId}
      style={{ border: 'none', overflow: 'auto', margin: '5px 0' }}
    >
      {filterdTeamList.map((team) => (
        <CollapseItem
          key={team.team_id}
          name={team.team_id}
          header={
            <TeamHeader>
              <SvgTeam className="t-icon" />
              <span className="t-title">{team.name}</span>
              <span className="counts">
                {team.cnt}
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

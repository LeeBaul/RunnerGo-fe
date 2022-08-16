const NAMESPACE = 'teams';

const initialState = {
  teamData: null, // 团队列表数据
};

// action名称
const actionTypes = {
  updateTeamData: 'updateTeamData',
}

export const teamsReducer = (state = initialState, action) => {
  switch (action.type) {
    case `${NAMESPACE}/${actionTypes.updateTeamData}`:
      return {
        ...state,
        teamData: action.payload,
      };
    default:
      return state;
  }
};

export default teamsReducer;

const NAMESPACE = 'dashboard';

const initialState = {
  userData: {
    api_num: 0,
    plan_num: 0,
    report_num: 0,
    scene_num: 0,
  },
};

// action名称
const actionTypes = {
    updateUserData: 'updateUserData',
}

export const dashBoardReducer = (state = initialState, action) => {
  switch (action.type) {
    case `${NAMESPACE}/${actionTypes.updateUserData}`:
      
      return {
        ...state,
        userData: action.payload,
      };
    default:
      return state;
  }
};

export default dashBoardReducer;

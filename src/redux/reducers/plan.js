const NAMESPACE = 'plan';

const initialState = {
  planData: [], // 运行中的计划
};

// action名称
const actionTypes = {
    updatePlanData: 'updatePlanData',
}

export const plansReducer = (state = initialState, action) => {
  switch (action.type) {
    case `${NAMESPACE}/${actionTypes.updatePlanData}`:
      return {
        ...state,
        planData: action.payload,
      };
    default:
      return state;
  }
};

export default plansReducer;

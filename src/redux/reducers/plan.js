const NAMESPACE = 'plan';

const initialState = {
  planData: [], // 运行中的计划
  refreshList: false, // 刷新计划列表
  open_plan: {}, // 打开的计划
  planMenu: [], // 计划左侧菜单
};

// action名称
const actionTypes = {
    updatePlanData: 'updatePlanData',
    updateRefreshList: 'updateRefreshList',
    updateOpenPlan: 'updateOpenPlan',
    updatePlanMenu: 'updatePlanMenu',
}

export const plansReducer = (state = initialState, action) => {
  switch (action.type) {
    case `${NAMESPACE}/${actionTypes.updatePlanData}`:
      return {
        ...state,
        planData: action.payload,
      };
    case `${NAMESPACE}/${actionTypes.updateRefreshList}`:
      return {
        ...state,
        refreshList: action.payload,
      }
    case `${NAMESPACE}/${actionTypes.updateOpenPlan}`:
      return {
        ...state,
        open_plan: action.payload,
      }
    case `${NAMESPACE}/${actionTypes.updatePlanMenu}`:
      console.log('redux/plan/updatePlanMenu', action);
      return {
        ...state,
        planMenu: action.payload,
      }
    default:
      return state;
  }
};

export default plansReducer;

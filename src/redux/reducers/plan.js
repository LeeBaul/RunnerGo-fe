const NAMESPACE = 'plan';

const initialState = {
  planData: [], // 运行中的计划
  refreshList: false, // 刷新计划列表
  open_plan: {}, // 打开的计划
  open_plan_scene: {}, // 计划中打开的场景
  planMenu: [], // 计划左侧菜单

  id_apis: {},
  node_config: {},
  type: [],
  nodes: [],
  edges: [],
};

// action名称
const actionTypes = {
  updatePlanData: 'updatePlanData',
  updateRefreshList: 'updateRefreshList',
  updateOpenPlan: 'updateOpenPlan',
  updatePlanMenu: 'updatePlanMenu',
  updateOpenScene: 'updateOpenScene',
  updateIdApis: 'updateIdApis',
  updateNodeConfig: 'updateNodeConfig',
  updateType: 'updateType',
  updateNodes: 'updateNodes',
  updateEdges: 'updateEdges',
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
    case `${NAMESPACE}/${actionTypes.updateOpenScene}`:
      return {
        ...state,
        open_plan_scene: action.payload,
      }
    case `${NAMESPACE}/${actionTypes.updateIdApis}`:
      return {
        ...state,
        id_apis: action.payload,
      }
    case `${NAMESPACE}/${actionTypes.updateNodeConfig}`:
      return {
        ...state,
        node_config: action.payload,
      }
    case `${NAMESPACE}/${actionTypes.updateType}`:
      return {
        ...state,
        type: action.payload,
      }
    case `${NAMESPACE}/${actionTypes.updateNodes}`:
      return {
        ...state,
        nodes: action.payload,
      };
    case `${NAMESPACE}/${actionTypes.updateEdges}`:
      return {
        ...state,
        edges: action.payload,
      }
    default:
      return state;
  }
};

export default plansReducer;

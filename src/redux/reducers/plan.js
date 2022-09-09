const NAMESPACE = 'plan';

const initialState = {
  planData: null, // 运行中的计划
  refreshList: false, // 刷新计划列表
  open_plan: {}, // 打开的计划
  open_plan_scene: {}, // 计划中打开的场景
  planMenu: [], // 计划左侧菜单

  api_now: '', // 当前打开的接口编辑

  id_apis: {},
  id_now: '', // 当前配置的node id
  showApiConfig: false,
  node_config: {},
  type: [],
  nodes: [],
  edges: [],
  delete_node: '',

  clone_node: [],
  import_node: [],

  run_res: null,
  run_api_res: null,

  success_edge: [], // 运行成功的线
  failed_edge: [], // 运行失败的线
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
  updateImportNode: 'updateImportNode',
  updateDeleteNode: 'updateDeleteNode',
  updateCloneNode: 'updateCloneNode',
  updateApiNow: 'updateApiNow',

  updateRunRes: 'updateRunRes',
  updateIdNow: 'updateIdNow',
  updateApiRes: 'updateApiRes',
  updateSuccessEdge: 'updateSuccessEdge',
  updateFailedEdge: 'updateFailedEdge',
  updateApiConfig: 'updateApiConfig',
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
    case `${NAMESPACE}/${actionTypes.updateImportNode}`:
      return {
        ...state,
        import_node: action.payload,
      }
    case `${NAMESPACE}/${actionTypes.updateDeleteNode}`:
      return {
        ...state,
        delete_node: action.payload,
      }
    case `${NAMESPACE}/${actionTypes.updateCloneNode}`:
      return {
        ...state,
        clone_node: action.payload,
      }
    case `${NAMESPACE}/${actionTypes.updateRunRes}`:
      console.log('redux/scene/updateRunRes', action.payload);
      return {
        ...state,
        run_res: action.payload,
      }
    case `${NAMESPACE}/${actionTypes.updateIdNow}`:
      console.log('redux/plan/updateIdNow', action.payload);
      return {
        ...state,
        id_now: action.payload,
      }
    case `${NAMESPACE}/${actionTypes.updateApiRes}`:
      return {
        ...state,
        run_api_res: action.payload,
      }
    case `${NAMESPACE}/${actionTypes.updateSuccessEdge}`:
      return {
        ...state,
        success_edge: action.payload,
      };
    case `${NAMESPACE}/${actionTypes.updateFailedEdge}`:
      return {
        ...state,
        failed_edge: action.payload,
      }
    case `${NAMESPACE}/${actionTypes.updateApiNow}`:
      return {
        ...state,
        api_now: action.payload,
      }
    case `${NAMESPACE}/${actionTypes.updateApiConfig}`:
      return {
        ...state,
        showApiConfig: action.payload,
      }
    default:
      return state;
  }
};

export default plansReducer;

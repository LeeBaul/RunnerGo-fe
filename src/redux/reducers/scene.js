const NAMESPACE = 'scene';

const initialState = {
  sceneDatas: {}, // 场景管理菜单列表
  open_scene: null, // 打开的场景
  open_scene_name: '', // 打开的场景的名字
  isLoading: false, // 目录列表是否正在加载中,
  nodes: [], // 节点
  edges: [], // 线,
  type: [],
  showApiConfig: false, // 是否展示接口配置
  saveScene: false, // 保存场景
  id_apis: {}, // id和api配置的映射关系
  api_now: {}, // 当前配置的api
  node_config: {}, // id和api/控制器基本配置的映射关系

  import_node: [], // 导入项目时添加节点

  delete_node: '', // 要删除的节点id

  clone_node: [], // 复制的节点

  update_edge: {}, // 要改变的线
  update_node: {}, // 要改变的点
};

// action名称
const actionTypes = {
  recoverSceneDatas: 'recoverSceneDatas',
  updateSceneDatas: 'updateSceneDatas',
  updateLoadStatus: 'updateLoadStatus',
  updateNodes: 'updateNodes',
  updateEdges: 'updateEdges',
  updateType: 'updateType',
  updateApiConfig: 'updateApiConfig',
  updateSaveScene: 'updateSaveScene',
  updateIdApis: 'updateIdApis',
  updateApiNow: 'updateApiNow',
  updateNodeConfig: 'updateNodeConfig',
  updateImportNode: 'updateImportNode',
  updateOpenScene: 'updateOpenScene',
  updateDeleteNode: 'updateDeleteNode',
  updateCloneNode: 'updateCloneNode',
  updateOpenName: 'updateOpenName',
  updateChangeEdge: 'updateChangeEdge',
  updateChangeNode: 'updateChangeNode',
};

export const sceneReducer = (state = initialState, action) => {
  switch (action.type) {
    case `${NAMESPACE}/${actionTypes.recoverSceneDatas}`:
      return {
        ...state,
        sceneDatas: {},
        isLoading: true,
      };
    case `${NAMESPACE}/${actionTypes.updateSceneDatas}`:
      return {
        ...state,
        isLoading: false,
        sceneDatas: action.payload,
      };
    case `${NAMESPACE}/${actionTypes.updateLoadStatus}`:
      return {
        ...state,
        isLoading: action.payload,
      };
    case `${NAMESPACE}/${actionTypes.updateNodes}`:
      console.log('redux/scene/updateNodes', action.payload);
      return {
        ...state,
        nodes: action.payload,
      };
    case `${NAMESPACE}/${actionTypes.updateEdges}`:
      return {
        ...state,
        edges: action.payload,
      }
    case `${NAMESPACE}/${actionTypes.updateType}`:
      console.log(action.payload);
      return {
        ...state,
        type: action.payload,
      }
    case `${NAMESPACE}/${actionTypes.updateApiConfig}`:
      return {
        ...state,
        showApiConfig: action.payload,
      }
    case `${NAMESPACE}/${actionTypes.updateSaveScene}`:
      return {
        ...state,
        saveScene: action.payload,
      }
    case `${NAMESPACE}/${actionTypes.updateIdApis}`:
      console.log('scene/redux/updateIdApis', state.id_apis, action.payload)
      return {
        ...state,
        id_apis: action.payload,
      }
    case `${NAMESPACE}/${actionTypes.updateApiNow}`:
      return {
        ...state,
        api_now: action.payload,
      }
    case `${NAMESPACE}/${actionTypes.updateNodeConfig}`:
      return {
        ...state,
        node_config: action.payload,
      }
    case `${NAMESPACE}/${actionTypes.updateImportNode}`:
      return {
        ...state,
        import_node: action.payload,
      }
    case `${NAMESPACE}/${actionTypes.updateOpenScene}`:
      return {
        ...state,
        open_scene: action.payload,
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
    case `${NAMESPACE}/${actionTypes.updateOpenName}`:
      return {
        ...state,
        open_scene_name: action.payload,
      }
    case `${NAMESPACE}/${actionTypes.updateChangeEdge}`:
      return {
        ...state,
        update_edge: action.payload,
      }
    case `${NAMESPACE}/${actionTypes.updateChangeNode}`:
      return {
        ...state,
        update_node: action.payload,
      }
    default:
      return state;
  }
};

export default sceneReducer;

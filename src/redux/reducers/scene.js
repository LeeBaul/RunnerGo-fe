const NAMESPACE = 'scene';

const initialState = {
  sceneDatas: {}, // 场景管理菜单列表
  isLoading: false, // 目录列表是否正在加载中
};

// action名称
const actionTypes = {
  recoverSceneDatas: 'recoverSceneDatas',
  updateSceneDatas: 'updateSceneDatas',
  updateLoadStatus: 'updateLoadStatus',
}

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
    default:
      return state;
  }
};

export default sceneReducer;

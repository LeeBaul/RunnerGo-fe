import { Settings } from '@constants/user';

const NAMESPACE = 'user';

const initialState = {
    // 用户配置信息
    config: Settings,
    // 当前用户信息
    userInfo: {
        email: '',
        nickname: '',
        avatar: '',
        user_id: null,
        role_id: null,
    },
    team_id: null,
};

// action名称
const actionTypes = {
    updateConfig: 'updateConfig',
    updateUserInfo: 'updateUserInfo',
    updateTeamId: 'updateTeamId',
};

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case `${NAMESPACE}/${actionTypes.updateConfig}`:
            return { ...state, config: action.payload };
        case `${NAMESPACE}/${actionTypes.updateUserInfo}`:
            return { ...state, userInfo: action.payload };
        case `${NAMESPACE}/${actionTypes.updateTeamId}`:
            return { ...state, team_id: action.team_id }    
        default:
            return state;
    }
};

export default userReducer;
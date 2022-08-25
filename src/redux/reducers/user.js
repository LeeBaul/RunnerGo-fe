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
};

// action名称
const actionTypes = {
    updateConfig: 'updateConfig',
    updateUserInfo: 'updateUserInfo',
};

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case `${NAMESPACE}/${actionTypes.updateConfig}`:
            return { ...state, config: action.payload };
        case `${NAMESPACE}/${actionTypes.updateUserInfo}`:
            // console.log('redux/user', action);
            return { ...state, userInfo: action.payload };
        default:
            return state;
    }
};

export default userReducer;
import { from, iif, of, throwError } from 'rxjs';
import { catchError, concatMap, map, mergeMap } from 'rxjs/operators';
import { isLogin } from '@utils/common';
import { v4 as uuidV4 } from 'uuid';
// import { User, UserList } from '@indexedDB/user';
import { fetchUserConfigRequest, fetchProjectUserListRequest } from '@services/user';
import isUndefined from 'lodash/isUndefined';
import { USER_CONFIG } from '@constants/userConfig';
// import { IUser } from '@models/user/user';
import { isArray, isObject, isString } from 'lodash';

// 获取用户配置信息 若获取不到，则创建用户默认配置
const getLocalUserConfig = async (uuid) => {
    // let userConfig = await User.get(uuid);
    const defaultProjectId = uuidV4();

    // if (isUndefined(userConfig)) {
    //     userConfig = {
    //         uuid,
    //         hideMenus: [],
    //         workspace: {
    //             DEFAULT_TEAM_ID: '-1',
    //             DEFAULT_PROJECT_ID: defaultProjectId,
    //             CURRENT_TEAM_ID: '-1',
    //             CURRENT_PROJECT_ID: defaultProjectId,
    //         },
    //         config: USER_CONFIG,
    //     };
        // await User.put(userConfig, userConfig.uuid);
    // }
    // return userConfig;
    return {};
};

// 更新用户本地配置信息
const updateUserLocalConfig = async (uuid, configInfo = {}) => {
    // const oldConfig = await User.get(uuid);
    const {
        DEFAULT_TEAM_ID = '-1',
        DEFAULT_PROJECT_ID = '-1',
        CURRENT_TEAM_ID = '-1',
        CURRENT_PROJECT_ID = '-1',
        config = USER_CONFIG,
    } = configInfo;

    // 若不存在，则创建
    if (isUndefined(oldConfig)) {
        const userConfig = {
            uuid,
            hideMenus: [],
            workspace: {
                DEFAULT_TEAM_ID,
                DEFAULT_PROJECT_ID,
                CURRENT_TEAM_ID,
                CURRENT_PROJECT_ID,
            },
            config: USER_CONFIG,
        };
        // await User.put(userConfig, userConfig.uuid);
    } else {
        const newConfig = Object.assign({}, USER_CONFIG, config);
        // await User.update(uuid, {
        //     'workspace.DEFAULT_TEAM_ID': DEFAULT_TEAM_ID,
        //     'workspace.DEFAULT_PROJECT_ID': DEFAULT_PROJECT_ID,

        //     //* 与易凯沟通后，不从云端同步最新项目ID与团队ID
        //     // 'workspace.CURRENT_TEAM_ID': CURRENT_TEAM_ID,
        //     // 'workspace.CURRENT_PROJECT_ID': CURRENT_PROJECT_ID,
        //     config: newConfig || USER_CONFIG,
        // });
    }
};

// 获取用户配置信息
export const getUserConfig$ = (uuid) => {
    return iif(
        isLogin,
        from(fetchUserConfigRequest()).pipe(
            mergeMap((res) => {
                if (res?.code === 10000) {
                    return updateUserLocalConfig(uuid, isObject(res?.data) ? res.data : {});
                }
                return of('');
            }),
            mergeMap(() => getLocalUserConfig(uuid)),
            catchError(() => getLocalUserConfig(uuid))
        ),
        of('').pipe(mergeMap(() => getLocalUserConfig(uuid)))
    );
};

// 更新本地用户列表信息
export const updateProjectUserList = async (userList) => {
    // if (isArray(userList)) {
    //     await UserList.bulkPut(userList);
    // }
};

// 获取本地当前项目所有用户列表
export const getLocalProjectUserList = async (project_id) => {
    if (!isString(project_id)) {
        return [];
    }
    // const userList = await UserList.where({ project_id }).toArray();
    // return isArray(userList) ? userList : [];
    return [];
};

// 获取项目下用户列表
export const getProjectUserList$ = (project_id) => {
    const getProjectUserListError$ = of(project_id).pipe(concatMap(getLocalProjectUserList));
    return iif(
        isLogin,
        from(fetchProjectUserListRequest({ project_id })).pipe(
            concatMap((res) => {
                if (res?.code === 10000) {
                    // 保存用户列表信息
                    const userList = res?.data;
                    if (isArray(userList)) {
                        const tempDataList = userList.map((item) => {
                            return {
                                ...item,
                                project_id,
                                id: `${project_id}/${item.uuid}`,
                            };
                        });
                        return of('').pipe(
                            concatMap(() => updateProjectUserList(tempDataList)),
                            map(() => tempDataList)
                        );
                    }

                    return of([]);
                }
                return throwError(() => new Error('获取用户列表信息失败'));
            }),
            catchError(() => getProjectUserListError$)
        ),
        getProjectUserListError$
    );
};

// 获取用户信息详情
export const getLocalUserInfo = async (project_id, uuid) => {
    if (!isString(project_id) || !isString(uuid)) {
        return null;
    }

    // const userInfo = await UserList.where({ project_id, uuid }).first();
    if (isUndefined(userInfo)) {
        return null;
    }
    // return userInfo;
    return null;
};

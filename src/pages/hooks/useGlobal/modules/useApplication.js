import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { of } from 'rxjs';
import { tap, filter, concatMap, map, switchMap, mergeMap, catchError } from 'rxjs/operators';
import { getUserConfig$, getProjectUserList$, getIndexPage$, getRunningPlan$ } from '@rxUtils/user';
import { getUserTeamList$ } from '@rxUtils/team';
import { getUserProjectList$, getMultiProjectDetails$ } from '@rxUtils/project';
import { uploadTasks } from '@rxUtils/task';
import { getUserTargetList$, getApiList$ } from '@rxUtils/collection';
import { getShareList } from '@rxUtils/share';
import { getSingleTestList$ } from '@rxUtils/runner/singleTest';
import { getCombinedTestList$ } from '@rxUtils/runner/combinedTest';
import { getReportList$ } from '@rxUtils/runner/testReports';
import { getLocalTargets } from '@busLogics/projects';
import { useEventCallback } from 'rxjs-hooks';
import { getLocalEnvsDatas } from '@rxUtils/env';
import { isArray, isPlainObject, cloneDeep, concat } from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import { webSocket } from '@utils/websocket/websocket';
import WebSocket2 from '@utils/websocket/WebSocket2';
import { LIVE_SOCKET_URL } from '@config/server';
import { isElectron } from '@utils';
import { APP_VERSION } from '@config/base';
import { fetchTeamMemberList, fetchTeamList, fetchUserConfig } from '@services/user';
import Bus, { useEventBus } from '@utils/eventBus';
import { useNavigate } from 'react-router-dom';

import { fetchDashBoardInfo, fetchRunningPlan } from '@services/dashboard';
import { fetchApiList } from '@services/apis';


import { global$ } from '../global';
import { Message } from 'adesign-react';

const useProject = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userInfo = useSelector((store) => store.user.userInfo);
    const apiDatas = useSelector((store) => store.apis.apiDatas);
    // const userData = useSelector((store) => store.dashboard.userData);
    // 项目初始化完成
    const handleInitProjectFinish = async (project_id) => {
        const apiDatas = await getLocalTargets(project_id);
        dispatch({
            type: 'apis/updateApiDatas',
            payload: apiDatas,
        });

        // 停止右上角转圈圈
        dispatch({
            type: 'global/setDownloadStatus',
            payload: -1,
        });

        // 加载本地环境信息
        const envDatas = await getLocalEnvsDatas(project_id);
        dispatch({
            type: 'envs/setEnvDatas',
            payload: envDatas,
        });
    };

    // 展示团队列表
    const handleInitTeams = ({ data: { teams } }) => {
        const teamData = {};
        teams.length && teams.forEach((data) => {
            teamData[data.team_id] = data;
        });
        dispatch({
            type: 'teams/updateTeamData',
            payload: teamData,
        });
    };

    // 展示项目列表
    const handleInitProjects = (projectList) => {
        const projectData = {};
        projectList.length && projectList.forEach((data) => {
            projectData[data.project_id] = data;
        });
        dispatch({
            type: 'projects/setProjectData',
            payload: projectData,
        });
    };
    const [getSingleTestList] = useEventCallback(getSingleTestList$);
    const [getCombinedTestList] = useEventCallback(getCombinedTestList$);
    const [getReportList] = useEventCallback(getReportList$);

    // 展示首页基本信息
    const handleInitIndex = (res) => {
        const { data, code } = res;
        if (code === 0) {
            const { api_num, plan_num, report_num, scene_num, user, operations } = data;
            const userData = {
                api_num,
                plan_num,
                report_num,
                scene_num,
            };
            dispatch({
                type: 'dashboard/updateUserData',
                payload: userData
            });

            const newInfo = cloneDeep(userInfo);
            newInfo.email = user.email;
            newInfo.nickname = user.nickname;
            newInfo.avatar = user.avatar;
            newInfo.user_id = user.user_id;
            newInfo.role_id = user.role_id;

            dispatch({
                type: 'user/updateUserInfo',
                payload: newInfo
            })



            dispatch({
                type: 'teams/updateLogList',
                payload: operations,
            })

        }
    }

    // 展示运行中的计划
    const handleInitRunningPlan = ({ data }) => {
        const { plans } = data;
        dispatch({
            type: 'plan/updatePlanData',
            payload: plans
        });

        Bus.$emit('getTeamMemberList')
    }

    // 展示用户配置信息
    const handleInitUserConfig = ({ data: { settings } }) => {

        // const dispatch = useDispatch();
        // // const newInfo = cloneDeep(userInfo);
        // // newInfo.team_id = settings.current_team_id;
        // const team_id = settings.current_team_id;
        // sessionStorage.setItem('team_id', team_id);

        // dispatch({
        //     type: 'user/updateTeamId',
        //     payload: team_id
        // });

        // sessionStorage.setItem('team_id', data.settings.current_team_id);
        // window.team_id = data.settings.current_team_id;
        // let newInfo = cloneDeep(userInfo);
        // newInfo.team_id = data.settings.current_team_id;
        // dispatch({
        //     type: 'user/updateUserInfo',
        //     payload: newInfo
        // });
        // const {
        //     DEFAULT_PROJECT_ID = '-1',
        //     DEFAULT_TEAM_ID = '-1',
        //     CURRENT_PROJECT_ID = '-1',
        //     CURRENT_TEAM_ID = '-1',
        //     CURRENT_ENV_ID = '-1',
        // } = userConfig?.workspace || {};
        // window.currentProjectId = CURRENT_PROJECT_ID;
        // dispatch({
        //     type: 'workspace/updateWorkspaceState',
        //     payload: {
        //         DEFAULT_TEAM_ID,
        //         DEFAULT_PROJECT_ID,
        //         CURRENT_PROJECT_ID,
        //         CURRENT_TEAM_ID,
        //         CURRENT_ENV_ID,
        //     },
        // });
    };

    // 应用程序初始化 第一次打开应用程序
    const handleInitApplication = () => {
        // let uuid = localStorage.getItem('uuid');
        // if (uuid === null) {
        //     uuid = '-1';
        //     localStorage.setItem('uuid', '-1');
        // }

        dispatch({
            type: 'apis/recoverApiDatas',
        });

        // 开始右上角转圈圈
        dispatch({
            type: 'global/setDownloadStatus',
            payload: 1,
        });

        const ininTheme = (userConfig) => {
            // 用户配置放入redux中
            isPlainObject(userConfig?.config) &&
                dispatch({
                    type: 'user/updateConfig',
                    payload: userConfig.config,
                });
            let linkThemeName = userConfig?.config?.SYSTHEMCOLOR || 'dark';
            if (linkThemeName === 'white') {
                linkThemeName = 'default';
            }
            const url = `/skins/${linkThemeName}.css`;
            document.querySelector(`link[name="apt-template-link"]`).setAttribute('href', url);
        };

        const apiListParams = {
            page: 1,
            size: 100,
            team_id: localStorage.getItem('team_id'),
        };

        return getUserConfig$().pipe(
            tap(handleInitUserConfig),
            concatMap((userConfig) => {
                // 初始化主题色
                ininTheme(userConfig);
                const team_id = localStorage.getItem('team_id');
                return of(team_id).pipe(
                    // step1.加载团队列表
                    concatMap(() => getUserTeamList$().pipe(tap(handleInitTeams))),
                    // step2. 执行异步上传任务
                    concatMap(() => getIndexPage$().pipe(tap(handleInitIndex))),
                    concatMap(() => getRunningPlan$().pipe(tap(handleInitRunningPlan))),
                    concatMap(() => getApiList$(apiListParams).pipe(tap(handleInitApiList))),
                    tap(() => {
                        global$.next({
                            action: 'RELOAD_LOCAL_SCENE'
                        })
                    }),
                    // concatMap(() => uploadTasks(current_project_id)),
                    // concatMap(() =>
                    //     Bus.$emit('getTeamMemberList'),
                    //     // step3. 加载项目简要信息列表
                    //     // getUserProjectList$(uuid, current_project_id).pipe(
                    //     //     tap(handleInitProjects),
                    //     //     map((projects) => (isArray(projects) ? projects.map((d) => d.project_id) : [])),
                    //     //     // step3. 加载项目完整信息,并更新本地全局参数/环境变量等信息
                    //     //     mergeMap((project_ids) => getMultiProjectDetails$(uuid, project_ids))
                    //     // )

                    // ),
                    // switchMap(() =>
                    //     getUserTargetList$(current_project_id).pipe(
                    //         tap((data) => {
                    //         })
                    //     )
                    // ),
                    // 获取项目下用户信息列表
                    // concatMap(() => getProjectUserList$(current_project_id)),
                    // tap((res) => {
                    // }),
                    // 加载分享列表
                    // switchMap(() =>
                    //     getShareList(current_project_id).pipe(
                    //         tap((shareList) => {
                    //             global$.next({
                    //                 action: 'RELOAD_SHARE_LIST',
                    //             });
                    //         })
                    //     )
                    // ),
                    // 加载测试列表 包括测试报告
                    // switchMap(() => {
                    //     getSingleTestList(current_project_id);
                    //     getCombinedTestList(current_project_id);
                    //     return of(getReportList(current_project_id));
                    // }),
                    // tap((d) => handleInitProjectFinish(current_project_id)),
                    tap(() => {
                        // 初始化连接协作socket
                        webSocket.socketInit();
                    })
                );
            })
        );
    };


    // 初始化用户统计长连接
    const liveSocketInit = () => {
        const webSocket2 = new WebSocket2();
        let machineid = localStorage.getItem('machineid');
        if (!machineid) {
            machineid = uuidv4();
            localStorage.setItem('machineid', machineid);
        }
        webSocket2.connect(
            `${LIVE_SOCKET_URL}?machineid=${machineid}&terminal=${isElectron() ? 'client' : 'web'
            }&version=${APP_VERSION}`
        );
        return webSocket2;
    };

    // 获取当前团队成员列表
    const getTeamMemberList = () => {
        const query = {
            team_id: localStorage.getItem('team_id'),
        }
        fetchTeamMemberList(query)
            .pipe(
                tap((res) => {
                    const { code, data: { members } } = res;

                    if (code === 0) {
                        dispatch({
                            type: 'teams/updateTeamMember',
                            payload: members
                        })
                    }
                })
            )
            .subscribe();
    }
    // 获取当前团队列表
    const getTeamList = () => {
        fetchTeamList().pipe(
            tap((res) => {
                const { data: { teams } } = res;
                const teamData = {};
                teams.length && teams.forEach((data) => {
                    teamData[data.team_id] = data;
                });
                dispatch({
                    type: 'teams/updateTeamData',
                    payload: teamData,
                });
            })
        )
    };
    // 获取当前运行中的计划
    const getRunningPlan = () => {
        const params = {
            team_id: localStorage.getItem('team_id'),
            page: 1,
            size: 5
        };
        fetchRunningPlan(params).pipe(
            tap((res) => {
                const { data: { plans } } = res;
                dispatch({
                    type: 'plan/updatePlanData',
                    payload: plans
                })
            })
        )
    };
    // 获取当前用户基本配置
    const getUserConfig = () => {
        fetchUserConfig().pipe(
            tap((res) => {
                const { data: { settings } } = res;
                const team_id = settings.current_team_id;
                localStorage.setItem('team_id', team_id);
                dispatch({
                    type: 'user/updateTeamId',
                    payload: team_id
                });

            }),
            catchError((err) => console.log(err))
        )
    }
    // 获取接口列表
    const handleInitApiList = ({ data: { targets, total }, code }) => {
        if (code === 0) {
            // dispatch({
            //     type: 'apis/updateApiDatas',
            //     payload: targets
            // })
            const tempApiList = {};
            for (let i = 0; i < targets.length; i++) {
                tempApiList[targets[i].target_id] = targets[i];
            }
            dispatch({
                type: 'apis/updateApiDatas',
                payload: tempApiList
            })

            if (total > 100) {
                loopGetApi(2, 100, total - 100);
            }
            // dispatch({
            //     type: 'opens/coverOpenApis',
            //     payload: tempApiList
            // })
        } else {
            // Message('error', '接口列表获取失败!');
        }
    }

    const loopGetApi = (page, size, needReq) => {
        const params = {
            page,
            size,
            team_id: parseInt(localStorage.getItem('team_id')),
        };
        fetchApiList(params).subscribe({
            next: ({ data: { targets, total }, code }) => {
                if (code === 0) {
                    const tempApiList = {};
                    for (let i = 0; i < targets.length; i++) {
                        tempApiList[targets[i].target_id] = targets[i];
                    }
                    const apis = cloneDeep(apiDatas);
                    const _apis = Object.assign(apis, tempApiList);
                    dispatch({
                        type: 'apis/updateApiDatas',
                        payload: _apis
                    })
                    if (needReq - 100 > 0) {
                        loopGetApi(page + 1, size, needReq - 100);
                    }
                }
            }
        })
    }

    useEventBus('getTeamMemberList', getTeamMemberList);
    useEventBus('getTeamList', getTeamList);
    useEventBus('getRunningPlan', getRunningPlan);
    useEventBus('getUserConfig', getUserConfig);

    useEffect(() => {
        // 初始化用户统计长连接
        const webSocket2 = liveSocketInit();

        // 项目初始化
        global$
            .pipe(
                filter((d) => d?.action === 'INIT_APPLICATION'),
                tap(() => {
                    console.log('应用程序初始化-----start=============');
                }),
                switchMap(handleInitApplication)
            )
            .subscribe();

        global$
            .pipe(
                filter((d) => d.action === 'GET_APILIST'),
                concatMap(({ params }) => getApiList$(params).pipe(tap(handleInitApiList)))
            )
            .subscribe();

        // global$
        //     .pipe(
        //         filter((d) => d.action === 'GET_MEMBERLIST'),
        //         tap(() => {
        //         })
        //     )
        //     .subscribe();

        return () => {
            webSocket2.close();
        };
    }, []);
};

export default useProject;

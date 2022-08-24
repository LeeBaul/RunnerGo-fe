import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { of } from 'rxjs';
import { tap, filter, concatMap, map, switchMap, mergeMap } from 'rxjs/operators';
import { getUserConfig$, getProjectUserList$ } from '@rxUtils/user';
import { getUserTeamList$ } from '@rxUtils/team';
import { getUserProjectList$, getMultiProjectDetails$ } from '@rxUtils/project';
import { uploadTasks } from '@rxUtils/task';
import { getUserTargetList$ } from '@rxUtils/collection';
import { getShareList } from '@rxUtils/share';
import { getSingleTestList$ } from '@rxUtils/runner/singleTest';
import { getCombinedTestList$ } from '@rxUtils/runner/combinedTest';
import { getReportList$ } from '@rxUtils/runner/testReports';
import { getLocalTargets } from '@busLogics/projects';
import { useEventCallback } from 'rxjs-hooks';
import { getLocalEnvsDatas } from '@rxUtils/env';
import { isArray, isPlainObject, cloneDeep } from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import { webSocket } from '@utils/websocket/websocket';
import WebSocket2 from '@utils/websocket/WebSocket2';
import { LIVE_SOCKET_URL } from '@config/server';
import { isElectron } from '@utils';
import { APP_VERSION } from '@config/base';
import { global$ } from '../global';

const useProject = () => {
    const dispatch = useDispatch();
    const userInfo = useSelector((store) => store.user.userInfo);
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
        console.log('展示团队列表', teams);
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

    // 展示用户配置信息
    const handleInitUserConfig = ({ data }) => {
        window.team_id = data.settings.current_team_id;
        // console.log('userConfig!!!', data, userInfo);
        // let newInfo = cloneDeep(userInfo);
        // newInfo.team_id = data.settings.current_team_id;
        // console.log(newInfo);
        // dispatch({
        //     type: 'user/updateUserInfo',
        //     payload: newInfo
        // });
        // console.log('userConfig', userConfig);
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
        let uuid = localStorage.getItem('uuid');
        if (uuid === null) {
            uuid = '-1';
            localStorage.setItem('uuid', '-1');
        }

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

        return getUserConfig$(uuid).pipe(
            tap(handleInitUserConfig),
            concatMap((userConfig) => {
                console.log('用户配置信息获取成功：', userConfig);
                // 初始化主题色
                ininTheme(userConfig);
                const current_project_id = userConfig?.workspace?.CURRENT_PROJECT_ID || '-1';
                return of(current_project_id).pipe(
                    // step1.加载团队列表
                    concatMap(() => getUserTeamList$(uuid).pipe(tap(handleInitTeams))),
                    // step2. 执行异步上传任务
                    concatMap(() => uploadTasks(current_project_id)),
                    concatMap(() =>
                        // step3. 加载项目简要信息列表
                        getUserProjectList$(uuid, current_project_id).pipe(
                            tap(handleInitProjects),
                            map((projects) => (isArray(projects) ? projects.map((d) => d.project_id) : [])),
                            // step3. 加载项目完整信息,并更新本地全局参数/环境变量等信息
                            mergeMap((project_ids) => getMultiProjectDetails$(uuid, project_ids))
                        )
                    ),
                    switchMap(() =>
                        getUserTargetList$(current_project_id).pipe(
                            tap((data) => {
                                console.log('左侧目录信息获取成功：', data);
                            })
                        )
                    ),
                    // 获取项目下用户信息列表
                    concatMap(() => getProjectUserList$(current_project_id)),
                    tap((res) => {
                        console.log('当前用户信息列表：', res);
                    }),
                    // 加载分享列表
                    switchMap(() =>
                        getShareList(current_project_id).pipe(
                            tap((shareList) => {
                                global$.next({
                                    action: 'RELOAD_SHARE_LIST',
                                });
                                // console.log('分享列表加载完成', shareList);
                            })
                        )
                    ),
                    // 加载测试列表 包括测试报告
                    switchMap(() => {
                        getSingleTestList(current_project_id);
                        getCombinedTestList(current_project_id);
                        return of(getReportList(current_project_id));
                    }),
                    tap((d) => handleInitProjectFinish(current_project_id)),
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

        return () => {
            webSocket2.close();
        };
    }, []);
};

export default useProject;

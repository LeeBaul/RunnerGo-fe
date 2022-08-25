import React, { useState, useEffect } from 'react';
import './index.less';
import Info from './info';
import RunningPlan from './runningPlan';
import HandleLog from './handleLog';
import RecentReport from './recentReport';
import AsyncData from '@modals/asyncData';
import { fetchDashBoardInfo } from '@services/dashboard';
import { tap, map } from 'rxjs';
import { useDispatch, useSelector } from 'react-redux';
import { cloneDeep } from 'lodash';
import { global$ } from '@hooks/useGlobal/global';

const IndexPage = () => {
    const [showAsync, setShowAsync] = useState(false);
    // 计划数/场景数/报告数/接口数
    const [info, setInfo] = useState({});
    // 当前用户的基本信息
    const [user, setUser] = useState({});
    // 操作日志
    // const [logList, setLogList] = useState([]);
    const userInfo = useSelector((store) => store.user.userInfo);
    const dispatch = useDispatch();
    const userData = useSelector((store) => store.dashboard.userData);
    const logList = useSelector((store) => store.teams.logList);

    // useEffect(() => {
    //     global$.next({
    //         action: 'GET_MEMBERLIST',
    //     });
    // }, []);

    // useEffect(() => {
    //     console.log('window.team_id', window.team_id)
    //     fetchDashBoardInfo({
    //         team_id: window.team_id
    //     })
    //         .pipe(
    //             tap((resp) => {
    //                 const { data, code } = resp;
    //                 if (code === 0) {
    //                     const { api_num, plan_num, report_num, scene_num, user, operations } = data;
    //                     setInfo({
    //                         api_num,
    //                         plan_num,
    //                         report_num,
    //                         scene_num
    //                     });
    //                     setUser(user);
    //                     setLogList(operations);
    //                     console.log('IndexPage', userInfo);
    //                     const newInfo = cloneDeep(userInfo);
    //                     newInfo.email = user.email;
    //                     newInfo.nickname = user.nickname;
    //                     newInfo.avatar = user.avatar;
    //                     newInfo.user_id = user.user_id;
    //                     newInfo.role_id = user.role_id;
                        
    //                     dispatch({
    //                         type: 'user/updateUserInfo',
    //                         payload: newInfo
    //                     })
    //                     console.log(userInfo, user, newInfo);
    //                 }
    //             })
    //         )
    //         .subscribe();

    // }, []);



    // fetch('https://kpmanage.apipost.cn/management/api/v1/dashboard/default').then((res) => {
    //     console.log(res);
    // })

    const handleShowAsync = (bool) => {
        setShowAsync(bool);
    }
    return (
        <div className='index-page'>
            <AsyncData showAsync={showAsync} handleShowAsync={handleShowAsync} />
            <div className='index-top'>
                <Info data={userData} user={userInfo} />
                <RunningPlan />
                <HandleLog logList={logList} />
            </div>
            <div className='index-bottom'>
                <RecentReport />
            </div>
        </div>
    )
};

export default IndexPage;
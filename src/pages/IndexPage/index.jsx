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
    const [log, setLog] = useState([]);
    const dispatch = useDispatch();
    // 操作日志
    const userInfo = useSelector((store) => store.user.userInfo);

    useEffect(() => {
        fetchDashBoardInfo({
            team_id: parseInt(localStorage.getItem('team_id'))
        }).subscribe({
            next: (res) => {
                const { data: { user, api_num, plan_num, report_num, scene_num, operations } } = res;
                setUser(user);
                setInfo({ api_num, scene_num, plan_num, report_num });
                setLog(operations);
            }
        })
    }, [userInfo]);



    const handleShowAsync = (bool) => {
        setShowAsync(bool);
    }
    return (
        <div className='index-page'>
            <AsyncData showAsync={showAsync} handleShowAsync={handleShowAsync} />
            <div className='index-top'>
                <Info data={info} user={user} />
                <RunningPlan />
                <HandleLog logList={log} />
            </div>
            <div className='index-bottom'>
                <RecentReport />
            </div>
        </div>
    )
};

export default IndexPage;
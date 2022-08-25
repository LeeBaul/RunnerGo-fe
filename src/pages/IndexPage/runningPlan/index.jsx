import React, { useEffect, useState } from 'react';
import './index.less';
import { Right as SvgRight } from 'adesign-react/icons';
import { useNavigate } from 'react-router-dom';
import { fetchRunningPlan } from '@services/dashboard';
import { tap } from 'rxjs';
import { useDispatch, useSelector } from 'react-redux';

const RunningPlan = () => {
    const navigate = useNavigate();
    const planData = useSelector((store) => store.plan.planData);
    const [planList, setPlanList] = useState(planData);

    const dispatch = useDispatch();

    useEffect(() => {
 
        let timer = null;
        const loopFetch = () => {
            const params = {
                team_id: sessionStorage.getItem('team_id'),
                page: 1,
                size: 5
            };
            fetchRunningPlan(params)
                .pipe(
                    tap((res) => {
                        const { code, data } = res;
                        if (code === 0) {
                            const { plans } = data;
                            dispatch({
                                type: 'plan/updatePlanData',
                                payload: plans
                            })
                            setPlanList(plans);
                            if (plans.length === 0) {
                                clearInterval(timer);
                            }
                        }
                    })
                ).subscribe();
        };
        timer = setInterval(() => {
            loopFetch();
        },  5000);

        return () => {
            clearInterval(timer);
        }
    }, []);

    return (
        <div className='running-plan'>
            <div className='running-top'>
                <div className='running-top-left'>
                    运行中
                </div>
                <div className='running-top-right' onClick={() => navigate('/plan')}>
                    查看更多
                    <SvgRight />
                </div>
            </div>
            <div className='running-bottom'>
                {
                    planList.length ?  planList.map((item, index) => (
                        <div className='plan-detail' key={item.plan_id}>
                            <p>运行中</p>
                            <div className='progress'>
                                {/* <div className='item' style={{left: '0%', animationDuration: '5s'}}></div>
                                <div className='item' style={{left: '10%', animationDuration: '4.5s', animationDelay: '0.5s'}}></div>
                                <div className='item' style={{left: '20%', animationDuration: '4s', animationDelay: '1s'}}></div>
                                <div className='item' style={{left: '30%', animationDuration: '3.5s', animationDelay: '1.5s'}}></div>
                                <div className='item' style={{left: '40%', animationDuration: '3s', animationDelay: '2s'}}></div>
                                <div className='item' style={{left: '50%', animationDuration: '2.5s', animationDelay: '2.5s'}}></div>
                                <div className='item' style={{left: '60%', animationDuration: '2s', animationDelay: '3s'}}></div>
                                <div className='item' style={{left: '70%', animationDuration: '1.5s', animationDelay: '3.5s'}}></div>
                                <div className='item' style={{left: '80%', animationDuration: '1s', animationDelay: '4s'}}></div>
                                <div className='item' style={{left: '90%', animationDuration: '0.5s', animationDelay: '4.5s'}}></div> */}
                            </div>
                            <p>查看详情</p>
                        </div>
                    ))
                    : <p className='empty'>还没有运行中</p>
                }
            </div>
        </div>
    )
};

export default RunningPlan;
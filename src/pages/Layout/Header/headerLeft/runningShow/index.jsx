import React, { useState, useEffect } from 'react';
import './index.less';
import { useSelector, useDispatch } from 'react-redux';
import cn from 'classnames';
import { fetchRunningPlan } from '@services/dashboard';
import { isArray } from 'lodash';
import { tap } from 'rxjs';

const RunningShow = () => {
    // const planData = useSelector((store) => store.plan.planData);
    const [planLength, setPlanLength] = useState(0);
    const dispatch = useDispatch();
    const renderColor = () => {
        const arr = new Array(10).fill(0);
        // if (!isArray(planData)) return;
        return arr.map((item, index) => <p className={ cn({ 'running': index < planLength }) } key={index}></p>)
    };
    useEffect(() => {

        let timer = null;
        const loopFetch = () => {
            const params = {
                team_id: localStorage.getItem('team_id'),
                page: 1,
                size: 5
            };
            fetchRunningPlan(params)
                .pipe(
                    tap((res) => {
                        const { code, data } = res;
                        if (code === 0) {
                            const { plans, total } = data;
                            dispatch({
                                type: 'plan/updatePlanData',
                                payload: plans
                            })
                            // setPlanList(plans);
                            setPlanLength(total);
                            // if (plans.length === 0) {
                            //     clearInterval(timer);
                            // }
                        }
                    })
                ).subscribe();
        };
        loopFetch();
        timer = setInterval(() => {
            loopFetch();
        }, 3000);

        return () => {
            clearInterval(timer);
        }
    }, []);
    return (
        <div className='running-show'>
            <div className='color-show'>
                { renderColor() }
            </div>
            <div className='number-show'>运行中 （{planLength}）</div>
        </div>
    );
};

export default RunningShow;
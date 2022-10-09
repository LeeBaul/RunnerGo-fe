import React, { useEffect, useState } from 'react';
import './index.less';
import { Tooltip } from 'adesign-react';
import { Right as SvgRight, CaretRight as SvgCaretRight } from 'adesign-react/icons';
import { useNavigate } from 'react-router-dom';
import { tap } from 'rxjs';
import { useDispatch, useSelector } from 'react-redux';
import { isArray } from 'lodash';
import SvgEmpty from '@assets/img/empty';
import { useTranslation } from 'react-i18next';

const RunningPlan = () => {
    const navigate = useNavigate();
    const planData = useSelector((store) => store.plan.planData);

    const [planList, setPlanList] = useState(isArray(planData) ? planData : []);

    const dispatch = useDispatch();
    const { t } = useTranslation();

    useEffect(() => {
        setPlanList(planData || []);
    }, [planData]);

    console.log(planData);

    // useEffect(() => {

    //     let timer = null;
    //     const loopFetch = () => {
    //         const params = {
    //             team_id: localStorage.getItem('team_id'),
    //             page: 1,
    //             size: 5
    //         };
    //         fetchRunningPlan(params)
    //             .pipe(
    //                 tap((res) => {
    //                     const { code, data } = res;
    //                     if (code === 0) {
    //                         const { plans } = data;
    //                         dispatch({
    //                             type: 'plan/updatePlanData',
    //                             payload: plans
    //                         })
    //                         setPlanList(plans);
    //                         if (plans.length === 0) {
    //                             clearInterval(timer);
    //                         }
    //                     }
    //                 })
    //             ).subscribe();
    //     };
    //     timer = setInterval(() => {
    //         loopFetch();
    //     }, 5000);

    //     return () => {
    //         clearInterval(timer);
    //     }
    // }, []);

    return (
        <div className='running-plan'>
            <div className='running-top'>
                <div className='running-top-left'>
                    { t('index.running') }
                    <div className='running-icon'>
                        <SvgCaretRight />
                    </div>
                </div>
                <div className='running-top-right' onClick={() => navigate('/plan')}>
                    { t('index.seeMore') }
                    <SvgRight />
                </div>
            </div>
            <div className='running-bottom'>
                {

                    planList.length ? planList.map((item, index) => (
                        <div className='plan-detail' key={item.plan_id}>
                            <Tooltip content={ item.name }>
                                <p className='plan-name'>{ item.name }</p>
                            </Tooltip>
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
                            <p className='to-detail' onClick={() => navigate(`/plan/detail/${item.plan_id}`)}>{ t('index.seeDetail') }</p>
                        </div>
                    ))
                        : <div className='empty'>
                            <SvgEmpty />
                            <p>{ t('index.emptyData') }</p>
                          </div>
                }
            </div>
        </div>
    )
};

export default RunningPlan;
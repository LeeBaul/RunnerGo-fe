import React from 'react';
import './index.less';
import avatar from '@assets/logo/avatar.png';
import { Apis as SvgApis } from 'adesign-react/icons';
import SvgPlan from '@assets/icons/Plan1';
import SvgScene from '@assets/icons/Scene1';
import SvgReport from '@assets/icons/Report1';


const Info = (props) => {
    const { data, user } = props;
 
    const taskList = [
        {
            number: data.plan_num,
            icon: SvgPlan,
            name: '计划数',
            color: '#3A86FF',
        },
        {
            number: data.scene_num,
            icon: SvgScene,
            name: '场景数',
            color: '#2BA58F',
        },
        {
            number: data.report_num,
            icon: SvgReport,
            name: '报告数',
            color: '#E1A022',
        },
        {
            number: data.api_num,
            icon: SvgApis,
            name: '接口数',
            color: '#00ACD7',
        },
    ];
    return (
        <div className='info'>
            <div className='user-info'>
                <img src={user.avatar || avatar} alt="" />
                <div className='info-detail'>
                    <p className='name'>{ user.nickname }</p>
                    <p className='email'>{ user.email }</p>
                </div>
            </div>
            <div className='task-info'>
                {
                    taskList.map((item, index) => (
                        <>
                            <div className='task-detail' key={index}>
                                <p className='task-number' style={{ color: item.color }}>{ item.number }</p>
                                <div className='task-name'>
                                    <item.icon />
                                    <span>{ item.name }</span>
                                </div>
                            </div>
                            { index !== taskList.length - 1 && <span className='line'></span> }
                        </>
                    ))
                }
            </div>
        </div>
    )
};

export default Info;
import React from 'react';
import './index.less';
import avatar from '@assets/logo/avatar.png';
import { Apis as SvgApis } from 'adesign-react/icons';

const Info = (props) => {
    const { data, user } = props;
    // console.log('Info', data);
    const taskList = [
        {
            number: data.plan_num,
            icon: SvgApis,
            name: '计划数',
            color: '#3A86FF',
        },
        {
            number: data.scene_num,
            icon: SvgApis,
            name: '场景数',
            color: '#2BA58F',
        },
        {
            number: data.report_num,
            icon: SvgApis,
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
                        <div className='task-detail' key={index}>
                            <p className='task-number' style={{ color: item.color }}>{ item.number }</p>
                            <div className='task-name'>
                                <item.icon />
                                <span>{ item.name }</span>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
};

export default Info;
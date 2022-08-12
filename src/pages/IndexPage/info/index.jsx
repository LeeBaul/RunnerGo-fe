import React from 'react';
import './index.less';
import avatar from '@assets/logo/avatar.png';
import { Apis as SvgApis } from 'adesign-react/icons';

const Info = () => {
    const taskList = [
        {
            number: 994,
            icon: SvgApis,
            name: '报告数',
            color: '#3A86FF',
        },
        {
            number: 2455,
            icon: SvgApis,
            name: '场景数',
            color: '#2BA58F',
        },
        {
            number: 114,
            icon: SvgApis,
            name: '报告数',
            color: '#E1A022',
        },
        {
            number: 9644,
            icon: SvgApis,
            name: '接口数',
            color: '#00ACD7',
        },
    ];
    return (
        <div className='info'>
            <div className='user-info'>
                <img src={avatar} alt="" />
                <div className='info-detail'>
                    <p className='name'>哎呀思</p>
                    <p className='email'>aiyasi.@163.com</p>
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
import React, { useState } from 'react';
import './index.less';
import { Apis as SvgApis, Right as SvgRight } from 'adesign-react/icons';
import avatar from '@assets/logo/avatar.png';
import HandleTag from '@components/HandleTag';
import TeamworkLogs from '@modals/TeamworkLogs';

const HandleLog = () => {
    const [showLog, setShowLog] = useState(false);

    const logList = [
        {
            avatarUrl: avatar,
            nickname: '哎呀思',
            content: '接口-登录接口 副本',
            time: '2022-01-09 17:34:00',
            type: 'create'
        },
        {
            avatarUrl: avatar,
            nickname: '哎呀思',
            content: '接口-登录接口 副本',
            time: '2022-01-09 17:34:00',
            type: 'update'
        },
        {
            avatarUrl: avatar,
            nickname: '哎呀思',
            content: '接口-登录接口 副本',
            time: '2022-01-09 17:34:00',
            type: 'delete'
        },
        {
            avatarUrl: avatar,
            nickname: '哎呀思',
            content: '接口-登录接口 副本',
            time: '2022-01-09 17:34:00',
            type: 'run'
        },
        {
            avatarUrl: avatar,
            nickname: '哎呀思',
            content: '接口-登录接口 副本',
            time: '2022-01-09 17:34:00',
            type: 'run'
        },
        {
            avatarUrl: avatar,
            nickname: '哎呀思',
            content: '接口-登录接口 副本',
            time: '2022-01-09 17:34:00',
            type: 'update'
        }
    ];
    return (
        <div className='handle-log'>
            <div className='log-top'>
                <div className='log-top-left'>
                    <SvgApis />
                    <p>操作日志</p>
                </div>
                <div className='log-top-right' onClick={() => setShowLog(true)}>
                    <p>查看更多</p>
                    <SvgRight />
                </div>
            </div>
            <div className='log-bottom'>
                {
                    logList.map((item, index) => (
                        <div className='log-item' key={index}>
                            <div className='log-item-left'>
                                <img src={item.avatarUrl} alt="" />
                                <p>{item.nickname}</p>
                            </div>
                            <div className='log-item-mid'>
                                <HandleTag type={item.type} />
                                <p>{item.content}</p>
                            </div>
                            <div className='log-item-right'>
                                {item.time}
                            </div>
                        </div>
                    ))
                }
            </div>
            { showLog &&  <TeamworkLogs onCancel={() => setShowLog(false)} />}
        </div>
    )
};

export default HandleLog;
import React, { useState } from 'react';
import './index.less';
import { Apis as SvgApis, Right as SvgRight } from 'adesign-react/icons';
import avatar from '@assets/logo/avatar.png';
import HandleTag from '@components/HandleTag';
import TeamworkLogs from '@modals/TeamworkLogs';
import dayjs from 'dayjs';

const HandleLog = (props) => {
    const { logList } = props;
    const [showLog, setShowLog] = useState(false);

    console.log(logList);

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
                    logList && logList.map((item, index) => (
                        <div className='log-item' key={index}>
                            <div className='log-item-left'>
                                <img src={item.avatarUrl || avatar} alt="" />
                                <p>{item.user_name}</p>
                            </div>
                            <div className='log-item-mid'>
                                {/* <HandleTag type={item.type} /> */}
                                <p>{item.name}</p>
                            </div>
                            <div className='log-item-right'>
                                {dayjs(item.created_time_sec * 1000).format('YYYY-MM-DD hh:mm:ss')}
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
import React, { useRef, useState } from 'react';
import './index.less';
import avatar from '@assets/logo/avatar.png';
import { Button, Dropdown, Message } from 'adesign-react';
import { Down as SvgDown } from 'adesign-react/icons';
import dayjs from 'dayjs';
import { fetchSetDebug } from '@services/report';
import { useParams } from 'react-router-dom';

const ReportExecutor = (props) => {
    const { data: { user_avatar, user_name, created_time_sec }, onStop, status } = props;
    const DropRef = useRef(null);
    const [debugName, setDebugName] = useState('关闭debug模式');
    const [stop, setStop] = useState(false);
    const { id: report_id } = useParams();
    
    const DropContent = () => {
        const list = ['关闭debug模式', 'debug模式: 全部日志', 'debug模式: 仅错误日志', 'debug模式: 仅成功日志'];
        return (
            <div className='drop-debug'>
                { list.map(item => <p onClick={() => {
                    setDebugName(item);
                    const itemList = {
                        '关闭debug模式': 'stop',
                        'debug模式: 全部日志': 'all',
                        'debug模式: 仅错误日志': 'only_error',
                        'debug模式: 仅成功日志': 'only_success',
                    };
                    DropRef.current.setPopupVisible(false);
                    const params = {
                        team_id: parseInt(localStorage.getItem('team_id')),
                        report_id: parseInt(report_id),
                        setting: itemList[item]
                    };
                    fetchSetDebug(params).subscribe({
                        next: (res) => {
                            const { code } = res;
                            if (code === 0) {
                                Message('success', '设置成功!');
                                onStop(itemList[item]);
                            } else {
                                Message('error', '设置失败!');
                            }
                        }
                    })
                }}>{ item }</p>) }
            </div>
        )
    }
    console.log(status);
    return (
        <div className='report-executor'>
            <p>执行者:</p>
            <div className='executor-info'>
                <img src={user_avatar || avatar} />
                <p>{ user_name }</p>
            </div>
            <p className='create-time'>创建时间: { dayjs(created_time_sec * 1000).format('YYYY-MM-DD HH:mm:ss') }</p>
            {/* <p className='last-time'>最后修改时间: 2022-12-22 03:22</p> */}
            <p className='run-time'>执行时长: 300s</p>
            <Dropdown
                ref={DropRef}
                content={
                    <div>
                        <DropContent />
                    </div>
                }
            >
                <Button className='close-debug' afterFix={<SvgDown />} type='primary' disabled={status === 2}>{ debugName }</Button>
            </Dropdown>
        </div>
    )
};

export default ReportExecutor;
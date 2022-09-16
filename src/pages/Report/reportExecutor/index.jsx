import React, { useRef, useState } from 'react';
import './index.less';
import avatar from '@assets/logo/avatar.png';
import { Button, Dropdown } from 'adesign-react';
import { Down as SvgDown } from 'adesign-react/icons';

const ReportExecutor = () => {
    const DropRef = useRef(null);
    const [debugName, setDebugName] = useState('关闭debug模式');
    const DropContent = () => {
        const list = ['关闭debug模式', 'debug模式: 全部日志', 'debug模式: 仅错误日志', 'debug模式: 仅成功日志'];
        return (
            <div className='drop-debug'>
                { list.map(item => <p onClick={() => {
                    setDebugName(item);
                    DropRef.current.setPopupVisible(false);
                }}>{ item }</p>) }
            </div>
        )
    }
    return (
        <div className='report-executor'>
            <p>执行者:</p>
            <div className='executor-info'>
                <img src={avatar} />
                <p>哎呀思</p>
            </div>
            <p className='create-time'>创建时间: 2022-12-22 02:22</p>
            <p className='last-time'>最后修改时间: 2022-12-22 03:22</p>
            <p className='run-time'>执行时长: 300s</p>
            <Dropdown
                ref={DropRef}
                content={
                    <div>
                        <DropContent />
                    </div>
                }
            >
                <Button className='close-debug' afterFix={<SvgDown />} type='primary'>{ debugName }</Button>
            </Dropdown>
        </div>
    )
};

export default ReportExecutor;
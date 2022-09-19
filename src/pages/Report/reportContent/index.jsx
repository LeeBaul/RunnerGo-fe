import React, { useEffect, useState } from 'react';
import './index.less';
import ReportHeader from '../reportHeader';
import ReportExecutor from '../reportExecutor';
import ReportDetail from '../reportDetail';
import { Tabs as TabList } from 'adesign-react';
import { TabStyle } from './style';

const { Tabs, TabPan } = TabList;

const ReportContent = () => {

    const defaultList = [
        { id: '1', title: '新建标题1', content: <ReportDetail /> },
        { id: '2', title: '新建标题2', content: '新建内容2' },
        { id: '3', title: '新建标题3', content: '新建内容3' },
    ];
    return (
        <div className='report'>
            <ReportHeader />
            <ReportExecutor />
            <Tabs type="card" className={TabStyle} defaultActiveId="1">
                {defaultList.map((d) => (
                    <TabPan key={d.id} id={d.id} title={d.title}>
                        {d.content}
                    </TabPan>
                ))}
            </Tabs>
        </div>
    )
};

export default ReportContent;
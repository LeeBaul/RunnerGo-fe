import React from 'react';
import { Tabs as TabComponent } from 'adesign-react';
import { TabStyle } from './style';
import ReportContent from './reportContent';
import DebugLog from './debugLog';
import PressMonitor from './pressMonitor';

const { Tabs, TabPan } = TabComponent;

const ReportDetail = () => {
    const defaultList = [
        { id: '1', title: '测试详情页', content: <ReportContent />  },
        { id: '2', title: 'debug日志', content: <DebugLog />},
        { id: '3', title: '压力机监控', content: <PressMonitor /> },
        { id: '4', title: '被服务器监控', content: '被服务器监控' }
    ];

    return (
        <div>
            <Tabs className={TabStyle} defaultActiveId="1">
                {defaultList.map((d) => (
                    <TabPan key={d.id} id={d.id} title={d.title}>
                        {d.content}
                    </TabPan>
                ))}
            </Tabs>
        </div>
    )
};

export default ReportDetail;
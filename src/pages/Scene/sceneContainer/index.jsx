import React, { useState } from 'react';
import './index.less';
import { Drawer, Button } from 'adesign-react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import SceneBox from './sceneBox';
import ApiManage from '@pages/ApisWarper/modules/ApiManage';

const SceneContainer = () => {
    const [showDrawer, setDrawer] = useState(false);
    const [showConfig, setConfig] = useState(true);

    const DrawerHeader = () => {
        return (
            <div className='drawer-header'>
                <p>获取位置信息接口</p>
                <Button>保存</Button>
            </div>
        )
    }

    return (
        <div className='scene-container'>
            <DndProvider backend={HTML5Backend}>
                <SceneBox />
            </DndProvider>
            <Drawer
                visible={showDrawer}
                title={<DrawerHeader />}
                onCancel={() => setDrawer(false)}
                footer={null}
            >
                <ApiManage showInfo={false} />
            </Drawer>
            SceneContainer
        </div>
    )
};

export default SceneContainer;
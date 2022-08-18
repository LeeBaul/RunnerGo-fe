import React, { useState } from 'react';
import './index.less';
import { Drawer, Button } from 'adesign-react';
import ApiManage from '@pages/ApisWarper/modules/ApiManage';

const SceneContainer = () => {
    const [showDrawer, setDrawer] = useState(false);

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
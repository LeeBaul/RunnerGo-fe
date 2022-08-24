import React, { useState } from 'react';
import './index.less';
import { Delete as SvgDelete } from 'adesign-react/icons';
import Recycle from '@modals/recycle';

const RecycleBin = () => {
    const [showRecycle, setShowRecycle] = useState(false);
    return (
        <div className='recycle-bin' onClick={() => setShowRecycle(true)}>
            <SvgDelete />
            <span>回收站</span>
            { showRecycle && <Recycle onCancel={() => setShowRecycle(false)} /> }
        </div>
    )
};

export default RecycleBin;
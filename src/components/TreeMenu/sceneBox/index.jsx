import React, { useState } from 'react';
import './index.less';
import { Apis as SvgApis, NewFolder as SvgNewFolder, Download as SvgDownload } from 'adesign-react/icons';
import SvgScene from '@assets/icons/Scene1';
import CreateGroup from '@modals/CreateGroup';
import CreateScene from '@modals/CreateScene';
import { useTranslation } from 'react-i18next';

const SceneBox = (props) => {
    const { from, onChange } = props;
    const { t, i18n } = useTranslation();
    const [showCreateGroup, setCreateGroup] = useState(false);
    const [showCreateScene, setCreateScene] = useState(false);

    return (
        <div className='scene-box' style={{ justifyContent: from === 'plan' ? 'space-between' : 'flex-start' }}>
            <div className='scene-box-item' onClick={() => setCreateGroup(true)}>
                <SvgNewFolder width="18" height="18" />
                <p>{from !== 'plan' ? t('scene.new') : ''}{t('scene.group')}</p>
                <div className='line' style={{ margin: from === 'plan' ? (i18n.language === 'cn' ? '0 25px' : '0 8px'): '0 24px' }}></div>
            </div>
            <div className='scene-box-item' onClick={() => setCreateScene(true)}>
                <SvgScene width="18" height="18" />
                <p>{t('scene.createScene')}</p>
            </div>
            {
                from === 'plan' &&
                <>

                    <div className='scene-box-item' onClick={() => onChange(true)}>
                        <div className='line' style={{ margin: from === 'plan' ? (i18n.language === 'cn' ? '0 25px' : '0 8px') : '0 14px' }}></div>
                        <SvgDownload width="18" height="18" />
                        <p>{t('plan.importScene')}</p>
                    </div>
                </>
            }

            {showCreateGroup && <CreateGroup from={from} onCancel={() => setCreateGroup(false)} />}
            {showCreateScene && <CreateScene from={from} onCancel={() => setCreateScene(false)} />}
        </div>
    )
};

export default SceneBox;
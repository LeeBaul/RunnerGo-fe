import React from "react";
import './index.less';
import { Modal, Button } from 'adesign-react';
import { useTranslation } from 'react-i18next';
import SvgClose from '@assets/icons/Cancel1';

const CreatePreset = () => {
    const { t } = useTranslation();

    return (
        <div>
            <Modal
                className="create-preset"
                title={null}
                okText={ t('btn.save') }
                cancelText={ t('btn.close') }
            >
                <div className="top">
                    <p className="top-left">{ t('leftBar.preset') }</p>
                    <Button className='top-right'><SvgClose /></Button>
                </div>
            </Modal>
        </div>
    )
};

export default CreatePreset;
import React, { useState } from "react";
import { Modal, Input, Message } from 'adesign-react';
import { fetchCreateTeam } from '@services/user';
import './index.less';
import { useTranslation } from 'react-i18next';

const CreateTeam = (props) => {
    const { onCancel } = props;
    const [teamName, setTeamName] = useState('');
    const { t } = useTranslation();

    const createTeam = () => {
        if (teamName.trim().length < 1) {
            Message('error', t('message.noTeamName'));
            return;
        }
        const params = {
            name: teamName,
        };
        fetchCreateTeam(params).subscribe({
            next: (res) => {
                const { code } = res;
                
                if (code === 0) {
                    Message('success', t('message.createSuccess'));
                    onCancel(true);
                } else {
                    Message('error', t('message.createError'));
                }
            }
        })
    }
    return (
        <>
            <Modal
              title={ t('modal.createTeam') }
              cancelText={ t('btn.cancel') }
              okText={ t('btn.ok') }
              visible={true}
              onCancel={onCancel}c
              className='create-team-modal'
              onOk={() => createTeam()}
            >
                <Input value={teamName} placeholder={ t('placeholder.teamName') } onChange={(e) => setTeamName(e)} />
            </Modal>
        </>
    )
};

export default CreateTeam;
import React, { useState } from "react";
import { Modal, Input, Message } from 'adesign-react';
import { fetchCreateTeam, fetchUpdateConfig } from '@services/user';
import './index.less';
import { useTranslation } from 'react-i18next';
import { global$ } from '@hooks/useGlobal/global';
import { useDispatch } from 'react-redux';

const CreateTeam = (props) => {
    const { onCancel } = props;
    const [teamName, setTeamName] = useState('');
    const { t } = useTranslation();
    const dispatch = useDispatch();

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
                const { code, data } = res;

                if (code === 0) {
                    const { team_id } = data;
                    const settings = JSON.parse(localStorage.getItem('settings'));
                    settings.settings.current_team_id = team_id;
                    localStorage.setItem('settings', settings);
                    fetchUpdateConfig(settings).subscribe({
                        next: (res) => {
                            const { code } = res;
                            if (code === 0) {
                                localStorage.setItem('team_id', team_id);
                                localStorage.removeItem('open_scene');
                                dispatch({
                                    type: 'opens/coverOpenApis',
                                    payload: {},
                                })
                                dispatch({
                                    type: 'scene/updateOpenScene',
                                    payload: null,
                                })
                                global$.next({
                                    action: 'INIT_APPLICATION',
                                });
                                navigate('/index');
                            } else {
                                Message('error', t('moidal.checkTeamError'));
                            }
                        },
                        err: (err) => {

                        }
                    })
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
                title={t('modal.createTeam')}
                cancelText={t('btn.cancel')}
                okText={t('btn.ok')}
                visible={true}
                onCancel={onCancel} c
                className='create-team-modal'
                onOk={() => createTeam()}
            >
                <Input value={teamName} placeholder={t('placeholder.teamName')} onChange={(e) => setTeamName(e)} />
            </Modal>
        </>
    )
};

export default CreateTeam;
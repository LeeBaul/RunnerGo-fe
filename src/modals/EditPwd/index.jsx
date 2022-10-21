import React, { useState } from 'react';
import { Modal, Input } from 'adesign-react';
import { useTranslation } from 'react-i18next';
import './index.less';
import { fetchUpdateName, fetchUpdatePwd, fetchCheckPassword } from '@services/user';

const EditPwd = (props) => {
    const { onCancel } = props;
    const { t } = useTranslation();
    const [oldPwd, setOldPwd] = useState('');
    const [newPwd, setNewPwd] = useState('');
    const [confirmPwd, setConfirmPwd] = useState('');
    const [pwdError, setPwdError] = useState(false);
    const [newPwdError, setNewPwdError] = useState(false);
    const [pwdDiff, setPwdDiff] = useState(false);
    const [cantUpdate, setCantUpdate] = useState(false);
    return (
        <Modal
            visible
            className='edit-pwd-modal'
            title={null}
            cancelText={t('btn.cancel')}
            okText={t('btn.ok')}
            onCancel={onCancel}
            onOk={() => {
                if (cantUpdate) {
                    return;
                }
                const params = {
                    current_password: oldPwd,
                    new_password: newPwd,
                    repeat_password: confirmPwd,
                }
                fetchUpdatePwd(params).subscribe({
                    next: (res) => {
                        const { code } = res;
                        if (code === 0) {
                            Message('success', t('message.updateSuccess'));
                        } else {
                            Message('error', t('message.updateError'))
                        }
                    }
                })
            }}
        >
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', width: '100%', height: '200px' }}>
                <p className='edit-pwd-title'>{t('modal.editPwd')}</p>
                <div style={{ marginBottom: '32px' }}>
                    <Input
                        placeholder={t('placeholder.currentPwd')}
                        style={{ width: '320px', height: '44px', border: '1px solid var(--bg-4)' }}
                        value={oldPwd}
                        onChange={(e) => {
                            setOldPwd(e);
                        }}
                        onBlur={(e) => {
                            console.log(e);
                            const params = {
                                password: e.target.value
                            };
                            console.log(params);
                            fetchCheckPassword(params).subscribe({
                                next: (res) => {
                                    const { data: { is_match } } = res;
                                    if (is_match) {
                                        setPwdError(false);
                                    } else {
                                        setPwdError(true);
                                        setCantUpdate(true);
                                    }
                                }
                            })
                        }}
                    />
                    {pwdError && <p className='input-error' style={{ color: '#f00', marginRight: 'auto' }}>{ t('modal.pwdError') }</p>}
                </div>
                <div style={{ marginBottom: '32px' }}>
                    <Input
                        placeholder={t('placeholder.newPwd')}
                        style={{ width: '320px', height: '44px', border: '1px solid var(--bg-4)' }}
                        value={newPwd}
                        onChange={(e) => {
                            setNewPwd(e);
                        }}
                        onBlur={(e) => {
                            if (e.target.value.length < 6) {
                                setNewPwdError(true);
                                setCantUpdate(true);
                            } else {
                                setNewPwdError(false);
                            }
                        }}
                    />
                    {newPwdError && <p className='input-error' style={{ color: '#f00', marginRight: 'auto' }}>{ t('modal.pwdLength') }</p>}
                </div>
                <div style={{ marginBottom: '32px' }}>
                    <Input
                        placeholder={t('placeholder.confirmPwd')}
                        style={{ width: '320px', height: '44px', border: '1px solid var(--bg-4)' }}
                        value={confirmPwd}
                        onChange={(e) => {
                            setConfirmPwd(e);
                        }}
                        onBlur={(e) => {
                            if (newPwd !== confirmPwd) {
                                setPwdDiff(true);
                                setCantUpdate(true);
                            } else {
                                setPwdDiff(false);
                            }
                        }}
                    />
                    {pwdDiff && <p className='input-error' style={{ color: '#f00', marginRight: 'auto' }}>{ t('modal.pwdDiff') }</p>}
                </div>
            </div>
        </Modal>
    )
};

export default EditPwd;
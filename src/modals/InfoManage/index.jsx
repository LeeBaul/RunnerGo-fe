import React, { useEffect, useState } from 'react';
import { Modal, Button, Input, Message } from 'adesign-react';
import { Left as SvgLeft, Edit as SvgEdit } from 'adesign-react/icons';
import LogoRight from '@assets/logo/info_right';
import './index.less';
import avatar from '@assets/logo/avatar.png'
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import EditAvatar from '../EditAvatar';
import { fetchUpdateName, fetchUpdatePwd } from '@services/user';

const InfoManage = (props) => {
    const { onCancel } = props;
    const userInfo = useSelector((store) => store.user.userInfo);
    const [nickName, setNickName] = useState('');
    const [oldPwd, setOldPwd] = useState('');
    const [newPwd, setNewPwd] = useState('');
    const [confirmPwd, setConfirmPwd] = useState('');
    const [showMask, setShowMask] = useState(false);

    const [showEditAvatar, setEditAvatar] = useState(false);

    const enter = () => {
        console.log(123);
        setShowMask(true);
    }

    const leave = () => {
        console.log(123);

        setShowMask(false);
    }

    useEffect(() => {
        const avatar_item = document.querySelector('.avatar-item');
        avatar_item.addEventListener('mouseenter', enter);
        avatar_item.addEventListener('mouseleave', leave);

        return () => {
            avatar_item.removeEventListener('mouseenter', enter);
            avatar_item.removeEventListener('mouseleave', leave);

        }
    }, []);

    const dispatch = useDispatch();
    useEffect(() => {
        setNickName(userInfo.nickname)
    }, [userInfo]);

    const { t } = useTranslation();
    const Header = () => {
        return (
            <div className='info-header'>
                <Button preFix={<SvgLeft/ >} className='return-btn' onClick={onCancel}>{ t('btn.return') }</Button>
                <LogoRight />
            </div>
        )
    }

    const editNickname = (userInfo) => {
        let nickname = '';
        Modal.confirm({
            title: t('modal.editName'),
            content: <Input value={nickName} onChange={(e) => {
                nickname = e;
                setNickName(e);
            }} />,
            cancelText: t('btn.cancel'),
            okText: t('btn.ok'),
            onOk: () => {
                const params = {
                    nickname: nickname ? nickname : nickName,   
                };
                fetchUpdateName(params).subscribe({
                    next: (res) => {
                        const { code } = res;
                        if (code === 0) {
                            dispatch({
                                type: 'user/updateUserInfo',
                                payload: {
                                    ...userInfo,
                                    nickname: nickname ? nickname : nickName,
                                }
                            })
                            if (nickname) {
                                Message('success', t('message.updateSuccess'));
                            }
                        } else {
                            Message('error', t('message.updateError'))
                        }
                    }
                })
            }
        })
    }

    const editPwd = () => {
        let current_password = '';
        let new_password = '';
        let repeat_password = '';
        Modal.confirm({
            title: t('modal.editPwd'),
            content: 
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', width: '100%', height: '160px' }}>
                <Input placeholder={ t('placeholder.currentPwd') } style={{ width: '320px', height: '44px', border: '1px solid var(--bg-4)' }} value={oldPwd} onChange={(e) => {
                    setOldPwd(e);
                    current_password = e;
                }} />
                <Input placeholder={ t('placeholder.newPwd') } style={{ width: '320px', height: '44px', border: '1px solid var(--bg-4)'}} value={newPwd} onChange={(e) => {
                    setNewPwd(e);
                    new_password = e;
                }} />
                <Input placeholder={ t('placeholder.confirmPwd') } style={{ width: '320px', height: '44px', border: '1px solid var(--bg-4)' }} value={confirmPwd} onChange={(e) => {
                    setConfirmPwd(e);
                    repeat_password = e;
                }} />
            </div>,
            cancelText: t('btn.cancel'),
            okText: t('btn.ok'),
            onOk: () => {
                if (new_password !== repeat_password) {
                    Message('error', t('message.pwdDiff'));
                    return;
                }
                const params = {
                    current_password,
                    new_password,
                    repeat_password,
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
                // deleteReport(report_id);
            }
        })
    }

    const editAvatar = () => {
        setEditAvatar(true);
    }
    return (
        <div className='info-manage'>
            <Modal
                className='info-modal'
                visible
                title={null}
                onCancel={onCancel}
                closable={false}
                footer={null}
            >
                <Header />
                <div className='info-container'>
                    <div className='info-container-left'>
                        <div className='avatar-item'  onClick={() => editAvatar()} >
                            { showMask && <div className='avatar-mask'>{ t('modal.updateAvatar') }</div> }
                            <img className='avatar' src={userInfo.avatar || avatar} />
                        </div>
                        <div className='name'>
                            <p>{userInfo.nickname}</p>
                            <SvgEdit onClick={() => editNickname(userInfo)} />
                        </div>
                    </div>
                    <div className='info-container-right'>
                        <div className='line'></div>
                        <div className='right-info'>
                            <div className='right-info-item'>
                                <p className='label'>{ t('sign.email') }</p>
                                <p className='value'>{ userInfo.email }</p>
                            </div>
                            <div className='right-info-item' style={{ marginTop: '48px' }}>
                                <p className='label'>{ t('sign.password') }</p>
                                <p className='value'>
                                    <span>********</span>
                                    <span className='edit' onClick={() => editPwd()}>
                                        { t('modal.edit') }
                                    </span>
                                </p>
                            </div>
                            <div className='line'></div>
                        </div>
                    </div>
                </div>
            </Modal>

            {
                showEditAvatar && <EditAvatar onCancel={() => setEditAvatar(false)} />
            }
        </div>
    )
};

export default InfoManage;
import React, { useEffect, useState } from 'react';
import { Modal, Button, Input, Message } from 'adesign-react';
import { Left as SvgLeft, Edit as SvgEdit } from 'adesign-react/icons';
import LogoRight from '@assets/logo/info_right';
import './index.less';
import avatar from '@assets/logo/avatar.png'
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import EditAvatar from '../EditAvatar';

const InfoManage = (props) => {
    const { onCancel } = props;
    const userInfo = useSelector((store) => store.user.userInfo);
    const [nickName, setNickName] = useState('');
    const [oldPwd, setOldPwd] = useState('');
    const [newPwd, setNewPwd] = useState('');
    const [confirmPwd, setConfirmPwd] = useState('');

    const [showEditAvatar, setEditAvatar] = useState(false);

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

    const editNickname = () => {
        Modal.confirm({
            title: t('modal.editName'),
            content: <Input value={nickName} onChange={(e) => setNickName(e)} />,
            cancelText: t('btn.cancel'),
            okText: t('btn.ok'),
            onOk: () => {
                // deleteReport(report_id);
            }
        })
    }

    const editPwd = () => {
        Modal.confirm({
            title: t('modal.editName'),
            content: 
            <>
                <Input value={oldPwd} onChange={(e) => setOldPwd(e)} />
                <Input value={newPwd} onChange={(e) => setNewPwd(e)} />
                <Input value={confirmPwd} onChange={(e) => setConfirmPwd(e)} />
            </>,
            cancelText: t('btn.cancel'),
            okText: t('btn.ok'),
            onOk: () => {
                if (newPwd !== confirmPwd) {
                    Message('error', t('message.pwdDiff'));
                    return;
                }
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
                        <img className='avatar' src={userInfo.avatar || avatar} onClick={() => editAvatar()} />
                        <div className='name'>
                            <p>{userInfo.nickname}</p>
                            <SvgEdit onClick={() => editNickname()} />
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
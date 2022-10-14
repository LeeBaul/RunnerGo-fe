import React, { useState } from 'react';
import { Modal } from 'adesign-react';
import { useSelector } from 'react-redux';
import avatar from '@assets/logo/avatar.png'
import { useTranslation } from 'react-i18next';
import './index.less';
import cn from 'classnames';

const EditAvatar = (props) => {
    const { onCancel } = props;
    const { t } = useTranslation();
    const [selectDefault, setSelectDefault] = useState(null);
    const userInfo = useSelector((store) => store.user.userInfo);
    const defaultAvatar = [
        "https://apipost.oss-cn-beijing.aliyuncs.com/kunpeng/avatar/default1.png",
        "https://apipost.oss-cn-beijing.aliyuncs.com/kunpeng/avatar/default2.png",
        "https://apipost.oss-cn-beijing.aliyuncs.com/kunpeng/avatar/default3.png",
        "https://apipost.oss-cn-beijing.aliyuncs.com/kunpeng/avatar/default4.png"
    ]
    return (
        <Modal
            className='edit-avatar-modal'
            visible
            title={null}
            onCancel={onCancel}
            cancelText={ t('btn.cancel') }
            okText={ t('btn.ok') }
        >
            <p className='title'>{ t('modal.defaultAvatar') }</p>
            <div className='default-avatar'>
                {
                    defaultAvatar.map((item, index) => (
                       <div className='avatar-body'>
                         <img className={ cn('default-avatar-item', {
                            'select-avatar': selectDefault === index
                         }) } key={index} src={item} onClick={() => setSelectDefault(index)} />
                       </div>
                    ))
                }
            </div>
            <p className='title' style={{ marginTop: '50px' }}>{ t('modal.diyAvatar') }</p>
            <img className='avatar' src={ userInfo.avatar ||  avatar} alt="" />
            <p className='avatar-tips'>{ t('modal.avatarTips') }</p>
        </Modal>
    )
};

export default EditAvatar;
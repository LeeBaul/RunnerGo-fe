import React, { useState, useEffect } from 'react';
import { Modal, Upload, Message } from 'adesign-react';
import { useSelector } from 'react-redux';
import avatar from '@assets/logo/avatar.png'
import { useTranslation } from 'react-i18next';
import './index.less';
import cn from 'classnames';
import { v4 } from 'uuid';
import OSS from 'ali-oss';
import { fetchUpdateAvatar } from '@services/user';

const EditAvatar = (props) => {
    const { onCancel } = props;
    const { t } = useTranslation();
    const [selectDefault, setSelectDefault] = useState(null);
    const [avatarNow, setAvatarNow] = useState('');
    const userInfo = useSelector((store) => store.user.userInfo);
    const defaultAvatar = [
        "https://apipost.oss-cn-beijing.aliyuncs.com/kunpeng/avatar/default1.png",
        "https://apipost.oss-cn-beijing.aliyuncs.com/kunpeng/avatar/default2.png",
        "https://apipost.oss-cn-beijing.aliyuncs.com/kunpeng/avatar/default3.png",
        "https://apipost.oss-cn-beijing.aliyuncs.com/kunpeng/avatar/default4.png"
    ];

    useEffect(() => {
        setAvatarNow(userInfo.avatar);
    }, [userInfo]);

    const diyAvatar = () => {

    };

    const uploadFile = async (files, fileLists) => {
        const fileMaxSize = 1024 * 3;
        const fileType = ['jpg', 'jpeg', 'png'];
        const { originFile: { size, name } } = files[0];
        const nameType = name.split('.')[1];

        if (size / 1024 > fileMaxSize) {
            Message('error', t('message.maxFileSize'));
            return;
        };
        if (!fileType.includes(nameType)) {
            Message('error', t('message.FileType'));
            return;
        }
        const ossConfig = {
            region: 'oss-cn-beijing',
            accessKeyId: 'LTAI5tEAzFMCX559VD8mRDoZ',
            accessKeySecret: '5IV7ZpVx95vBHZ3Y74jr9amaMtXpCQ',
            bucket: 'apipost',
        };
        const client = new OSS(ossConfig);
        const { name: res_name, url } = await client.put(
            `kunpeng/avatar/${v4()}.${nameType}`,
            files[0].originFile,
        )
        console.log(url);
        setAvatarNow(url);
    };

    const updateAvatar = () => {
        const params = {
            avatar_url: avatarNow,
        };
        fetchUpdateAvatar(params).subscribe({
            next: (res) => {
                const { code } = res;
                if (code === 0) {
                    Message('success', t('message.updateSuccess'));
                    onCancel();
                } else {
                    Message('error', t('message.updateError'))
                }
            }
        })
    };

    return (
        <Modal
            className='edit-avatar-modal'
            visible
            title={null}
            onCancel={onCancel}
            cancelText={ t('btn.cancel') }
            okText={ t('btn.ok') }
            onOk={() => updateAvatar()}
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
            <Upload showFilesList={false} onChange={(files, fileList) => uploadFile(files, fileList)}>
                <img className='avatar' src={ avatarNow ||  avatar} alt="" onClick={() => diyAvatar()} />
            </Upload>
            <p className='avatar-tips'>{ t('modal.avatarTips') }</p>
        </Modal>
    )
};

export default EditAvatar;
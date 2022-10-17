import React, { useState, useEffect } from 'react';
import { Input, Button, Message } from 'adesign-react';
import './index.less';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import getVcodefun from '@utils/getVcode';
import { EamilReg } from '@utils';
import cn from 'classnames';
import { fetchFindPassword } from '@services/user';

const FindPassword = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [email, setEmail] = useState('');
    // 极验验证码
    const [vcodeObj, setVcodeObj] = useState({});
    const [emailError, setEmailError] = useState(false);
    const [send, setSend] = useState(false);

    const getVcodeUrl = async () => {
        const { result, captcha } = await getVcodefun();
        setVcodeObj(result);
    };

    useEffect(() => {
        getVcodeUrl();
    }, []);

    const checkEmail = () => {
        if (!EamilReg(email)) {
            setEmailError(true);
        } else {
            setEmailError(false);
        }
    }


    const resetPwd = () => {
        if (Object.keys(vcodeObj).length === 0) {
            return Message('error', t('message.check'));
        }
        if (emailError) {
            return;
        }
        const params = {
            email,
        };
        fetchFindPassword(params).subscribe({
            next: (res) => {
                const { code } = res;
                setSend(true);
            }
        })
    }
    return (
        <div className={ cn('find-password', {
            'send-body': send
        }) }>
            {
                !send ?
                    <>
                        <div className='title'>{t('sign.findPwd')}</div>
                        <Input
                            className={cn('find-input', { 'input-error': emailError })}
                            placeholder={t('placeholder.email')}
                            value={email}
                            onChange={(value) => {
                                setEmail(value);
                            }}
                            onBlur={() => checkEmail()}
                        />
                        {emailError && <p className='error-tips'>{t('sign.errorEmail')}</p>}
                        <div id="captcha"></div>
                        <Button onClick={() => resetPwd()}>{t('sign.resetPwd')}</Button>
                        <div className='to-login' onClick={() => navigate('/login')}>{t('sign.findToLogin')} &gt; </div>
                    </>
                : <>
                   <p className='send-success'>{ t('sign.emailSuccess') }</p>
                   <div className='email-info'>
                        <p>{ t('sign.email') }: { email }</p>
                        <p>（{ t('sign.email_tips') }）</p>
                   </div>
                   <div className='send-again'>
                        <p>{ t('sign.send_again') }: </p>
                        <Button className='send-again-btn' onClick={() => {
                            setSend(false);
                            getVcodeUrl();
                        }}>{ t('btn.sendAgain') }</Button>
                   </div>
                </>
            }
        </div>
    )
};

export default FindPassword;
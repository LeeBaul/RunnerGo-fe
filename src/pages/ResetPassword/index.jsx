import React, { useState, useEffect } from 'react';
import { Input, Button, Message } from 'adesign-react';
import './index.less';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { fetchResetPassword } from '@services/user';
import { useLocation } from 'react-router-dom';
import qs from 'qs';

import cn from 'classnames';

const ResetPassword = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const { search } = useLocation();
    const { u } = qs.parse(search.slice(1));
    const [pwd, setPwd] = useState('');
    const [pwdError, setPwdError] = useState(false);
    const [confirmPwd, setConfirmPwd] = useState('');

    const [pwdDiff, setPwdDiff] = useState(false);

    const resetPwd = () => {
        if (pwdDiff || pwdError) {
            return;
        }

        const params = {
            u: parseInt(u),
            new_password: pwd,
            repeat_password: confirmPwd,
        };
        fetchResetPassword(params).subscribe({
            next: (res) => {
                const { code } = res;
                if (code === 0) {
                    Message('success', t('message.resetSuccess'));
                    navigate('/login');
                } else {
                    Message('error', t('message.resetError'));
                }
            }
        })

    }

    const checkPwd = () => {
        if (pwd !== confirmPwd) {
            setPwdDiff(true);
        } else {
            setPwdDiff(false);
        }
    }
    return (
        <div className="reset-password">
            <div className='title'>{t('sign.reset')}</div>
            <div>
                <Input
                    className="reset-input"
                    placeholder={t('placeholder.newPwd')}
                    value={pwd}
                    onChange={(value) => {
                        setPwd(value);
                    }}
                    onBlur={() => {
                        if (pwd.length < 6) {
                            setPwdError(true);
                        } else {
                            setPwdError(false);
                        }
                    }}
                />
                {pwdError && <p className='error-tips'>{t('sign.passwordError')}</p>}
            </div>
            <div>
                <Input
                    className={cn('reset-input', { 'input-error': pwdDiff })}
                    placeholder={t('placeholder.confirmPwd')}
                    value={confirmPwd}
                    onChange={(value) => {
                        setConfirmPwd(value);
                    }}
                    onBlur={() => checkPwd()}
                />
                {pwdDiff && <p className='error-tips'>{t('sign.confirmError')}</p>}
            </div>
            <Button onClick={() => resetPwd()}>{t('sign.reset')}</Button>
        </div>
    )
};

export default ResetPassword;
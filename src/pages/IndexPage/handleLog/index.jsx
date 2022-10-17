import React, { useState } from 'react';
import './index.less';
import { Apis as SvgApis, Right as SvgRight, Lately as SvgLately } from 'adesign-react/icons';
import avatar from '@assets/logo/avatar.png';
import HandleTags from '@components/HandleTags';
import TeamworkLogs from '@modals/TeamworkLogs';
import dayjs from 'dayjs';
import SvgEmpty from '@assets/img/empty';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

const HandleLog = (props) => {
    // const { logList } = props;
    const [showLog, setShowLog] = useState(false);
    const { t } = useTranslation();
    const logList = useSelector((store) => store.teams.logList);

    return (
        <div className='handle-log'>
            <div className='log-top'>
                <div className='log-top-left'>
                    <SvgLately />
                    <p>{t('index.handleLog')}</p>
                </div>
                <div className='log-top-right' onClick={() => setShowLog(true)}>
                    <p>{t('index.seeMore')}</p>
                    <SvgRight />
                </div>
            </div>
            <div className='log-bottom'>
                {
                    logList.length > 0 ? logList.map((item, index) => (
                        <div className='log-item' key={index}>
                            <div className='log-item-left'>
                                <img src={item.user_avatar || avatar} alt="" />
                                <p>{item.user_name}</p>
                            </div>
                            <div className='log-item-mid'>
                                <HandleTags type={item.category} />
                                <p>{item.name}</p>
                            </div>
                            <div className='log-item-right'>
                                {dayjs(item.created_time_sec * 1000).format('YYYY-MM-DD HH:mm:ss')}
                            </div>
                        </div>
                    )) : <div className='empty'>
                        <SvgEmpty />
                        <p>{t('index.emptyData')}</p>
                    </div>
                }
            </div>
            {showLog && <TeamworkLogs onCancel={() => setShowLog(false)} />}
        </div>
    )
};

export default HandleLog;
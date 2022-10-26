import React, { useState, useEffect } from 'react';
import './index.less';
import { Apis as SvgApis, Right as SvgRight, Lately as SvgLately } from 'adesign-react/icons';
import avatar from '@assets/logo/avatar.png';
import HandleTags from '@components/HandleTags';
import TeamworkLogs from '@modals/TeamworkLogs';
import dayjs from 'dayjs';
import SvgEmpty from '@assets/img/empty';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { fetchOperationLog } from '@services/dashboard';
import { tap } from 'rxjs';

const HandleLog = (props) => {
    // const { logList } = props;
    const [showLog, setShowLog] = useState(false);
    const { t } = useTranslation();
    const logList = useSelector((store) => store.teams.logList);
    const [list, setList] = useState([]);
    let index_log_list = null;

    useEffect(() => {
        setList(logList);
        index_log_list = setInterval(() => {
            getLogList();
        }, 1000);

        return () => {
            clearInterval(index_log_list);
        }
    }, [])

    const getLogList = () => {
        // const listener1 = () => {
        //   refTooltip?.current?.setPopupVisible(false);
        // };
    
        const query = {
          team_id: localStorage.getItem('team_id'),
          page: 1,
          size: 5
        }
    
        fetchOperationLog(query)
          .pipe(
            tap((res) => {
              const { code, data } = res;
    
              if (code === 0) {
                const { operations, total } = data;

                console.log(operations);
                setList(operations);
                // setList(list);
              }
            })
          )
          .subscribe();
    
      };

    // console.log(logList);

    const logType = {
        "1": t('index.logType.1'),
        "2": t('index.logType.2'),
        "3": t('index.logType.3'),
        "4": t('index.logType.4'),
        "5": t('index.logType.5'),
        "6": t('index.logType.6'),
        "7": t('index.logType.7'),
        "8": t('index.logType.8'),
        "9": t('index.logType.9'),
        "10": t('index.logType.10'),
        "11": t('index.logType.11'),
        "12": t('index.logType.12'),
        "13": t('index.logType.13'),
        "14": t('index.logType.14'),
        "15": t('index.logType.15'),
        "16": t('index.logType.16'),
    }

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
                    list.length > 0 ? list.map((item, index) => (
                        <div className='log-item' key={index}>
                            <div className='log-item-left'>
                                <img src={item.user_avatar || avatar} alt="" />
                                <p>{item.user_name}</p>
                            </div>
                            <div className='log-item-mid'>
                                <HandleTags type={item.category} />
                                <p>{logType[item.operate]} - {item.name}</p>
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
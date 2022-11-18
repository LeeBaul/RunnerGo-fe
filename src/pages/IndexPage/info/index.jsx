import React, { useEffect, useState } from 'react';
import './index.less';
import avatar from '@assets/logo/avatar.png';
import { Apis as SvgApis } from 'adesign-react/icons';
import SvgPlan from '@assets/icons/Plan1';
import SvgScene from '@assets/icons/Scene1';
import SvgReport from '@assets/icons/Report1';
import { useTranslation } from 'react-i18next';
import { cloneDeep } from 'lodash';


const Info = (props) => {
    const { data, user } = props;
    const { t } = useTranslation();
    const [taskList, setTaskList] = useState([]);
    const [plan, setPlan] = useState(0);
    const [scene, setScene] = useState(0);
    const [report, setReport] = useState(0);
    const [api, setApi] = useState(0);

    const addNumber = (start, end, index) => {
        let Interval = null;
        if (start < end) {
            Interval = setInterval(() => {
                start += 2;
                if (start > end) {
                    clearInterval(Interval);
                    console.log(end, index);
                    switch (index) {
                        case 0:
                            setPlan(end);
                            break;
                        case 1:
                            setScene(end);
                            break;
                        case 2:
                            setReport(end);
                            break;
                        case 3:
                            setApi(end);
                            break;
                        default:
                            break;
                    }
                } else {
                    console.log(start, index);
                    switch (index) {
                        case 0:
                            setPlan(start);
                            break;
                        case 1:
                            setScene(start);
                            break;
                        case 2:
                            setReport(start);
                            break;
                        case 3:
                            setApi(start);
                            break;
                        default:
                            break;
                    }
                }
            }, 10);
        } else if (start === end) {
            switch (index) {
                case 0:
                    setPlan(start);
                    break;
                case 1:
                    setScene(start);
                    break;
                case 2:
                    setReport(start);
                    break;
                case 3:
                    setApi(start);
                    break;
                default:
                    break;
            }
        }
    }

    const _taskList = [
        {
            number: 0,
            icon: SvgPlan,
            name: t('index.planNum'),
            color: 'var(--index-1)',
        },
        {
            number: 0,
            icon: SvgScene,
            name: t('index.sceneNum'),
            color: 'var(--index-2)',
        },
        {
            number: 0,
            icon: SvgReport,
            name: t('index.reportNum'),
            color: 'var(--index-3)',
        },
        {
            number: 0,
            icon: SvgApis,
            name: t('index.apiNum'),
            color: 'var(--index-4)',
        },
    ];

    useEffect(() => {
        setTaskList(_taskList);
        addNumber(0, data.plan_num, 0);
        addNumber(0, data.scene_num, 1);
        addNumber(0, data.report_num, 2);
        addNumber(0, data.api_num, 3);
    }, [data]);

    const dataList = {
        0: plan,
        1: scene,
        2: report,
        3: api
    };

    return (
        <div className='info'>
            <div className='user-info'>
                <img src={user.avatar || avatar} alt="" />
                <div className='info-detail'>
                    <p className='name'>{user.nickname}</p>
                    <p className='email'>{user.email}</p>
                </div>
            </div>
            <div className='task-info'>
                {
                    taskList.map((item, index) => (
                        <>
                            <div className='task-detail' key={index}>
                                <p className='task-number' style={{ color: item.color }}>{dataList[index]}</p>
                                <div className='task-name'>
                                    <item.icon />
                                    <span>{item.name}</span>
                                </div>
                            </div>
                            {index !== taskList.length - 1 && <span className='line'></span>}
                        </>
                    ))
                }
            </div>
        </div>
    )
};

export default Info;
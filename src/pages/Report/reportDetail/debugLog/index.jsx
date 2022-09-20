import React, { useState, useEffect } from 'react';
import './index.less';
import { fetchDebugLog } from '@services/report';
import { useParams } from 'react-router-dom';

const DebugLog = (props) => {
    const { stopDebug } = props;
    const { id: report_id } = useParams();

    let t = null;


    useEffect(() => {
        if (stopDebug === 'stop' && t) {
            clearInterval(t);
        } else {
            t && clearInterval(t);
            stopDebug !== 'stop' && (t = setInterval(getDebug, 1000));
        }
        return () => {
            clearInterval(t);
        }
    }, [stopDebug]);

    const getDebug = () => {
        const query = {
            report_id,
            team_id: localStorage.getItem('team_id'),
        };
        fetchDebugLog(query).subscribe({
            next: (res) => {
                console.log(res);
            },
            err: (err) => {
                console.log(err);
            }
        })
    }
    return (
        <div className='debug-log'>
            DebugLog
        </div>
    )
};

export default DebugLog;
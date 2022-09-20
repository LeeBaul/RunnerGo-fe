import React, { useState, useEffect } from 'react';
import './index.less';
import { fetchDebugLog } from '@services/report';
import { useParams } from 'react-router-dom';

const DebugLog = (props) => {
    const { stopDebug, end } = props;
    const { id: report_id } = useParams();
    const [log, setLog] = useState([]);

    let t = null;


    useEffect(() => {
        getDebug();
        console.log(end);
        if (end) {
            clearInterval(t);
        } else {
            t = setInterval(getDebug, 1000);
        }
        // if (stopDebug === 'stop' && t) {
        //     clearInterval(t);
        // } else {
        //     t && clearInterval(t);
        //     stopDebug !== 'stop' && (t = setInterval(getDebug, 1000));
        // }
        return () => {
            clearInterval(t);
        }
    }, [end]);

    const getDebug = () => {
        const query = {
            report_id,
            team_id: localStorage.getItem('team_id'),
        };
        fetchDebugLog(query).subscribe({
            next: (res) => {
                console.log(res);
                const { data } = res;
                setLog(data);
            },
            err: (err) => {
                console.log(err);
            }
        })
    }
    return (
        <div className='debug-log'>
            { log }
        </div>
    )
};

export default DebugLog;
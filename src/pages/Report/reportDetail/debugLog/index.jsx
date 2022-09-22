import React, { useState, useEffect } from 'react';
import './index.less';
import { fetchDebugLog } from '@services/report';
import { useParams } from 'react-router-dom';

const DebugLog = (props) => {
    const { stopDebug, end } = props;
    const { id: report_id } = useParams();
    const [log, setLog] = useState([]);

    let debug_t = null;


    useEffect(() => {
        getDebug();
        console.log(end);
        if (end) {
            clearInterval(debug_t);
        } else {
            debug_t = setInterval(getDebug, 1000);
        }
        // if (stopDebug === 'stop' && t) {
        //     clearInterval(t);
        // } else {
        //     t && clearInterval(t);
        //     stopDebug !== 'stop' && (t = setInterval(getDebug, 1000));
        // }
        return () => {
            clearInterval(debug_t);
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
                let _data = [];
                data && data.forEach(item => {
                    const { request_body, request_header, response_body, response_header, type } = item;
                    if (type === 'api') {
                        _data.push(`请求头: ${request_header}`);
                        _data.push(`请求体: ${request_body}`);
                        _data.push(`响应头: ${response_header}`);
                        _data.push(`响应体: ${response_body}`);
                    }
                })
                setLog(_data);
            },
            err: (err) => {
                console.log(err);
            }
        })
    }
    return (
        <div className='debug-log'>
            {
                log.length > 0 ?  log.map(item => <p className='debug-log-item'>{ item }</p>) : ''
            }
        </div>
    )
};

export default DebugLog;
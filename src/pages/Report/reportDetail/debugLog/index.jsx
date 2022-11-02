import React, { useState, useEffect, useImperativeHandle, useRef } from 'react';
import './index.less';
import { fetchDebugLog } from '@services/report';
import { useParams, useLocation } from 'react-router-dom';
import qs from 'qs';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import MonacoEditor from '@components/MonacoEditor';
import { EditFormat } from '@utils';

const DebugLog = (props) => {
    const { stopDebug, end, status } = props;
    // const { id: report_id } = useParams();
    const { search } = useLocation();
    const { id: report_id, contrast } = qs.parse(search.slice(1));
    const [log, setLog] = useState([]);
    const select_plan = useSelector((store) => (store.plan.select_plan));
    const { t } = useTranslation();

    let debug_t = null;


    useEffect(() => {
        if (report_id) {
            getDebug();
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
        }
    }, [end]);

    useEffect(() => {
        if (!report_id) {
            getDebug();
        }
    }, [select_plan]);

    const getDebug = () => {
        const query = {
            report_id: report_id ? report_id : JSON.parse(contrast)[select_plan].report_id,
            team_id: localStorage.getItem('team_id'),
        };
        fetchDebugLog(query).subscribe({
            next: (res) => {
                const { data } = res;
                console.log(data);
                setLog(JSON.stringify(data));
                // let _data = [];
                // data && data.forEach(item => {
                //     const { request_body, request_header, response_body, response_header, type } = item;
                //     if (type === 'api') {
                //         _data.push(`请求头: ${request_header}`);
                //         _data.push(`请求体: ${request_body}`);
                //         _data.push(`响应头: ${response_header}`);
                //         _data.push(`响应体: ${response_body}`);
                //     }
                // })
                // setLog(_data);
            },
            err: (err) => {
                console.log(err);
            }
        })
    }

    const [editorDom, setEditorDom] = useState(null);
    const currentRef = useRef();

    const handleSetEditor = (editor) => {
        setEditorDom(editor);
      };
      useImperativeHandle(currentRef, () => ({
        searchOpen: () => {
          try {
            editorDom.getContribution('editor.contrib.findController')._start({}, true);
          } catch (error) {
          }
        },
      }));

    return (
        <div className='debug-log'>
            {/* {
                log.length > 0 ? log.map(item => <p className='debug-log-item'>{item}</p>) : (stopDebug === 'stop' && status === 1 ? t('report.debugEmpty') : '')
            } */}
            <MonacoEditor
                ref={currentRef}
                Height="100vh"
                language="json"
                options={{ minimap: { enabled: false } }}
                editorDidMount={handleSetEditor}
                value={log || ''}
            />
        </div>
    )
};

export default DebugLog;
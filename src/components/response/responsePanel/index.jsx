import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { Tabs as TabComponent, Select, Button } from 'adesign-react';
import Resclose from '@assets/apis/resclose.svg';
// import { User } from '@indexedDB/user';
import { openUrl } from '@utils';
import { isArray, isPlainObject, isString } from 'lodash';
import CookiesTable from './coms/cookies';
import ReqTable from './coms/reqTable';
import ResTable from './coms/resTable';
import RealTimeResult from './result';
import ResponseStatus from './responseStatus';
import NotResponse from './notResponse';
import { responseTabs, ResponseErrorWrapper, ResponseSendWrapper } from './style';
import DiyExample from './diyExample';
import ResAssert from './assert';
import ResRegex from './regex';
import Bus from '@utils/eventBus';
import { useTranslation } from 'react-i18next';
import './index.less';

const { Tabs, TabPan } = TabComponent;
const Option = Select.Option;
const ResPonsePanel = (props) => {
  let { data, tempData, onChange, direction, from = 'apis' } = props;
  const { t } = useTranslation();
  const open_res = useSelector((store) => store.opens.open_res);
  const open_scene_res = useSelector((store) => store.scene.run_api_res);
  const open_plan_res = useSelector((store) => store.plan.run_api_res);
  const id_now = useSelector((store) => store.scene.id_now);
  const id_plan_now = useSelector((store) => store.plan.id_now);

  const run_res_scene = useSelector((store) => store.scene.run_res);
  const run_res_plan = useSelector((store) => store.plan.run_res);

  const open_api_now = useSelector((store) => store.opens.open_api_now);

  const run_res = from === 'scene' ? run_res_scene : run_res_plan;

  const response_list = {
    'apis': open_res && open_res[open_api_now],
    'scene': open_scene_res && open_scene_res[id_now],
    'plan': open_plan_res && open_plan_res[id_plan_now]
  }

  const scene_result = run_res && run_res.filter(item => item.event_id === (from === 'scene' ? id_now : id_plan_now))[0];

  const response_data = response_list[from];
  tempData = {
    "request": {
      "header": "POST /api/demo/login HTTP/1.1\r\nUser-Agent: kp-runner\r\nHost: 59.110.10.84:30008\r\nContent-Type: application/json\r\nContent-Length: 44\r\n\r\n",
      "body": "{\"mobile\": \"15372876094\",\"ver_code\": \"1234\"}"
    },
    "response": {
      "header": "HTTP/1.1 200 OK\r\nDate: Wed, 31 Aug 2022 07:59:20 GMT\r\nContent-Type: application/json; charset=utf-8\r\nContent-Length: 230\r\n\r\n",
      "body": "{\"code\":10000,\"data\":{\"token\":\"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIxNTM3Mjg3NjA5NCIsInZlcl9jb2RlIjoiMTIzNCIsImV4cCI6MTY2MTk0MzU2MSwiaXNzIjoicHJvOTExIn0.BpQO-W4LBrG73XWezBBMbNUYBQew0Dkvj2pCro0sb8k\"},\"msg\":\"success\"}"
    },
    "assertion": null
  };
  const { APIS_TAB_DIRECTION } = useSelector((d) => d?.user?.config);
  const dispatch = useDispatch();
  const [diyVisible, setDiyVisible] = useState(false);

  const numberDom = (obj) => {
    if (isPlainObject(obj)) {
      const number = Object.keys(obj).length;
      return <span className="response_count_total">({number})</span>;
    }
    if (isArray(obj)) {
      return <span className="response_count_total">({obj.length})</span>;
    }
    return '';
  };
  const defaultList = [
    {
      id: '1',
      title: t('apis.response'),
      content: (
        <RealTimeResult type="response_body" target={data} tempData={response_data || scene_result || {}} onChange={onChange}></RealTimeResult>
      ),
    },
    {
      id: '2',
      title: (
        <>
          {t('apis.reqHeader')}
          {/* {numberDom(tempData?.request?.header)} */}
        </>
      ),
      content: <ReqTable data={response_data || scene_result || {}}></ReqTable>,
    },
    {
      id: '3',
      title: (
        <>
          {t('apis.reqBody')}
          {/* {numberDom(tempData?.request?.header)} */}
        </>
      ),
      content: <RealTimeResult type="request_body" target={data} tempData={response_data || scene_result || {}} onChange={onChange}></RealTimeResult>,
    },
    {
      id: '4',
      title: (
        <>
          {t('apis.resHeader')}
          {/* {numberDom(tempData?.response?.header)} */}
        </>
      ),
      content: <ResTable data={response_data || scene_result || {}}></ResTable>,
    },
    {
      id: '5',
      title: (
        <div style={{ position: 'relative' }}>
          <span style={{ marginRight: response_data && response_data.assertion ? '8px' : 0 }}>{t('apis.resAssert')}</span>
          {
            response_data && response_data.assertion 
            ? 
              (
                response_data.assertion.filter(item => !item.isSucceed).length > 0
                ? <p style={{ 'min-width': '6px', 'min-height': '6px', borderRadius: '50%', top: '0', right: '0', backgroundColor: '#f00', position: 'absolute' }}></p>
                : <p style={{ 'min-width': '6px', 'min-height': '6px', borderRadius: '50%', top: '0', right: '0', backgroundColor: '#0f0', position: 'absolute' }}></p>
              ) 
            : <></>
          }
        </div>
      ),
      content: <ResAssert data={response_data || scene_result || {}}></ResAssert>
    },
    {
      id: '6',
      title: t('apis.resRegular'),
      content: <ResRegex data={response_data || scene_result || {}}></ResRegex>
    }
    // { id: '6', title: '失败响应示例', content: <Example></Example> },
  ];

  const [activeIndex, setActiveIndex] = useState('1');
  const [specialStatus, setSpecialStatus] = useState('none');
  const [diyExampleKey, setDiyExampleKey] = useState('');
  // useEffect(() => {
  //   // setDiyExampleKey('');
  //   User.get(localStorage.getItem('uuid') || '-1').then((user) => {
  //     if (isPlainObject(user.config)) {
  //       if (user.config?.TAB_TO_RESPONSE_AFTER_SEND > 0 && tempData.hasOwnProperty('response')) {
  //         setActiveIndex('1');
  //         setDiyVisible(false);
  //       }
  //     }
  //   });
  // }, [tempData]);

  const handleTabChange = (index) => {
    setActiveIndex(index);
    // setDiyExampleKey('');
    setDiyVisible(false);
  };

  const renderTabPanel = ({ headerTabItems, handleMouseWeel }) => {
    return (
      <>
        <div className="apipost-tabs-header apipost-tabs-response-header" onWheel={handleMouseWeel}>
          {APIS_TAB_DIRECTION > 0 ? (
            <Select
              className="apipost-tabs-response-select"
              value={activeIndex}
              onChange={handleTabChange}
            >
              {defaultList.map((d) => (
                <Option key={d.id} value={d.id}>
                  {d.title}
                </Option>
              ))}
            </Select>
          ) : (
            headerTabItems
          )}
          <ResponseStatus
            response={scene_result || response_data || {}}
            onChange={onChange}
          ></ResponseStatus>
        </div>
      </>
    );
  };

  useEffect(() => {
    if (isString(tempData?.sendStatus)) {
      if (tempData.sendStatus === 'sending') {
        setSpecialStatus('sending');
      } else if (
        tempData.sendStatus === 'sendError' &&
        isString(tempData?.message) &&
        tempData.message.length > 0
      ) {
        setSpecialStatus('error');
      } else {
        setSpecialStatus('none');
      }
    } else {
      setSpecialStatus('none');
    }
  }, [tempData.sendStatus]);

  const contentRender = ({ tabsList, activeId }) => {
    if (activeId === '-1') {
      return (
        <DiyExample
          direction={direction}
          dataKey={diyExampleKey}
          data={data}
          tempData={tempData}
          onChange={onChange}
        />
      );
    }
    return (
      <>
        {tabsList.map((item, index) => (
          <div
            key={index}
            className={cn('tab-content-item', {
              active: item?.props?.id === activeId,
            })}
          >
            {item.props.children}
          </div>
        ))}
      </>
    );
  };

  return (
    <>
      {response_data && response_data.status === 'running' && (
        <div className={ResponseSendWrapper}>
          <div className="loading_bar_tram"></div>
          <div className="apt_sendLoading_con">
            <div className="apt_sendLoading_con_text">{t('btn.sending')}</div>
            <Button
              type="primary"
              onClick={() => {
                if (from === 'apis') {
                  Bus.$emit('stopSend', data.target_id);
                } else {
                  Bus.$emit('stopSceneApi', data.id);
                }
                // dispatch({
                //   type: 'opens/updateTempApisById',
                //   id: data?.target_id,
                //   payload: { sendStatus: 'initial' },
                // });
              }}
            >
              {t('btn.cancelSend')}
            </Button>
          </div>
        </div>
      )}
      {specialStatus === 'error' && (
        <div className={ResponseErrorWrapper}>
          <Resclose className="close-error-wrapper" onClick={() => setSpecialStatus('none')} />
          <div className="container">
            {t('apis.cantVisit')}
            <p className="error_str">{tempData.message}</p>
            <p className="err_desc_go_index">
              {t('apis.go')}&nbsp;
              <span onClick={() => openUrl('https://www.apipost.cn/')}>
                https://www.apipost.cn/
              </span>
              &nbsp;{t('apis.askHelp')}
            </p>
          </div>
        </div>
      )}
      <Tabs
        itemWidth={88}
        activeId={activeIndex}
        className={responseTabs}
        onChange={handleTabChange}
        headerRender={renderTabPanel}
        contentRender={contentRender}
      >
        {defaultList.map((d) => (
          <TabPan
            className="response-tabs-content"
            style={{ padding: '0 15px' }}
            key={d.id}
            id={d.id}
            title={d.title}
          // disabled={}
          >
            <>{scene_result || response_data ? d.content : <NotResponse />}</>
          </TabPan>
        ))}
      </Tabs>
    </>
  );
};

export default ResPonsePanel;

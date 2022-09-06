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

const { Tabs, TabPan } = TabComponent;
const Option = Select.Option;
const ResPonsePanel = (props) => {
  let { data, tempData, onChange, direction } = props;
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
      title: '实时响应',
      content: (
        <RealTimeResult target={data} tempData={tempData} onChange={onChange}></RealTimeResult>
      ),
    },
    {
      id: '2',
      title: (
        <>
          请求头
          {numberDom(tempData?.request?.header)}
        </>
      ),
      content: <ReqTable data={tempData?.request || {}}></ReqTable>,
    },
    {
      id: '3',
      title: (
        <>
          响应头
          {numberDom(tempData?.response?.header)}
        </>
      ),
      content: <ResTable data={tempData?.response || {}}></ResTable>,
    },
    {
      id: '4',
      title: (
        <>
          Cookies
          {numberDom(tempData?.response?.resCookies)}
        </>
      ),
      content: <CookiesTable data={tempData?.response || {}}></CookiesTable>,
    },
    {
      id: '5',
      title: '断言结果',
      content: <>123123</>
    },
    {
      id: '6',
      title: '正则结果',
      content: <>123123123</>
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
          {/* <ResponseStatus
            response={data?.response || {}}
            onChange={onChange}
            tempData={tempData}
            data={tempData?.response || {}}
            diyExampleKey={diyExampleKey}
            setDiyExampleKey={(val) => {
              setActiveIndex('-1');
              setDiyExampleKey(val);
              setDiyVisible(true);
            }}
          ></ResponseStatus> */}
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
      {specialStatus === 'sending' && (
        <div className={ResponseSendWrapper}>
          <div className="loading_bar_tram"></div>
          <div className="apt_sendLoading_con">
            <div className="apt_sendLoading_con_text">发送中...</div>
            <Button
              type="primary"
              onClick={() => {
                dispatch({
                  type: 'opens/updateTempApisById',
                  id: data?.target_id,
                  payload: { sendStatus: 'initial' },
                });
              }}
            >
              取消发送
            </Button>
          </div>
        </div>
      )}
      {specialStatus === 'error' && (
        <div className={ResponseErrorWrapper}>
          <Resclose className="close-error-wrapper" onClick={() => setSpecialStatus('none')} />
          <div className="container">
            无法访问以下内容
            <p className="error_str">{tempData.message}</p>
            <p className="err_desc_go_index">
              去&nbsp;
              <span onClick={() => openUrl('https://www.apipost.cn/')}>
                https://www.apipost.cn/
              </span>
              &nbsp;官网，了解更多信息或寻求帮助
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
            <>{tempData.hasOwnProperty('response') ? d.content : <NotResponse />}</>
          </TabPan>
        ))}
      </Tabs>
    </>
  );
};

export default ResPonsePanel;

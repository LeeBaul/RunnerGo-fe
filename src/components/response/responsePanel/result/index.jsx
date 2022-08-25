import React, { useState, useRef, useEffect } from 'react';
import { Tabs as TabComponent, Message } from 'adesign-react';
import { Copy as CopySvg, Search as SearchSvg } from 'adesign-react/icons';
// import { User } from '@indexedDB/user';
import { isArray, isPlainObject, isString } from 'lodash';
import { copyStringToClipboard, openUrl } from '@utils';
import Beautify from './beauty';
import Assert from './assert';
import Preview from './preview';
import Visualizing from './visual';
import { ResultTabs } from './style';

const { Tabs, TabPan } = TabComponent;

const RealTimeResult = (props) => {
  const { tempData, target, onChange } = props;
  const { response, assert } = tempData || {};
  const searchRef = useRef(null);
  const [valid, setValid] = useState('init');

  const tabsList = [
    {
      title: '美化',
      id: '1',
      content: (
        <Beautify
          mode={isString(response?.resMime?.ext) ? response?.resMime?.ext : ''}
          value={response?.fitForShow == 'Monaco' ? response?.rawBody : ''}
          currentRef={searchRef}
        ></Beautify>
      ),
    },
    {
      title: '原生',
      id: '2',
      content: (
        <div className="rawhtml">{response?.fitForShow == 'Monaco' ? response?.rawBody : ''}</div>
      ),
    },
    {
      title: '预览',
      id: '3',
      content: <Preview data={response}></Preview>,
    },
    {
      title: (
        <>
          断言与校验
          <span
            className={
              valid !== 'error' &&
              (!isArray(assert) ||
                assert.length <= 0 ||
                assert.filter((i) => i?.status !== 'success').length <= 0)
                ? 'success'
                : 'error'
            }
          ></span>
        </>
      ),
      id: '4',
      content: (
        <Assert
          valid={valid}
          setValid={setValid}
          assert={assert}
          data={target}
          onChange={onChange}
          tempData={tempData}
        ></Assert>
      ),
    },
    {
      title: '可视化',
      id: '5',
      content: <Visualizing tempData={tempData}></Visualizing>,
    },
  ];

  const [activeId, setActiveId] = useState('1');

  useEffect(() => {
    if (isString(response?.fitForShow) && activeId === '1') {
      switch (response.fitForShow) {
        case 'Monaco':
          setActiveId('1');
          break;
        case 'Image':
          setActiveId('3');
          break;
        case 'Pnf':
          setActiveId('3');
          break;
        case 'Other':
          setActiveId('3');
          break;
        default:
          break;
      }
    }
    User.get(localStorage.getItem('uuid') || '-1').then((user) => {
      if (isPlainObject(user.config)) {
        if (
          user.config?.AUTO_BEAUTIFY_RESPONSE_RESULT > 0 &&
          isPlainObject(response) &&
          response?.fitForShow === 'Monaco'
        ) {
          setActiveId('1');
        }
      }
    });
  }, [response]);

  const handleTabChange = (newActiveId) => {
    setActiveId(newActiveId);
  };
  const activeContent = tabsList.find((d) => d.id === activeId)?.content;

  const renderTabPanel = ({ tabsList }) => {
    return (
      <>
        <div className="apipost-response-tabs-header fit-for-response-body">
          <div className="header-left">
            {tabsList.map((item, index) => {
              return React.cloneElement(<>{item}</>, { key: index });
            })}
          </div>
          <div className="head-extra">
            <div className="head-extra-left">
              <div
                className="icon-box"
                onClick={() => {
                  // console.log(response);
                  if (response?.fitForShow == 'Monaco') {
                    copyStringToClipboard(response.rawBody, true);
                  } else {
                    Message('error', '当前格式不支持复制');
                  }
                }}
              >
                <CopySvg />
              </div>
              {activeId === '1' && (
                <div
                  className="icon-box"
                  ref={searchRef}
                  onClick={() => {
                    searchRef?.current.searchOpen();
                  }}
                >
                  <SearchSvg />
                </div>
              )}
            </div>
            <div
              className="head-extra-right"
              onClick={() => {
                openUrl(
                  'https://wiki.apipost.cn/document/00091641-1e36-490d-9caf-3e47cd38bcde/c2ddc6db-96df-4067-8391-f48d5d8c5c80'
                );
              }}
            >
              绑定响应结果到变量？
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <Tabs
        className={ResultTabs}
        activeId={activeId}
        onChange={handleTabChange}
        headerRender={renderTabPanel}
      >
        {tabsList.map((item) => (
          <TabPan key={item.id} title={item.title} id={item.id}>
            {item.content}
          </TabPan>
        ))}
      </Tabs>
    </>
  );
};

export default RealTimeResult;
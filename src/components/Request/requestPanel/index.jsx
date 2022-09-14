import React from 'react';
import { Tabs as TabComponent, Select } from 'adesign-react';
import Authen from '@components/Auth';
import ScriptBox from '@components/ScriptBox';
import { isArray, isObject } from 'lodash';
import Header from '@components/Request/header';
import Query from '@components/Request/query';
import Body from '@components/Request/body';
import Assert from '@components/Request/assert';
import Regular from '@components/Request/regular';
import { RequestWrapper } from './style';

const { Tabs, TabPan } = TabComponent;
const Option = Select.Option;

const RequestPanel = (props) => {
  const { data, onChange } = props;

  const defaultList = [
    {
      id: '1',
      title: 'Header',
      content: (
        <Header
          parameter={isArray(data?.request?.header?.parameter) ? data.request.header.parameter : []}
          onChange={onChange}
        />
      ),
    },
    {
      id: '2',
      title: 'Query',
      content: (
        <Query
          resful={isArray(data?.request.resful?.parameter) ? data?.request.resful.parameter : []}
          parameter={isArray(data?.request.query?.parameter) ? data?.request.query.parameter : []}
          onChange={onChange}
        />
      ),
    },
    {
      id: '3',
      title: 'Body',
      content: <Body value={isObject(data?.request?.body) ? data?.request.body : {}} onChange={onChange} />,
    },
    {
      id: '4',
      title: '认证',
      content: <Authen value={data?.request?.auth || {}} onChange={onChange}></Authen>,
    },
    {
      id: '5',
      title: '断言',
      content: <Assert parameter={isArray(data?.assert) ? data.assert : []} onChange={onChange}></Assert>,
    },
    {
      id: '6',
      title: '正则表达式',
      content: <Regular parameter={isArray(data?.regex) ? data.regex : []} onChange={onChange}></Regular>,
    }
  ];
  return (
    <RequestWrapper>
      <Tabs defaultActiveId="3" itemWidth={80}>
        {defaultList.map((d) => (
          <TabPan
            style={{ padding: '0 15px', width: 'auto !impoertant' }}
            key={d.id}
            id={d.id}
            title={d.title}
          >
            {d.content}
          </TabPan>
        ))}
      </Tabs>
    </RequestWrapper>
  );
};

export default RequestPanel;

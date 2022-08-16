import React from 'react';
import { Tabs as TabComponent, Select } from 'adesign-react';
import Authen from '@components/Auth';
import ScriptBox from '@components/ScriptBox';
import { isArray, isObject } from 'lodash';
import Header from '@components/Request/header';
import Query from '@components/Request/query';
import Body from '@components/Request/body';
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
          parameter={isArray(data?.header?.parameter) ? data.header.parameter : []}
          onChange={onChange}
        />
      ),
    },
    {
      id: '2',
      title: 'Query',
      content: (
        <Query
          resful={isArray(data?.resful?.parameter) ? data.resful.parameter : []}
          parameter={isArray(data?.query?.parameter) ? data.query.parameter : []}
          onChange={onChange}
        />
      ),
    },
    {
      id: '3',
      title: 'Body',
      content: <Body value={isObject(data?.body) ? data.body : {}} onChange={onChange} />,
    },
    {
      id: '4',
      title: '认证',
      content: <Authen value={data?.auth || {}} onChange={onChange}></Authen>,
    },
    {
      id: '5',
      title: '预执行脚本',
      content: (
        <ScriptBox
          scriptType="pre"
          value={data?.event?.pre_script || ''}
          onChange={(val) => {
            onChange('scriptPre', val);
          }}
        ></ScriptBox>
      ),
    },
    {
      id: '6',
      title: '后执行脚本',
      content: (
        <ScriptBox
          scriptType="after"
          value={data?.event?.test || ''}
          onChange={(val) => {
            onChange('scriptTest', val);
          }}
        ></ScriptBox>
      ),
    },
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

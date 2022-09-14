import React, { useState, useEffect } from 'react';
import { Input, Table, Switch, Select, Button } from 'adesign-react';
import { Delete as DeleteSvg, Down as DownSvg, Right as RightSvg } from 'adesign-react/icons';
import { newDataItem, dataItem } from '@constants/dataItem';
import Bus from '@utils/eventBus';
import { HEADERTYPELIST } from '@constants/typeList';
import AutoSizeTextArea from '@components/AutoSizeTextArea';
import DescChoice from '@components/descChoice';
import ApiInput from '@components/ApiInput';
import { isString, trim } from 'lodash';
import Importexport from '../importExport';

const Option = Select.Option;
const Query = (props) => {
  const { parameter, onChange, resful } = props;
  const [showSysHeader, setShowSysHeader] = useState(false);

  const handleChange = (rowData, rowIndex, newVal) => {
    const newList = [...parameter];
    if (
      newVal.hasOwnProperty('key') ||
      newVal.hasOwnProperty('value') ||
      newVal.hasOwnProperty('description')
    ) {
      delete rowData.static;
    }
    newList[rowIndex] = {
      ...rowData,
      ...newVal,
    };
    onChange('query', [...newList]);
  };

  const handleTableDelete = (index) => {
    const newList = [...parameter];
    if (newList.length > 0) {
      newList.splice(index, 1);
      onChange('query', [...newList]);
    }
  };
  const columns = [
    {
      title: '',
      width: 40,
      dataIndex: 'is_checked',
      render: (text, rowData, rowIndex) => (
        <Switch
          size="small"
          checked={text === '1' || text === 1}
          onChange={(e) => {
            handleChange(rowData, rowIndex, { is_checked: e ? 1 : -1 });
          }}
        />
      ),
    },
    {
      title: '参数名',
      dataIndex: 'key',
      enableResize: true,
      width: 100,
      render: (text, rowData, rowIndex) => {
        return (
          <ApiInput
            value={text}
            onChange={(newVal) => {
              handleChange(rowData, rowIndex, { key: newVal });
            }}
            onBlur={async () => {
              if (
                isString(rowData?.key) &&
                trim(rowData.key).length > 0 &&
                isString(rowData?.description) &&
                trim(rowData.description).length <= 0
              ) {
                const desc = await Bus.$asyncEmit('getProjectDescList', rowData.key);
                if (isString(desc) && desc.length > 0) {
                  handleChange(rowData, rowIndex, { description: desc });
                }
              }
            }}
          />
        );
      },
    },
    {
      title: '参数值',
      dataIndex: 'value',
      enableResize: true,
      width: 150,
      render: (text, rowData, rowIndex) => {
        return (
          <ApiInput
            value={text}
            onChange={(newVal) => {
              handleChange(rowData, rowIndex, { value: newVal });
            }}
          />
        );
      },
    },
    {
      title: '必填',
      dataIndex: 'not_null',
      width: 55,
      render: (text, rowData, rowIndex) => {
        return (
          <Switch
            size="small"
            checked={text > 0}
            onChange={(e) => {
              handleChange(rowData, rowIndex, { not_null: e ? 1 : -1 });
            }}
          />
        );
      },
    },
    {
      title: '类型',
      dataIndex: 'type',
      enableResize: false,
      width: 100,
      render: (text, rowData, rowIndex) => {
        return (
          <Select
            size="mini"
            style={{ width: '100%' }}
            bordered={false}
            value={rowData?.field_type || 'String'}
            onChange={(newVal) => {
              handleChange(rowData, rowIndex, { field_type: newVal });
            }}
          >
            {HEADERTYPELIST.map((item) => (
              <Option key={item} value={item}>
                {item}
              </Option>
            ))}
          </Select>
        );
      },
    },
    {
      title: '参数描述',
      dataIndex: 'description',
      render: (text, rowData, rowIndex) => {
        return (
          <AutoSizeTextArea
            height={24}
            value={text}
            bordered={false}
            onChange={(newVal) => {
              handleChange(rowData, rowIndex, { description: newVal });
            }}
            onBlur={(e) => {
              // 添加临时描述
              Bus.$emit('addTempParams', {
                key: rowData?.key || '',
                description: e?.target?.textContent || '',
              });
            }}
          />
        );
      },
    },
    {
      title: '',
      width: 30,
      render: (text, rowData, rowIndex) => (
        <div>
          <DescChoice
            onChange={(newVal) => {
              handleChange(rowData, rowIndex, { description: newVal });
            }}
            filterKey={rowData?.key}
          ></DescChoice>
        </div>
      ),
    },
    {
      title: '',
      width: 30,
      render: (text, rowData, rowIndex) => (
        <Button
          onClick={() => {
            handleTableDelete(rowIndex);
          }}
        >
          <DeleteSvg style={{ width: 16, height: 16 }} />
        </Button>
      ),
    },
  ];

  const handleRefulChange = (rowData, rowIndex, newVal) => {
    const newList = [...resful];
    newList[rowIndex] = {
      ...rowData,
      ...newVal,
    };
    onChange('resful', [...newList]);
  };

  const resfulColumn = [
    {
      title: '参数名',
      dataIndex: 'key',
      enableResize: true,
      width: 100,
      render: (text, rowData, rowIndex) => {
        return (
          <Input
            disabled
            size="mini"
            bordered={false}
            value={text}
            onChange={(newVal) => {
              handleRefulChange(rowData, rowIndex, { key: newVal });
            }}
            onBlur={async () => {
              if (
                isString(rowData?.key) &&
                trim(rowData.key).length > 0 &&
                isString(rowData?.description) &&
                trim(rowData.description).length <= 0
              ) {
                const desc = await Bus.$asyncEmit('getProjectDescList', rowData.key);
                if (isString(desc) && desc.length > 0) {
                  handleRefulChange(rowData, rowIndex, { description: desc });
                }
              }
            }}
          />
        );
      },
    },
    {
      title: '参数值',
      dataIndex: 'value',
      enableResize: true,
      width: 150,
      render: (text, rowData, rowIndex) => {
        return (
          <Input
            size="mini"
            bordered={false}
            value={text}
            onChange={(newVal) => {
              handleRefulChange(rowData, rowIndex, { value: newVal });
            }}
          />
        );
      },
    },
    {
      title: '参数描述',
      dataIndex: 'description',
      render: (text, rowData, rowIndex) => {
        return (
          <AutoSizeTextArea
            value={text}
            bordered={false}
            height={24}
            onChange={(newVal) => {
              handleRefulChange(rowData, rowIndex, { description: newVal });
            }}
          />
        );
      },
    },
    {
      title: '',
      width: 30,
      render: (text, rowData, rowIndex) => (
        <div>
          <DescChoice
            onChange={(newVal) => {
              handleRefulChange(rowData, rowIndex, { description: newVal });
            }}
            filterKey={rowData?.key}
          ></DescChoice>
        </div>
      ),
    },
  ];

  const tableDataList = () => {
    const hasStatic = parameter.some((item) => item.static);
    if (!hasStatic) {
      return [...parameter, { ...dataItem }];
    }
    return [...parameter];
  };

  return (
    <div className="apipost-req-wrapper">
      <div>
        {/* <Importexport data={[...parameter]} type="query" onChange={onChange} /> */}
      </div>
      <Table hasPadding={false} showBorder columns={columns} data={tableDataList()} />
      {/* <div className="system-header" style={{ marginTop: 16 }}>
        <div>
          <span
            className="title"
            onClick={() => {
              setShowSysHeader(!showSysHeader);
            }}
          >
            路径变量 {showSysHeader ? <DownSvg /> : <RightSvg />}
          </span>
        </div>
        {showSysHeader && (
          <div style={{ margin: '8px 0 0 0' }}>
            <Table showBorder hasPadding={false} columns={resfulColumn} data={resful} />
          </div>
        )}
      </div> */}
    </div>
  );
};

export default Query;

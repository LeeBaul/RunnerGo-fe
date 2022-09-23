import React, { useMemo, useState } from 'react';
import { Input, Table, Switch, Select, Button } from 'adesign-react';
import { useSelector, useDispatch } from 'react-redux';
import { Delete as DeleteSvg, Down as DownSvg, Right as RightSvg } from 'adesign-react/icons';
import { dataItem, newDataItem } from '@constants/dataItem';
import Bus from '@utils/eventBus';
import { HEADERTYPELIST } from '@constants/typeList';
import cloneDeep from 'lodash/cloneDeep';
import ApiInput from '@components/ApiInput';
import SearchInput from '@components/SearchInput';
import AutoSizeTextArea from '@components/AutoSizeTextArea';
import DescChoice from '@components/descChoice';
import { isString, trim } from 'lodash';
import { REQUEST_HEADER } from '@constants/api';
import Importexport from '../importExport';

const Option = Select.Option;
const Header = (props) => {
  const { parameter = [], onChange } = props;
  const { apipostHeaders } = useSelector((d) => d?.opens);
  const dispatch = useDispatch();

  const handleChange = (rowData, rowIndex, newVal) => {
    const newList = [...parameter];
    if (
      (newVal.hasOwnProperty('key') && newVal?.key !== '') ||
      newVal.hasOwnProperty('value') ||
      newVal.hasOwnProperty('description')
    ) {
      delete rowData.static;
    }
    newList[rowIndex] = {
      ...rowData,
      ...newVal,
    };
    onChange('header', [...newList]);
  };

  const handleTableDelete = (index) => {
    const newList = [...parameter];
    if (newList.length > 0) {
      newList.splice(index, 1);
      onChange('header', [...newList]);
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
          <SearchInput
            size="mini"
            value={text}
            onChange={(newVal) => {
              handleChange(rowData, rowIndex, { key: newVal });
            }}
            dataList={REQUEST_HEADER}
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
            size="mini"
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
            bordered={false}
            value={text}
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
    // {
    //   title: '',
    //   width: 30,
    //   render: (text, rowData, rowIndex) => (
    //     <div>
    //       <DescChoice
    //         onChange={(newVal) => {
    //           handleChange(rowData, rowIndex, { description: newVal });
    //         }}
    //         filterKey={rowData?.key}
    //       ></DescChoice>
    //     </div>
    //   ),
    // },
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

  const systemColumns = [
    {
      title: '',
      width: 40,
      dataIndex: 'is_checked',
      render: (text, rowData, rowIndex) => (
        <div>
          <Switch
            size="small"
            checked={text > 0}
            onChange={(e) => {
              const headers = cloneDeep(apipostHeaders);
              const item = headers[rowIndex];
              item.is_checked = e ? 1 : -1;
              dispatch({
                type: 'opens/setApipostHeaders',
                payload: headers,
              });
            }}
          />
        </div>
      ),
    },
    {
      title: '参数名称',
      dataIndex: 'key',
      render: (text, rowData, rowIndex) => (
        <span className="table-cell-span">{text}</span>
      ),
    },
    {
      title: '参数值',
      dataIndex: 'value',
      render: (text, rowData, rowIndex) => (
        <span className="table-cell-span">{text}</span>
      ),
    },
  ];

  const [showSysHeader, setShowSysHeader] = useState(false);

  const tableDataList = () => {
    const hasStatic = parameter.some((item) => item.static);
    if (!hasStatic) {
      return [...parameter, { ...newDataItem }];
    }
    return [...parameter];
  };
  return (
    <div className="apipost-req-wrapper">
      <div>
        {/* <Importexport data={[...parameter]} type="header" onChange={onChange} />
      </div>
      <div className="system-header">
        <div>
          <span
            className="title"
            onClick={() => {
              setShowSysHeader(!showSysHeader);
            }}
          >
            系统header {showSysHeader ? <DownSvg /> : <RightSvg />}
          </span>
        </div> */}
        {showSysHeader && (
          <div style={{ margin: '8px 0 0 0' }}>
            <Table showBorder hasPadding={false} columns={systemColumns} data={apipostHeaders} />
          </div>
        )}
      </div>
      <Table showBorder hasPadding={false} columns={columns} data={tableDataList()} />
    </div>
  );
};

export default Header;

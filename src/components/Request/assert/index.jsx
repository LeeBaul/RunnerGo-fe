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
import { COMPARE_IF_TYPE } from '@constants/compare';

const { Option } = Select;

const Assert = (props) => {
    const { parameter, onChange } = props;

    const handleTableDelete = (index) => {
        const newList = [...parameter];
        if (newList.length > 0) {
          newList.splice(index, 1);
          onChange('assert', [...newList]);
        }
    };

    const handleChange = (rowData, rowIndex, newVal) => {
        const newList = [...parameter];
        newList[rowIndex] = {
            ...rowData,
            ...newVal,
        };
        onChange('assert', [...newList]);
    }

    const columns = [
        {
            title: '',
            width: 40,
            dataIndex: 'response_type',
            render: (text, rowData, rowIndex) => (
                <Select
                    value={rowData.response_type || null}
                    onChange={(e) => {
                        handleChange(rowData, rowIndex, { response_type: e });
                    }}
                >
                    <Option value={1}>响应头</Option>
                    <Option value={2}>响应体</Option>
                    <Option value={3}>响应码</Option>
                </Select>
            ),
        },
        {
            title: '字段',
            dataIndex: 'var',
            enableResize: true,
            width: 100,
            render: (text, rowData, rowIndex) => {
                return (
                    <ApiInput
                        size="mini"
                        value={text}
                        onChange={(newVal) => {
                            handleChange(rowData, rowIndex, { var: newVal });
                        }}
                    />
                );
            },
        },
        {
            title: '',
            dataIndex: 'compare',
            enableResize: true,
            width: 150,
            render: (text, rowData, rowIndex) => {
                return (
                    <Select
                        value={rowData.compare || null}
                        onChange={(e) => handleChange(rowData, rowIndex, { compare: e })}
                    >
                        {
                            COMPARE_IF_TYPE.map(item => <Option value={item.type}>{item.title}</Option>)
                        }
                    </Select>
                );
            },
        },
        {
            title: '值',
            dataIndex: 'val',
            width: 55,
            render: (text, rowData, rowIndex) => {
                return (
                    <ApiInput
                        size="mini"
                        value={text}
                        onChange={(newVal) => {
                            handleChange(rowData, rowIndex, { val: newVal });
                        }}
                    />
                );
            },
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

    const tableDataList = () => {
        return [...parameter, { response_type: '', var: '', compare: '', val: '' }]
    };

    return (
        <div className='apipost-req-wrapper'>
            <Table showBorder hasPadding={false} columns={columns} data={tableDataList()} />
        </div>
    )
};

export default Assert;
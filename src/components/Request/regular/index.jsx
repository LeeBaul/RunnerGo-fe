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

const Regular = (props) => {
    const { parameter, onChange } = props;

    const handleTableDelete = (index) => {
        const newList = [...parameter];
        if (newList.length > 0) {
            newList.splice(index, 1);
            onChange('assert', [...newList]);
        }
    };

    const columns = [
        {
            title: '变量名',
            dataIndex: 'name',
            render: (text, rowData, rowIndex) => (
                <ApiInput
                    size="mini"
                    value={text}
                    onChange={(newVal) => {
                        onChange(rowData, rowIndex, { key: newVal });
                    }}
                />
            ),
        },
        {
            title: '表达式',
            dataIndex: 'value',
            enableResize: true,
            render: (text, rowData, rowIndex) => {
                return (
                    <ApiInput
                        size="mini"
                        value={text}
                        onChange={(newVal) => {
                            onChange(rowData, rowIndex, { value: newVal });
                        }}
                    />
                );
            },
        },
        {
            title: '描述',
            dataIndex: 'description',
            enableResize: true,
            render: (text, rowData, rowIndex) => {
                return (
                    <ApiInput
                        size="mini"
                        value={text}
                        onChange={(newVal) => {
                            onChange(rowData, rowIndex, { description: newVal });
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
        return [...parameter, { name: '', value: '', description: ''}]
    };

    return (
        <div className='apipost-req-wrapper'>
            <Table showBorder hasPadding={false} columns={columns} data={tableDataList()} />
        </div>
    )
};

export default Regular;
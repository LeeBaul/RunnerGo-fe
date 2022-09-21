import React, { useState, useEffect } from 'react';
import { Modal, Table, Input, Message } from 'adesign-react';
import { Copy as SvgCopy, Delete as SvgDelete } from 'adesign-react/icons';
import { GlobalVarModal, HeaderTitleStyle, VarNameStyle } from './style';
import { copyStringToClipboard } from '@utils';
import { fetchGlobalVar, fetchCreateVar, fetchSaveVar } from '@services/dashboard';
import { cloneDeep } from 'lodash';

const GlobalVar = (props) => {
    const { onCancel } = props;

    const [list, setList] = useState([]);
    const [_var, setVar] = useState('');
    const [val, setVal] = useState('');
    const [description, setDescription] = useState('');
    const [checkName, setCheckName] = useState([]);

    useEffect(() => {
        const query = {
            team_id: localStorage.getItem('team_id'),
            page: 1,
            size: 100,
        }
        fetchGlobalVar(query).subscribe({
            next: (res) => {
                const { data: { variables } } = res;
                setList([...variables, { var: '', val: '', description: ''}]);
            }
        })
    }, []);

    const handleChange = (rowData, rowIndex, newVal) => {
        const newList = [...list];
        newList[rowIndex] = {
            ...rowData,
            ...newVal,
        };
        if (rowIndex === list.length - 1) {
            setList([...newList, { var: '', val: '', description: ''}])
        } else {
            setList([...newList]);
        }
    };

    const deleteItem = (index) => {
        const _list = [...list];

        _list.splice(index, 1);

        setList(_list);
    }

    const columns = [
        {
            title: '变量名',
            dataIndex: 'var',
            width: 211,
            render: (text, rowData, rowIndex) => {
                return (
                    <div className={VarNameStyle}>
                        <Input
                            value={text}
                            onBlur={(e) => {
                                const _list = cloneDeep(list);
                                const names = _list.filter(item => item.var === checkName[1]);
                                if (names.length > 1) {
                                    const length = _list[checkName[0]].var.length;
                                    _list[checkName[0]].var = _list[checkName[0]].var.substring(0, length - 1);
                                    setList(_list);
                                    Message('error', '变量名重复!');
                                }
                            }}
                            onChange={(newVal) => {
                                handleChange(rowData, rowIndex, { var: newVal });
                                setCheckName([rowIndex, newVal]);
                            }}
                        />
                        { rowIndex !== list.length - 1 && <SvgCopy onClick={() => copyStringToClipboard(list[rowIndex].var)} /> }
                    </div>
                )
            }
        },
        {
            title: '变量值',
            dataIndex: 'val',
            render: (text, rowData, rowIndex) => {
                return (
                    <Input
                        value={text}
                        onChange={(newVal) => {
                            handleChange(rowData, rowIndex, { val: newVal });
                        }}
                    />
                )
            }
        },
        {
            title: '变量描述',
            dataIndex: 'description',
            render: (text, rowData, rowIndex) => {
                return (
                    <Input
                        value={text}
                        onChange={(newVal) => {
                            handleChange(rowData, rowIndex, { description: newVal });
                        }}
                    />
                )
            }
        },
        {
            title: '',
            width: 40,
            render: (text, rowData, rowIndex) => {
                return rowIndex !== list.length - 1 ? <SvgDelete onClick={() => deleteItem(rowIndex)} className='delete-svg' /> : <></>
            }
        }
    ];

    const saveGlobalVar = () => {
        const _list = cloneDeep(list);
        _list.splice(_list.length - 1, 1);
        const variables = _list.map(item => {
            const { var: _var, val, description } = item;
            return {
                var: _var,
                val,
                description
            };
        });
        const params = {
            team_id: parseInt(localStorage.getItem('team_id')),
            variables
        };
        fetchSaveVar(params).subscribe({
            next: (res) => {
                const { code } = res;
                if (code === 0) {
                    Message('success', '保存成功!');
                    onCancel();
                }
            },
            err: (err) => {
                Message('error', '保存失败!');
            }
        })

        // _list.forEach(item => {
        //     fetchCreateVar({
        //         ...item,
        //         team_id: parseInt(sessionStorage.getItem('team_id'))
        //     }).subscribe();
        // })
        // Message('success', '保存成功!');
        // onCancel();
    }

    const VarName = () => {
        return (
            <div className={VarNameStyle}>
                <p>md5</p>
                <SvgCopy onClick={() => copyStringToClipboard('md5')} />
            </div>
        )
    }

    const data = [
        {
            var: <VarName />,
            val: '分光光度法个时的法国和函数说明',
            description: '分光光度法个时的法国和函数说明',
            handle: <SvgDelete className='delete-svg' />,
        },
        {
            var: <VarName />,
            val: '分光光度法个时的法国和函数说明',
            description: '分光光度法个时的法国和函数说明',
            handle: <SvgDelete className='delete-svg' />,
        },
        {
            var: <VarName />,
            val: '分光光度法个时的法国和函数说明',
            description: '分光光度法个时的法国和函数说明',
            handle: <SvgDelete className='delete-svg' />,
        },
    ];

    const HeaderTitle = () => {
        return (
            <div className={HeaderTitleStyle}>
                <p className='header-title'>全局变量</p>
            </div>
        )
    }


    return (
        <Modal className={GlobalVarModal} onOk={() => saveGlobalVar()} okText='保存' visible={true} title="全局变量" onCancel={onCancel} >
            <p className='container-title'>预定义全局变量</p>
            <Table showBorder columns={columns} data={list} />
        </Modal>
    )
};

export default GlobalVar;
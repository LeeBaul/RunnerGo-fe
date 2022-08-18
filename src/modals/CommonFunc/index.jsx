import React from 'react';
import { Modal, Table } from 'adesign-react';
import { CommonFunctionModal, HeaderTitleStyle } from './style';

const CommonFunction = (props) => {
    const { onCancel } = props;
    const columns = [
        {
            title: '函数名',
            dataIndex: 'name',
            width: 211
        },
        {
            title: '函数说明',
            dataIndex: 'desc'
        },
    ];
    const data = [
        {
            name: 'md5',
            desc: '分光光度法个时的法国和函数说明',
        },
        {
            name: 'md5',
            desc: '分光光度法个时的法国和函数说明',
        },
        {
            name: 'md5',
            desc: '分光光度法个时的法国和函数说明',
        },
    ];

    const HeaderTitle = () => {
        return (
            <div className={HeaderTitleStyle}>
                <p className='header-title'>公共函数</p>
            </div>
        )
    }

    return (
        <Modal className={CommonFunctionModal} visible={true} title={<HeaderTitle />} footer={null} onCancel={onCancel} >
            <Table showBorder columns={columns} data={data} />
        </Modal>
    )
};

export default CommonFunction;
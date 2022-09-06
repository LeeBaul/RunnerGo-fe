import React from 'react';
import { Modal, Table, Upload } from 'adesign-react';
import { Copy as SvgCopy } from 'adesign-react/icons';
import { GlobalVarModal, HeaderTitleStyle, VarNameStyle } from './style';
import { copyStringToClipboard } from '@utils';

const SceneConfig = (props) => {
    const { onCancel } = props;
    const columns = [
        {
            title: '变量名',
            dataIndex: 'name',
            width: 211
        },
        {
            title: '变量值',
            dataIndex: 'value'
        },
        {
            title: '变量描述',
            dataIndex: 'desc'
        }
    ];

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
            name: <VarName />,
            value: '分光光度法个时的法国和函数说明',
            desc: '分光光度法个时的法国和函数说明',
        },
        {
            name: <VarName />,
            value: '分光光度法个时的法国和函数说明',
            desc: '分光光度法个时的法国和函数说明',
        },
        {
            name: <VarName />,
            value: '分光光度法个时的法国和函数说明',
            desc: '分光光度法个时的法国和函数说明',
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
        <Modal className={GlobalVarModal}  visible={true} title={<HeaderTitle />} footer={null} onCancel={onCancel} >
            <p className='container-title'>添加文件</p>
            <span>支持添加10M以内的csv、txt文件</span>
            <Upload></Upload>
            <p className='container-title'>添加变量</p>
            <Table showBorder columns={columns} data={data} />
        </Modal>
    )
};

export default SceneConfig;
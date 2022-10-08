import React, { useState, useEffect } from 'react';
import { Table, Modal } from 'adesign-react';
import './index.less';

const PreviewFile = (props) => {
    const { onCancel, data, fileType } = props;
    const [tableData, setTableData] = useState([]);
    const [tableColumn, setTableColumn] = useState([]);

    useEffect(() => {
        const column = [];
        if (data.length > 0 && fileType === 'csv') {
            for (let i in data[0]) {
                column.push({
                    title: i,
                    dataIndex: i,
                });
            }
            setTableColumn(column);
            setTableData(data);
        }
    }, []);

    return (
        <Modal className='preview-modal' title='预览文件' visible={true} onOk={() => onCancel()} onCancel={() => onCancel()}>
            {
                fileType === 'csv' ? <Table columns={tableColumn} data={tableData} /> : <div>{ data }</div>
            }
        </Modal>
    )
};

export default PreviewFile;
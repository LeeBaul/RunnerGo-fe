import React, { useState, useEffect } from 'react';
import { Table, Modal } from 'adesign-react';
import './index.less';
import { useTranslation } from 'react-i18next';

const PreviewFile = (props) => {
    const { onCancel, data, fileType } = props;
    const [tableData, setTableData] = useState([]);
    const [tableColumn, setTableColumn] = useState([]);
    const { t } = useTranslation();

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
        <Modal className='preview-modal' title={ t('modal.previewTitle') } visible={true} cancelText={ t('btn.cancel') } okText={ t('btn.ok') } onOk={() => onCancel()} onCancel={() => onCancel()} footer={null}>
            {
                fileType === 'csv' ? <Table style={{ marginBottom: '12px' }} columns={tableColumn} data={tableData} /> : <div>{ data }</div>
            }
        </Modal>
    )
};

export default PreviewFile;
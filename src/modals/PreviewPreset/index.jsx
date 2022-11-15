import React, { useState, useEffect } from "react";
import { Add as SvgAdd, Search as SvgSearch } from 'adesign-react/icons';
import { Button, Modal, Input } from 'adesign-react';
import { Table } from '@arco-design/web-react';
import { useTranslation } from 'react-i18next';
import { fetchPresetList } from '@services/preset';
import Pagination from '@components/Pagination';
import './index.less';
import SvgEmpty from '@assets/img/empty';
import { debounce } from 'lodash';

const PreviewPreset = (props) => {
    const { onCancel } = props;
    const { t } = useTranslation();
    const [total, setTotal] = useState(0);
    const [currentPage, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [tableData, setTableData] = useState([]);
    const [searchWord, setSearchWord] = useState('');

    const column = [
        {
            title: t('column.preset.name'),
            dataIndex: 'conf_name',
        },
        {
            title: t('column.preset.creator'),
            dataIndex: 'user_name'
        },
        {
            title: t('column.preset.taskType'),
            dataIndex: 'task_type'
        },
        {
            title: t('column.preset.taskMode'),
            dataIndex: 'task_mode'
        },
        {
            title: t('column.preset.startConcurrency'),
            dataIndex: 'start_concurrency'
        },
        {
            title: t('column.preset.step'),
            dataIndex: 'step'
        },
        {
            title: t('column.preset.maxConcurrency'),
            dataIndex: 'max_concurrency'
        },
        {
            title: t('column.preset.duration'),
            dataIndex: 'duration'
        },
        {
            title: t('column.preset.roundNum'),
            dataIndex: 'round_num'
        },
        {
            title: t('column.preset.concurrency'),
            dataIndex: 'concurrency'
        },
        {
            title: t('column.preset.reheatTime'),
            dataIndex: 'reheat_time'
        },
        {
            title: t('column.preset.handle'),
            dataIndex: 'handle',
            width: 58,
        }
    ];

    const modeList = {
        '1': t('plan.modeList.1'),
        '2': t('plan.modeList.2'),
        '3': t('plan.modeList.3'),
        '4': t('plan.modeList.4'),
        '5': t('plan.modeList.5'),
        '6': t('plan.modeList.6'),
        '7': t('plan.modeList.7')
    };

    const taskList = {
        '0': '-',
        '1': t('plan.taskList.commonTask'),
        '2': t('plan.taskList.cronTask'),
        '3': t('plan.taskList.mixTask')
    };

    useEffect(() => {
        const params = {
            team_id: parseInt(localStorage.getItem('team_id')),
            page: currentPage,
            size: pageSize,
            conf_name: searchWord
        };
        fetchPresetList(params).subscribe({
            next: (res) => {
                console.log(res);
                const { data: { preinstall_list, total } } = res;
                console.log(preinstall_list)
                setTableData(preinstall_list.map(item => {
                    const { mode_conf, task_type, task_mode } = item;
                    return {
                        ...item,
                        ...mode_conf,
                        task_type: taskList[task_type],
                        task_mode: modeList[task_mode],
                        handle: <div className='handle'>
                            <Button onClick={() => onCancel(item)}>{t('header.import')}</Button>
                        </div>
                    }
                }));
                console.log(total);
                setTotal(total);
            }
        })
    }, [searchWord]);

    const pageChange = (page, size) => {
        page !== currentPage && setPage(page);
        size !== pageSize && setPageSize(size);
    };

    const getNewSearchword = debounce((e) => setSearchWord(e), 500);

    return (
        <div>
            <Modal
                className="preview-preset"
                visible
                footer={null}
                onCancel={() => onCancel()}
            >
                <div className='top'>
                    <div className='top-left'>
                        <p className='title'>{t('leftBar.preset')}</p>
                        <Input className='search-input' value={searchWord} beforeFix={<SvgSearch />} onChange={getNewSearchword} placeholder={t('placeholder.configSearch')} />
                    </div>
                    <div className='top-right'>

                    </div>
                </div>
                <Table
                    className="preview-preset-table"
                    border={{
                        wrapper: true,
                        cell: true,
                    }}
                    columns={column}
                    data={tableData}
                    showSorterTooltip={false}
                    noDataElement={<div className='empty'> <SvgEmpty /> <p>{t('index.emptyData')}</p></div>}
                    pagination={false}
                />
                {total > 0 && <Pagination total={total} current={currentPage} size={pageSize} onChange={(page, pageSize) => pageChange(page, pageSize)} />}
            </Modal>
        </div>
    )
};

export default PreviewPreset;
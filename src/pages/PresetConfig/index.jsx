import React, { useState, useEffect } from 'react';
import { Button, Tabs as TabList, Input, Message, Modal } from 'adesign-react';
import {
    Add as SvgAdd,
    Copy as SvgCopy,
    Delete as SvgDelete,
    Iconeye as SvgEye,
    Search as SvgSearch,
} from 'adesign-react/icons';
import './index.less';
import { useTranslation } from 'react-i18next';
import { Table } from '@arco-design/web-react';
import CreatePreset from '@modals/CreatePreset';
import Pagination from '@components/Pagination';
import { fetchPresetList, fetchDeletePreset, fetchCopyPreset } from '@services/preset';
import SvgEmpty from '@assets/img/empty';
import { debounce } from 'lodash';

const { Tabs, TabPan } = TabList;
const PresetConfig = () => {
    const { t } = useTranslation();
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
            title: t('column.preset.stepRunTime'),
            dataIndex: 'step_run_time'
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
            width: 108,
        }
    ];

    const data = [
        {
            name: '配置一',
            creator: 'Cici',
            taskType: '普通任务',
            taskMode: '并发模式',
            startConcurrency: 20,
            step: 5,
            maxConcurrency: 100,
            duration: 500,
            roundNum: 200,
            concurrency: 200,
            reheatTime: 200,
            handle: <div className='handle'>
                <SvgCopy />
                <SvgDelete className='delete' />
            </div>
        },
        {
            name: '配置一',
            creator: 'Cici',
            taskType: '普通任务',
            taskMode: '并发模式',
            startConcurrency: 20,
            step: 5,
            maxConcurrency: 100,
            duration: 500,
            roundNum: 200,
            concurrency: 200,
            reheatTime: 200,
            handle: <div className='handle'>
                <SvgCopy />
                <SvgDelete className="delete" />
            </div>
        },
        {
            name: '配置一',
            creator: 'Cici',
            taskType: '普通任务',
            taskMode: '并发模式',
            startConcurrency: 20,
            step: 5,
            maxConcurrency: 100,
            duration: 500,
            roundNum: 200,
            concurrency: 200,
            reheatTime: 200,
            handle: <div className='handle'>
                <SvgCopy />
                <SvgDelete className="delete" />
            </div>
        }
    ];



    const [showCreate, setShowCreate] = useState(false);

    const [total, setTotal] = useState(0);
    const [currentPage, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [tableData, setTableData] = useState([]);
    const [configDetail, setCofigDetail] = useState({});
    const [searchWord, setSearchWord] = useState('');
    const [totalData, setTotalData] = useState([]);

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

    const getTableData = () => {
        const params = {
            team_id: parseInt(localStorage.getItem('team_id')),
            page: currentPage,
            size: pageSize,
            conf_name: searchWord,
        };
        fetchPresetList(params).subscribe({
            next: (res) => {
                console.log(res);
                const { data: { preinstall_list, total } } = res;
                setTotalData(preinstall_list);
                setTableData(preinstall_list.map(item => {
                    const { mode_conf, task_type, task_mode } = item;
                    return {
                        ...item,
                        ...mode_conf,
                        task_type: taskList[task_type],
                        task_mode: modeList[task_mode],
                        handle: <div className='handle'>
                            <SvgEye onClick={() => {
                                setCofigDetail(preinstall_list.find(elem => elem.id === item.id));
                                setShowCreate(true);
                            }} />
                            <SvgCopy onClick={() => copyPreset(item.id)} />
                            <SvgDelete className='delete' onClick={() => deletePreset(item.id, item.conf_name)} />
                        </div>
                    }
                }));
                console.log(total);
                setTotal(total);
            }
        })
    }

    useEffect(() => {
        getTableData();
    }, [currentPage, pageSize, searchWord]);

    const copyPreset = (id) => {
        const params = {
            id,
            team_id: parseInt(localStorage.getItem('team_id'))
        };
        fetchCopyPreset(params).subscribe({
            next: (res) => {
                const { code } = res;
                if (code === 0) {
                    Message('success', t('message.copySuccess'));
                    getTableData();
                }
            }
        })
    }

    const deletePreset = (id, name) => {
        Modal.confirm({
            title: t('modal.deletePresetTitle'),
            content: `${t('modal.deletePreset1')}${name}${t('modal.deletePreset2')}`,
            okText: t('btn.ok'),
            cancelText: t('btn.cancel'),
            onOk: () => {
                const params = {
                    id,
                    team_id: parseInt(localStorage.getItem('team_id')),
                    conf_name: name
                };
                fetchDeletePreset(params).subscribe({
                    next: (res) => {
                        const { code } = res;
                        console.log(code);
                        if (code === 0) {
                            Message('success', t('message.deleteSuccess'));
                            getTableData();
                        }
                    }
                })
            }
        })

    }

    const pageChange = (page, size) => {
        if (size !== pageSize) {
            localStorage.setItem('preset_pagesize', size);
        }
        sessionStorage.setItem('preset_page', page);
        page !== currentPage && setPage(page);
        size !== pageSize && setPageSize(size);
    };

    const defaultList = [
        { id: 0, title: t('preset.performance'), content: "123" },
        { id: 1, title: t('preset.automation'), content: "456", disabled: true },
    ];

    const getNewSearchword = debounce((e) => setSearchWord(e), 500);


    return (
        <div className='preset-config'>
            <div className='tab'>
                <Tabs defaultActiveId={0}>
                    {defaultList.map((d) => (
                        <TabPan key={d.id} id={d.id} title={d.title} disabled={d.disabled} >

                        </TabPan>
                    ))}
                </Tabs>
            </div>
            <div className='top'>
                <div className='top-left'>
                    <p className='title'>{t('leftBar.preset')}</p>
                    <Input className='search-input' value={searchWord} beforeFix={<SvgSearch />} onChange={getNewSearchword} placeholder={t('placeholder.configSearch')} />
                </div>
                <div className='top-right'>
                    <Button preFix={<SvgAdd />} onClick={() => setShowCreate(true)}>{t('index.create')}</Button>
                </div>
            </div>
            <Table
                className="preset-table"
                border={{
                    wrapper: true,
                    cell: true,
                }}
                columns={column}
                data={tableData}
                showSorterTooltip={false}
                pagination={false}
                noDataElement={<div className='empty'> <SvgEmpty /> <p>{t('index.emptyData')}</p></div>}
                onRow={(record, index) => {
                    return {
                        onDoubleClick: (event) => {
                            setCofigDetail(totalData.find(item => item.id === record.id));
                            setShowCreate(true);
                        },
                    };
                }}
            />
            {total > 0 && <Pagination total={total} current={currentPage} size={pageSize} onChange={(page, pageSize) => pageChange(page, pageSize)} />}

            {showCreate && <CreatePreset configDetail={configDetail} onCancel={(e) => {
                if (e) {
                    getTableData();
                }
                setShowCreate(false);
                setCofigDetail({});
            }} />}
        </div>
    )
};

export default PresetConfig;
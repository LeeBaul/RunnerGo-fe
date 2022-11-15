import React, { useState, useEffect } from 'react';
import { Button } from 'adesign-react';
import {
    Add as SvgAdd,
    Copy as SvgCopy,
    Delete as SvgDelete,
} from 'adesign-react/icons';
import './index.less';
import { useTranslation } from 'react-i18next';
import { Table } from '@arco-design/web-react';
import CreatePreset from '@modals/CreatePreset';

const PresetConfig = () => {
    const { t } = useTranslation();
    const column = [
        {
            title: t('column.preset.name'),
            dataIndex: 'name',
        },
        {
            title: t('column.preset.creator'),
            dataIndex: 'creator'
        },
        {
            title: t('column.preset.taskType'),
            dataIndex: 'taskType'
        },
        {
            title: t('column.preset.taskMode'),
            dataIndex: 'taskMode'
        },
        {
            title: t('column.preset.startConcurrency'),
            dataIndex: 'startConcurrency'
        },
        {
            title: t('column.preset.step'),
            dataIndex: 'step'
        },
        {
            title: t('column.preset.maxConcurrency'),
            dataIndex: 'maxConcurrency'
        },
        {
            title: t('column.preset.duration'),
            dataIndex: 'duration'
        },
        {
            title: t('column.preset.roundNum'),
            dataIndex: 'roundNum'
        },
        {
            title: t('column.preset.concurrency'),
            dataIndex: 'concurrency'
        },
        {
            title: t('column.preset.reheatTime'),
            dataIndex: 'reheatTime'
        },
        {
            title: t('column.preset.handle'),
            dataIndex: 'handle',
            width: 72,
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
    return (
        <div className='preset-config'>
            <div className='top'>
                <p className='top-left'>预设配置</p>
                <div className='top-right'>
                    <Button preFix={<SvgAdd />} onClick={() => setShowCreate(true)}>新建</Button>
                </div>
            </div>
            <Table
                className="preset-table"
                border={{
                    wrapper: true,
                    cell: true,
                }}
                columns={column}
                data={data}
                showSorterTooltip={false}
                pagination={false}
            />

            { showCreate && <CreatePreset /> }
        </div>
    )
};

export default PresetConfig;
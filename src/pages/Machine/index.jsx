import React, { useEffect, useState } from "react";
import './index.less';
import { Radio, Input, Button, Message } from 'adesign-react';
import { Table } from '@arco-design/web-react';
import { Search as SvgSearch } from 'adesign-react/icons';
import { useTranslation } from 'react-i18next';
import { fetchGetMachine, fetchUpdateMachine } from '@services/machine';
import Pagination from '@components/Pagination';
import { debounce } from 'lodash';
import SvgEmpty from '@assets/img/empty';

const Machine = () => {
    const { t } = useTranslation();

    const column = [
        {
            title: t('column.machine.machineID'),
            dataIndex: 'name'
        },
        {
            title: t('column.machine.cpu'),
            dataIndex: 'cpu_usage',
            sorter: true
        },
        {
            title: t('column.machine.cpuLoad1'),
            dataIndex: 'cpu_Load_one'
        },
        {
            title: t('column.machine.cpuLoad5'),
            dataIndex: 'cpu_load_five'
        },
        {
            title: t('column.machine.cpcuLoad15'),
            dataIndex: 'cpu_load_fifteen'
        },
        {
            title: t('column.machine.memory'),
            dataIndex: 'mem_usage',
            sorter: true
        },
        {
            title: t('column.machine.disk'),
            dataIndex: 'disk_usage',
            sorter: true
        },
        {
            title: t('column.machine.maxCoprogram'),
            dataIndex: 'max_goroutines'
        },
        {
            title: t('column.machine.useCoprogram'),
            dataIndex: 'current_goroutines'
        },
        {
            title: t('column.machine.type'),
            dataIndex: 'server_type'
        },
        {
            title: t('column.machine.handle'),
            dataIndex: 'handle'
        }
    ];

    const data = [
        {
            name: '00001',
            cpu: '23.55%',
            cpu_load1: '484.89',
            cpu_load5: '394.68',
            cpu_load15: '23.68',
            memory: '25.99%',
            disk: '25.33%',
            max_coprogram: '123456',
            use_coprogram: '111111',
            type: '主力机器',
            handle: <Button className='start-btn'>{ t('btn.machineStart') }</Button>
        },
        {
            name: '00001',
            cpu: '23.55%',
            cpu_load1: '484.89',
            cpu_load5: '394.68',
            cpu_load15: '23.68',
            memory: '25.99%',
            disk: '25.33%',
            max_coprogram: '123456',
            use_coprogram: '111111',
            type: '主力机器',
            handle: <Button className='stop-btn'>{ t('btn.machineStart') }</Button>
        },
        {
            name: '00001',
            cpu: '23.55%',
            cpu_load1: '484.89',
            cpu_load5: '394.68',
            cpu_load15: '23.68',
            memory: '25.99%',
            disk: '25.33%',
            max_coprogram: '123456',
            use_coprogram: '111111',
            type: '主力机器',
            handle: <Button className='start-btn'>{ t('btn.machineStop') }</Button>
        }
    ];

    const [tableData, setTableData] = useState([]);
    const [total, setTotal] = useState(0);
    const [searchWord, setSearchWord] = useState('');
    const [currentPage, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [sort, setSort] = useState(0);

    const serverTypeList = {
        1: t('machine.serverType.1'),
        2: t('machine.serverType.2')
    }

    const getTableData = () => {
        const params = {
            page: currentPage,
            size: pageSize,
            sort_tag: sort,
            name: searchWord
        };

        fetchGetMachine(params).subscribe({
            next: (res) => {
                console.log(res);
                const { data: { machine_list, total } } = res;
                setTableData(machine_list.map(item => {
                    const { cpu_usage, mem_usage, disk_usage, status, server_type, id } = item;
                    return {
                        ...item,
                        cpu_usage: `${cpu_usage}%`,
                        mem_usage: `${mem_usage}%`,
                        disk_usage: `${disk_usage}%`,
                        server_type: serverTypeList[server_type],
                        handle: status === 1 ? <Button className='stop-btn' onClick={() => updateMachine(id, 2)}>{ t('btn.machineStop') }</Button> : <Button className='start-btn' onClick={() => updateMachine(id, 1)}>{ t('btn.machineStart') }</Button>
                    }
                }));
                setTotal(total);
            }
        })
    }

    let machine_t = null;

    useEffect(() => {
        getTableData();
        machine_t = setInterval(() => {
            getTableData();
        }, 5000);

        return () => {
            clearInterval(machine_t);
        }
    }, [currentPage, pageSize, searchWord, sort]);

    const updateMachine = (id, status) => {
        const params = {
            id,
            status
        };
        fetchUpdateMachine(params).subscribe({
            next: (res) => {
                const { code } = res;
                if (code === 0) {
                    Message('success', t('message.handleSuccess'));
                    getTableData();
                }
            }
        })
    }

    const pageChange = (page, size) => {
        if (size !== pageSize) {
            localStorage.setItem('machine_pagesize', size);
        }
        sessionStorage.setItem('machine_page', page);
        page !== currentPage && setPage(page);
        size !== pageSize && setPageSize(size);
    };

    const getNewSearchword = debounce((e) => setSearchWord(e), 500);
    
    return (
        <div className="machine">
            <p className="title">{ t('leftBar.machine') }</p>
            <Input 
                className='search' 
                value={searchWord}  
                placeholder={ t('placeholder.searchMachine') } 
                beforeFix={<SvgSearch />} 
                onChange={getNewSearchword}    
            />
            <Table 
                className='table' 
                border={{
                    wrapper: true,
                    cell: true,
                }}
                showSorterTooltip={false}
                columns={column} 
                data={tableData}
                pagination={false}
                noDataElement={<div className='empty'> <SvgEmpty /> <p>{t('index.emptyData')}</p></div>}
                onChange={(a, sort, filter, c) => {
                    if (sort.hasOwnProperty('field') && sort.hasOwnProperty('direction') && sort.direction) {
                        if (sort.field === 'cpu_usage') {
                            setSort(sort.direction === 'ascend' ? 2 : 1);
                        } else if (sort.field === 'mem_usage') {
                            setSort(sort.direction === 'ascend' ? 4 : 3);
                        } else if (sort.field === 'disk_usage') {
                            setSort(sort.direction === 'ascend' ? 6 : 5);
                        }
                    } else {
                        setSort(0);
                    }
                }}
                />
            { total > 0 && <Pagination total={total} current={currentPage} size={pageSize} onChange={(page, pageSize) => pageChange(page, pageSize)} />}
        </div>
    )
};

export default Machine;
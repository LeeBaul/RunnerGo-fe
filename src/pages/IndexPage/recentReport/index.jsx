import React, { useEffect, useState } from 'react';
import './index.less';
import { Table, Input, Button, Message, Tooltip, Modal } from 'adesign-react';
import {
    Iconeye as SvgEye,
    Export as SvgExport,
    Delete as SvgDelete,
    Search as SvgSearch,
} from 'adesign-react/icons';
import { fetchReportList, fetchDeleteReport } from '@services/report';
import { tap } from 'rxjs';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import { debounce } from 'lodash';
import Pagination from '@components/Pagination';
import SvgEmpty from '@assets/img/empty';
import { useTranslation } from 'react-i18next';

const RecentReport = () => {

    const [reportList, setReportList] = useState([]);
    const [keyword, setKeyword] = useState('');
    const [total, setTotal] = useState(0);
    const [currentPage, setCurrentPage] = useState(parseInt(sessionStorage.getItem('index_page')) || 1);
    const [pageSize, setPageSize] = useState(parseInt(localStorage.getItem('index_pagesize')) || 10 );
    const navigate = useNavigate();
    const { t } = useTranslation();

    const modeList = {
        '1': '并发模式',
        '2': '阶梯模式',
        '3': '错误率模式',
        '4': '响应时间模式',
        '5': '每秒请求数模式'
    };

    const taskLit = {
        '1': '普通任务',
        '2': '定时任务',
    };

    useEffect(() => {
        getReportData();
    }, [keyword, localStorage.getItem('team_id'), currentPage, pageSize]);

    const getReportData = () => {
        const query = {
            page: currentPage,
            size: pageSize,
            team_id: localStorage.getItem('team_id'),
            keyword,
            start_time_sec: '',
            end_time_sec: '',
        }
        fetchReportList(query)
            .pipe(
                tap((res) => {
                    const { code, data } = res;
                    if (code === 0) {
                        const { reports, total } = data;
                        setTotal(total);
                        const list = reports.map((item, index) => {
                            const { report_id, plan_name, scene_name, task_type, task_mode, run_time_sec, last_time_sec, run_user_name, status, rank } = item;
                            return {
                                ...item,
                                rank,
                                plan_name: <Tooltip content={<div>{plan_name}</div>}><div className='ellipsis'>{plan_name}</div></Tooltip>,
                                scene_name,
                                task_mode: modeList[task_mode],
                                task_type: taskLit[task_type],
                                run_time_sec: dayjs(run_time_sec * 1000).format('YYYY-MM-DD HH:mm:ss'),
                                last_time_sec: dayjs(last_time_sec * 1000).format('YYYY-MM-DD HH:mm:ss'),
                                run_user_name,
                                status: status === 1 ? <p style={{ color: 'var(--run-green)' }}>运行中</p> : <p>已完成</p>,
                                operation: <HandleContent report_id={report_id} />
                            }
                        });
                        setReportList(list);
                    }
                })
            )
            .subscribe();
    }

    const HandleContent = (props) => {
        const { report_id } = props;
        return (
            <div className='handle-content'>
                <SvgEye onClick={() => navigate(`/report/detail/${report_id}`)} />
                {/* <SvgExport /> */}
                <SvgDelete className='delete' onClick={() => {
                    Modal.confirm({
                        title: t('modal.look'),
                        content: t('modal.deleteReport'),
                        onOk: () => {
                            deleteReport(report_id);
                        }
                    })
                }} />
            </div>
        )
    };

    const deleteReport = (report_id) => {
        const params = {
            team_id: parseInt(localStorage.getItem('team_id')),
            report_id: parseInt(report_id),
        };

        fetchDeleteReport(params).subscribe({
            next: (res) => {
                Message('success', '删除成功!');
                getReportData();
            }
        });
    };

    const columns = [
        {
            title: t('index.reportId'),
            dataIndex: 'rank',
            // width: 84
        },
        {
            title: t('index.planName'),
            dataIndex: 'plan_name',
            // width: 200
        },
        {
            title: t('index.sceneName'),
            dataIndex: 'scene_name',
            // width: 200
        },
        {
            title: t('index.taskType'),
            dataIndex: 'task_type',
            filters:[{key:1 ,value:"普通任务"},{key:2,value:"定时任务"}],
            onFilter:(key, value, item) => item.task_type === value,
            // width: 200,
        },
        {
            title: t('index.mode'),
            dataIndex: 'task_mode',
            filters: [{ key: 1, value:"并发模式" }, { key: 2, value: "阶梯模式" }, { key: 3, value: "错误率模式" }, { key: 4, value:"响应时间模式" }, { key: 5, value: "每秒请求数模式" }],
            onFilter: (key, value, item) => item.task_mode === value,
            // width: 200,
        },
        {
            title: t('index.startTime'),
            dataIndex: 'run_time_sec',
            // width: 200,
        },
        {
            title: t('index.endTime'),
            dataIndex: 'last_time_sec',
            // width: 200,
        },
        {
            title: t('index.performer'),
            dataIndex: 'run_user_name',
            // width: 200,
        },
        {
            title: t('index.status'),
            dataIndex: 'status',
            // width: 200,
            
        },
        {
            title: t('index.handle'),
            dataIndex: 'operation',
            width: 112,
        }
    ];

    const getNewKeyword = debounce((e) => setKeyword(e), 500);

    const pageChange = (page, size) => {
        if (size !== pageSize) {
            localStorage.setItem('index_pagesize', size);
        }
        sessionStorage.setItem('index_page', page);
        page!== currentPage && setCurrentPage(page);
        size !== pageSize && setPageSize(size);
    };


    const renderRow = (tableData, renderRowItem) => {
        return (
          <tbody>
            {tableData.map((tableRowData, rowIndex) => {
              const rowComp = React.cloneElement(renderRowItem(tableRowData, rowIndex), {
                key: rowIndex,
                onDoubleClick(tableRowData) {

                  const { report_id } = tableData[rowIndex]
                  navigate(`/report/detail/${report_id}`)
                },
              });
              return rowComp;
            })}
          </tbody>
        );
      };

    return (
        <div className='recent-report'>
            <p className='title'>{ t('index.recentReport') }</p>
            <div className='report-search'>
                <Input
                    className="textBox"
                    value={keyword}
                    onChange={getNewKeyword}
                    beforeFix={<SvgSearch />}
                    placeholder={ t('index.placeholder') }
                />
                {/* <Button className='searchBtn'>搜索</Button> */}
            </div>
            <Table className="report-table" showBorder renderRow={renderRow} columns={columns} data={reportList} noDataElement={<div className='empty'> <SvgEmpty /> <p>还没有数据</p></div>} />
            { total > 0 && <Pagination total={total} current={currentPage} size={pageSize} onChange={(page, pageSize) => pageChange(page, pageSize)} /> }
        </div>
    )
};

export default RecentReport;
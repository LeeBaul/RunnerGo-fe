import React from 'react';
import { Table, Button } from 'adesign-react';
import './index.less';
import PlanHeader from '../planHeader';
import {
    Iconeye as SvgEye,
    Copy as SvgCopy,
    Delete as SvgDelete,
    CaretRight as SvgRun,

} from 'adesign-react/icons';
import { useNavigate } from 'react-router-dom';

const PlanList = () => {

    const navigate = useNavigate();

    const HandleContent = (props) => {
        const { status } = props;
        return (
            <div className='handle-content'>
                {status === 'running' ? <Button className='stop-btn' preFix={<SvgRun />}>停止</Button> :
                    <Button className='run-btn' preFix={<SvgRun />}>开始</Button>}
                <SvgEye onClick={() => navigate('/plan/detail')} />
                <SvgCopy />
                <SvgDelete />
            </div>
        )
    }

    const data = [
        {
            id: '1',
            name: '测试2',
            type: '普通类型',
            mode: '并发模式',
            createTime: '2022.5.9 11:00:00',
            lastUpdateTime: '2022.6.9 11:00:00',
            status: '未开始',
            handler: 'cici',
            remark: '这是一个备注',
            handle: <HandleContent status='running' />,
        },
        {
            id: '2',
            name: '测试2',
            type: '普通类型',
            mode: '并发模式',
            createTime: '2022.5.9 11:00:00',
            lastUpdateTime: '2022.6.9 11:00:00',
            status: '未开始',
            handler: 'cici',
            remark: '这是一个备注',
            handle: <HandleContent />,
        },
        {
            id: '3',
            name: '测试2',
            type: '普通类型',
            mode: '并发模式',
            createTime: '2022.5.9 11:00:00',
            lastUpdateTime: '2022.6.9 11:00:00',
            status: '未开始',
            handler: 'cici',
            remark: '这是一个备注',
            handle: <HandleContent />,
        },
        {
            id: '4',
            name: '测试2',
            type: '普通类型',
            mode: '并发模式',
            createTime: '2022.5.9 11:00:00',
            lastUpdateTime: '2022.6.9 11:00:00',
            status: '未开始',
            handler: 'cici',
            remark: '这是一个备注',
            handle: <HandleContent status='running' />,
        },
    ];

    const columns = [
        {
            title: '任务ID',
            dataIndex: 'id',
        },
        {
            title: '计划名称',
            dataIndex: 'name',
        },
        {
            title: '任务类型',
            dataIndex: 'type',
        },
        {
            title: '压测模式',
            dataIndex: 'mode',
        },
        {
            title: '创建时间',
            dataIndex: 'createTime',
        },
        {
            title: '最后修改时间',
            dataIndex: 'lastUpdateTime',
        },
        {
            title: '状态',
            dataIndex: 'status',
        },
        {
            title: '操作者',
            dataIndex: 'handler',
        },
        {
            title: '备注',
            dataIndex: 'remark',
        },
        {
            title: '操作',
            dataIndex: 'handle',
            width: 196,
        }
    ];


    return (
        <div className='plan'>
            <PlanHeader />
            <Table className="plan-table" showBorder columns={columns} data={data} />,
        </div>
    )
};

export default PlanList;
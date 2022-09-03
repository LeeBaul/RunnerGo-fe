import React, { useState } from 'react';
import { Switch, Input, Select } from 'adesign-react';
import { More as SvgMore } from 'adesign-react/icons';
import './index.less';
import { Handle } from 'react-flow-renderer';
import { COMPARE_IF_TYPE } from '@constants/compare';
import { useSelector } from 'react-redux';
import Bus from '@utils/eventBus';

const { Option } = Select;

const ConditionController = (props) => {
    const { data: { id } } = props;
    const node_config = useSelector((store) => store.scene.node_config);
    // 变量
    const [_var, setVar] = useState('');
    // 关系
    const [compare, setCompare] = useState('');
    // 变量值
    const [val, setVal] = useState('');
    // 备注
    const [remark, setRemark] = useState('');

    const onTargetChange = (type, value) => {
        Bus.$emit('updateNodeConfig', type, value, id, node_config);
    }


    return (
        <>
            <Handle
                type="target"
                position="top"
                id="a"
                className="my_handle"
            />
            <div className='controller-condition'>

                <div className='controller-condition-header'>
                    <div className='type'>
                        条件控制器
                    </div>
                    <div className='header-right'>
                        <Switch defaultChecked />
                        <SvgMore />
                    </div>
                </div>
                <div className='controller-condition-main'>
                    <div className='item'>
                        <p>if</p>
                        <Input value={_var} size="mini" placeholder="变量：name" onChange={(e) => {
                            onTargetChange('var', e);
                            setVar(e);
                        }} />
                    </div>
                    <div className='item'>
                        <Select
                            onChange={(e) => {
                                onTargetChange('compare', e);
                                setCompare(e);
                            }}
                        >
                            {
                                COMPARE_IF_TYPE.map(item => (
                                    <Option value={item.type}>{item.title}</Option>
                                ))
                            }
                        </Select>
                    </div>
                    <div className='item'>
                        <Input size="mini" value={val} onChange={(e) => {
                            setVal(e);
                            onTargetChange('val', e);
                        }} placeholder="变量值" />
                    </div>
                    <div className='item'>
                        <Input size="mini" value={remark} onChange={(e) => {
                            setRemark(e);
                            onTargetChange('remark', e);
                        }} placeholder="备注" />
                    </div>
                </div>
            </div>
            <Handle
                type="source"
                position="bottom"
                id="b"
                className="my_handle"
            />
        </>
    )
};

export default ConditionController;
import React from 'react';
import { Input, Button } from 'adesign-react';
import {
    Search as SvgSearch,
    Location as SvgLocation
} from 'adesign-react/icons';
import ApiStatus from '@components/ApiStatus';

import './index.less';

const FilterBox = (props) => {
    const { filterParams, onChange, treeRef, selectedKeys, type } = props;

    const handleFilterKey = (key) => {
        onChange({ ...filterParams, key });
    };

    const handleFilterStatus = (status) => {
        onChange({ ...filterParams, status });
    };

    // 滚动到指定位置
    const handlToTarget = () => {
        if (Array.isArray(selectedKeys) && selectedKeys?.length === 1) {
            const target_id = selectedKeys[0];
            treeRef?.current?.scrollTo(target_id);
        }
    };



    return (
        <div className='filter-box'>
            <Input
                size="mini"
                className="textBox"
                value={filterParams.key}
                onChange={handleFilterKey}

                beforeFix={<SvgSearch width="20px" height="20px" />}
                // afterFix={
                //     <ApiStatus
                //         // showDefault
                //         // enableAdd={false}
                //         // value={filterParams?.status}
                //         // onChange={handleFilterStatus}
                //     />
                // }
                placeholder="搜索目录或接口"
            />
            {
                (type === 'apis') &&
                <Button onClick={handlToTarget} size="mini" className="btn-location">
                    <SvgLocation width="20px" height="20px" />
                </Button>
            }
        </div>
    )
};

export default FilterBox;
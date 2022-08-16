import React from 'react';
import { Input, Button } from 'adesign-react';
import {
    Search as SvgSearch,
    Location as SvgLocation
} from 'adesign-react/icons';
import ApiStatus from '@components/ApiStatus';

import './index.less';

const FilterBox = () => {
    return (
        <div className='filter-box'>
            <Input
                size="mini"
                className="textBox"
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
            <Button size="mini" className="btn-location">
                <SvgLocation width="20px" height="20px" />
            </Button>
        </div>
    )
};

export default FilterBox;
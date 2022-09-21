import React, { useEffect, useState } from 'react';
import './index.less';
import { Button, Select, Input } from 'adesign-react';
const { Option } = Select;

const Pagination = (props) => {
    const { current, size, onChange, total } = props;
    const [pageNum, setPageNum] = useState([]);
    const [pageSize, setPageSize] = useState(size);
    const [currentPage, setCurrentPage] = useState(current);
    const [sizeList, setSizeList] = useState([5, 10, 15, 20]);
    const [maxPage, setMaxPage] = useState(0);
    useEffect(() => {
        if (typeof total !== 'number' ||
            typeof pageSize !== 'number' ||
            typeof current !== 'number'
        ) {
            throw Error('total or pageSize or current must type number!')
        } else {
            let num = Math.floor(total / pageSize) + 1;
            const numArr = new Array(num).fill(0);
            setPageNum(numArr);
            setMaxPage(num);
        }
    }, [pageSize, total])

    return (
        <div className='paging'>
            <Select
                placement="top-start"
                defaultValue={pageSize}
                onChange={(e) => {
                    setPageSize(e);
                    onChange && onChange(currentPage, e);
                }}
            >
                {
                    sizeList.map(item => (
                        <Option key={item} value={item}>{item}</Option>
                    ))
                }
            </Select>
            {/* <Button onClick={() => onChange && onChange(1, pageSize)}>首页</Button> */}
            <Button onClick={() => {
                if (currentPage - 1 > 0) {
                    onChange && onChange(currentPage - 1, pageSize);
                    setCurrentPage(currentPage - 1);
                }
            }}>上一页</Button>
            <div className='paging-content'>
                <Input value={currentPage} onChange={(e) => setCurrentPage(parseInt(e))} />
            </div>
            <Button onClick={() => {
                if (currentPage + 1 <= maxPage) {
                    onChange && onChange(currentPage + 1, pageSize);
                    setCurrentPage(currentPage + 1);
                }
            }}>下一页</Button>
            <Button onClick={() => onChange && onChange(currentPage, pageSize)}>跳转</Button>
            {/* <Button onClick={() => onChange(pageNum.length, pageSize)}>尾页</Button> */}
        </div>
    )
};

export default Pagination;
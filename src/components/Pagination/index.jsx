import React, { useEffect, useState } from 'react';
import './index.less';
import { Button, Input } from 'adesign-react';
import { useTranslation } from 'react-i18next';

import { Select } from '@arco-design/web-react';
const { Option } = Select;

const Pagination = (props) => {
    const { current, size, onChange, total } = props;
    const [pageNum, setPageNum] = useState([]);
    const [pageSize, setPageSize] = useState(size);
    const [currentPage, setCurrentPage] = useState(current);
    const [sizeList, setSizeList] = useState([5, 10, 15, 20]);
    const [maxPage, setMaxPage] = useState(0);
    const { t } = useTranslation();
    useEffect(() => {
        if (typeof total !== 'number' ||
            typeof pageSize !== 'number' ||
            typeof current !== 'number'
        ) {
            throw Error('total or pageSize or current must type number!')
        } else {
            let num = Math.ceil(total / pageSize);
            const numArr = new Array(num).fill(0);
            console.log(total, pageSize, pageNum)
            console.log(num);
            setPageNum(numArr);
            setMaxPage(num);
        }
    }, [pageSize, total])

    return (
        <div className='paging'>
            <Select
                style={{ width: 'auto' }}
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
            <Button
                disabled={ currentPage === 1 }
                style={currentPage === 1 ? { backgroundColor: 'var(--select)', color: 'var(--font-1)' } : { backgroundColor: 'var(--theme-color)', color: 'var(--common-white)' }}
                onClick={() => {
                    if (currentPage - 1 > 0) {
                        onChange && onChange(currentPage - 1, pageSize);
                        setCurrentPage(currentPage - 1);
                    }
                }}
            >{t('btn.prePage')}</Button>
            <div className='paging-content'>
                <Input value={currentPage} onChange={(e) => setCurrentPage(parseInt(e))} />
            </div>
            <Button
                disabled={ currentPage === maxPage }
                style={
                    currentPage === maxPage ? { backgroundColor: 'var(--select)', color: 'var(--font-1)' } : { backgroundColor: 'var(--theme-color)', color: 'var(--common-white)' }
                }
                onClick={() => {
                    if (currentPage + 1 <= maxPage) {
                        onChange && onChange(currentPage + 1, pageSize);
                        setCurrentPage(currentPage + 1);
                    }
                }}>{t('btn.nextPage')}</Button>
            <Button onClick={() => onChange && onChange(currentPage, pageSize)}>{t('btn.jump')}</Button>
            {/* <Button onClick={() => onChange(pageNum.length, pageSize)}>尾页</Button> */}
        </div>
    )
};

export default Pagination;
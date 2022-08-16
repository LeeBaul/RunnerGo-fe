import React, { useRef, useState } from 'react';
import { Button, Dropdown, Message } from 'adesign-react';
import { isPlainObject, isString } from 'lodash';
import { Add as SvgAdd } from 'adesign-react/icons';
import { getClipboardText, getSafeJSON } from '@utils';
import Bus from '@utils/eventBus';
import { TABITEMMENULIST } from './constant';
import { pushAction } from './subject';
import './dropdown.less';

const AddMenu = (props) => {
    const [visible, setVisible] = useState (false);
    const refDropdown = useRef(null);
    const handleMenuClick = (action, type) => {
        if (action === 'pasteApiOrDoc') {
            // 粘贴接口/文本
            getClipboardText().then(async (text) => {
                if (!isString(text) || text?.length < 0) {
                    Message('error', '剪贴板中暂无任何内容');
                    return;
                }

                const clipboardData = await getSafeJSON(text);
                if (!isPlainObject(clipboardData)) {
                    Message('error', '剪贴板中暂无接口/文本信息');
                }
                Bus.$emit('addOpenItemByObj', { Obj: clipboardData, pid: '0' });
            });
        } else if (action === 'importProject') {
            Bus.$emit('openModal', 'ImportProject');
        } else if (action === 'importCURL') {
            Bus.$emit('openModal', 'ImportApi');
        } else {
            // 发布动作
            Bus.$emit(action, { type });
        }
        refDropdown.current?.setPopupVisible(false);
    };

    const AddMenus = TABITEMMENULIST.map((item, index) => (
        <div
            className="api-tabs-dropdown-item"
            onClick={handleMenuClick.bind(null, item?.action, item?.type)}
            key={index}
        >
            <item.icon className="menu-icon" />
            <span>{item.title}</span>
        </div>
    ));

    return (
        <>
            <Dropdown
                ref={refDropdown}
                className="api-tabs-dropdown"
                onVisibleChange={setVisible}
                placement="bottom-end"
                content={<div data-module="dropdown-example">{AddMenus}</div>}
            >
                <Button size="mini" className="btn-dropdown add-request-btn">
                    <SvgAdd width="16px" height="16px" />
                </Button>
            </Dropdown>
        </>
    );
};

export default AddMenu;

import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, Dropdown } from 'adesign-react';
import Bus from '@utils/eventBus';
import { More as SvgMore } from 'adesign-react/icons';
// import { TABMOREMENULIST } from './constant';
import { useTranslation } from 'react-i18next';

import './dropdown.less';

const AddMenu = (props) => {
    const [visible, setVisible] = useState(false);
    const refDropdown = useRef(null);
    const { open_apis, open_api_now } = useSelector((d) => d.opens);
    const { CURRENT_TARGET_ID } = useSelector((d) => d.workspace ? d.workspace : {});
    const { t } = useTranslation();
    const TABMOREMENULIST = [
        {
            type: 'closeAllTarget',
            title: t('apis.closeAllTarget'),
            action: 'closeAllTarget',
        },
        {
            type: 'focreCloseAllTarget',
            title: t('apis.focreCloseAllTarget'),
            action: 'focreCloseAllTarget',
        },
        {
            type: 'closeOtherTargetById',
            title: t('apis.closeOtherTargetById'),
            action: 'closeOtherTargetById',
        },
        {
            type: 'focreCloseOtherTargetById',
            title: t('apis.focreCloseOtherTargetById'),
            action: 'focreCloseOtherTargetById',
        },
        {
            type: 'saveAllTarget',
            title: t('apis.saveAllTarget'),
            tips: `Ctrl + shift + S`,
            action: 'saveAllTarget',
        },
    ];
    const handleMenuClick = (action) => {
        Bus.$emit(action, open_apis, open_api_now);
        refDropdown.current?.setPopupVisible(false);
    };

    const AddMenus = TABMOREMENULIST.map((item, index) => (
        <div
            className="api-tabs-dropdown-item"
            onClick={handleMenuClick.bind(null, item.action)}
            key={index}
        >
            <span>{item.title}</span>
        </div>
    ));

    return (
        <Dropdown
            placement="bottom-end"
            offset={[0, 5]}
            ref={refDropdown}
            className="api-tabs-dropdown"
            onVisibleChange={setVisible}
            content={<div data-module="dropdown-example">{AddMenus}</div>}
        >
            <Button size="mini" className="btn-dropdown">
                <SvgMore width="16px" height="16px" />
            </Button>
        </Dropdown>
    );
};

export default AddMenu;

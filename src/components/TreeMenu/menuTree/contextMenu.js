import React from 'react';
import ContextMenu from '@components/ContextMenu';
import MenuItem from '@components/ContextMenu/MenuItem';
import { Modal, Message } from 'adesign-react';
import { isArray, isString, isUndefined, isFunction } from 'lodash';
import contextMenus from '../contextMenus';
import contextFuncs from '../contextFuncs';

const handleMenuItemClick = ({ module, action, params, props }) => {
    const funcModule = contextFuncs?.[module]?.[action];
    if (isFunction(funcModule) === false) {
        Message('error', '无效操作');
        return;
    }
    funcModule({ params, props });
};

export const handleShowContextMenu = (props, e, params) => {
    e.preventDefault();
    e.stopPropagation();

    let module = '';
    if (isUndefined(params)) {
        module = 'root';
    } else if (isArray(params)) {
        module = 'multi';
    } else {
        module = params.target_type;
    }

    if (!isString(module) || !isArray(contextMenus?.[module])) {
        return;
    }
    const contextMenuRef = React.createRef(null);
    const menuList = contextMenus?.[module];

    const HoverMenu = (
        <div>
            <ContextMenu
                onItemClick={(action) => {
                    if (action === '') {
                        return;
                    }
                    handleMenuItemClick.call(null, { module, action, params, props });
                    contextMenuRef?.current?.hideMenu();
                }}
                style={{ width: 170 }}
                hoverStyle={{ width: 170 }}
            >
                {menuList.map((item) => (
                    <MenuItem action={item.action} childrenList={item.children} key={item.action}>
                        {item.title}
                    </MenuItem>
                ))}
            </ContextMenu>
        </div>
    );
    Modal.Show(HoverMenu, { x: e.pageX, y: e.pageY }, contextMenuRef);
};

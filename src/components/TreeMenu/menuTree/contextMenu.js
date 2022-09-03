import React from 'react';
import ContextMenu from '@components/ContextMenu';
import MenuItem from '@components/ContextMenu/MenuItem';
import { Modal, Message } from 'adesign-react';
import { isArray, isString, isUndefined, isFunction } from 'lodash';
import contextMenus from '../contextMenus';
import contextFuncs from '../contextFuncs';

const handleMenuItemClick = ({ module, action, target_id, props}) => {
    console.log(module, action, target_id, props);
    console.log(contextFuncs, contextFuncs[module])
    const funcModule = contextFuncs[module][action];
    // console.log(contextFuncs, contextFuncs[module], contextFuncs[module].);
    if (isFunction(funcModule) === false) {
        Message('error', '无效操作');
        return;
    }
    funcModule(target_id, props);
};

export const handleShowContextMenu = (props, e, params) => {
    console.log(props, e, params);

    const { target_id } = params;

    let module = '';
    if (isUndefined(params)) {
        module = 'root';
    } else if (isArray(params)) {
        module = 'multi';
    } else {
        module = params.target_type;
    }
    console.log(module);
    console.log(contextMenus[module])

    if (!isString(module) || !isArray(contextMenus?.[module])) {
        return;
    }
    const contextMenuRef = React.createRef(null);
    const menuList = contextMenus?.[module];
    console.log(menuList);

    const HoverMenu = (
        <div>
            <ContextMenu
                onItemClick={(action) => {
                    if (action === '') {
                        return;
                    }
                    handleMenuItemClick.call(null, { module, action, target_id, props });
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

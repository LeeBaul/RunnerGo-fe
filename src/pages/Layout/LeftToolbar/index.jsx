import React, { useState } from "react";
import cn from 'classnames';
import { Link } from 'react-router-dom';
import './index.less';
import { leftBarItems } from './constant';

const LeftToolbar = () => {
    let [currentPath, setCurrentPath] = useState(location.pathname);

    const leftBarList = leftBarItems.map((item, index) => (
        <React.Fragment key={index}>
            <Link to={item.link}>
                <div
                    key={index}
                    className={cn('toolbar-item', {
                        active: currentPath.indexOf(item.link) !== -1,
                    })}
                    onClick={() => setCurrentPath(item.link)}
                >
                    <item.icon className='svg-item' />
                    <span className="item-text">{item.title}</span>
                </div>
            </Link>
        </React.Fragment>
    ))

    return (
        <>
            <div className="left-toolbars">{leftBarList}</div>
        </>
    )
};

export default LeftToolbar;
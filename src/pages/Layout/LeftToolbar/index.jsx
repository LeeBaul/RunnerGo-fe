import React, { useState } from "react";
import cn from 'classnames';
import { Link } from 'react-router-dom';
import './index.less';
import { leftBarItems } from './constant';

const LeftToolbar = () => {
    let [currentPath, setCurrentPath] = useState(`/${location.hash.split('/')[1]}`);

    console.log(currentPath, leftBarItems, location.pathname, location);
    const leftBarList = leftBarItems.map((item, index) => (
        <React.Fragment key={index}>
            <Link to={item.link}>
                <div
                    key={index}
                    className={cn('toolbar-item', {
                        active: currentPath === item.link,
                    })}
                    onClick={() => {
                        setCurrentPath(item.link);
                        console.log(item.link);
                    }}
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
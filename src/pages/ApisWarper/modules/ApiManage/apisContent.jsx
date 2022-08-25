import React, { useRef, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ResizeObserver from 'resize-observer-polyfill';
import { Scale } from 'adesign-react';
import cn from 'classnames';
import ResquestPanel from '@components/Request/requestPanel';
import ResponsePanel from '@components/response/responsePanel';
import { ApisContentWarper } from './style';

const { ScaleItem, ScalePanel } = Scale;

const MIN_SIZE = 40; // 最小化宽度或高度
const MIN_CONTENT_SIZE = 200; // 内容区域宽度不足时最小化

const ApisContent = (props) => {
    const { data, tempData, onChange } = props;

    // 展示方向 1.水平 -1 上下
    const { APIS_TAB_DIRECTION } = useSelector((store) => store?.user?.config);

    const refContainer = useRef(null);

    const [contentLayouts, setContentLayouts] = useState (null);

    const refWrapper = useRef(null);
    useEffect(() => {
        refContainer.current = null;
        const resizeObserver = new ResizeObserver((entries, observer) => {
            for (const entry of entries) {
                const { width, height } = entry.contentRect;
                if (refContainer.current === null) {
                    if (APIS_TAB_DIRECTION > 0) {
                        setContentLayouts({
                            0: { width: width / 2 },
                            1: { flex: 1, width: 0 },
                        });
                    } else {
                        setContentLayouts({
                            0: { height: height / 2 },
                            1: { flex: 1, height: 0 },
                        });
                    }
                }
                refContainer.current = { width, height };
            }
        });
        resizeObserver.observe(refWrapper?.current);
        return () => {
            resizeObserver.disconnect();
        };
    }, [APIS_TAB_DIRECTION]);

    const handleLayoutsChange = (newLayouts) => {
        // 水平方向
        if (APIS_TAB_DIRECTION > 0) {
            if (newLayouts[0].width < MIN_CONTENT_SIZE) {
                // 宽度被压缩时
                setContentLayouts({
                    0: { width: MIN_SIZE },
                    1: { flex: 1, width: 0 },
                });
            } else if (newLayouts[0].width > refContainer.current.width - MIN_CONTENT_SIZE) {
                // 宽度超出剩余内容时
                setContentLayouts({
                    0: { flex: 1, width: 0 },
                    1: { width: MIN_SIZE },
                });
            } else {
                setContentLayouts({
                    0: { width: newLayouts[0].width },
                    1: { flex: 1, width: 0 },
                });
            }
        }

        // 上下方向
        if (APIS_TAB_DIRECTION !== 1) {
            if (newLayouts[0].height < MIN_CONTENT_SIZE) {
                // 高度被压缩时
                setContentLayouts({
                    0: { height: MIN_SIZE },
                    1: { flex: 1, height: 0 },
                });
            } else if (newLayouts[0].height > refContainer.current.height - MIN_CONTENT_SIZE) {
                // 宽度超出剩余内容时
                setContentLayouts({
                    0: { flex: 1, height: 0 },
                    1: { height: MIN_SIZE },
                });
            } else {
                setContentLayouts({
                    0: { height: newLayouts[0].height },
                    1: { flex: 1, height: 0 },
                });
            }
        }
    };

    const handleResetLayouts = () => {
        if (APIS_TAB_DIRECTION > 0) {
            setContentLayouts({
                0: { width: refContainer.current.width / 2 },
                1: { flex: 1, width: 0 },
            });
        } else {
            setContentLayouts({
                0: { height: refContainer.current.height / 2 },
                1: { flex: 1, height: 0 },
            });
        }
    };

    const leftMiniMode =
        (APIS_TAB_DIRECTION > 0 && contentLayouts?.[0]?.width === MIN_SIZE) ||
        (APIS_TAB_DIRECTION !== 1 && contentLayouts?.[0]?.height === MIN_SIZE);

    const rightMiniMode =
        (APIS_TAB_DIRECTION > 0 && contentLayouts?.[1]?.width === MIN_SIZE) ||
        (APIS_TAB_DIRECTION !== 1 && contentLayouts?.[1]?.height === MIN_SIZE);

    return (
        <ApisContentWarper ref={refWrapper}>
            <ScalePanel
                direction={APIS_TAB_DIRECTION > 0 ? 'horizontal' : 'vertical'}
                layouts={contentLayouts}
                onLayoutsChange={handleLayoutsChange}
            >
                <ScaleItem minWidth={40} minHeight={40}>
                    {leftMiniMode ? (
                        <div
                            onClick={handleResetLayouts}
                            className={cn('scale-toggle-box', {
                                vertical: !(APIS_TAB_DIRECTION > 0),
                            })}
                        >
                            请求区
                        </div>
                    ) : (
                        <ResquestPanel data={data?.request || {}} onChange={onChange} />
                    )}
                </ScaleItem>
                <ScaleItem enableScale={false} minWidth={40} minHeight={40}>
                    {rightMiniMode ? (
                        <div
                            onClick={handleResetLayouts}
                            className={cn('scale-toggle-box', {
                                vertical: !(APIS_TAB_DIRECTION > 0),
                            })}
                        >
                            响应区
                        </div>
                    ) : (
                        <ResponsePanel
                            direction={APIS_TAB_DIRECTION > 0 ? 'horizontal' : 'vertical'}
                            tempData={tempData || {}}
                            data={data || {}}
                            onChange={onChange}
                        />
                    )}
                </ScaleItem>
            </ScalePanel>
        </ApisContentWarper>
    );
};

export default ApisContent;
import React, { useRef, useState } from 'react';
import { Dropdown, Message, Button, Modal } from 'adesign-react';
import {
  Setting as SettingSvg,
  InterNet as InterNetSvg,
  Duration as DurationSvg,
  Down as DownSvg,
  Add as AddSvg,
  Setting1 as Setting1Svg,
  Delete as DeleteSvg,
} from 'adesign-react/icons';
import { v4 as uuidv4 } from 'uuid';
import DownloadSvg from '@assets/apis/download.svg';
import { download, timeStatus } from '@utils';
import isString from 'lodash/isString';
import { cloneDeep, floor, isNumber, isPlainObject } from 'lodash';
import {
  ResponseStatusWrapper,
  ResponseStatusRight,
  HopeListWrapper,
  TimingPhasesModal,
  NetworkPanel,
} from './style';
import CreateExample from './coms/createExample';

const ResponseStatus = (props) => {
  const { data, tempData, onChange, response, diyExampleKey, setDiyExampleKey } = props;

  const [exampleVisible, setExamepleVisible] = useState(false);
  const [example, setExample] = useState(null);
  const [exampleKey, setExampleKey] = useState(null);

  const refDropdown = useRef(null);
  const handleDownload = () => {
    const { resMime, fitForShow, rawBody, stream, filename } = data;
    const name = `接口响应数据.${resMime?.ext}`;
    download(
      isString(fitForShow) && fitForShow === 'Monaco' ? rawBody : stream,
      filename || name,
      resMime?.mime
    );
  };

  const textObj = {
    success: '成功',
    error: '失败',
  };

  const sizeStatus = (size) => {
    size = +size;
    let str = '';
    if (size < 1024) {
      str = `${size.toFixed(2)}kb`;
    } else if (size < 1024 * 1024) {
      str = `${(size / 1024).toFixed(2)}mb`;
    }
    return str;
  };

  const dropdownClick = (key) => {
    setDiyExampleKey(key);
    refDropdown.current?.setPopupVisible(false);
  };

  return (
    <>
      {exampleVisible && (
        <CreateExample
          onCancel={() => {
            setExamepleVisible(false);
          }}
          onSubmit={(data) => {
            if (isPlainObject(example)) {
              // 新增响应示例
              onChange('example', data, exampleKey);
              Message('success', '修改示例成功。');
            } else {
              // 新增响应示例
              onChange('example', data, uuidv4());
              Message('success', '新建示例成功。');
            }
            setExamepleVisible(false);
          }}
          example={example}
          exampleKey={exampleKey}
        ></CreateExample>
      )}
      <div className={ResponseStatusWrapper}>
        <div className="status-left">
          <div
            className="create-example apipost-light-btn"
            onClick={() => {
              setExample(null);
              setExamepleVisible(true);
            }}
          >
            <AddSvg width={16} />
            新建响应示例
          </div>
          <Dropdown
            ref={refDropdown}
            placement="bottom-end"
            content={Object.keys(response).map((key) => {
              return (
                <div key={key} className={HopeListWrapper} onClick={() => dropdownClick(key)}>
                  <div className="hope-item">
                    {`${response[key]?.expect?.name || textObj[key] || '暂无名称'}${
                      response[key].hasOwnProperty('expect') &&
                      String(response[key]?.expect?.code).length > 0
                        ? `(${response[key].expect.code})`
                        : ''
                    }`}
                  </div>
                  {!['success', 'error'].includes(key) && (
                    <Button
                      size="mini"
                      onClick={(e) => {
                        e.stopPropagation();
                        Modal.confirm({
                          title: '提示',
                          content: `确定要删除${
                            response[key]?.name || textObj[key] || '响应'
                          }示例吗？`,
                          onOk() {
                            const newResponse = cloneDeep(response);
                            delete newResponse[key];
                            onChange('response', newResponse);
                            if (response.hasOwnProperty(diyExampleKey)) {
                              setDiyExampleKey(Object.keys(newResponse)[0]);
                            }
                          },
                        });
                      }}
                    >
                      <DeleteSvg width="16px" height="16px" />
                    </Button>
                  )}
                  <Button
                    size="mini"
                    onClick={(e) => {
                      e.stopPropagation();
                      setExampleKey(key);
                      setExample(response[key]);
                      setExamepleVisible(true);
                    }}
                  >
                    <Setting1Svg width="16px" height="16px" />
                  </Button>
                </div>
              );
            })}
          >
            <div className="more-btn apipost-light-btn">
              {isString(response[diyExampleKey]?.expect?.name)
                ? response[diyExampleKey].expect.name
                : textObj[diyExampleKey] || '响应示例'}
              <DownSvg width={16} />
            </div>
          </Dropdown>
        </div>
        {tempData.hasOwnProperty('response') && (
          <div className={ResponseStatusRight}>
            <div className="status-group">
              <SettingSvg className="success" />
              <span className="success">{data?.resposneAt}</span>
            </div>
            <div className="status-group">
              <div>响应码：</div>
              <span className={data?.code === 200 ? 'success' : 'error'}>{data?.code}</span>
            </div>

            <Dropdown
              style={{ width: 291, maxHeight: 176 }}
              placement="top-end"
              content={
                <div className={TimingPhasesModal}>
                  <div className="timingPhases_modal_title">
                    <div className="timing_name">事件</div>
                    <div className="timing_schedule"></div>
                    <div className="timing_ms">耗时</div>
                  </div>
                  {isPlainObject(data?.timingPhases) && (
                    <>
                      <div className="timingPhases_modal_item">
                        <div className="timing_name">Wait</div>
                        <div className="timing_schedule"></div>
                        <div className="timing_ms">
                          {isNumber(data?.timingPhases?.wait) && floor(data?.timingPhases?.wait, 2)}
                          ms
                        </div>
                      </div>
                      <div className="timingPhases_modal_item">
                        <div className="timing_name">Dns</div>
                        <div className="timing_schedule"></div>
                        <div className="timing_ms">
                          {isNumber(data?.timingPhases?.dns) && floor(data?.timingPhases?.dns, 2)}ms
                        </div>
                      </div>
                      <div className="timingPhases_modal_item">
                        <div className="timing_name">Tcp</div>
                        <div className="timing_schedule"></div>
                        <div className="timing_ms">
                          {isNumber(data?.timingPhases?.tcp) && floor(data?.timingPhases?.tcp, 2)}ms
                        </div>
                      </div>
                      <div className="timingPhases_modal_item">
                        <div className="timing_name">SecureHandshake</div>
                        <div className="timing_schedule"></div>
                        <div className="timing_ms">
                          {isNumber(data?.timingPhases?.secureHandshake) &&
                            floor(data?.timingPhases?.secureHandshake, 2)}
                          ms
                        </div>
                      </div>
                      <div className="timingPhases_modal_item">
                        <div className="timing_name">FirstByte</div>
                        <div className="timing_schedule"></div>
                        <div className="timing_ms">
                          {isNumber(data?.timingPhases?.firstByte) &&
                            floor(data?.timingPhases?.firstByte, 2)}
                          ms
                        </div>
                      </div>
                      <div className="timingPhases_modal_item">
                        <div className="timing_name">Download</div>
                        <div className="timing_schedule"></div>
                        <div className="timing_ms">
                          {isNumber(data?.timingPhases?.download) &&
                            floor(data?.timingPhases?.download, 2)}
                          ms
                        </div>
                      </div>
                      <div className="timingPhases_modal_total">
                        <div className="timing_name">总耗时</div>
                        <div className="timing_schedule"></div>
                        <div className="timing_ms">
                          {isNumber(data?.timingPhases?.total) &&
                            floor(data?.timingPhases?.total, 2)}
                          ms
                        </div>
                      </div>
                    </>
                  )}
                </div>
              }
            >
              <div className="status-group cursor">
                <DurationSvg className="success" />
                <span className="success">{timeStatus(data?.responseTime)}</span>
              </div>
            </Dropdown>

            <div className="status-group">
              <span>{sizeStatus(data?.responseSize)}</span>
            </div>
            <Dropdown
              style={{ width: 291, maxHeight: 160 }}
              placement="top-end"
              content={
                <div className={NetworkPanel}>
                  <div className="internet_modal_title">网络</div>
                  {/* {!isClient() && (
              )} */}
                  <div className="internet_modal_local">
                    <div>Agent</div>
                    <div>{data?.netWork?.agent}</div>
                  </div>
                  {data?.netWork?.address?.local?.address ? (
                    <div className="internet_modal_local">
                      <div>本地网络</div>
                      <div>{data?.netWork?.address?.local?.address}</div>
                    </div>
                  ) : null}
                  {data?.netWork?.address?.remote?.address ? (
                    <div className="internet_modal_remote">
                      <div>远端网络</div>
                      <div>{data?.netWork?.address?.remote?.address}</div>
                    </div>
                  ) : null}
                </div>
              }
            >
              <div className="status-group">
                <InterNetSvg className="cursor" />
              </div>
            </Dropdown>
            <div className="status-group">
              <DownloadSvg className="cursor" onClick={handleDownload} />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ResponseStatus;

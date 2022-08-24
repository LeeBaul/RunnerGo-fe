import React from 'react';
import { Modal, Button } from 'adesign-react';
import { Delete as SvgDelete, Recovery as SvgRecovery } from 'adesign-react/icons';
import { APIMETHODS, APIMETHODENUMS } from '@constants/api';

const Apis = (props) => {
  const { data, filter, onRestoreDestory } = props;

  const dataList = data.filter(
    (d) => `${d.name}`.toLowerCase().indexOf(filter.toLowerCase()) !== -1
  );

  const handleDelete = (folder) => {
    Modal.confirm({
      title: '提示',
      content: '确定要彻底删除该API/文本信息？将不可恢复',
      onOk() {
        onRestoreDestory && onRestoreDestory(folder.target_id, 2);
      },
    });
  };

  const handleRestore = (folder) => {
    Modal.confirm({
      title: '提示',
      content: '是否需要恢复API/文本信息？',
      onOk() {
        onRestoreDestory && onRestoreDestory(folder.target_id, 1);
      },
    });
  };

  return (
    <>
      <div className="apis-list">
        {dataList.map((item) => (
          <div className="item-li" key={item.target_id}>
            <div className="item-titles">
              <div className="titles">
                {item.target_type === 'doc' && (
                  <span style={{ color: 'var(--method3)' }}>文本</span>
                )}
                {item.target_type === 'websocket' && (
                  <span style={{ color: '#DF7B07', width: 20, overflow: 'hidden' }}>WS</span>
                )}
                {item.target_type === 'grpc' && (
                  <span style={{ color: '#DF7B07', width: 20, overflow: 'hidden' }}>grpc</span>
                )}
                {item.target_type === 'api' && (
                  <span
                    style={{
                      color: APIMETHODS[item.method],
                      width: 36,
                      overflow: 'hidden',
                    }}
                  >
                    {APIMETHODENUMS[item.method]}
                  </span>
                )}
                <dd>{item.name}</dd>
              </div>
              <div className="urls">{item?.url || item?.request?.url || ''}</div>
            </div>
            <div className="btns">
              <Button
                className="btn-delete"
                onClick={() => {
                  handleDelete(item);
                }}
              >
                <SvgDelete width={16} />
                彻底删除
              </Button>
              <Button
                onClick={() => {
                  handleRestore(item);
                }}
              >
                <SvgRecovery width={16} />
                恢复接口/文本
              </Button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Apis;

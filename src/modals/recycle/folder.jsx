import React from 'react';
import { Modal, Button } from 'adesign-react';
import { Delete as SvgDelete, Recovery as SvgRecovery } from 'adesign-react/icons';

const Folders = (props) => {
  const { data, filter, onRestoreDestory } = props;
  const dataList = data.filter(
    (d) => `${d.name}`.toLowerCase().indexOf(filter.toLowerCase()) !== -1
  );

  const handleDelete = (folder) => {
    Modal.confirm({
      title: '提示',
      content: '确定要彻底删除该目录？将不可恢复',
      onOk() {
        onRestoreDestory && onRestoreDestory(folder.target_id, 2);
      },
    });
  };

  const handleRestore = (folder) => {
    Modal.confirm({
      title: '提示',
      content: '确定要恢复目录吗？',
      onOk() {
        onRestoreDestory(folder.target_id, 1);
      },
    });
  };

  return (
    <>
      <div className="folder-list">
        {dataList.map((item) => (
          <div className="item-li" key={item.target_id}>
            <div className="item-title">{item.name}</div>
            <div className="btns">
              <Button
                className="btn-delete"
                onClick={() => {
                  handleDelete(item);
                }}
              >
                <SvgDelete width={16} />
                彻底删除目录
              </Button>
              <Button
                onClick={() => {
                  handleRestore(item);
                }}
              >
                <SvgRecovery width={16} />
                恢复目录
              </Button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Folders;

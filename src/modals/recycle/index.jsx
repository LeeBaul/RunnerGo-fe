import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal, Button, Tabs as TabComponent, Message, Input } from 'adesign-react';
import { Refresh2 as RefreshSvg, Search } from 'adesign-react/icons';
import { isLogin } from '@utils/common';
import { restoreApiRequest } from '@services/apis';
// import { pushTask } from '@asyncTasks/index';
import { global$ } from '@hooks/useGlobal/global';
import Api from './api';
import Folder from './folder';
import { RecycleModalWrapper } from './style';

const { Tabs, TabPan } = TabComponent;

const Recycle = (props) => {
  const { onCancel } = props;
  const dispatch = useDispatch();
  const project_id = useSelector((store) => store?.workspace?.CURRENT_PROJECT_ID);

  const [dataList, setDataList] = useState([]);
  const [filter, setFilter] = useState('');

  const getDeleteFolder = async () => {
    const allData = await Collection.where('project_id').anyOf(project_id).toArray();
    let delData = allData.filter((item) => item.status === -1);
    delData = delData.sort((a, b) => Number(b.update_dtime) - Number(a.update_dtime));
    setDataList(delData);
  };

  useEffect(() => {
    getDeleteFolder();
  }, []);

  const handleRestoreDestory = async (target_id, type) => {
    if (type === 1) {
      const recycleData = await Collection.get(target_id);
      if (recycleData === undefined) {
        return;
      }
      await Collection.update(target_id, {
        status: 1,
      });

      global$.next({
        action: 'RELOAD_LOCAL_COLLECTIONS',
        payload: project_id,
      });

      Message('success', '恢复成功');
      if (isLogin()) {
        restoreApiRequest({
          project_id,
          target_id,
          type: 1,
        }).subscribe({
          next(resp) {
            if (resp?.code === 10000) {
            }
          },
          error() {
            pushTask({
              task_id: `${project_id}/${target_id}`,
              action: 'FOREVER',
              model: 'API',
              payload: {
                project_id,
                target_id,
                type: 1,
              },
              project_id,
            });
          },
        });
      }
    } else if (type === 2) {
      await Collection.update(target_id, {
        status: -99,
      });
      Message('success', '删除成功');
      if (isLogin()) {
        restoreApiRequest({
          project_id,
          target_id,
          type: 2,
        }).subscribe({
          next(resp) {
            if (resp?.code === 10000) {
            }
          },
          error() {
            pushTask({
              task_id: `${project_id}/${target_id}`,
              action: 'FOREVER',
              model: 'API',
              payload: {
                project_id,
                target_id,
                type: 2,
              },
              project_id,
            });
          },
        });
      }
    }
    getDeleteFolder();
  };

  const renderTabPanel = ({ headerTabItems }) => {
    return (
      <div className="apipost-tabs-header">
        {headerTabItems}
        <div>
          <Input
            value={filter}
            size="mini"
            beforeFix={<Search width={16} />}
            onChange={(val) => {
              setFilter(val);
            }}
          />
        </div>
      </div>
    );
  };

  return (
    <>
      <Modal
        visible
        onCancel={onCancel}
        footer={
          <>
            <div className="recycle-modal-footer">
              <Button className="refresh-btn" onClick={getDeleteFolder}>
                <RefreshSvg width={16} />
                刷新
              </Button>
              <Button onClick={onCancel}>关闭</Button>
            </div>
          </>
        }
        className={RecycleModalWrapper}
      >
        <div>
          <Tabs defaultActiveId="0" headerRender={renderTabPanel}>
            <TabPan id="0" title="已删除目录">
              <Folder
                data={dataList.filter((item) => item.target_type === 'folder')}
                filter={filter}
                onRestoreDestory={handleRestoreDestory}
              />
            </TabPan>
            <TabPan id="1" title="已删除API/文档">
              <Api
                data={dataList.filter((item) => item.target_type !== 'folder')}
                filter={filter}
                onRestoreDestory={handleRestoreDestory}
              />
            </TabPan>
          </Tabs>
        </div>
      </Modal>
    </>
  );
};

export default Recycle;

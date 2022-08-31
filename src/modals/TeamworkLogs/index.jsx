import React, { useEffect, useState, useRef } from 'react';
import { Modal, Button, Select, Input, Tooltip } from 'adesign-react';
import { Down as DownSvg } from 'adesign-react/icons';
import cn from 'classnames';
import dayjs from 'dayjs';
import { getSynergykLogs } from '@services/projects';
import Collapse from '@components/Collapse';
import HandleTags from '../../components/HandleTags';
import { useSelector } from 'react-redux';
import { actioinType } from './constant';
import { TeamworkLosWrapper } from './style';
import { fetchOperationLog } from '@services/dashboard';
import { tap } from 'rxjs';
import avatar from '@assets/logo/avatar.png';

const Option = Select.Option;

const pageSizeList = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

const TeamworkLogs = (props) => {
  const { onCancel } = props;
  const project_id = useSelector((store) => store?.workspace?.CURRENT_PROJECT_ID);

  const [init, setInit] = useState(true);
  const [page, setPage] = useState(1);
  const [tempPage, setTempPage] = useState(1);
  const [pageSize, setPageSize] = useState(30);
  const [maxPage, setMaxPage] = useState(1);

  const [list, setList] = useState([]);

  const refTooltip = useRef(null);

  useEffect(() => {
    const listener1 = () => {
      // console.log(refTooltip);
      refTooltip?.current?.setPopupVisible(false);
    };

    const query = {
      team_id: sessionStorage.getItem('team_id'),
      page: 1,
      size: 20
    }

    fetchOperationLog(query)
      .pipe(
        tap((res) => {
          const { code, data } = res;

          if (code === 0) {
            const { operations } = data;
            let list = [];
            operations.forEach(item => {
              const itemData = {
                ...item,
                time: dayjs(item.created_time_sec * 1000).format('YYYY-MM-DD'),
                created_time_sec: dayjs(item.created_time_sec * 1000).format('YYYY-MM-DD hh:mm:ss'),
              };

              if (list.length === 0) {
                list.push({
                  time: itemData.time,
                  created_time_sec: itemData.created_time_sec,
                  data: [itemData]
                });
              } else {
                for (let i = 0; i < list.length; i++) {
                  if (list[i].time === itemData.time) {
                    list[i].data.push(itemData);
                  } else if (i === list.length - 1) {
                    list.push({
                      time: itemData.time,
                      created_time_sec: itemData.created_time_sec,
                      data: [itemData]
                    });
                  }
                }
              }
            });
            // console.log(list);
            setList(list);
          }
        })
      )
      .subscribe();

    document.body.addEventListener('wheel', listener1);
    return () => {
      document.body.removeEventListener('wheel', listener1);
    };
  }, []);

  const handleJumpPage = () => {
    setPage(tempPage);
  };

  // 按日期对数据进行处理
  const sortArrByDate = function (arr) {
    const newArr = [];
    arr.forEach((it) => {
      let index = -1;
      // eslint-disable-next-line array-callback-return
      const isHas = newArr.some((logItem, j) => {
        if (it.time === logItem.time) {
          index = j;
          return true;
        }
      });
      if (!isHas) {
        newArr.push({
          time: it.time,
          data: [it],
        });
      } else {
        newArr[index].data.push(it);
      }
    });
    // console.log(newArr);
    return newArr;
  };

  const getLogList = () => {
    getSynergykLogs({
      project_id,
      page,
      page_size: pageSize,
    }).subscribe({
      next(resp) {
        if (resp?.code === 10000) {
          let max = Math.ceil(resp?.data.total / resp?.data.page_size);
          if (max === 0) max = 1;
          setMaxPage(max);
          resp?.data?.data.forEach((it) => {
            it.time = dayjs(it?.message?.subject?.modify_time * 1000).format('YYYY-MM-DD');
          });
          const newList = sortArrByDate(resp?.data?.data || []);
          setList(newList);
        }
      },
    });
  };

  useEffect(() => {
    setTempPage(page);
    getLogList();
  }, [page]);

  useEffect(() => {
    if (init) {
      setInit(false);
      return;
    }
    if (page === 1) {
      getLogList();
    } else {
      setPage(1);
    }
  }, [pageSize]);
  const Intercept = (str) => {
    // if (str[0] === '(') {
    //   return str.slice(str.indexOf(')') + 1);
    // }
    return str;
  };

  const LogsFooter = () => (
    <div className="teamwork-log-footer">
      <div className="footer-left">
        <div className="pagination">
          <Select
            value={pageSize}
            onChange={(a) => {
              setPageSize(a);
            }}
          >
            {pageSizeList.map((item) => (
              <Option key={item} value={item}>
                {item}
              </Option>
            ))}
          </Select>
          <Button
            type="primary"
            disabled={page === 1}
            style={page === 1 ? { backgroundColor: 'rgba(0, 0, 0, 0.06)', color: '#999999' } : {}}
            onClick={() => setPage((pre) => pre - 1)}
          >
            上一页
          </Button>
          <Input
            value={tempPage}
            forceUseValue
            onChange={(val) => {
              if (isNaN(+val)) return;
              if (+val > maxPage) val = maxPage;
              if (val === '') val = 1;

              setTempPage(val);
            }}
          />
          <Button
            type="primary"
            disabled={page === maxPage}
            style={
              page === maxPage ? { backgroundColor: 'rgba(0, 0, 0, 0.06)', color: '#999999' } : {}
            }
            onClick={() => setPage((pre) => pre + 1)}
          >
            下一页
          </Button>
          <Button type="primary" onClick={handleJumpPage}>
            跳转
          </Button>
        </div>
        <div className="log_reload">
          {/* <LogReload /> */}
          {/* 刷新 */}
        </div>
      </div>
      <Button onClick={onCancel}>关闭</Button>
    </div>
  );

  const TitleTime = (time) => {
    const dayIndex = dayjs().diff(dayjs(time), 'day');
    const currentTime = dayIndex === 0 ? '今天' : dayIndex === 1 ? '昨天' : time;
    return (
      <div>
        <span>{currentTime}</span>
        <span className="right-select">
          <DownSvg />
        </span>
      </div>
    );
  };

  const actionType = (logItem) => {
    if (logItem?.message?.tag === 'archive') return '归档';
    if (
      logItem?.message?.primary_type === 'project-description' &&
      logItem?.message?.action === 'update'
    )
      return '变更';
    const typeStr = actioinType[logItem?.message?.action] || ' 未知';
    return typeStr;
  };

  return (
    <Modal
      className={TeamworkLosWrapper}
      visible
      title="协作日志（仅保存两天记录）"
      onCancel={onCancel}
      footer={<>{LogsFooter()}</>}
    >
      <div className="teamwork-log">
        <div className="teamwork-log-title">
          <div className="operator">操作人</div>
          <div className="action">操作目标</div>
          <div className="time">操作时间</div>
        </div>
        <div className="teamwork-log-content">
          {list?.map((it, index) => (
            <Collapse
              key={index}
              defaultValue={list?.map((logItem) => logItem.time)}
              className="teamwork-log_collapse"
              contentClassName="teamwork-log_collapse_con"
              options={[
                {
                  title: <>{TitleTime(it?.time)}</>,
                  keys: it.time,
                  render: () =>
                    it?.data?.map((logItem, logIndex) => (
                      <div key={logIndex} className="teamwork-log_collapse_con_item">
                        <div className="operator">
                          <img className="avatar" src={logItem.user_avatar || avatar} alt="" />
                          <div>{logItem.user_name}</div>
                          {logItem.user_status === -1 && <span className="logOff">已注销</span>}
                        </div>
                        <div className="action">
                          <HandleTags type={logItem.category} />
                          <Tooltip
                            ref={refTooltip}
                            placement="bottom"
                            offset={[6, 15]}
                            showArrow
                            content={
                              <div className="tiptitle">
                                {logItem?.message?.action === 'lock' ||
                                  logItem?.message?.action === 'unlock'
                                  ? logItem?.message?.subject?.modify_subject.slice(
                                    0,
                                    logItem?.message?.subject?.modify_subject.length - 3
                                  )
                                  : Intercept(logItem?.message?.subject?.modify_subject)}
                              </div>
                            }
                          >
                            <div className="text-ellipsis" style={{marginLeft: '6px'}}>
                              {/* {logItem?.message?.action === 'lock' ||
                                logItem?.message?.action === 'unlock'
                                ? logItem?.message?.subject?.modify_subject.slice(
                                  0,
                                  logItem?.message?.subject?.modify_subject.length - 3
                                )
                                : Intercept(logItem?.message?.subject?.modify_subject)} */}
                                { logItem.name }
                            </div>
                          </Tooltip>
                        </div>
                        <div className="time">
                          { it.created_time_sec }
                        </div>
                      </div>
                    )),
                },
              ]}
            />
          ))}
        </div>
      </div>
    </Modal>
  );
};

export default TeamworkLogs;

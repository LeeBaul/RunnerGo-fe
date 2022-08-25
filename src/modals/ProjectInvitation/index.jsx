/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { cloneDeep, findIndex, uniqBy, remove, filter, isObject } from 'lodash';
import { Modal, Button, Input, Select, CheckBox, Message, Spin } from 'adesign-react';
import { FE_BASEURL } from '@config/index';
import {
  getTeamListWithProject,
  getProjectInviteUrl,
  addProjectPersonnel,
  getInviteRole,
  getTeamPlaceCount,
} from '@services/projects';
import Subtract from '@assets/invite/subtract.svg';
import ConnectIcon from '@assets/invite/blueconnect.svg';
import UnionIcon from '@assets/invite/union.svg';
import { EamilReg, copyStringToClipboard } from '@utils';
import { InviteModalWrapper } from './style';
import './index.less';
import PaymentModal from './Payment/modal';
import PayAddSuccessModal from './PayAddSuccessModal';

import { fetchInviteMember } from '@services/user';
import Bus from '@utils/eventBus';
import { tap } from 'rxjs';

const Option = Select.Option;
const InvitationModal = (props) => {
  const project_id = useSelector((store) => store?.workspace?.CURRENT_PROJECT_ID);
  const team_id = useSelector((store) => store?.workspace?.CURRENT_TEAM_ID);
  const userInfo = useSelector((store) => store.user.userInfo);

  // console.log(userInfo, 'userInfo++++');

  const { projectInfoAll, onCancel } = props;

  const [projectList, setProjectList] = useState([]);
  const [addList, setAddList] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [selectValue, setSelectValue] = useState('readwrite');
  const [needBuyStation, setNeedBuyStation] = useState(0);
  const [groupCode, setGroupCode] = useState(0);
  const [successPer, setSuccessPer] = useState(0);
  const [payAddSuccessVisible, setPayAddSuccessVisible] = useState(false);
  const [noRegisters, setNoRegisters] = useState(0);
  const [payvisible, setPayvisible] = useState(false);
  const [ifSelectAll, setIfSelectAll] = useState(false);
  const [usedStation, setUsedStation] = useState(0);
  const [remainderStation, setRemainderStation] = useState(0);
  const [linkPower, setLinkPower] = useState('readonly');
  const [role, setRole] = useState([]);
  const [spinning, setSpinning] = useState(true);
  const current_project_id = project_id;
  const current_team_id = team_id;

  const changeTeamInvitation = (type, invitationPersonnel) => {
    const inputTempValue = invitationPersonnel?.email || inputValue.trim();
    const selectTempValue = selectValue;
    let teampAddList = cloneDeep(addList);
    const tempProjectList = cloneDeep(projectList);
    const index = findIndex(tempProjectList, { user: { email: inputTempValue } });
    const projectListIndex = projectList.findIndex(
      (i) => i.user.email === invitationPersonnel?.email || i.user.email === inputTempValue
    );
    if (type === 'add') {
      if (!EamilReg(inputTempValue)) {
        Message('error', '请输入正确的邮箱格式。');
        return;
      }
      if (teampAddList.length >= 50) {
        Message('error', '一次最多邀请50人。');
        return;
      }
      if (
        tempProjectList.findIndex((ii) => inputTempValue === ii.user.email && ii.in_project) > -1
      ) {
        Message('error', '该邮箱已在项目中');
        return;
      }
      if (selectValue === 'readonly') {
        teampAddList = [
          {
            key: uuidv4(),
            email: inputTempValue,
            power: selectTempValue,
            noAdd: projectListIndex > -1,
          },
          ...teampAddList,
        ];
      } else {
        teampAddList = [
          {
            key: uuidv4(),
            email: inputTempValue,
            power: selectTempValue,
            noAdd: projectListIndex > -1 && projectList[projectListIndex]?.is_readonly === 1,
          },
          ...teampAddList,
        ];
      }
      teampAddList = uniqBy(teampAddList, 'email');
      // 添加后清空输入框内容
      setInputValue('');
    } else if (type === 'delete') {
      remove(teampAddList, (n) => invitationPersonnel.key === n.key);
    } else if (type === 'change') {
      filter(teampAddList, (i) => {
        if (i.key === invitationPersonnel.key) {
          i.power = invitationPersonnel.power;
        }
        return i;
      });
    }
    const d = teampAddList.filter((ii) => ii?.noAdd && ii?.power !== 'readonly');
    let usedStationTemp = usedStation;
    let usedStationTemp1 = usedStation - d.length;
    for (let i = teampAddList.length - 1; i >= 0; i--) {
      const add = teampAddList[i];
      if (add.power !== 'readonly') {
        if (add?.noAdd) {
          usedStationTemp1++;
          teampAddList[i].usedStation = usedStationTemp1;
        } else {
          usedStationTemp++;
          teampAddList[i].usedStation = usedStationTemp;
        }
      }
    }
    if (usedStationTemp > remainderStation) {
      setNeedBuyStation(usedStationTemp - remainderStation);
    } else {
      setNeedBuyStation(0);
    }
    // 更改右边团队人员列表状态
    if (index !== -1) {
      setProjectList(
        (pre) =>
          pre &&
          pre.map((i) => {
            if (
              (i.user.email === invitationPersonnel?.email || i.user.email === inputTempValue) &&
              type !== 'change'
            ) {
              i.checked = type === 'add';
            }
            return i;
          })
      );
    }
    setAddList(teampAddList);
  };

  useEffect(() => {
    getTeamPlaceCount({ team_id: current_team_id }).subscribe({
      next(resp) {
        if (resp?.code === 10000) {
          setRemainderStation(resp.data.write);
          setUsedStation(parseInt(resp.data.write, 10) - parseInt(resp.data.reste_write, 10));
        }
      },
    });
    getTeamListWithProject({
      team_id: current_team_id,
      project_id: current_project_id,
    }).subscribe({
      next(res) {
        if (res?.code === 10000) {
          setProjectList(res.data);
        }
      },
    });
    getInviteRole({ project_id: current_project_id }).subscribe({
      next(resp) {
        if (resp?.code === 10000) {
          setRole(resp.data.role);
          if (resp.data.role && resp.data.role.length === 1 && resp.data.role[0] === 1) {
            setSelectValue('readonly');
          }
        }
      },
    });
    setSpinning(false);
  }, []);

  const computeStation = (item) => {
    if (item.power === 'readonly') {
      return <span className="free-span">免费</span>;
    }
    if (item.usedStation > remainderStation) {
      return <span className="need-buy-span">需购买</span>;
    }
    return <span className="surplus-span">{`${item.usedStation}/${remainderStation}`}</span>;
  };

  const renderOptions = () => {
    if (role.length > 0) {
      const result = [];
      role.forEach((item) => {
        switch (item) {
          case 1:
            result.push(
              <Option key="readonly" value="readonly">
                只读工位
              </Option>
            );
            break;
          case 2:
            result.push(
              <Option key="readwrite" value="readwrite">
                读写工位
              </Option>
            );
            break;
          default:
            break;
        }
      });
      return result;
    }
    return [];
  };

  // 是否允许添加
  const checkShouldOnChange = (checked) => {
    if (!checked) {
      return true;
    }
    const teampAddList = cloneDeep(addList);
    if (teampAddList.length >= 50) {
      Message('error', '一次最多邀请50人。');
      return false;
    }
    return true;
  };

  // 用户列表选择
  const teamPersonnelCheckOne = (item, val, isALl = false) => {
    // shouldOnChange={(checked) => checkShouldOnChange(checked)}
    const checked = val === 'checked' || val === true;
    const shouldChange = checkShouldOnChange(checked);
    if (!shouldChange && !checked) return;

    const teampList = cloneDeep(projectList);
    let teampAddList = cloneDeep(addList);
    const userRole = role.filter((ite) => ite === 2).length > 0;
    const { user } = item;
    if (teampAddList.length >= 50) {
      Message('error', '一次最多邀请50人。');
      return false;
    }
    setProjectList(
      filter(teampList, (o) => {
        if (item.uuid === o.uuid) {
          o.checked = checked;
        }
        return o;
      })
    );

    if (checked) {
      let tempRead = {};
      if (
        findIndex(teampAddList, (o) => o.email === user?.email || o.uuid === item.uuid) === -1
      ) {
        tempRead = {
          key: uuidv4(),
          email: user?.email,
          uuid: item.uuid,
          power: item.is_readonly === 1 && userRole ? 'readwrite' : 'readonly',
          nick_name: user?.nick_name,
          portrait: user?.portrait,
          noAdd: item.is_readonly === 1,
        };
        if (isALl) {
          return tempRead;
        }
        teampAddList = [tempRead, ...teampAddList];
      }
    } else {
      if (isALl) {
        return item;
      }
      remove(teampAddList, (l) => l.email === user.email || l.uuid === item.uuid);
    }
    const d = teampAddList.filter((ii) => ii?.noAdd && ii?.power !== 'readonly');
    let usedStationTemp = usedStation;
    let usedStationTemp1 = usedStation - d.length;
    for (let i = teampAddList.length - 1; i >= 0; i--) {
      const add = teampAddList[i];
      if (add.power !== 'readonly') {
        if (add?.noAdd) {
          usedStationTemp1++;
          teampAddList[i].usedStation = usedStationTemp1;
        } else {
          usedStationTemp++;
          teampAddList[i].usedStation = usedStationTemp;
        }
      }
    }
    if (usedStationTemp > remainderStation) {
      setNeedBuyStation(usedStationTemp - remainderStation);
    } else {
      setNeedBuyStation(0);
    }
    setAddList(teampAddList);
    return true;
  };
  const teamPersonnelCheckAll = () => {
    const tempList = cloneDeep(projectList);
    let teampAddList = cloneDeep(addList);
    let d = [];
    for (let index = tempList.length - 1; index >= 0; index--) {
      const item = tempList[index];
      if (!item.in_project) {
        const shouldCheck = checkShouldOnChange(!ifSelectAll);
        if (shouldCheck) {
          const personCheckOne = teamPersonnelCheckOne(item, !ifSelectAll, true);
          if (isObject(personCheckOne)) d = [personCheckOne, ...d];
          if (!personCheckOne) {
            return null;
          }
        } else {
          return null;
        }
      }
    }
    setProjectList((preSate) => {
      const data =
        preSate &&
        preSate.map((it) => {
          it = {
            ...it,
            checked: !ifSelectAll,
          };
          return it;
        });
      return data;
    });
    // console.log(teampAddList);
    if (!ifSelectAll) {
      teampAddList = [...d, ...teampAddList];
    } else {
      teampAddList = teampAddList.filter((it) => {
        const index =
          d && d.findIndex((item) => item.uuid === it.uuid || item.user.email === it.email);
        return !(index > -1);
      });
    }
    let usedStationTemp = usedStation;
    let usedStationTemp1 = usedStation - d.filter((ii) => ii?.power !== 'readonly').length;
    for (let i = teampAddList.length - 1; i >= 0; i--) {
      const add = teampAddList[i];
      if (add.power !== 'readonly') {
        if (add?.noAdd) {
          usedStationTemp1++;
          teampAddList[i].usedStation = usedStationTemp1;
        } else {
          usedStationTemp++;
          teampAddList[i].usedStation = usedStationTemp;
        }
      }
    }
    if (usedStationTemp > remainderStation) {
      setNeedBuyStation(usedStationTemp - remainderStation);
    } else {
      setNeedBuyStation(0);
    }
    teampAddList = uniqBy(teampAddList, 'email');
    setAddList(teampAddList);
    setIfSelectAll(!ifSelectAll);
  };
  const onSubmit = () => {
    const params = {
      team_id: window.team_id,
      member_email: addList.map(item => item.email)
    }
    fetchInviteMember(params)
    .pipe(
      tap((res) => {
        const { code } = res;
      
        if (code === 0) {
          Message('success', '邀请成功!');
          Bus.$emit('getTeamMemberList');
          setAddList([]);
        } else {
          Message('error', '邀请失败!');
        }
      })
    )
    .subscribe();
    return;
    const submitObj = {
      project_id: current_project_id,
      invitees: [],
    };
    const teampAddList = cloneDeep(addList);
    teampAddList.forEach((item) => {
      if (item.email && item.email.length > 0) {
        submitObj.invitees.push({
          email: item.email,
          role: item.power === 'readonly' ? 1 : 2,
        });
      } else {
        submitObj.invitees.push({
          uuid: item.uuid,
          role: item.power === 'readonly' ? 1 : 2,
        });
      }
    });
    if (submitObj?.invitees?.length < 1) {
      Message('error', '请添加需要邀请人员');
      return;
    }
    addProjectPersonnel(submitObj).subscribe({
      next(resp) {
        if (resp?.code === 10000) {
          setSuccessPer(resp.data.success);
          setNoRegisters(resp.data.not_registers);
          setGroupCode(resp.data.group_code);
          if (resp.data.reserve && resp.data.reserve > 0) {
            setNeedBuyStation(resp.data.reserve);
            setPayvisible(true);
          } else {
            setPayAddSuccessVisible(true);
          }
        }
      },
    });
  };
  const PayAddSuccessModalClose = () => {
    projectInfoAll && projectInfoAll(current_project_id);
    onCancel && onCancel();
  };
  return (
    <>
      {payAddSuccessVisible && (
        <PayAddSuccessModal
          noRegistersPre={noRegisters}
          successPer={successPer}
          onCancel={PayAddSuccessModalClose}
        />
      )}
      <PaymentModal
        visible={payvisible}
        setvisible={() => {
          setPayvisible(false);
        }}
        needBuyStation={needBuyStation}
        successPer={successPer}
        noRegisters={noRegisters}
        groupCode={groupCode}
        onSuccessCancel={PayAddSuccessModalClose}
      />

      {
        <Modal
          className={InviteModalWrapper}
          visible
          onCancel={onCancel}
          title={null}
          footer={null}
        >
          {/* <Spin loading={spinning}></Spin> */}
          <div className="modal-inviation-title">
            <div>邀请协作者</div>
            <div>添加现有团队成员</div>
          </div>
          <div className="team-inviation-content">
            <div className="team-inviation-add">
              <div className="team-inviation-add-operation">
                <Input
                  value={inputValue}
                  placeholder="请输入被邀请人邮箱"
                  inputStyle={{ width: '80%' }}
                  onChange={(val) => setInputValue(val)}
                  maxLength={30}
                  onPressEnter={() => changeTeamInvitation('add')}
                />
                <Select  onChange={(key) => setSelectValue(key)}>
                  {/* {renderOptions()} */}
                  <Option value="admin">管理员</Option>
                  <Option value="common">普通用户</Option>
                </Select>
                <Button
                  type="primary"
                  className="apipost-blue-btn"
                  onClick={() => changeTeamInvitation('add')}
                >
                  确定
                </Button>
              </div>
              <div className="team-invitation-add-list">
                {addList.map((item, index) => (
                  <div className="team-invitation-add-list-item" key={index}>
                    {item.email && item.email.length > 0 ? (
                      <span>
                        <Input
                          value={item.email}
                          readonly
                          placeholder=""
                          inputStyle={{ width: '90%' }}
                        />
                        <div
                          className="api-close-btn"
                          onClick={() => changeTeamInvitation('delete', item)}
                        >
                          <UnionIcon></UnionIcon>
                        </div>
                      </span>
                    ) : (
                      <span>
                        <img src={item?.portrait} alt="portrait" />
                        {item.nick_name}
                      </span>
                    )}

                    <span style={{ padding: '0 16px' }}>
                      <Select
                        value={item.power}
                        onChange={(key) => {
                          item.power = key;
                          changeTeamInvitation('change', item);
                        }}
                      >
                        {renderOptions()}
                        {/* <Option value="admin">超管</Option> */}
                      </Select>
                    </span>
                    {computeStation(item)}
                  </div>
                ))}
              </div>
            </div>
            <div className="team-inviation-project-list">
              <div className="team-inviation-project-list-header">
                <span>团队人员</span>
                <span onClick={teamPersonnelCheckAll}>全选</span>
              </div>
              <div className="team-invitation-project-list-content">
                {projectList &&
                  projectList.map((item, index) => (
                    <div key={index} className="team-invitation-project-list-content-item">
                      <span>
                        <img
                          src={item?.user?.portrait}
                          alt=""
                          style={{ width: '30px', height: '30px' }}
                        />
                      </span>
                      <div>
                        <div>{item.user.nick_name}</div>
                        {item.user.email ? <div>{item.user.email}</div> : ''}
                      </div>
                      <span>{item.is_readonly === 1 ? '读写工位' : '只读工位'}</span>
                      <span>
                        <CheckBox
                          checked={
                            (item.in_project ? item.in_project : item.checked)
                              ? 'checked'
                              : 'uncheck'
                          }
                          disabled={item.in_project}
                          onChange={(checked) => teamPersonnelCheckOne(item, checked)}
                        />
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
          <div className="team-inviation-footer">
            <div className="team-inviation-footer-l">
              <span className="know-link-people">知道链接的人</span>
              <Select value={linkPower} onChange={(key) => setLinkPower(key)}>
                {renderOptions()}
                {/* <Option value="admin">超管</Option> */}
              </Select>
              <div
                className="team-inviation-link"
                type="link"
                onClick={() => {
                  getProjectInviteUrl({
                    project_id: current_project_id,
                    role: linkPower === 'readonly' ? 1 : 2,
                  }).subscribe({
                    next(resp) {
                      if (resp?.code === 10000) {
                        copyStringToClipboard(
                          `${FE_BASEURL}/linkinvitation?invitation_code=${resp.data.code}`,
                          true
                        );
                      }
                    },
                  });
                }}
              >
                <ConnectIcon></ConnectIcon>
                复制邀请链接
              </div>
            </div>
            <div className="team-inviation-footer-r">
              <span className="team-inviation-footer-need-buy-span">
                {needBuyStation && needBuyStation > 0 ? (
                  <Subtract style={{ marginRight: '8px' }}></Subtract>
                ) : null}
                {needBuyStation && needBuyStation > 0 ? `需购买${needBuyStation}个读写工位` : null}
              </span>
              <Button type="primary" onClick={onSubmit} className="apipost-blue-btn">
                {needBuyStation > 0 ? '购买并全部添加' : '添加协作人员'}
              </Button>
            </div>
          </div>
        </Modal>
      }
    </>
  );
};
export default InvitationModal;

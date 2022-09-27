import React, { useState } from "react";
import { Modal, Input, Message } from 'adesign-react';
import { fetchCreateTeam } from '@services/user';
import './index.less';

const CreateTeam = (props) => {
    const { onCancel } = props;
    const [teamName, setTeamName] = useState('');

    const createTeam = () => {
        if (teamName.trim().length < 1) {
            Message('error', '未输入团队名称!');
            return;
        }
        const params = {
            name: teamName,
        };
        fetchCreateTeam(params).subscribe({
            next: (res) => {
                const { code } = res;

                if (code === 0) {
                    Message('success', '创建成功!');
                    onCancel(true);
                } else {
                    Message('error', '创建失败!');
                }
            }
        })
    }
    return (
        <>
            <Modal
              title="新建团队"
              visible={true}
              onCancel={onCancel}c
              className='create-team-modal'
              onOk={() => createTeam()}
            >
                <Input value={teamName} placeholder="请输入团队名称" onChange={(e) => setTeamName(e)} />
            </Modal>
        </>
    )
};

export default CreateTeam;
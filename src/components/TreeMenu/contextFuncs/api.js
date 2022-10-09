import { copyStringToClipboard } from '@utils';
import { Message } from 'adesign-react';
import Bus from '@utils/eventBus';
import { getCoverData, getFullData, deleteMultiData } from './common';

export const shareApi = ({ props, params, showModal }) => {
    Bus.$emit('openModal', 'CreateShare', {
        defaultShareName: params.name,
        defaultShareMode: params.target_type,
        project_id: props.project_id,
        target_id: params.target_id,
    });
};

export const copyApi = async ({ target_id }) => {
    Bus.$emit('copyApi', target_id);
    return;
    const localData = await getFullData(params);
    const cpyiedData = getCoverData(localData);
    console.log(params, cpyiedData);
    copyStringToClipboard(JSON.stringify(cpyiedData));
};

export const cloneApi = ({ target_id }) => {
    Bus.$emit('cloneTargetById', target_id);
};

export const cutApi = ({ props, params, showModal }) => { };

export const deleteApi = ({ target_id }) => {
    deleteMultiData(target_id);
};

export default {
    shareApi,
    cloneApi,
    copyApi,
    cutApi,
    deleteApi,
};

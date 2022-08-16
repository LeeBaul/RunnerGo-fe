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

export const cloneApi = ({ params }) => {
    Bus.$emit('cloneTargetById', params?.target_id);
    // const cpyiedData = cloneCoverData(params, '0');
    // copyStringToClipboard(JSON.stringify(cpyiedData));
};

export const copyApi = async ({ props, params, showModal }) => {
    const localData = await getFullData(params);
    const cpyiedData = getCoverData(localData);
    copyStringToClipboard(JSON.stringify(cpyiedData));
};

export const cutApi = ({ props, params, showModal }) => { };

export const deleteApi = ({ props, params }) => {
    deleteMultiData(props.project_id, params.target_id);
};

export default {
    shareApi,
    cloneApi,
    copyApi,
    cutApi,
    deleteApi,
};

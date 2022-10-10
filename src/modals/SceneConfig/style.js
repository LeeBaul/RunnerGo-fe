import { css } from '@emotion/css';

export const GlobalVarModal = css`
    .apipost-modal-container {
        width: 800px;
        min-height: 730px;
    }
    .apipost-modal-header {
        ${'' /* padding: 32px 32px 24px 32px; */}
    }
    .apipost-table-th {
        background-color: var(--bg-4);
    }
    .apipost-table-td {
        color: var(--font-1);
        height: 30px;
    }
    .apipost-table-cell {
        overflow:hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    .container-title {
        font-size: 16px;
        margin: 24px 0;
    }
    .apipost-upload {
        display: flex;
        justify-content: center;
        align-items: center; 
    }
    .apipost-btn {
        width: 84px;
        height: 25px;
        background: var(--log-blue);
        border-radius: 3px;
        padding: 4px 8px;
        color: var(--font-1);
        margin: 20px auto;
    }
    .apipost-btn > svg {
        fill: var(--font-1);
        margin-right: 6px;
    }
    .delete-svg {
        width: 16px;
        height: 16px;
        fill: #f00;
    }
    .file-list {
        display: flex;
        align-items: center;
        flex-direction: column;
        width: 100%;
        margin-top: 20px;
    }
    .file-list-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        padding: 0 5px;
        height: 30px;
        border: 2px solid rgb(57, 57, 61);
    }
    .file-list-item-left {
        cursor: pointer;
    }
    .file-list-item-right {
        display: flex;
        align-items: center;
        border-left: 2px solid rgb(57, 57, 61);
    }
    .file-list-item-right > p {
        margin: 0 10px;
        cursor: pointer;
    }
    .file-list-item-right > .delete {
        color: #f00;
    }
    .apipost-modal-footer > div > .apipost-btn {
        margin: 0 8px;
        width: 100px;
        height: 40px;
    }
    .apipost-btn-default {
        background-color: var(--bg-4);
    }
`;

export const HeaderTitleStyle = css`
    p {
        font-size: 16px;
        color: var(--font-1);
    }
`;


export const VarNameStyle = css`
    display: flex;
    justify-content: space-between;
    align-items: center;

    svg {
        width: 16px;
        height: 16px;
        fill: var(--font-1);
        cursor: pointer;
    }
`
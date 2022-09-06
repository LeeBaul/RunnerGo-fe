import { css } from '@emotion/css';

export const GlobalVarModal = css`
    .apipost-modal-container {
        width: 800px;
        height: 730px;
    }
    .apipost-modal-header {
        ${'' /* padding: 32px 32px 24px 32px; */}
    }
    .apipost-table-th {
        background-color: #39393D;
    }
    .apipost-table-td {
        color: #fff;
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
        background: #3A86FF;
        border-radius: 3px;
        padding: 4px 8px;
        color: #fff;
        margin: 20px auto;
    }
    .apipost-btn > svg {
        fill: #fff;
        margin-right: 6px;
    }
    .delete-svg {
        width: 16px;
        height: 16px;
        fill: #f00;
    }
`;

export const HeaderTitleStyle = css`
    p {
        font-size: 16px;
        color: #fff;
    }
`;


export const VarNameStyle = css`
    display: flex;
    justify-content: space-between;
    align-items: center;

    svg {
        width: 16px;
        height: 16px;
        fill: #fff;
        cursor: pointer;
    }
`
import { css } from '@emotion/css';

export const GlobalVarModal = css`
    .apipost-modal-container {
        width: 800px;
        height: 730px;
    }
    .apipost-modal-header {
        padding: 32px 32px 24px 32px;
    }
    .apipost-table-th {
        background-color: #39393D;
    }
    .apipost-table-td {
        color: #fff;
        height: 30px;
    }
    .container-title {
        font-size: 16px;
        margin: 24px 0;
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
import { css } from '@emotion/css';

export const GlobalVarModal = css`
    .apipost-modal-container {
        width: 800px;
        height: 730px;
        max-height: 80%;
    }
    .apipost-table {
        margin-bottom: 30px;
    }
    .apipost-modal-header {
        ${'' /* padding: 32px 32px 24px 32px; */}
    }
    .apipost-table-th {
        background-color: var(--bg-4);
    }
    .apipost-table-td {
        color: var(--font-1);
        height: 24px;
        .apipost-table-cell {
            overflow:hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            height: 24px;
            font-size: 12px;
    
            .apipost-input-inner-wrapper {
                height: 24px
            }
        }
    }
    .container-title {
        font-size: 16px;
        margin: 24px 0;
    }
    .apipost-table-cell {
        overflow:hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    .delete-svg {
        width: 16px;
        height: 16px;
        fill: #f00;
        cursor: pointer;
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
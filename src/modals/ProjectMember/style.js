import { css } from '@emotion/css';

export const ProjectMemberModal = css`
  .apipost-modal-container {

    .apipost-modal-header {
        padding: 30px;
    }

    .apipost-table-tr, .apipost-table-th {
        border: none;
    }
    
    .member-info {
        display: flex;
        align-item: center;

        .detail {
            display: flex;
            flex-direction: column;
            margin-left: 8px;
        }
    }

    .apipost-table-td {
        color: #fff;
        text-align: left;
        padding: 19px 0;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    .title {
        display: flex;

        p {
            width: 25%;
        }
    }
    .member-list {
        display: flex;
        flex-direction: column;
        .member-item {
            display: flex;
            align-items: center;
            margin-top: 41px;

            .member-info, .join-time, .invited-by, .station-type, .handle-member {
                width: 25%;
                overflow: hidden;
            }


        }
    }
  }
`;

export const HeaderLeftModal = css`
  .member-header-left {
    display: flex;
    align-items: center;
    color: #fff;

    .title {
        font-size: 16px;
    }

    .invite-btn {
        width: 86px;
        height: 30px;
        background-color: var(--theme-color);
        border-radius: 5px;
        padding: 5px 8px;
        color: #fff;
        margin-left: 32px;

        svg {
            fill: #fff;
            margin-right: 6px;
        }
    }
  }
`
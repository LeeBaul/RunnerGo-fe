import { css } from '@emotion/css';

export const RecycleModalWrapper = css`
  .apipost-modal-container {
    width: 800px;
    height: 700px;
    max-height: 80%;
  }

  .folder-list {
    margin-top: 24px;
    height: 470px;
    overflow: hidden;
    overflow-y: auto;
    .item-li {
      height: 49px;
      display: flex;
      align-items: center;
      flex-direction: row;
      border-radius: var(--border-radius-default);
      &:hover {
        background-color: var(--bgr1);
      }
      & .item-title {
        width: 0;
        flex: 1;
        flex-shrink: 0;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        padding-left: 16px;
      }
    }
  }

  .apis-list {
    margin-top: 24px;
    height: 470px;
    overflow: hidden;
    overflow-y: auto;
    .item-li {
      min-height: 91px;
      display: flex;
      align-items: center;
      flex-direction: row;
      border-radius: var(--border-radius-default);
      &:hover {
        background-color: var(--bgr1);
      }
      & .item-titles {
        padding-left: 16px;
        flex: 1;
        display: flex;
        flex-direction: column;
        .titles {
          display: flex;
          dd {
            max-width: 80%;
            overflow: hidden;
            padding-left: 4px;
          }
        }
        .urls {
          padding-top: 5px;
          color: var(--fn3);
          word-break: break-all;
        }
      }
    }
  }

  .btns {
    width: 190px;
    display: flex;
    justify-content: space-around;
    .btn-delete {
      color: #ff4c4c;
      svg {
        fill: #ff4c4c;
      }
    }
  }

  .recycle-modal-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .refresh-btn {
      svg {
        fill: #666666;
        margin-right: 8px;
      }
    }
  }
`;

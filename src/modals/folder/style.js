import styled from '@emotion/styled';
import { css } from '@emotion/css';

export const FolderModal = css`
  .apipost-modal-container {
    width: 800px;
    height: 700px;
    max-width: 80%;
    max-height: 80%;
  }
`;

export const FolderWrapper = styled.div`
  height: 100%;
  .script-box-scriptlist {
    height: 100%;
  }

  display: flex;
  flex-direction: column;
  > .apipost-tabs {
    flex: 1;
    height: 0;
    .apipost-tabs-content {
      height: calc(100% - 30px);
      min-height: 200px;
      overflow: auto;
    }
  }
  .article {
    .items {
      display: flex;
      margin-top: 24px;
      flex-direction: row;
      align-items: center;
      .name {
        min-width: 60px;
        color: var(--content-color-primary);
        font-size: var(--size-12px);
        white-space: nowrap;
        margin-right: 10px;
      }
      .content {
        flex: 1;
      }
    }
    .apipost-select {
      width: 300px;
    }
  }
  .english-name {
    min-width: 116px !important;
  }
`;

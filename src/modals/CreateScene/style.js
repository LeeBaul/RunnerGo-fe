import styled from '@emotion/styled';
import { css } from '@emotion/css';

export const FolderModal = css`
  .apipost-modal-container {
    width: 800px;
    height: 700px;
    max-width: 80%;
    max-height: 80%;

    .apipost-table-td {
        width: auto;
        overflow: hidden;
    }
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
    // display: flex;
    // flex-direction: column;
    
    .article-item {
        display: flex;
        flex-direction: column;
        margin-top: 20px;

        p {
            margin-bottom: 4px;
        }
    }
  }
  .apipost-select {
    width: 300px;
  }
}
`;

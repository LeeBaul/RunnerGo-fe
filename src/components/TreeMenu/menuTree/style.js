import styled from '@emotion/styled';
import { css } from '@emotion/css';

export const MenuTreeNode = styled.div`
  & .btn-more {
    display: none;
  }
  &:hover {
    background: var(--highlight-background-color-secondary);
    .btn-more {
      display: flex;
    }
  }
  .tree-node-inner {
    flex: 1;
    padding: 0 5px;
    display: flex;
    align-items: center;
    flex-direction: row;
    border-radius: 0;
  }
  .tree-node-inner-selected {
    background-color: var(--highlight-background-color-tertiary);

    &:hover {
        background-color: var(--highlight-background-color-secondary);
    }

    color:var(--content-color-primary);

    svg {
        fill: var(--content-color-primary);
    }

    .apipost-btn {
        background-color: var(--highlight-background-color-primary);
    }
}
`;

export const TreeIcon = css`
  width: 24px;
  height: 24px;
  justify-content: center;
  align-items: center;
  display: flex;
  cursor: pointer;
  .icon-status {
    width: 6px;
    height: 6px;
    border-radius: 50%;
  }
`;

export const TreeMenuItem = css`
  min-width: 88px;
  height: 28px;
  padding: 0 8px;
  border-radius: 3px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
`;
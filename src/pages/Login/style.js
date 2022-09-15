import styled from '@emotion/styled';

export const LoginWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  position: relative;
  background: var(--background-color-secondary);
  .left {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 780px;
    min-width: 780px;
    height: 100%;
    min-height: 100vh;
    text-align: center;
    // background: linear-gradient(140.02deg, #f9f9fa, #f7f8ff);
    .title {
      margin-top: 8px;
      font-weight: 600;
      font-size: var(--size-30px);
      line-height: 80px;
      color: #fff;
    }
    .desc {
      line-height: 34px;
      margin: 4px 0 100px 0;
      font-size: var(--size-18px);
      color: var(--content-color-secondary);
    }
    .logo-box {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .app-version {
      padding: 4px;
      height: 25px;
      width: 78px;
      line-height: 17px;
      background: #fff;
      color: var(--text-lightmode-color);
      font-size: var(--size-12px);
      text-align: center;
      margin: 0 0 0 10px;
      border-radius: 3px;
    }
  }
  .right {
    flex: 1;
    position: relative;
    &-wrapper {
      width: 348px;
      height: auto;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
    .title {
      height: 34px;
      font-size: var(--size-24px);
      line-height: 34px;
      color: var(--content-color-secondary);
      &.active {
        color: var(--content-color-primary);
      }
    }
    .tabs {
      display: flex;
      justify-content: space-between;
      position: relative;
      padding: 0 30px;
      &::before {
        content: '';
        height: 34px;
        width: 2px;
        position: absolute;
        left: calc(50% - 1px);
        top: 0;
        background: var(--background-color-secondary);
      }
      .tabs-item {
        cursor: pointer;
        &.active {
          color: var(--content-color-primary);
        }
      }
    }
    .remeber {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: 0 0 28px 0;
  
      &-left {
        display: flex;
        align-items: center;
        cursor: pointer;
      }
    }

    .login-have {
      color: #3A86FF;
      text-align: center;
      font-size: 14px;
      cursor: pointer;
    }
  
    .forget {
      color: var(--content-color-secondary);
      cursor: pointer;
    }
  
    .resign {
      color: var(--base-color-info);
      text-align: center;
  
      span {
        cursor: pointer;
      }
    }

    .item {
      height: 76px;
      display: flex;
      flex-direction: column;

      .apipost-btn {
        height: 41px;
      }

      .error-tips {
        color: rgb(255, 77, 79);
        font-size: 14px;
        margin-top: 6px;
        margin-left: 4px;
      }
    }
    .qr-code {
      .login_wx {
        position: relative;
        margin-top: 34px;
        margin-bottom: 23px;
        padding: 12px;
        .login_round {
          display: flex;
          align-items: center;
          height: 197px;
          canvas {
            // border: 1px solid var(--border-color-default);
          }
        }
      }
      .wx-tips {
        text-align: center;
        font-size: var(--size-14px);
        color: var(--base-color-info);;
      }
      
      .tips {
        text-align: center;
        font-size: var(--size-14px);
        color: var(--content-color-secondary);
      }
    }
  }
`;

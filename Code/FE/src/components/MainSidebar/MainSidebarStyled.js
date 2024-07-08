import styled from "styled-components";

export const SiderbarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: calc(100% - 50px);
  margin-top: 50px;

  .ant-menu-item a {
    color: #3a5a7d;
    font-weight: 600;
    font-size: 0.78rem;
  }

  .ant-menu-item-only-child {
    a {
      color: #000;
    }

    &:hover {
      a {
        color: #3a5a7d;
      }
    }
  }
`;

export const NotiWrapper = styled.div`
  ::-webkit-scrollbar {
    width: 5px;
    border-radius: 5px;
  }

  width: 430px;
  background-color: #fff;
  border-radius: 4px;
  transition: 0.4s;
  overflow-y: auto;
  box-shadow: 0 6px 16px -8px rgb(0 0 0 / 8%), 0 9px 28px 0 rgb(0 0 0 / 5%),
    0 12px 48px 16px rgb(0 0 0 / 3%);
  text-align: left;
  padding: 5px 10px;

  .close-notification {
    width: 24px;
    height: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
    transition: 0.3s;

    &:hover {
      background-color: #f7f7f7;
      cursor: pointer;
    }
  }

  .ant-tabs-nav {
    margin: 0;
  }
`;

import styled from "styled-components";

export const MainWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  position: relative;
`;
export const SmallSidebarWrapper = styled.div`
  height: 50px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  padding: 0 24px;
  align-items: center;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 999;
  background: #006699;
  box-shadow: 0 2px 8px #8baad7;

  .avatar {
    border-radius: 30px;
    background: #006699;
    display: flex;
    align-items: center;
    line-height: -15px;
    column-gap: 4px;
    padding: 5px;
    margin: 0 !important;

    &:hover {
      transition: 0.3s;
      background-color: #4879b8;
    }
  }

  .sidebarItem {
    text-align: center;
    cursor: pointer;
    color: #fff;

    .anticon {
      font-size: 1rem;
    }

    &:last-child {
      margin-top: auto;
      margin-bottom: 0;
    }
  }

  .app-store {
    width: 38px;
    height: 38px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;

    &:hover {
      background-color: #4879b8;
      transition: 0.3s;
    }
  }

  .logo {
    position: absolute;
    left: 24px;
    width: 70px;

    img {
      cursor: pointer;
      width: 100%;
      vertical-align: middle;
    }
  }
`;

export const NotificationItem = styled.div`
  position: relative;

  .notificationItemBox {
    margin: 0 10px 0 5px;
    position: relative;
    width: 38px;
    height: 38px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    background-color: ${(props) => props.showNotification && "#4879B8"};

    &:hover {
      background-color: #4879b8;
      transition: 0.3s;
    }

    .numberNotification {
      position: absolute;
      border-radius: 10px;
      top: -9px;
      left: 8px;
      background-color: #ff4d4f;
      min-width: 17px;
      font-size: 12px;
      padding: 0 8px;
    }

    .noNotification {
      display: none;
    }
  }
`;

export const ListWrapper = styled.div`
  max-height: calc(100vh - 170px);
  overflow-y: auto;
`;

export const ViewAll = styled.div`
  display: flex;
  position: relative;
  z-index: 3;
  a {
    margin-left: auto;
    line-height: 16px;
    padding: 8px 10px;
    border-radius: 4px;
    cursor: pointer;
    &:hover {
      transition: 0.3s;
      text-decoration: underline;
    }
  }
`;

export const LayoutWrapper = styled.div`
  width: 100%;
  flex: 0 0 auto;
  display: flex;
`;
export const SidebarWrapper = styled.aside`
  width: ${(props) => (props.collapsedMenu ? "220px" : "80px")};
  flex: 0 0 auto;
  background-color: #e4eaf2;
  z-index: 10;
  transition: all ease 0.3s;
  overflow: auto;
  height: calc(100vh - 40px);

  .ant-menu {
    background: transparent;
    border-right: 0;

    .ant-menu-item {
      border-radius: 0 !important;
      transition: all ease 0.3s;

      &:hover {
        box-shadow: inset 3px 0 0 0 #1890ff;
      }
    }

    .ant-menu-submenu-title {
      transition: all ease 0.3s;
    }

    .ant-menu-submenu-title,
    .ant-menu-item,
    .ant-menu-item-active:not(.ant-menu-item-selected) {
      color: #3a5a7d;
      margin: 0px !important;
      height: 48px;
      line-height: 48px;
      border-radius: 0 !important;
      font-weight: 600;
      font-size: 0.78rem;
      width: 100%;

      &:not(.ant-menu-item-selected):hover,
      &:active {
        background-color: transparent !important;
        color: #3a5a7d !important;
      }

      &:after {
        display: none;
      }
    }

    .ant-menu-submenu-selected .ant-menu-submenu-title,
    &:not(.ant-menu-horizontal) .ant-menu-item-selected {
      background-color: #cddaf4 !important;
      color: #3a5a7d !important;
    }

    .ant-menu-submenu-selected {
      .ant-menu-submenu-title {
        &:hover {
          background-color: #cddaf4 !important;
        }

        .anticon-file-text {
          font-size: 16px;
        }
      }

      .ant-menu-sub {
        background-color: #d6dfef;

        .ant-menu-item-selected {
          background-color: transparent !important;
          box-shadow: inset 3px 0 0 0 #1890ff;
          border-radius: 0;
        }
      }
    }

    .ant-menu-sub {
      background-color: #d6dfef;

      .ant-menu-item {
        font-weight: 400;
        color: rgba(0, 0, 0);
      }
    }

    .ant-menu-submenu-open {
      background-color: #cddaf4;
      color: #3a5a7d;
    }

    .anticon {
      font-size: ${(props) =>
        !props.collapsedMenu ? "16px !important" : "1rem"};
    }
  }
`;
export const ContentWrapper = styled.main`
  margin-top: ${(props) => (props.marginTop ? props.marginTop + "px" : "0px")};
  overflow: auto;
  height: ${(props) =>
    props.marginTop ? `calc(100vh - ${props.marginTop}px)` : "100vh"};
  flex: 0 0 auto;
  background-color: ${(props) => props.backgroundColor || "#cddaf4"};
  padding: 24px;
  width: ${(props) =>
    props.collapsedMenu ? "calc(100% - 220px)" : "calc(100% - 80px)"};
`;

export const CollapseSidebarButton = styled.div`
  background-color: #e4eaf2;
  position: fixed;
  width: ${(props) => (props.collapsedMenu ? "220px" : "80px")};
  bottom: 0;
  padding: 10px 24px;
  height: 40px;
  border-top: 1px solid #ced6e0;
  cursor: pointer;
  transition: all ease 0.3s;

  &:hover {
    background-color: #cddaf4;
  }

  span {
    &:first-child {
      font-size: 1rem;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
    }

    &:last-child {
      color: #3a5a7d;
      font-weight: 500;
      padding-left: ${(props) => (props.collapsedMenu ? "24px" : "5px")};
    }
  }
`;

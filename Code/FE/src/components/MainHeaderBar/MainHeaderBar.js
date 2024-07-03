import React, { memo, useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
// Component
import PopupNotificationPage from "../../pages/PopupNotificationPage/PopupNotificationPage";
// Styled Component
import {
  ListWrapper,
  NotificationItem,
  ViewAll,
} from "../../layouts/DashboardLayout/DashboardLayoutStyled";
import { NotiWrapper } from "../MainSidebar/MainSidebarStyled";
// Ant design
import { Avatar, Badge, Dropdown, Menu, message, Tabs, Tooltip } from "antd";
import {
  BellFilled,
  CloseOutlined,
  LogoutOutlined,
  UserOutlined,
} from "@ant-design/icons";
// Other
import { inject, observer } from "mobx-react";
import { withRouter } from "react-router-dom";
import { useSSO } from "../../config";
import { blue } from "../../color";
import utils from "../../utils";
import queryString from "query-string";
import notificationStore from "../../stores/notificationStore";
import { useKeycloak } from "@react-keycloak/web";
import { subStringAvatar } from "../Common/CellText";

const { TabPane } = Tabs;

const MainHeaderBar = (props) => {
  const {
    authenticationStore,
    accountStore,
    history,
    companyStore,
    userStore,
    notificationStore,
  } = props;

  const { unreadNotificationCount, unreadNewsCount } = notificationStore;
  const { currentUserAvatar, currentUser } = authenticationStore;

  const [visibleNotification, setVisibleNotification] = useState(false);
  const [changedTabsNotification, setChangedTabsNotification] = useState({
    status: false,
    onlyNewsNotification: false,
    isOpen: false,
  });

  const disabledKeyCloak = {
    keycloak: null,
  };
  const { keycloak, initialized } = useSSO ? useKeycloak() : disabledKeyCloak;

  const clickLogout = useCallback(() => {
    accountStore.clearStore();
    companyStore.clearStore();
    userStore.clearStore();
    notificationStore.clearStore();
    authenticationStore.userLogout();

    if (keycloak) {
      keycloak.logout();
    }

    if (!useSSO) {
      history.replace("/");
    }
  }, []);

  useEffect(() => {
    if (!utils.isIOSDevice()) {
      notificationStore.getUnreadNewsCount();
    }
  }, [changedTabsNotification]);

  const menu = (
    <Menu>
      <Menu.Item
        onClick={() => history.push("/profile")}
        style={{ color: blue }}
      >
        <UserOutlined style={{ color: blue, marginRight: "5px" }} />
        Thông Tin Cá Nhân
      </Menu.Item>
      <Menu.Item onClick={() => clickLogout()} danger>
        <LogoutOutlined style={{ marginRight: "5px" }} />
        Đăng Xuất
      </Menu.Item>
    </Menu>
  );

  const onChangeTabsNotification = (tab) => {
    setChangedTabsNotification({
      status: true,
      onlyNewsNotification: tab === "news",
      isOpen: true,
    });
  };

  const notiWrapper = (
    <NotiWrapper>
      <Tabs
        onChange={onChangeTabsNotification}
        defaultActiveKey="1"
        tabBarExtraContent={
          <Tooltip title={"Đóng"}>
            <span
              className={"close-notification"}
              onClick={() => setVisibleNotification(false)}
            >
              <CloseOutlined />
            </span>
          </Tooltip>
        }
      >
        <TabPane
          tab={
            <Badge
              count={
                unreadNotificationCount > 99 ? "99+" : unreadNotificationCount
              }
            >
              <span style={{ paddingRight: 13 }}>Thông báo</span>
            </Badge>
          }
          key="notification"
        >
          <ListWrapper>
            <ViewAll
              onClick={() => {
                setVisibleNotification(false);
                const queryStringParams = queryString.stringify({
                  unread_notification: false,
                });
                history.push(`/notification?${queryStringParams}`);
              }}
            >
              <a>Xem tất cả</a>
            </ViewAll>
            <PopupNotificationPage
              changedTabsNotification={changedTabsNotification}
              onlyNewsNotification={false}
              visibleNotification={visibleNotification}
              setVisibleNotification={() => setVisibleNotification(false)}
            />
          </ListWrapper>
        </TabPane>
        <TabPane
          tab={
            <Badge count={unreadNewsCount > 99 ? "99+" : unreadNewsCount}>
              <span style={{ paddingRight: 13 }}>Thông báo chung</span>
            </Badge>
          }
          key="news"
        >
          <ListWrapper>
            <ViewAll
              onClick={() => {
                setVisibleNotification(false);
                const queryStringParams = queryString.stringify({
                  only_news_notification: true,
                });
                history.push(`/notification?${queryStringParams}`);
              }}
            >
              <a>Xem tất cả</a>
            </ViewAll>
            <PopupNotificationPage
              changedTabsNotification={changedTabsNotification}
              onlyNewsNotification={true}
              setVisibleNotification={() => setVisibleNotification(false)}
            />
          </ListWrapper>
        </TabPane>
      </Tabs>
    </NotiWrapper>
  );

  const unreadTotalCount = unreadNewsCount + unreadNotificationCount;

  return (
    <>
      <div className={"logo"}>
        <img
          onClick={() => history.push("/dashboard")}
          src={`${process.env.PUBLIC_URL}/assets/photos/FPT_logo_2010.webp`}
          alt="logo"
          className="logoImg"
        />
      </div>

      <Tooltip placement="top" title={"Hướng dẫn sử dụng"}>
        <a
          href=""
          target="_blank"
          className="sidebarItem avatar"
          style={{
            fontWeight: 500,
            fontSize: 14,
            textDecoration: "underline",
          }}
        >
          Guide
        </a>
      </Tooltip>
      <NotificationItem
        className="sidebarItem"
        showNotification={visibleNotification}
      >
        <Tooltip placement="bottom" title={"Thông báo"}>
          <Dropdown
            overlay={notiWrapper}
            placement="bottomRight"
            trigger={["click"]}
            visible={visibleNotification}
            onVisibleChange={(flag) => setVisibleNotification(flag)}
          >
            <div
              className={"notificationItemBox"}
              onClick={() => {
                if (!visibleNotification) {
                  setChangedTabsNotification({
                    status: true,
                    onlyNewsNotification:
                      changedTabsNotification.onlyNewsNotification,
                    isOpen: true,
                  });
                }
                setVisibleNotification(!visibleNotification);
              }}
            >
              <div style={{ position: "relative" }}>
                <BellFilled style={{ color: "#fff", fontSize: 18 }} />
                <span
                  className={
                    unreadTotalCount !== 0
                      ? "numberNotification"
                      : "noNotification"
                  }
                >
                  {unreadTotalCount > 99 ? "99+" : unreadTotalCount}
                </span>
              </div>
            </div>
          </Dropdown>
        </Tooltip>
      </NotificationItem>
      <div style={{ marginRight: 6 }}>
        <Dropdown
          overlay={menu}
          placement="topLeft"
          trigger={["click"]}
          className="sidebarItem"
        >
          <Tooltip placement="bottom" title={"Tài khoản"}>
            <div
              onClick={() => setVisibleNotification(false)}
              className="sidebarItem avatar"
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <Avatar
                  size={28}
                  src={
                    currentUserAvatar && URL.createObjectURL(currentUserAvatar)
                  }
                  style={{ backgroundColor: blue, fontSize: 12 }}
                >
                  {currentUser && subStringAvatar(currentUser.username)}
                </Avatar>
                <span
                  style={{
                    margin: "0 7px",
                    fontWeight: 500,
                  }}
                >
                  Đ/c{" "}
                  {currentUser &&
                    utils.getNameInCapitalize(currentUser.username)}
                </span>
              </div>
            </div>
          </Tooltip>
        </Dropdown>
      </div>
    </>
  );
};

MainHeaderBar.propTypes = {
  title: PropTypes.string,
};

export default memo(
  withRouter(
    inject(
      "authenticationStore",
      "accountStore",
      "userStore",
      "companyStore",
      "notificationStore",
      "loadingAnimationStore",
      "commonStore"
    )(observer(MainHeaderBar))
  )
);

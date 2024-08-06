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
import { Notification } from "./MainHeaderBarStyled";
// Ant design
import { Avatar, Badge, Dropdown, Menu, message, Tabs, Tooltip } from "antd";
import {
  BellFilled,
  CloseOutlined,
  LogoutOutlined,
  UserOutlined,
  MenuOutlined,
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
import moment from "moment";

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

  const [hovered, setHovered] = useState("");

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

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    if (!utils.isIOSDevice()) {
      notificationStore.getUnreadNewsCount();
      notificationStore.getUnreadNotificationCount();
    }
  }, [changedTabsNotification]);

  const menu = (
    <Menu>
      <Menu.Item
        onClick={() => history.push("/profile")}
        style={{ color: blue }}
      >
        <div className="flex items-center">
          <UserOutlined style={{ color: blue, marginRight: "5px" }} />
          Thông Tin Cá Nhân
        </div>
      </Menu.Item>
      {windowWidth <= 1080 && (
        <Menu.Item
          onClick={() => history.push("/notification")}
          style={{ color: blue }}
        >
          <div className="flex items-center">
            <BellFilled style={{ color: blue, marginRight: "5px" }} />
            Thông báo
          </div>
        </Menu.Item>
      )}
      <Menu.Item onClick={() => clickLogout()} danger>
        <div className="flex items-center">
          <LogoutOutlined style={{ marginRight: "5px" }} />
          Đăng Xuất
        </div>
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
  const handleNotificationClick = (type) => {
    if (type === "REQUESTGROUP") {
      history.push(`/registration/myRequest`);
    }
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
            {/* <Notification>
              <ul className="listNoti">
                {userNotificationList.map((notification, index) => (
                  <li
                    key={index}
                    style={{ padding: "10px 10px 10px 10px" }}
                    className="hover:bg-gray-300 rounded shadow-md mb-3 "
                    onClick={() =>
                      handleNotificationClick(notification.notification.type)
                    }
                  >
                    <div className="notify-content ">
                      <p className="content-text">
                        {notification.notification.content}
                      </p>
                      <div className="showTime">
                        <p>
                          {moment(notification.notification.timeCreated).format(
                            "MM-DD-YYYY HH:mm:ss A"
                          )}
                        </p>
                      </div>
                    </div>
                    {notification.status && (
                      <div className="unread-indicator"></div>
                    )}
                  </li>
                ))}
              </ul>
            </Notification> */}
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
      {/* {windowWidth < 1300 && (
        <div>
          <MenuOutlined style={{ color: "#fff" }} />
        </div>
      )} */}
      <div className={"logo"}>
        <img
          onClick={() => history.push("/dashboard")}
          src={`${process.env.PUBLIC_URL}/assets/photos/FPT_logo_2010.webp`}
          alt="logo"
          className="logoImg"
        />
      </div>
      {windowWidth > 1080 && (
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
      )}
      <NotificationItem
        className="sidebarItem"
        showNotification={visibleNotification}
      >
        {windowWidth > 1080 && (
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
        )}
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
                {windowWidth > 1080 && (
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
                )}
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

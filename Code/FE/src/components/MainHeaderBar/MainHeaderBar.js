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
// firebase
import firebase from "firebase/app";
import "firebase/messaging";
// Other
import { inject, observer } from "mobx-react";
import { withRouter } from "react-router-dom";
import { useSSO } from "../../config";
import { blue } from "../../color";
import utils from "../../utils";
import { NOTIFICATION_STATUS } from "../../constants";
import queryString from "query-string";
import notificationStore from "../../stores/notificationStore";
import { useKeycloak } from "@react-keycloak/web";
import PopupAppGrid from "../PopupAppGrid/PopupAppGrid";

const { TabPane } = Tabs;

const MainHeaderBar = (props) => {
  const messaging = firebase.messaging.isSupported()
    ? firebase.messaging()
    : null;

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

    messaging
      ?.deleteToken()
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (!localStorage.getItem("FCMToken")) {
      messaging
        ?.getToken({ vapidKey: "s" })
        .then((currentToken) => {
          if (currentToken) {
            localStorage.setItem("FCMToken", JSON.stringify(currentToken));
            notificationStore
              .sendTokenToSever(currentToken)
              .then((res) => console.log(res))
              .catch((err) => console.log(err.vi));
          } else {
            console.log(
              "No registration token available. Request permission to generate one."
            );
          }
        })
        .catch(() => console.log("You have blocked notifications!"));
    }
    messaging?.onMessage(async (payload) => {
      console.log("Message received. ", payload);
      if (payload.data.type === NOTIFICATION_STATUS.NEWS) {
        if (changedTabsNotification.isOpen) {
          setChangedTabsNotification({
            status: true,
            onlyNewsNotification: true,
            isOpen: true,
          });
        } else {
          await notificationStore.getUnreadNewsCount();
        }
      } else {
        if (changedTabsNotification.isOpen) {
          setChangedTabsNotification({
            status: true,
            onlyNewsNotification: false,
            isOpen: true,
          });
        } else {
          await notificationStore.getUnreadNotificationCount();
        }
      }
      notificationStore.setNotificationType(payload.data.type);
      message.info(`Thông báo mới: ${payload.notification.body}`);
    });
  }, [changedTabsNotification]);

  useEffect(() => {
    if (!utils.isIOSDevice()) {
      const channel4Broadcast = new BroadcastChannel("channel4");
      channel4Broadcast.onmessage = async (even) => {
        if (even.data.type === NOTIFICATION_STATUS.NEWS) {
          if (changedTabsNotification.isOpen) {
            setChangedTabsNotification({
              status: true,
              onlyNewsNotification: true,
              isOpen: true,
            });
          } else {
            await notificationStore.getUnreadNewsCount();
          }
        } else {
          if (changedTabsNotification.isOpen) {
            setChangedTabsNotification({
              status: true,
              onlyNewsNotification: false,
              isOpen: true,
            });
          } else {
            await notificationStore.getUnreadNotificationCount();
          }
        }
      };
    }
  }, [changedTabsNotification]);

  const menu = (
    <Menu>
      <Menu.Item
        onClick={() => history.push("/my-profile")}
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
                  only_news_notification: false,
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
          src={`${process.env.PUBLIC_URL}/assets/photos/travelowky-logo.webp`}
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
                />
                <span
                  style={{
                    margin: "0 7px",
                    fontWeight: 500,
                  }}
                >
                  Đ/c{" "}
                  {currentUser &&
                    utils.getNameInCapitalize(
                      currentUser.name_uppercase ?? "quangnv"
                    )}
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

import React, {
  memo,
  useCallback,
  useEffect,
  useState,
  useContext,
} from "react";
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
import { useNavigate } from "react-router-dom";
// Other
import { blue } from "../../color";
import utils from "../../utils";
import queryString from "query-string";
// import notificationStore from "../../stores/notificationStore";
import { subStringAvatar } from "../Common/CellText";
import Logo from "../../assets/photos/travelowky-logo.webp";
import { StoreContext } from "../../App";
const { TabPane } = Tabs;

const MainHeaderBar = (props) => {
  const { authenticationStore, notificationStore, setCurrentUser } =
    useContext(StoreContext);

  const { unreadNotificationCount, unreadNewsCount } = notificationStore;
  const { currentUserAvatar, currentUser } = authenticationStore;
  const navigate = useNavigate();
  const [visibleNotification, setVisibleNotification] = useState(false);
  const [changedTabsNotification, setChangedTabsNotification] = useState({
    status: false,
    onlyNewsNotification: false,
    isOpen: false,
  });

  const clickLogout = useCallback(() => {
    notificationStore.clearStore();
    authenticationStore.userLogout();
    setCurrentUser(null);
    navigate("/");
  }, []);

  useEffect(() => {
    if (!utils.isIOSDevice()) {
      const channel4Broadcast = new BroadcastChannel("channel4");
      channel4Broadcast.onmessage = async (even) => {
        if (even.data.type === "NEWS") {
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

  const items = [
    {
      key: "profile",
      label: (
        <div onClick={() => navigate("/profile")}>
          <UserOutlined style={{ color: "blue", marginRight: "5px" }} />
          Thông Tin Cá Nhân
        </div>
      ),
    },
    {
      key: "logout",
      label: (
        <div onClick={clickLogout} style={{ color: "red" }}>
          <LogoutOutlined style={{ marginRight: "5px" }} />
          Đăng Xuất
        </div>
      ),
      danger: true,
    },
  ];

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
          onClick={() => navigate("/home")}
          src={Logo}
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
      <div style={{ marginRight: 6 }}>
        <Dropdown
          menu={{ items }}
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

export default memo(MainHeaderBar);

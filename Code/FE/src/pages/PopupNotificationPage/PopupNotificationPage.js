import React, { memo, useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { List, message } from "antd";
import { inject, observer } from "mobx-react";
import { withRouter } from "react-router-dom";
import { apiUrl } from "./../../config";
import {
  AvatarItem,
  ContentNotification,
  ListItemLeft,
  ListItemRight,
  ListItemWrapper,
  ListWrapper,
} from "./PopupNotificationPageStyled";
import EmptyContent from "../../components/EmptyContent";
import { LoadingOutlined } from "@ant-design/icons";
import date_format from "../../date_format";
import { blue } from "../../color";
import { subStringAvatar } from "../../components/Common/CellText";
import { StatusTag } from "../../components/Common/StatusTag";
import { NOTIFICATION_STATUS, TYPE_STATUS } from "../../constants";

const PopupNotificationPage = (props) => {
  const {
    notificationStore,
    loadingAnimationStore,
    history,
    setVisibleNotification,
    visibleNotification,
    notificationListPageIndex,
    notificationListPageSize,
    onlyNewsNotification,
    changedTabsNotification,
  } = props;

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  /** Xử lý đã đọc thông báo */
  const handleReadNotify = useCallback(
    (id, status, num) => {
      if (status && num === 0) {
        message.warning("Thông báo đã được đọc!");
        return;
      }
      if (status) return;
      loadingAnimationStore.showSpinner(true);
      notificationStore
        .readNotification(id)
        .then(() => {
          const itemsList = [...items];
          const indexReadItem = items.findIndex((item) => item.id === id);
          const itemReplace = {
            ...items[indexReadItem],
            status: true,
          };
          itemsList.splice(indexReadItem, 1, itemReplace);
          setItems([...itemsList]);
          if (!onlyNewsNotification) {
            notificationStore.setUnreadNotificationCount("remove");
          } else {
            notificationStore.setUnreadNewsCount("remove");
          }
          message.success("Thông báo được đánh dấu đã đọc!");
        })
        .finally(() => loadingAnimationStore.showSpinner(false));
    },
    [items]
  );

  const goToContentNotification = async (type, id) => {
    switch (type) {
      // case NOTIFICATION_STATUS.OUTGOING:
      //   return history.push(`/internal-document/outgoing-document/view/${id}`);
      // case NOTIFICATION_STATUS.INCOMING:
      //   return history.push(`/internal-document/incoming-document/view/${id}`);
      case NOTIFICATION_STATUS.GENERAL:
        return history.push(`/utility/general-notifications/view/${id}`);
      case NOTIFICATION_STATUS.NEWS:
        return history.push(`/utility/general-notifications/view/${id}`);

      default:
        return;
    }
  };

  useEffect(() => {
    notificationStore.setFilter("notificationListPageIndex", 0);
    notificationStore.setFilter("notificationListPageSize", 10);
    (async () => {
      try {
        setLoading(true);
        if (
          changedTabsNotification.onlyNewsNotification === onlyNewsNotification
        ) {
          const { data } = await notificationStore.getCurrentUserNotification(
            onlyNewsNotification
          );
          setItems([...data.content]);
        }
      } catch (error) {
        console.log(error);
        message.error("Có lỗi xảy ra!");
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 500);
      }
    })();
  }, [
    notificationListPageIndex,
    notificationListPageSize,
    onlyNewsNotification,
    changedTabsNotification,
  ]);

  return (
    <div style={{ paddingBottom: 15 }}>
      <ListWrapper>
        <div
          style={{
            textAlign: "center",
            marginBottom: 10,
            marginTop: -20,
            color: blue,
            opacity: `${loading ? 1 : 0}`,
          }}
        >
          Đang cập nhật dữ liệu...
        </div>
        <List
          itemLayout="horizontal"
          locale={{
            emptyText: (
              <EmptyContent
                description={`${
                  loading ? "Đang tải..." : "Không có thông báo!"
                }`}
              />
            ),
          }}
          dataSource={items}
          renderItem={(item) => (
            <div style={{ position: "relative" }}>
              <List.Item
                style={{ borderBottom: "1px solid #f0f0f0" }}
                onClick={() => {
                  // setVisibleNotification()
                  handleReadNotify(item.id, item.status, 1);
                  goToContentNotification(item.type, item.code);
                }}
              >
                <ListItemWrapper isRead={item.status}>
                  <ListItemLeft>
                    <div>
                      <AvatarItem
                        src={
                          item.userImage &&
                          `${apiUrl}/api/v1/images/${item.userImage}`
                        }
                      >
                        {subStringAvatar(item.owner)}
                      </AvatarItem>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                      }}
                    >
                      <ContentNotification isRead={item.status}>
                        <span
                          className={"notification-content"}
                          dangerouslySetInnerHTML={{
                            __html: item.content.trim(),
                          }}
                        />
                      </ContentNotification>
                      <span style={{ color: blue }}>
                        {date_format.renderTime(item.time_created)}
                      </span>
                    </div>
                  </ListItemLeft>
                  <ListItemRight>
                    <div>{StatusTag("NOTIFICATION", item.type)}</div>
                  </ListItemRight>
                </ListItemWrapper>
              </List.Item>
            </div>
          )}
        />
      </ListWrapper>
    </div>
  );
};

PopupNotificationPage.propTypes = {
  notificationStore: PropTypes.object,
  loadingAnimationStore: PropTypes.object,
};

export default memo(
  withRouter(
    inject(
      "notificationStore",
      "loadingAnimationStore"
    )(observer(PopupNotificationPage))
  )
);

import React, { memo, useCallback, useEffect, useState } from "react";
import { inject, observer } from "mobx-react";
import { withRouter } from "react-router-dom";
import { Tabs, Pagination } from "antd";
import DashboardLayout from "../../layouts/DashboardLayout";
import ContentBlockWrapper from "../../components/ContentBlockWrapper";
import PageTitle from "../../components/PageTitle";
import { Helmet } from "react-helmet/es/Helmet";
import { blue } from "../../color";
import { ListNotification, StyledTabs } from "./NotificationPageStyled";
import moment from "moment";
import utils from "../../utils";
import { NOTIFICATION_STATUS, TYPE_STATUS } from "../../constants";

const { TabPane } = Tabs;
const NotificationPage = (props) => {
  const {
    history,
    loadingAnimationStore,
    groupStore,
    studentStore,
    semesterStore,
    authenticationStore,
    notificationStore,
  } = props;

  const [items, setItems] = useState([]);
  const [items1, setItems1] = useState([]);
  const [loading, setLoading] = useState(false);

  const onlyNewsNotificationParams = utils.getParameterByName(
    "only_news_notification"
  );

  const [activeTab, setActiveTab] = useState(
    !!onlyNewsNotificationParams ? "tab2" : "tab1"
  );

  const onChange = (key) => {
    setActiveTab(key);
  };
  const {
    notificationList,
    notificationListTotalCount,
    notificationListPageIndex,
    notificationListPageSize,
    setFilter,
  } = notificationStore;

  // useEffect(() => {
  //   if (authenticationStore.currentUser) {
  //     loadingAnimationStore.setTableLoading(true);
  //     notificationStore.getCurrentUserNotification(true, false).finally(() => {
  //       loadingAnimationStore.setTableLoading(false);
  //     });
  //   }
  //   console.log("Notification", notificationList);
  //   return () => {
  //     notificationStore.clearStore();
  //   };
  // }, [activeTab]);

  useEffect(() => {
    notificationStore.setFilter("notificationListPageIndex", 0);
    notificationStore.setFilter("notificationListPageSize", 10);
    (async () => {
      try {
        setLoading(true);
        const { data } = await notificationStore.getCurrentUserNotification(
          false,
          false
        );
        setItems([...data.data]);
        const {
          data: data1,
        } = await notificationStore.getCurrentUserNotification(true, false);
        setItems1(data1.data);
      } catch (error) {
        console.log(error);
        message.error("Có lỗi xảy ra!");
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 500);
      }
    })();
  }, [notificationListPageIndex, notificationListPageSize]);
  const handleNotificationClick = (type) => {
    switch (type) {
      // case NOTIFICATION_STATUS.OUTGOING:
      //   return history.push(`/internal-document/outgoing-document/view/${id}`);
      // case NOTIFICATION_STATUS.INCOMING:
      //   return history.push(`/internal-document/incoming-document/view/${id}`);
      case NOTIFICATION_STATUS.REQUESTGROUP:
        return history.push(`/registration/myRequest`);
      case NOTIFICATION_STATUS.NEWS:
        return history.push(`/utility/general-notifications/view/${id}`);

      default:
        return;
    }
  };
  console.log(notificationList);
  const onChangePagination = (e) => {
    setFilter("notificationListPageIndex", e - 1);
    loadingAnimationStore.setTableLoading(true);
    notificationStore.getCurrentUserNotification(true, false).finally(() => {
      loadingAnimationStore.setTableLoading(false);
    });
  };
  return (
    <DashboardLayout>
      <Helmet>
        <title>Registration | List Notifications</title>
      </Helmet>
      <PageTitle
        location={props.location}
        title={"List Notifications"}
        hiddenGoBack
      ></PageTitle>
      <ContentBlockWrapper>
        <ListNotification>
          <Tabs activeKey={activeTab} onChange={onChange}>
            <TabPane tab="Unread Notifications" key="tab1">
              <div className="block isolate">
                {items.map((notification, index) =>
                  notification.notification.type !== "NEWS" ? (
                    <div
                      className="flex items-center border-b p-4 hover:bg-gray-100 cursor-pointer"
                      onClick={() =>
                        handleNotificationClick(notification.notification.type)
                      }
                    >
                      <div className="flex-grow">
                        <p>{notification.notification.content}</p>
                        <p className="text-gray-500">
                          {moment(notification.notification.timeCreated).format(
                            "MM-DD-YYYY HH:mm:ss A"
                          )}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <></>
                  )
                )}
              </div>
              <Pagination
                onChange={(e) => onChangePagination(e)}
                hideOnSinglePage={false}
                total={notificationListTotalCount}
                pageSize={notificationListPageSize}
                current={notificationListPageIndex + 1}
                showSizeChanger={false}
                showLessItems
              />
            </TabPane>
            <TabPane tab="All Notifications" key="tab2">
              <div className="block isolate">
                {items1.map((notification, index) => (
                  <div
                    className="flex items-center border-b p-4 hover:bg-gray-100 cursor-pointer"
                    onClick={() =>
                      handleNotificationClick(notification.notification.type)
                    }
                  >
                    <div className="flex-grow">
                      <p>{notification.notification.content}</p>
                      <p className="text-gray-500">
                        {moment(notification.notification.timeCreated).format(
                          "MM-DD-YYYY HH:mm:ss A"
                        )}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <Pagination
                onChange={(e) => onChangePagination(e)}
                hideOnSinglePage={false}
                total={notificationListTotalCount}
                pageSize={notificationListPageSize}
                current={notificationListPageIndex + 1}
                showSizeChanger={false}
                showLessItems
              />
            </TabPane>
          </Tabs>
        </ListNotification>
      </ContentBlockWrapper>
    </DashboardLayout>
  );
  ß;
};
export default memo(
  withRouter(
    inject(
      "authenticationStore",
      "loadingAnimationStore",
      "studentStore",
      "groupStore",
      "semesterStore",
      "notificationStore"
    )(observer(NotificationPage))
  )
);

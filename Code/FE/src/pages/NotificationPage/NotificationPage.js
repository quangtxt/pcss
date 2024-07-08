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
    if (type === "REQUESTGROUP") {
      history.push(`/registration/myRequest`);
    }
  };

  const onChangePagination = (e) => {
    setFilter("notificationListPageIndex", e - 1);
    loadingAnimationStore.setTableLoading(true);
    notificationStore.getCurrentUserNotification(true, false).finally(() => {
      loadingAnimationStore.setTableLoading(false);
    });
  };
  console.log("notificationList", notificationList);
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
                {items.map((notification, index) => (
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
            <TabPane tab="All Notifications" key="tab2"></TabPane>
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

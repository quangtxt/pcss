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

const { TabPane } = Tabs;
const NotificationPage = (props) => {
  const {
    history,
    loadingAnimationStore,
    groupStore,
    studentStore,
    semesterStore,
    authenticationStore,
    userStore,
  } = props;
  const onChange = (key) => {
    setActiveTab(key);
  };
  const {
    userNotificationList,
    userNotificationListTotalCount,
    userNotificationListPageIndex,
    userNotificationListPageSize,
    setFilter,
  } = userStore;
  useEffect(() => {
    if (authenticationStore.currentUser) {
      loadingAnimationStore.setTableLoading(true);
      userStore.getUserNotificationList(true).finally(() => {
        console.log("list", userNotificationList);
        loadingAnimationStore.setTableLoading(false);
      });
    }
    return () => {
      userStore.clearStore();
    };
  }, [authenticationStore.currentUser]);
  const [activeTab, setActiveTab] = useState("tab1");
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
              <div>
                {userNotificationList.map((userNotification, index) => (
                  <div key={index} className="notification-item">
                    <h3>{userNotification.notification.content}</h3>
                  </div>
                ))}
              </div>
              <Pagination
                onChange={(e) => onChangePagination(e)}
                hideOnSinglePage={false}
                total={userNotificationListTotalCount}
                pageSize={userNotificationListPageSize}
                current={userNotificationListPageIndex + 1}
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
      "userStore"
    )(observer(NotificationPage))
  )
);

import React, { memo, useCallback, useEffect, useState } from "react";
import { inject, observer } from "mobx-react";
import { withRouter } from "react-router-dom";
import { Button, Pagination } from "antd";
import uuid from "uuid";
import DashboardLayout from "../../layouts/DashboardLayout";
import { TableBottomPaginationBlock } from "../../components/Common/Table";
import ContentBlockWrapper from "../../components/ContentBlockWrapper";
import PageTitle from "../../components/PageTitle";
import { Helmet } from "react-helmet/es/Helmet";
import { ForContent } from "./GroupInvitedMentorPageStyled";
import TableComponent from "../../components/Common/TableComponent";

const GroupInvitedMentorPage = (props) => {
  const {
    history,
    loadingAnimationStore,
    mentorStore,
    authenticationStore,
  } = props;

  const {
    mentorList,
    mentorListTotalCount,
    mentorListPageSize,
    mentorListPageIndex,
    setFilter,
  } = mentorStore;
  useEffect(() => {
    if (authenticationStore.currentUser) {
      loadingAnimationStore.setTableLoading(true);
      mentorStore.getMentorList().finally(() => {
        loadingAnimationStore.setTableLoading(false);
      });
    }
    return () => {
      mentorStore.clearStore();
    };
  }, [authenticationStore.currentUser]);
  const onChangePagination = (e) => {
    setFilter("mentorListPageIndex", e - 1);
    loadingAnimationStore.setTableLoading(true);
    mentorStore
      .getMentorList()
      .finally(() => loadingAnimationStore.setTableLoading(false));
  };
  console.log("mentorListPageSize", mentorListPageSize);
  const columns = [
    {
      title: "No.",
      width: 100,
      render: (record, index, dataSource) => dataSource + 1,
    },
    {
      title: "Full Name",
      width: 100,
      render: (record) => record?.name,
    },
    {
      title: "Email",
      width: 100,
      render: (record) => record?.email,
    },
    {
      title: "Action",
      width: 100,
      render: (record) => (
        <Button onClick={() => navigateToDetail(record)}>View</Button> // Thêm nút View để navigating to detail page
      ),
    },
  ];
  function navigateToDetail(record) {}
  return (
    <DashboardLayout>
      <Helmet>
        <title>Registration | List Supervisors</title>
      </Helmet>
      <PageTitle
        location={props.location}
        title={"List Supervisors"}
        hiddenGoBack
      ></PageTitle>
      <ContentBlockWrapper>
        <TableComponent
          rowKey={(record) => record.id || uuid()}
          dataSource={mentorList}
          columns={columns}
          pagination={false}
          loading={loadingAnimationStore.tableLoading}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            padding: "15px 0",
          }}
        >
          <Pagination
            onChange={(e) => onChangePagination(e)}
            hideOnSinglePage={true}
            total={mentorListTotalCount}
            pageSize={mentorListPageSize}
            current={mentorListPageIndex + 1}
            showSizeChanger={false}
            showLessItems
          />
        </div>
      </ContentBlockWrapper>
    </DashboardLayout>
  );
};
export default memo(
  withRouter(
    inject(
      "authenticationStore",
      "loadingAnimationStore",
      "mentorStore"
    )(observer(GroupInvitedMentorPage))
  )
);

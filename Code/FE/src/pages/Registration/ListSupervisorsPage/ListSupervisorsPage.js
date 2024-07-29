import React, { memo, useCallback, useEffect, useState } from "react";
import { AudioOutlined } from "@ant-design/icons";
import { inject, observer } from "mobx-react";
import { withRouter } from "react-router-dom";
import { Button, Pagination, Input, Space } from "antd";
import uuid from "uuid";
import DashboardLayout from "../../../layouts/DashboardLayout";
import { TableBottomPaginationBlock } from "../../../components/Common/Table";
import ContentBlockWrapper from "../../../components/ContentBlockWrapper";
import PageTitle from "../../../components/PageTitle";
import { Helmet } from "react-helmet/es/Helmet";
import { ForContent, TableSupervisors } from "./ListSupervisorsPageStyled";
import TableComponent from "../../../components/Common/TableComponent";

const { Search } = Input;

const ListSupervisorsPage = (props) => {
  const {
    history,
    loadingAnimationStore,
    supervisorStore,
    authenticationStore,
  } = props;

  const {
    supervisorList,
    supervisorListTotalCount,
    supervisorListPageSize,
    supervisorListPageIndex,
    setFilter,
  } = supervisorStore;

  // const [isVisiblePopup, setIsVisiblePopup] = useState(false);

  useEffect(() => {
    if (authenticationStore.currentUser) {
      loadingAnimationStore.setTableLoading(true);
      supervisorStore.getSupervisorList().finally(() => {
        loadingAnimationStore.setTableLoading(false);
      });
    }
    return () => {
      supervisorStore.clearStore();
    };
  }, [authenticationStore.currentUser]);

  const onSearchByEmailOrName = (keyword) => {
    setFilter("supervisorListPageIndex", 0);
    setFilter("supervisorListKeyword", keyword);
    loadingAnimationStore.setTableLoading(true);
    supervisorStore.getSupervisorList().finally(() => {
      loadingAnimationStore.setTableLoading(false);
    });
  };

  const onChangePagination = (e) => {
    setFilter("supervisorListPageIndex", e - 1);
    loadingAnimationStore.setTableLoading(true);
    supervisorStore
      .getSupervisorList()
      .finally(() => loadingAnimationStore.setTableLoading(false));
  };

  const columns = [
    {
      title: "No.",
      render: (record, index, dataSource) => dataSource + 1,
    },
    {
      title: "Full Name",
      render: (record) => record?.user.name,
    },
    {
      title: "Email",
      render: (record) => record?.user.email,
    },
    {
      title: "Action",
      render: (record) => (
        <Button onClick={() => navigateToDetail(record?.user.id)}>View</Button> // Thêm nút View để navigating to detail page
      ),
    },
  ];
  function navigateToDetail(userId) {
    history.push("/registration/supervisor/detail", { userId });
    // setIsVisiblePopup(true);
  }
  return (
    <DashboardLayout>
      <Helmet>
        <title>Registration | List Supervisors</title>
      </Helmet>
      <PageTitle
        location={props.location}
        title={"List Supervisors"}
      ></PageTitle>
      <ContentBlockWrapper>
        <TableSupervisors>
          <div className="searchSupervisors">
            <p>FE Email Or Name:</p>
            <Search
              allowClear
              placeholder={"FE Email or Name"}
              className="searchInput"
              onSearch={onSearchByEmailOrName}
            />
          </div>
          <TableComponent
            rowKey={(record) => record.id || uuid()}
            dataSource={supervisorList}
            columns={columns}
            pagination={false}
            loading={loadingAnimationStore.tableLoading}
          />
        </TableSupervisors>
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
            total={supervisorListTotalCount}
            pageSize={supervisorListPageSize}
            current={supervisorListPageIndex + 1}
            showSizeChanger={false}
            showLessItems
          />
        </div>
      </ContentBlockWrapper>
      {/* <PopupViewDetail
        isVisiblePopup={isVisiblePopup}
        setIsVisiblePopup={setIsVisiblePopup}
        handleClosePopup={() => setIsVisiblePopup(false)}
      /> */}
    </DashboardLayout>
  );
};
export default memo(
  withRouter(
    inject(
      "authenticationStore",
      "loadingAnimationStore",
      "supervisorStore"
    )(observer(ListSupervisorsPage))
  )
);

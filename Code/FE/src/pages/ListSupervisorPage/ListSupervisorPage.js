import React, { memo, useCallback, useEffect, useState } from "react";
import {
  AudioOutlined,
  UserAddOutlined,
  FolderAddOutlined,
} from "@ant-design/icons";
import { inject, observer } from "mobx-react";
import { withRouter } from "react-router-dom";
import { Button, Pagination, Input, Form, Switch, Modal } from "antd";
import uuid from "uuid";
import DashboardLayout from "../../layouts/DashboardLayout";
import { TableBottomPaginationBlock } from "../../components/Common/Table";
import ContentBlockWrapper from "../../components/ContentBlockWrapper";
import PageTitle from "../../components/PageTitle";
import { Helmet } from "react-helmet/es/Helmet";
import { FlexBox, ForContent, TableStudents } from "./ListSupervisorPageStyled";
import {
  Profile,
  GroupButton,
  NoMarginBottom,
} from "../ProfilePage/ProfilePageStyled";
import TableComponent from "../../components/Common/TableComponent";
import PopupImportExcel from "./PopupImportExcel";
import PopupCreateStudent from "./PopupCreateSupervisor";
import PopupCreateSupervisor from "./PopupCreateSupervisor";

const { Search } = Input;

const ListSupervisorPage = (props) => {
  const {
    history,
    loadingAnimationStore,
    studentStore,
    authenticationStore,
    supervisorStore,
  } = props;

  const {
    supervisorList,
    supervisorListTotalCount,
    supervisorListPageSize,
    supervisorListPageIndex,
    setFilter,
  } = supervisorStore;

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

  const onChangePagination = (e) => {
    setFilter("supervisorListPageIndex", e - 1);
    loadingAnimationStore.setTableLoading(true);
    supervisorStore
      .getSupervisorList()
      .finally(() => loadingAnimationStore.setTableLoading(false));
  };
  const onSearchByEmailOrName = (keyword) => {
    setFilter("supervisorListPageIndex", 0);
    setFilter("supervisorListKeyword", keyword);
    loadingAnimationStore.setTableLoading(true);
    supervisorStore.getSupervisorList().finally(() => {
      loadingAnimationStore.setTableLoading(false);
    });
  };

  const [isVisiblePopupImportExcel, setIsVisiblePopupImportExcel] = useState(
    false
  );

  // const showConfirmModal = (action, record) => {
  //   Modal.confirm({
  //     title: `Are you sure to deActive this account?`,
  //     onOk: () => {
  //       if (action === "confirm") {
  //       } else {
  //       }
  //     },
  //     onCancel: () => {},
  //     okText: "Yes",
  //     cancelText: "No",
  //   });
  // };

  const columns = [
    {
      title: "Roll number",
      render: (record) => record?.user.username,
    },
    {
      title: "Email",
      render: (record) => record?.user.email,
    },
    {
      title: "Full Name",
      render: (record) => record?.user.name,
    },
  ];

  return (
    <DashboardLayout>
      <Helmet>
        <title>Registration | List supervisor</title>
      </Helmet>
      <PageTitle
        location={props.location}
        title={"List supervisors"}
        hiddenGoBack
      ></PageTitle>
      <ContentBlockWrapper>
        <Profile>
          <TableStudents>
            <FlexBox style={{ marginBottom: "20px" }}>
              <div className="searchstudents">
                <Search
                  allowClear
                  placeholder={"FE Email or Name"}
                  className="searchInput"
                  onSearch={onSearchByEmailOrName}
                />
              </div>
              <div className="flex items-center justify-center gap-4">
                {/* <Button
                  type="primary"
                  className="flex items-center justify-center"
                  onClick={setIsVisiblePopupCreateSupervisor}
                >
                  <UserAddOutlined />
                  Add a Supervisor
                </Button> */}
                <Button
                  className="flex items-center justify-center"
                  onClick={setIsVisiblePopupImportExcel}
                >
                  <FolderAddOutlined />
                  Import Excel
                </Button>
              </div>
            </FlexBox>
            <TableComponent
              rowKey={(record) => record.id}
              dataSource={supervisorList}
              columns={columns}
              pagination={false}
              loading={loadingAnimationStore.tableLoading}
            />
          </TableStudents>
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
          <PopupImportExcel
            isVisiblePopup={isVisiblePopupImportExcel}
            setIsVisiblePopup={setIsVisiblePopupImportExcel}
            handleClosePopup={() => setIsVisiblePopupImportExcel(false)}
          />
          {/* <PopupCreateSupervisor
            isVisiblePopup={isVisiblePopupCreateSupervisor}
            setIsVisiblePopup={setIsVisiblePopupCreateSupervisor}
            handleClosePopup={() => setIsVisiblePopupCreateSupervisor(false)}
          /> */}
        </Profile>
      </ContentBlockWrapper>
    </DashboardLayout>
  );
};
export default memo(
  withRouter(
    inject(
      "authenticationStore",
      "loadingAnimationStore",
      "studentStore",
      "supervisorStore"
    )(observer(ListSupervisorPage))
  )
);

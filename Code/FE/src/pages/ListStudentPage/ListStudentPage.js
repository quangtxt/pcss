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
import { FlexBox, ForContent, TableStudents } from "./ListStudentPageStyled";
import {
  Profile,
  GroupButton,
  NoMarginBottom,
} from "../ProfilePage/ProfilePageStyled";
import TableComponent from "../../components/Common/TableComponent";
import PopupImportExcel from "./PopupImportExcel";
import PopupCreateStudent from "./PopupCreateStudent";

const { Search } = Input;
const { TextArea } = Input;

const ListStudentPage = (props) => {
  const {
    history,
    loadingAnimationStore,
    studentStore,
    authenticationStore,
  } = props;

  const {
    studentList,
    studentListTotalCount,
    studentListPageSize,
    studentListPageIndex,
    setFilter,
  } = studentStore;

  useEffect(() => {
    if (authenticationStore.currentUser) {
      loadingAnimationStore.setTableLoading(true);
      studentStore.getStudentList().finally(() => {
        loadingAnimationStore.setTableLoading(false);
      });
    }
    return () => {
      studentStore.clearStore();
    };
  }, [authenticationStore.currentUser]);

  const onChangePagination = (e) => {
    setFilter("studentListPageIndex", e - 1);
    loadingAnimationStore.setTableLoading(true);
    studentStore
      .getStudentList()
      .finally(() => loadingAnimationStore.setTableLoading(false));
  };
  const onSearchByEmailOrName = (keyword) => {
    setFilter("studentListPageIndex", 0);
    setFilter("studentListKeyword", keyword);
    loadingAnimationStore.setTableLoading(true);
    studentStore.getStudentList().finally(() => {
      loadingAnimationStore.setTableLoading(false);
    });
  };

  const [isVisiblePopupImportExcel, setIsVisiblePopupImportExcel] = useState(
    false
  );
  const [
    isVisiblePopupCreateStudent,
    setIsVisiblePopupCreateStudent,
  ] = useState(false);
  const showConfirmModal = (action, record) => {
    Modal.confirm({
      title: `Are you sure to deActive this account?`,
      onOk: () => {
        if (action === "confirm") {
        } else {
        }
      },
      onCancel: () => {},
      okText: "Yes",
      cancelText: "No",
    });
  };
  const columns = [
    {
      title: "Roll number",
      render: (record, index, dataSource) => dataSource + 1,
    },
    {
      title: "Email",
      render: (record) => record?.user.email,
    },
    {
      title: "Full Name",
      render: (record) => record?.user.name,
    },
    {
      title: "Status",
      render: (record) => (
        <Switch
          checked={record?.user.status}
          onClick={() => showConfirmModal("confirm", record)}
        />
      ),
    },
  ];

  return (
    <DashboardLayout>
      <Helmet>
        <title>Registration | List students</title>
      </Helmet>
      <PageTitle
        location={props.location}
        title={"List students"}
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
                <Button
                  type="primary"
                  className="flex items-center justify-center"
                  onClick={setIsVisiblePopupCreateStudent}
                >
                  <UserAddOutlined />
                  Add a Student
                </Button>
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
              dataSource={studentList}
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
              total={studentListTotalCount}
              pageSize={studentListPageSize}
              current={studentListPageIndex + 1}
              showSizeChanger={false}
              showLessItems
            />
          </div>
          <PopupImportExcel
            isVisiblePopup={isVisiblePopupImportExcel}
            setIsVisiblePopup={setIsVisiblePopupImportExcel}
            handleClosePopup={() => setIsVisiblePopupImportExcel(false)}
          />
          <PopupCreateStudent
            isVisiblePopup={isVisiblePopupCreateStudent}
            setIsVisiblePopup={setIsVisiblePopupCreateStudent}
            handleClosePopup={() => setIsVisiblePopupCreateStudent(false)}
          />
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
      "studentStore"
    )(observer(ListStudentPage))
  )
);

import React, { memo, useCallback, useEffect, useState } from "react";
import {
  AudioOutlined,
  UserAddOutlined,
  FolderAddOutlined,
} from "@ant-design/icons";
import { inject, observer } from "mobx-react";
import { withRouter } from "react-router-dom";
import { Button, Pagination, Input, Form } from "antd";
import uuid from "uuid";
import DashboardLayout from "../../layouts/DashboardLayout";
import { TableBottomPaginationBlock } from "../../components/Common/Table";
import ContentBlockWrapper from "../../components/ContentBlockWrapper";
import PageTitle from "../../components/PageTitle";
import { Helmet } from "react-helmet/es/Helmet";
import { FlexBox, ForContent, TableStudents } from "./ListStudentPageStyled";
import { Profile, GroupButton } from "../ProfilePage/ProfilePageStyled";
import TableComponent from "../../components/Common/TableComponent";
import PopupImportExcel from "./PopupImportExcel";

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

  // useEffect(() => {
  //   if (authenticationStore.currentUser) {
  //     loadingAnimationStore.setTableLoading(true);
  //     studentStore.getStudentList().finally(() => {
  //       loadingAnimationStore.setTableLoading(false);
  //     });
  //   }
  //   return () => {
  //     studentStore.clearStore();
  //   };
  // }, [authenticationStore.currentUser]);

  const onSearchByEmailOrName = (keyword) => {
    setFilter("studentListPageIndex", 0);
    setFilter("studentListKeyword", keyword);
    loadingAnimationStore.setTableLoading(true);
    studentStore.getStudentList().finally(() => {
      loadingAnimationStore.setTableLoading(false);
    });
  };

  const onChangePagination = (e) => {
    setFilter("studentListPageIndex", e - 1);
    loadingAnimationStore.setTableLoading(true);
    studentStore
      .getStudentList()
      .finally(() => loadingAnimationStore.setTableLoading(false));
  };
  const [isAdd, setIsAdd] = useState(false);
  const [isImport, setIsImport] = useState(false);

  const [isVisiblePopup, setIsVisiblePopup] = useState(false);

  const columns = [
    {
      title: "Roll number",
      render: (record, index, dataSource) => dataSource + 1,
    },
    {
      title: "Email",
      render: (record) => record?.email,
    },
    {
      title: "Full Name",
      render: (record) => record?.name,
    },
    {
      title: "Status",
      render: (record) => record?.status,
    },
  ];

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 6 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 14 },
    },
  };

  const handleSubmit = async (values) => {
    try {
      loadingAnimationStore.showSpinner(true);

      const response = await studentStore.createStudent(
        values.email,
        values.name
      );
      if (response.status === 200) {
        message.success("Add student successfully");
        console.log(response);
      }
    } catch (err) {
      console.log(err);
      loadingAnimationStore.showSpinner(false);
      message.error(err.en || "Login failed response status!");
    } finally {
      loadingAnimationStore.showSpinner(false);
    }
  };

  const handleAdd = useCallback(() => {
    setIsAdd((prevState) => !prevState);
  }, []);
  const handleImport = useCallback(() => {
    setIsImport((prevState) => !prevState);
  }, []);
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
        <Profile>
          <TableStudents>
            <FlexBox>
              <div className="searchSupervisors">
                <Search
                  allowClear
                  placeholder={"FE Email or Name"}
                  className="searchInput"
                />
              </div>
              <GroupButton className="grBtn">
                <Button className="btnAdd" onClick={handleAdd}>
                  <UserAddOutlined />
                  Add a Student
                </Button>
                <Button className="btnImport" onClick={setIsVisiblePopup}>
                  <FolderAddOutlined />
                  Import Excel
                </Button>
              </GroupButton>
            </FlexBox>
            <TableComponent
              rowKey={(record) => record.id || uuid()}
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
          <Form
            {...formItemLayout}
            variant="filled"
            onFinish={handleSubmit}
            className={`changeEmail ${isAdd ? "active" : ""}`}
          >
            <p className="bigTitle">Enter Student's Information</p>
            <div className="inputForm">
              <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, message: "Please input!" }]}
              >
                <Input style={{ maxWidth: "100%" }} placeholder="Enter email" />
              </Form.Item>
            </div>
            <div className="inputForm">
              <Form.Item
                label="fullName"
                name="name"
                rules={[{ required: true, message: "Please input!" }]}
              >
                <Input
                  style={{ maxWidth: "100%" }}
                  placeholder="Enter full name"
                />
              </Form.Item>
            </div>
            <div className="grBtn">
              <Button className="btnCancel" onClick={handleAdd}>
                Cancel
              </Button>
              <Button className="btnEdit">Submit</Button>
            </div>
          </Form>
          <PopupImportExcel
            isVisiblePopup={isVisiblePopup}
            setIsVisiblePopup={setIsVisiblePopup}
            handleClosePopup={() => setIsVisiblePopup(false)}
          />
          <div
            className={`overlay ${isAdd ? "active" : ""} ${
              isImport ? "active" : ""
            }`}
          ></div>
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

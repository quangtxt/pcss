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
import { ForContent, TableStudents } from "./ListStudentPageStyled";
import { Profile, GroupButton } from "../ProfilePage/ProfilePageStyled";
import TableComponent from "../../components/Common/TableComponent";
import PopupImportExcel from "./PopupImportExcel";

const { Search } = Input;
const { TextArea } = Input;

const ListStudentPage = (props) => {
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

  const [isAdd, setIsAdd] = useState(false);
  const [isImport, setIsImport] = useState(false);

  const [isVisiblePopup, setIsVisiblePopup] = useState(false);

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
      render: (record, index, dataSource) => dataSource + 1,
    },
    {
      title: "Full Name",
      render: (record) => record?.name,
    },
    {
      title: "Email",
      render: (record) => record?.email,
    },
    {
      title: "Note",
      render: (record) => record?.note,
    },
  ];
  function navigateToDetail(record) {}

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

      const response = await groupStore.createGroup(
        values.abbreviations,
        values.description,
        values.keywords,
        values.name,
        values.vietnameseTitle
      );
      if (response.status === 200) {
        //neu tao gr thanh cong
        message.success("create ok");
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
            <div className="searchSupervisors">
              <p>FE Email Or Name:</p>
              <Search
                allowClear
                placeholder={"FE Email or Name"}
                className="searchInput"
              />
            </div>
            <GroupButton className="grBtn">
              <Button className="btnAdd" onClick={handleAdd}><UserAddOutlined />Add a Student</Button>
              <Button className="btnImport" onClick={setIsVisiblePopup}><FolderAddOutlined />Import Excel</Button>
            </GroupButton>
            <TableComponent
              rowKey={(record) => record.id || uuid()}
              dataSource={mentorList}
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
              total={mentorListTotalCount}
              pageSize={mentorListPageSize}
              current={mentorListPageIndex + 1}
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
                name=""
                rules={[{ required: true, message: "Please input!" }]}
              >
                <Input
                  style={{ maxWidth: "100%" }}
                  placeholder="Enter verification code"
                />
              </Form.Item>
            </div>
            <div className="inputForm">
              <Form.Item
                label="Fullname"
                name=""
                rules={[{ required: true, message: "Please input!" }]}
              >
                <Input
                  style={{ maxWidth: "100%" }}
                  placeholder="Enter verification code"
                />
              </Form.Item>
            </div>
            <div className="inputForm">
              <Form.Item
                label="Note"
                name=""
                rules={[{ required: true, message: "Please input!" }]}
              >
                <TextArea rows={4} style={{ maxWidth: "100%" }} />
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
          <div className={`overlay ${isAdd ? 'active' : ''} ${isImport ? 'active' : ''}`}></div>
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
      "mentorStore"
    )(observer(ListStudentPage))
  )
);

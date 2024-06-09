import React, { memo, useCallback, useEffect, useState } from "react";
import {
  AudioOutlined,
  UserAddOutlined,
  FolderAddOutlined,
} from "@ant-design/icons";
import { inject, observer } from "mobx-react";
import { withRouter } from "react-router-dom";
import { Button, Pagination, Input, Form, Switch, Modal, Tabs } from "antd";
import uuid from "uuid";
import DashboardLayout from "../../layouts/DashboardLayout";
import { TableBottomPaginationBlock } from "../../components/Common/Table";
import ContentBlockWrapper from "../../components/ContentBlockWrapper";
import PageTitle from "../../components/PageTitle";
import { Helmet } from "react-helmet/es/Helmet";
import {
  FlexBox,
  ForContent,
  TableStudents,
  ListGroup,
} from "./ListGroupPageStyled";
import { Profile, GroupButton } from "../ProfilePage/ProfilePageStyled";
import TableComponent from "../../components/Common/TableComponent";

const { Search } = Input;
const { TextArea } = Input;
const { TabPane } = Tabs;

const ListGroupPage = (props) => {
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
        console.log("list", studentList);
        loadingAnimationStore.setTableLoading(false);
      });
    }
    return () => {
      studentStore.clearStore();
    };
  }, [authenticationStore.currentUser]);

  const [activeTab, setActiveTab] = useState("tab1");

  const onChange = (key) => {
    setActiveTab(key);
  };

  const columnsGroup = [
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
      render: (record) => record?.user.name,
    },
  ];

  const columnsStudent = [
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
      render: (record) => record?.user.name,
    },
  ];
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
        <ListGroup>
          <Tabs activeKey={activeTab} onChange={onChange}>
            <TabPane tab="List Group" key="tab1">
              <TableComponent
                // rowKey={(record) => record.id || uuid()}
                // dataSource={studentList}
                columns={columnsGroup}
                pagination={false}
                loading={loadingAnimationStore.tableLoading}
              />
            </TabPane>
            <TabPane tab="Student" key="tab2">
              <TableComponent
                // rowKey={(record) => record.id || uuid()}
                // dataSource={studentList}
                columns={columnsStudent}
                pagination={false}
                loading={loadingAnimationStore.tableLoading}
              />
            </TabPane>
          </Tabs>
        </ListGroup>
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
    )(observer(ListGroupPage))
  )
);

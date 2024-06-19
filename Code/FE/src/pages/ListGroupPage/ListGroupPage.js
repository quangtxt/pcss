import React, { memo, useCallback, useEffect, useState } from "react";
import {
  AudioOutlined,
  UserAddOutlined,
  FolderAddOutlined,
  ExclamationCircleFilled,
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
    groupStore,
    studentStore,
    authenticationStore,
  } = props;

  const {
    groupList,
    groupListTotalCount,
    groupListPageSize,
    groupListPageIndex,
  } = groupStore;

  const {
    studentList,
    studentListTotalCount,
    studentListPageSize,
    studentListPageIndex,
    setFilter,
  } = studentStore;
  const [studentsToInvite, setStudentsToInvite] = useState([]);
  const { confirm } = Modal;
  
  useEffect(() => {
    async function getStudentList() {
      const res = await studentStore.getStudentsToInvite();
      let listStudentInvite;
      listStudentInvite = res.data;
      setStudentsToInvite(listStudentInvite);
      console.log("list", listStudentInvite);
    }
    if (authenticationStore.currentUser) {
      loadingAnimationStore.setTableLoading(true);
      groupStore.getGroupList().finally(() => {
        loadingAnimationStore.setTableLoading(false);
      });
      getStudentList().finally(() => {
        loadingAnimationStore.setTableLoading(false);
      });
    }
    return () => {
      groupStore.clearStore();
    };
  }, [authenticationStore.currentUser]);
  const [activeTab, setActiveTab] = useState("tab1");

  const onChange = (key) => {
    setActiveTab(key);
  };

  const showConfirm = () => {
    confirm({
      title: 'Do you want to delete these items?',
      icon: <ExclamationCircleFilled />,
      content: 'Some descriptions',
      onOk() {
        console.log('OK');
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  const columnsGroup = [
    {
      title: "Group Name",
      render: (record) => record?.name,
    },
    {
      title: "Vietnamese Title",
      render: (record) => record?.vietnameseTitle,
    },
    {
      title: "Create at",
      render: (record) => record?.createdAt,
    },
    {
      title: "Description",
      render: (record) => record?.description,
    },
  ];

  const columnsStudent = [
    {
      title: "Full Name",
      render: (record) => record?.user.name,
    },
    {
      title: "Phone",
      render: (record) => record?.user.phone,
    },
    {
      title: "Email",
      render: (record) => record?.user.email,
    },
    {
      title: "Major",
      render: (record) => record?.specificMajor.name,
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
                rowKey={(record) => record.id || uuid()}
                dataSource={groupList}
                columns={columnsGroup}
                pagination={false}
                loading={loadingAnimationStore.tableLoading}
              />
            </TabPane>
            <TabPane tab="Student" key="tab2">
              <TableComponent
                rowKey={(record) => record.id || uuid()}
                dataSource={studentsToInvite}
                columns={columnsStudent}
                pagination={false}
                loading={loadingAnimationStore.tableLoading}
              />
              <Profile style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "20px" }}>
                <Button className="btnAdd" onClick={showConfirm}>Random Group</Button>
              </Profile>
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
      "studentStore",
      "groupStore"
    )(observer(ListGroupPage))
  )
);

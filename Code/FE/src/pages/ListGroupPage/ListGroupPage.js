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
import { GroupBtn } from "../ProfilePage/ProfilePageStyled";
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

  const [activeTab, setActiveTab] = useState("tab1");

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
      if (activeTab === "tab1") {
        groupStore.getGroupList().finally(() => {
          loadingAnimationStore.setTableLoading(false);
        });
      }
      getStudentList().finally(() => {
        loadingAnimationStore.setTableLoading(false);
      });
    }
    return () => {
      groupStore.clearStore();
    };
  }, [activeTab, authenticationStore.currentUser, groupStore, loadingAnimationStore]);

  const onChange = (key) => {
    setActiveTab(key);
  };

  const showConfirm = () => {
    confirm({
      title: "Do you want to automatically group students?",
      icon: <ExclamationCircleFilled />,
      async onOk() {
        try {
          await studentStore.automaticallyCreateGroups();
          console.log("Groups created successfully");
          history.go(0);
        } catch (error) {
          console.error("Error creating groups:", error);
        }
      },
      onCancel() {
        console.log("Cancel");
      },
      okText: "Yes",
      cancelText: "No",
    });
  };

  const onChangePagination = (e) => {
    setFilter("studentListPageIndex", e - 1);
    loadingAnimationStore.setTableLoading(true);
    studentsToInvite.finally(() =>
      loadingAnimationStore.setTableLoading(false)
    );
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

  const operations =
    activeTab === "tab2" ? (
      <Button type="primary" danger onClick={showConfirm}>
        Auto Group
      </Button>
    ) : null;

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
          <Tabs
            tabBarExtraContent={operations}
            activeKey={activeTab}
            onChange={onChange}
          >
            <TabPane tab="List Group" key="tab1">
              <TableComponent
                rowKey={(record) => record.id || uuid()}
                dataSource={groupList}
                columns={columnsGroup}
                pagination={false}
                loading={loadingAnimationStore.tableLoading}
              />
            </TabPane>
            <TabPane tab="List Student" key="tab2">
              <TableComponent
                rowKey={(record) => record.id || uuid()}
                dataSource={studentsToInvite}
                columns={columnsStudent}
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
                  total={studentListTotalCount}
                  pageSize={studentListPageSize}
                  current={studentListPageIndex + 1}
                  showSizeChanger={false}
                  showLessItems
                />
              </div>
            </TabPane>
          </Tabs>
        </ListGroup>
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
      "groupStore"
    )(observer(ListGroupPage))
  )
);

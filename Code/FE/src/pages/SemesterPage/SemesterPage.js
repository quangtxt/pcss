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
} from "./SemesterPageStyled";
import { GroupBtn } from "../ProfilePage/ProfilePageStyled";
import TableComponent from "../../components/Common/TableComponent";

const { Search } = Input;
const { TextArea } = Input;
const { TabPane } = Tabs;

const SemesterPage = (props) => {
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
    }
    return () => {
      groupStore.clearStore();
    };
  }, [authenticationStore.currentUser]);

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
        <TabPane tab="List Group" key="tab1">
          <TableComponent
            rowKey={(record) => record.id || uuid()}
            dataSource={groupList}
            columns={columnsGroup}
            pagination={false}
            loading={loadingAnimationStore.tableLoading}
          />
        </TabPane>
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
    )(observer(SemesterPage))
  )
);

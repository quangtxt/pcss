import React, { memo, useCallback, useEffect, useState } from "react";
import { inject, observer } from "mobx-react";
import { withRouter } from "react-router-dom";
import {
  Button,
  Pagination,
  Input,
  Form,
  Switch,
  Modal,
  Tabs,
  Select,
  Typography,
  Collapse,
} from "antd";
import uuid from "uuid";
import DashboardLayout from "../../layouts/DashboardLayout";
import { TableBottomPaginationBlock } from "../../components/Common/Table";
import ContentBlockWrapper from "../../components/ContentBlockWrapper";
import PageTitle from "../../components/PageTitle";
import { Helmet } from "react-helmet/es/Helmet";
import { FlexBox } from "../ListGroupPage/ListGroupPageStyled";
import { NoMarginBottom } from "../ProfilePage/ProfilePageStyled";
import TableComponent from "../../components/Common/TableComponent";

const { Title } = Typography;
const { TabPane } = Tabs;
const { Panel } = Collapse;
const options = [
  {
    label: "Summer 2024 (SU24)",
    value: "SU24",
  },
];
const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;
const items = [
  {
    key: "1",
    label: "This is panel header 1",
    children: <p>{text}</p>,
  },
  {
    key: "2",
    label: "This is panel header 2",
    children: <p>{text}</p>,
  },
  {
    key: "3",
    label: "This is panel header 3",
    children: <p>{text}</p>,
  },
];
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
      title: "ID",
      render: (record) => record?.name,
    },
    {
      title: "Name",
      render: (record) => record?.vietnameseTitle,
    },
    {
      title: "Start at",
      render: (record) => record?.createdAt,
    },
    {
      title: "End at",
      render: (record) => record?.description,
    },
    {
      title: "Action",
      render: (record) => record?.description,
    },
  ];
  const [activeTab, setActiveTab] = useState("tab1");
  const onChange = (key) => {
    setActiveTab(key);
  };
  const onChangeCollapse = (key) => {
    console.log(key);
  };
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
        <NoMarginBottom>
          <FlexBox
            style={{
              justifyContent: "center",
              gap: "20px",
              marginBottom: "0px",
            }}
          >
            <Title level={5}>Semester</Title>
            <Select
              // labelRender={labelRender}
              defaultValue="Choose a semester"
              style={{ width: "200px" }}
              options={options}
            />
          </FlexBox>
        </NoMarginBottom>
        <Tabs
          // tabBarExtraContent={operations}
          // activeKey={activeTab}
          centered
          onChange={onChange}
        >
          <TabPane tab="Phase 1" key="tab1">
            <Title level={3}>Name of Phase 1</Title>
            <Collapse bordered={false} defaultActiveKey={["1"]} onChange={onChangeCollapse}>
              <Panel header="Name of Milestone 1" key="1">
                <p>{text}</p>
              </Panel>
              <Panel header="Name of Milestone 2" key="2">
                <p>{text}</p>
              </Panel>
              <Panel header="Name of Milestone 3" key="3">
                <p>{text}</p>
              </Panel>
            </Collapse>
          </TabPane>
          <TabPane tab="Phase 2" key="tab2"></TabPane>
          <TabPane tab="Phase 3" key="tab3"></TabPane>
          <TabPane tab="Phase 4" key="tab4"></TabPane>
        </Tabs>
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

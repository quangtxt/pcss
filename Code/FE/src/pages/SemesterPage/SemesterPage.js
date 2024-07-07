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
import { PhaseTabs } from "./SemesterPageStyled";
const { Title } = Typography;
const { TabPane } = Tabs;
const { Panel } = Collapse;

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
    semesterStore,
    authenticationStore,
  } = props;

  const [semesters, setSemesters] = useState([]);
  const [defaultSemester, setDefaultSemester] = useState(null);
  const [selectedSemesterId, setSelectedSemesterId] = useState(null);
  const [phases, setPhases] = useState([]);

  useEffect(() => {
    if (authenticationStore.currentUser) {
      semesterStore.getSemesters().then((response) => {
        console.log("respon", response.data);
        const currentSemesters = response.data.map((semester) => ({
          label: semester.name,
          value: semester.id,
          begin_at: semester.beginAt,
          end_at: semester.endAt,
          phases: semester.phases,
        }));
        setSemesters(currentSemesters);

        // Set default semester based on current date
        const currentDate = new Date();
        const defaultSem = currentSemesters.find(
          (sem) =>
            new Date(sem.begin_at) <= currentDate &&
            new Date(sem.end_at) >= currentDate
        );
        setDefaultSemester(defaultSem || currentSemesters[0]);
        setSelectedSemesterId(defaultSem?.value);
        setPhases(defaultSem?.phases || []);
      });
    }
    return () => {
      semesterStore.clearStore();
    };
  }, [authenticationStore.currentUser, semesterStore]);
  console.log("sem", defaultSemester);

  const [activeTab, setActiveTab] = useState("tab1");
  const onChange = (key) => {
    setActiveTab(key);
  };
  const onChangeCollapse = (key) => {
    console.log(key);
  };
  const onSelectChange = (value) => {
    setSelectedSemesterId(value);
    const selectedSemester = semesters.find((sem) => sem.value === value);
    setPhases(selectedSemester.phases);
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
              value={selectedSemesterId}
              onChange={onSelectChange}
              style={{ width: "200px" }}
              options={semesters}
            />
          </FlexBox>
        </NoMarginBottom>
        <PhaseTabs>
          <Tabs
            // tabBarExtraContent={operations}
            // activeKey={activeTab}
            centered
            onChange={onChange}
          >
            {phases.map((phase, index) => (
              <TabPane tab={`Phase ${index + 1}`} key={`tab${index + 1}`}>
                <Title level={3}>{phase.name}</Title>
                <p className="mb-4" style={{ fontSize: "14px" }}>
                  {phase.beginAt} - {phase.endAt}
                </p>
                <Collapse
                  bordered={false}
                  defaultActiveKey={["1"]}
                  onChange={onChangeCollapse}
                >
                  {phase.milestones.map((milestone, milestoneIndex) => (
                    <Panel
                      header={
                        <span>
                          <b style={{ fontWeight: "600" }}>{milestone.name}</b>
                        </span>
                      }
                      key={milestoneIndex + 1}
                    >
                      <Collapse
                        bordered={false}
                        defaultActiveKey={["1"]}
                        onChange={onChangeCollapse}
                      >
                        {milestone.submissions.map(
                          (submission, submissionIndex) => (
                            <Panel
                              header={
                                <span>
                                  <b style={{ fontWeight: "600" }}>
                                    {submission.name}
                                  </b>{" "}
                                  (Due Date: {submission.dueDate})
                                </span>
                              }
                              key={submissionIndex + 1}
                            >
                              <p style={{ fontSize: "14px" }}>
                                Description: {submission.description}
                              </p>
                            </Panel>
                          )
                        )}
                      </Collapse>
                    </Panel>
                  ))}
                </Collapse>
              </TabPane>
            ))}
          </Tabs>
        </PhaseTabs>
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
      "groupStore",
      "semesterStore"
    )(observer(SemesterPage))
  )
);

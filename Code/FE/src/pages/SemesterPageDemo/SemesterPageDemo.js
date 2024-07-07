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
  Col,
  Row,
} from "antd";
import uuid from "uuid";
import DashboardLayout from "../../layouts/DashboardLayout";
import { TableBottomPaginationBlock } from "../../components/Common/Table";
import ContentBlockWrapper from "../../components/ContentBlockWrapper";
import PageTitle from "../../components/PageTitle";
import { Helmet } from "react-helmet/es/Helmet";
import { FlexBox } from "../ListGroupPage/ListGroupPageStyled";
import {
  NoMarginBottom,
  ContentInformation,
} from "../ProfilePage/ProfilePageStyled";
import TableComponent from "../../components/Common/TableComponent";
import {
  PhaseTabs,
  SemesterLayout,
  SemesterItem,
  LimitLine,
} from "./SemesterPageDemoStyled";
import PopupCreateSemester from "./PopupCreateSemester";
import PopupCreatePhase from "./PopupCreatePhase";
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
const SemesterPageDemo = (props) => {
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
  const [selectedPhase, setSelectedPhase] = useState(null);
  const [
    isVisiblePopupCreateSemester,
    setIsVisiblePopupCreateSemester,
  ] = useState(false);
  const [isVisiblePopupCreatePhase, setIsVisiblePopupCreatePhase] = useState(
    false
  );

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
        if (defaultSem?.phases.length > 0) {
          setSelectedPhase(defaultSem.phases[0]);
        }
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
  const handlePhaseClick = (phase) => {
    setSelectedPhase(phase);
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
      <div className="flex gap-5 items-stretch">
        <ContentInformation
          className="w-2/6 "
          style={{ backgroundColor: "unset" }}
        >
          <div className="flex items-stretch justify-between gap-2 mb-5 bg-white p-8 rounded-md">
            <NoMarginBottom className="flex items-center justify-center">
              <Title level={5}>Semester</Title>
            </NoMarginBottom>
            <Select
              value={selectedSemesterId}
              onChange={onSelectChange}
              style={{ width: "200px" }}
              options={semesters}
            />
            <Button
              className="flex items-center justify-center"
              type="primary"
              onClick={setIsVisiblePopupCreateSemester}
            >
              Add Semester
            </Button>
            <PopupCreateSemester
              isVisiblePopup={isVisiblePopupCreateSemester}
              setIsVisiblePopup={setIsVisiblePopupCreateSemester}
              handleClosePopup={() => setIsVisiblePopupCreateSemester(false)}
            />
          </div>
          <div className="bg-white p-8 rounded-md">
            {phases.map((phase, index) => (
              <NoMarginBottom
                className="py-3"
                style={{
                  borderBottom: "1px solid #d9d9d9",
                  cursor: "pointer",
                }}
                onClick={() => handlePhaseClick(phase)}
              >
                <LimitLine>
                  <Title level={5}>
                    Phase {index + 1}: {phase.name}
                  </Title>
                </LimitLine>
              </NoMarginBottom>
            ))}
            <div className="w-full flex items-center justify-center mt-3">
              <Button
                className="flex items-center justify-center"
                type="primary"
                onClick={setIsVisiblePopupCreatePhase}
              >
                Add Phase
              </Button>
              <PopupCreatePhase
                isVisiblePopup={isVisiblePopupCreatePhase}
                setIsVisiblePopup={setIsVisiblePopupCreatePhase}
                handleClosePopup={() => setIsVisiblePopupCreatePhase(false)}
              />
            </div>
          </div>
        </ContentInformation>
        <ContentInformation className="w-4/6 bg-white p-8">
          <FlexBox className="gap-8">
            <NoMarginBottom>
              <Title level={3}>
                {selectedPhase ? selectedPhase.name : "Name of Phase"}
              </Title>
            </NoMarginBottom>
            <Button className="flex items-center justify-center" type="primary">
              Edit Phase
            </Button>
          </FlexBox>
          <Collapse
            className="mb-6"
            bordered={false}
            defaultActiveKey={["1"]}
            onChange={onChangeCollapse}
          >
            {selectedPhase?.milestones.map((milestone, milestoneIndex) => (
              <Panel
                header={
                  <NoMarginBottom>
                    <Title level={5}>{milestone.name}</Title>
                  </NoMarginBottom>
                }
                key={milestoneIndex + 1}
              >
                <Collapse
                  bordered={false}
                  defaultActiveKey={["1"]}
                  onChange={onChangeCollapse}
                >
                  {milestone.submissions.map((submission, submissionIndex) => (
                    <Panel
                      header={
                        <NoMarginBottom>
                          <Title level={5}>{submission.name}</Title>
                        </NoMarginBottom>
                      }
                      key={submissionIndex + 1}
                    >
                      <p>Due Date: {submission.dueDate}</p>
                      <p style={{ fontSize: "14px" }}>
                        Description: {submission.description}
                      </p>
                    </Panel>
                  ))}
                </Collapse>
              </Panel>
            ))}
          </Collapse>
          <div className="w-full flex items-center justify-center">
            <Button
              className="flex items-center justify-center"
              type="primary"
              // onClick={setIsVisiblePopup}
            >
              Add Milestone
            </Button>
          </div>
        </ContentInformation>
      </div>
    </DashboardLayout>
  );
};
export default memo(
  withRouter(
    inject(
      "authenticationStore",
      "loadingAnimationStore",
      "studentStore",
      "groupStore",
      "semesterStore"
    )(observer(SemesterPageDemo))
  )
);

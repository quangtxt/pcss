import React, { memo, useCallback, useEffect, useState } from "react";
import { inject, observer } from "mobx-react";
import { withRouter } from "react-router-dom";
import {
  Button,
  Table,
  Typography,
  Select,
  Progress,
  Drawer,
  Space,
  Row,
  Col,
  Modal,
  Input,
} from "antd";
import { CloseCircleOutlined, CheckCircleOutlined } from "@ant-design/icons";
import uuid from "uuid";
import DashboardLayout from "../../layouts/DashboardLayout";
import ContentBlockWrapper from "../../components/ContentBlockWrapper";
import { NoMarginBottom } from "./ProgressPageStyled";
import PageTitle from "../../components/PageTitle";
import { Helmet } from "react-helmet/es/Helmet";
import ViewProgress from "../../components/ViewProgress/ViewProgress";
import moment from "moment";
import utils from "../../utils";
import { DATE_FORMAT_SLASH } from "../../constants";
const { TextArea } = Input;
const { Title } = Typography;
import MemberItem from "../Registration/TeamPage/MemberItem";
import {
  GroupBtn,
  ContentInformation,
  FontSize14px,
} from "../ProfilePage/ProfilePageStyled";

const ProgressPage = (props) => {
  const {
    history,
    loadingAnimationStore,
    groupStore,
    semesterStore,
    authenticationStore,
    match,
  } = props;
  const [data, setData] = useState([]);
  const { id } = match.params;
  const [visible, setVisible] = useState(false);
  const [members, setMembers] = useState([]);
  const [group, setGroup] = useState();
  const [refresh, setRefresh] = useState(false);
  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };
  const [selectedSemesterId, setSelectedSemesterId] = useState(null);
  useEffect(() => {
    getSemester();
  }, []);
  useEffect(() => {
    if (authenticationStore.currentUser?.group) {
      getGroupInfo();
    }
  }, [refresh, authenticationStore.currentUser]);

  const getGroupInfo = async () => {
    loadingAnimationStore.showSpinner(true);
    try {
      const res = await groupStore.getGroupByMemberId();
      setGroup(res.data);
      setMembers(res.data.members);
    } catch (err) {
      console.log(err);
      loadingAnimationStore.showSpinner(false);
    } finally {
      loadingAnimationStore.showSpinner(false);
    }
  };
  console.log("data", members);

  const getSemester = async () => {
    try {
      const res = await semesterStore.getSemesters();
      setSemesterCurrent(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  const setSemesterCurrent = (semesters) => {
    if (semesters.length > 0) {
      const currentDate = moment();
      const closestSemester = semesters.reduce((prev, curr) => {
        const startDate = moment(curr.beginAt);
        const endDate = startDate.clone().add(14, "weeks");
        if (currentDate.isBetween(startDate, endDate, null, "[]")) {
          return curr;
        } else {
          if (prev !== null) {
            const prevDiff = Math.abs(
              moment(prev.beginAt).diff(currentDate, "days")
            );
            const currDiff = Math.abs(startDate.diff(currentDate, "days"));
            return currDiff < prevDiff ? curr : prev;
          } else {
            return curr;
          }
        }
      }, null);
      if (closestSemester) {
        setData(utils.transformData(closestSemester.milestones));
        setSelectedSemesterId(closestSemester.id);
      }
    }
  };

  const rowExpandable = (record) => {
    const currentDate = moment();
    const fromDate = moment(record.fromDate);
    const toDate = moment(record.toDate);

    return (
      currentDate.isBetween(fromDate, toDate, null, "[]") ||
      record.detail?.length > 0
    );
  };

  const columnMilestoneGuidance = [
    {
      title: "#",
      dataIndex: "key",
      key: "key",
      width: 50,
    },
    {
      title: "Milestone",
      dataIndex: "name",
      key: "name",
      width: 200,
    },
    {
      title: "Start at",
      render: (record) => record.fromDate.format(DATE_FORMAT_SLASH),
      width: 125,
    },
    {
      title: "To/Deadline",
      render: (record) => record.toDate.format(DATE_FORMAT_SLASH),
      width: 125,
    },
    {
      title: "Status",
      render: (record) => <div className="text-gray-500">PENDING</div>,
    },
  ];
  const columnMilestone2 = [
    {
      title: "#",
      width: 50,
    },
    {
      title: "Product",
      dataIndex: "product",
      key: "product",
      width: 200,
    },
    {
      title: "Start at",
      render: (record) => record.fromDate.format(DATE_FORMAT_SLASH),
      width: 125,
    },
    {
      title: "To/Deadline",
      render: (record) => record.toDate.format(DATE_FORMAT_SLASH),
      width: 125,
    },
    {
      title: "Requirement",
      render: (record) => (
        <div className="flex">
          <Progress percent={100} />
        </div>
      ),
    },
  ];
  const [visiblePopup, setVisiblePopup] = useState(false);

  const handleEvaluate = () => {
    // Save the evaluation to the record
    setVisiblePopup(false);
  };

  const handleCancel = () => {
    setVisiblePopup(false);
  };
  return (
    <DashboardLayout>
      <Helmet>
        <title>Manager Group</title>
      </Helmet>
      <PageTitle
        location={props.location}
        title={"Manager group"}
        hiddenGoBack
      ></PageTitle>
      <div className="flex items-start gap-5">
        <div className="w-8/12">
          <ContentInformation className="py-6 mb-5">
            {selectedSemesterId && <ViewProgress id={selectedSemesterId} />}
          </ContentInformation>
          <ContentInformation>
            <FontSize14px>
              <Table
                columns={columnMilestoneGuidance}
                dataSource={data[4]?.detail}
                rowKey={(record) => record.id || uuid()}
                pagination={false}
                expandable={{
                  expandedRowRender: (record) => (
                    <>
                      {record?.detail[0]?.name == null ? (
                        <Table
                          columns={columnMilestone2}
                          dataSource={record?.detail}
                          rowKey={(record) => record.id || uuid()}
                          expandable={false}
                          pagination={false}
                          showHeader={false}
                        />
                      ) : (
                        <></>
                      )}
                    </>
                  ),
                  rowExpandable: (record) => record.detail?.length > 0,
                  expandIconColumnIndex: 0,
                }}
              />
            </FontSize14px>
          </ContentInformation>
        </div>
        <ContentInformation className="w-4/12 p-8">
          <Title className="text-center" level={4}>
            GROUP {group?.name}
          </Title>
          <FontSize14px>
            <div className="mb-2">English name: {group?.name}</div>
            <div className="mb-2">
              Vietnamese name: {group?.vietnameseTitle}
            </div>
            <div className="mb-2">
              Created at: {moment(group?.createdAt).format(DATE_FORMAT_SLASH)}
            </div>
            <div className="mb-2">Abbreviations: {group?.abbreviations}</div>
            <div className="mb-2">
              Profession: Information Technology A (K15 trở đi)
            </div>
            <div className="mb-2">Specialty: Lập trình .NET</div>
            <div>Description: </div>
            <div className="mb-2">{group?.description}</div>
            <div className="mb-2">Keywords: {group?.keywords}</div>
            <div>Members:</div>
            <div className="members">
              {members.map((member, index) => (
                <div>{member?.student.user.name}</div>
              ))}
            </div>
            <div className="mb-2"></div>
            <div className="flex items-center justify-center">
              <Button
                className="flex items-center justify-center"
                type="primary"
              >
                View Group Detail
              </Button>
            </div>
          </FontSize14px>
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
      "semesterStore",
      "groupStore",
      "authenticationStore"
    )(observer(ProgressPage))
  )
);

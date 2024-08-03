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
  Collapse,
  Row,
  Col,
  Modal,
  Input,
} from "antd";
import { CloseCircleOutlined, CheckCircleOutlined } from "@ant-design/icons";
import uuid from "uuid";
import DashboardLayout from "../../../layouts/DashboardLayout";
import ContentBlockWrapper from "../../../components/ContentBlockWrapper";
import { NoMarginBottom } from "./ManageGroupProgressPageStyled";
import PageTitle from "../../../components/PageTitle";
import { Helmet } from "react-helmet/es/Helmet";
import ViewProgress from "../../../components/ViewProgress/ViewProgress";
import moment from "moment";
import utils from "../../../utils";
import { DATE_FORMAT_SLASH, MEMBER_STATUS } from "../../../constants";
import MemberItem from "../../Registration/TeamPage/MemberItem";
import MilestoneEvaluationModal from "./MilestoneEvaluationModal";
import ViewAllEvaluationModal from "./ViewAllEvaluationModal";
import ReportPopup from "./ReportPopup";
const { Panel } = Collapse;
const { TextArea } = Input;
const { Title } = Typography;
const ManageGroupProgressPage = (props) => {
  const {
    history,
    loadingAnimationStore,
    groupStore,
    semesterStore,
    match,
  } = props;
  const [data, setData] = useState([]);
  const { id } = match.params;
  const [visible, setVisible] = useState(false);
  const [members, setMembers] = useState([]);
  const [group, setGroup] = useState();

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
    const getGroupInfo = async () => {
      loadingAnimationStore.showSpinner(true);
      try {
        const res = await groupStore.getGroupByGroupId(id);
        setGroup(res.data);
        setMembers(res.data.members);
      } catch (err) {
        console.log(err);
        loadingAnimationStore.showSpinner(false);
      } finally {
        loadingAnimationStore.showSpinner(false);
      }
    };
    getGroupInfo();
  }, [id]);
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
  const currentDate = moment();

  const isCurrentMilestone = (record) => {
    return currentDate.isBetween(record.fromDate, record.toDate, "day", "[]");
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
      title: "To/Deadline",
      render: (record) => record.toDate.format(DATE_FORMAT_SLASH),
      width: 200,
    },
    {
      title: "Status",
      render: (record) => (
        <div className="flex">
          <Progress percent={100} />
        </div>
      ),
    },
    {
      title: "Mark",
      width: 200,
      render: (record) => (
        <div>
          <Button type="primary" onClick={() => handleOpenPopup(record)}>
            Mark
          </Button>
        </div>
      ),
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
      title: "To/Deadline",
      render: (record) => record.toDate.format(DATE_FORMAT_SLASH),
      width: 200,
    },
    {
      title: "submit",
      render: (record) => (
        <div className="flex">
          {record.product.toLowerCase().includes("report") && record.toDate ? (
            <div>
              submitted -
              <Button className="ml-2" onClick={() => handleViewReport(record)}>
                View
              </Button>
            </div>
          ) : (
            "submitted"
          )}
        </div>
      ),
    },
  ];
  const [showReportPreviewPopup, setShowReportPreviewPopup] = useState(false);

  const handleViewReport = (record) => {
    setShowReportPreviewPopup(true);
  };
  const [visiblePopup, setVisiblePopup] = useState(false);
  const [visiblePopupAll, setVisiblePopupAll] = useState(false);
  const [currentMilestone, setCurrentMilestone] = useState("");
  const handleOpenPopup = (milestone) => {
    setCurrentMilestone(milestone);
    setVisiblePopup(true);
  };

  const handleCancel = () => {
    setVisiblePopup(false);
  };
  const handleCancelReport = () => {
    setShowReportPreviewPopup(false);
  };
  const handleCancelPopupAll = () => {
    setVisiblePopupAll(false);
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
      <ContentBlockWrapper>
        {selectedSemesterId && <ViewProgress id={selectedSemesterId} />}
        <div className="relative">
          <Button
            type="primary"
            onClick={showDrawer}
            className="fixed right-0 transform -translate-y-1/2 mt-64 z-20 mr-2 h-16"
          >
            Group <br />
            <div className="mt-2">Info</div>
          </Button>
          <Drawer
            title="Group Information"
            placement="right"
            onClose={onClose}
            visible={visible}
            width="45%"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-10 mb-6">
                <NoMarginBottom>
                  <Title level={4}>{group?.name}</Title>
                  <p>
                    Created at:{" "}
                    {moment(group?.createdAt).format(DATE_FORMAT_SLASH)}
                  </p>
                </NoMarginBottom>
              </div>
            </div>
            <Row>
              <Col span={12}>
                <p className="title">Abbreviations</p>
                <p className="content">{group?.abbreviations}</p>
              </Col>
              <Col span={12}>
                <p className="title">Vietnamese Title</p>
                <p className="content">{group?.vietnameseTitle}</p>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <p className="title">Profession</p>
                <p className="content">Information Technology A (K15 trở đi)</p>
              </Col>
              <Col span={12}>
                <p className="title">Specialty</p>
                <p className="content">Lập trình .NET</p>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <p className="title">Description</p>
                <p className="content">{group?.description}</p>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <p className="title">Keywords</p>
                <p className="content">{group?.keywords}</p>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <p className="title">Members</p>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <p>
                  Max: <span>5 members</span>
                </p>
              </Col>
            </Row>
            <div className="members">
              {members
                ?.sort((a, b) => {
                  // Ưu tiên thành viên có role là "OWNER"
                  if (a.role.includes("OWNER")) return -1;
                  if (b.role.includes("OWNER")) return 1;

                  /// Nếu không phải "OWNER", ưu tiên "ingroup" giảm dần theo updateAt
                  if (
                    a.status === MEMBER_STATUS.INGROUP &&
                    b.status === MEMBER_STATUS.INGROUP
                  ) {
                    return b.updateAt - a.updateAt;
                  }
                  if (a.status === MEMBER_STATUS.INGROUP) return -1;
                  if (b.status === MEMBER_STATUS.INGROUP) return 1;

                  // Cuối cùng là những thành viên "pending"
                  if (
                    a.status === MEMBER_STATUS.PENDING &&
                    b.status !== MEMBER_STATUS.PENDING
                  )
                    return 1;
                  if (
                    b.status === MEMBER_STATUS.PENDING &&
                    a.status !== MEMBER_STATUS.PENDING
                  )
                    return -1;

                  // Nếu cùng status, giữ nguyên thứ tự
                  return 0;
                })
                ?.map((member, index) => (
                  <MemberItem key={index} member={member} group={group} />
                ))}
            </div>
          </Drawer>
        </div>
        <div className="flex ">
          <div className="border rounded-md shadow-md m-4 w-1/2 ">
            <div className="p-4 flex items-center justify-center">
              <div>GROUP: SEP490 _ G27</div>
            </div>
            <div className="flex items-center justify-center">
              <div className="p-4">English name:{group?.name}</div>
              <div className="p-4">
                Vietnamese name: {group?.vietnameseTitle}
              </div>
            </div>
          </div>
          <div className="flex justify-end m-4 mt-8">
            <Button type="primary" onClick={() => setVisiblePopupAll(true)}>
              View evaluation for all milestone of group
            </Button>
          </div>
        </div>
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
                    rowClassName={(record) =>
                      isCurrentMilestone(record) ? "highlight" : ""
                    }
                  />
                ) : (
                  <Collapse accordion>
                    {record?.detail.map((item) => (
                      <Panel
                        header={
                          <Row
                            style={{
                              width: "100%",
                              // paddingLeft: "50px",
                            }}
                          >
                            <Col span={4}>{item.name}</Col>
                            <Col span={4}>
                              {item?.fromDate?.format(DATE_FORMAT_SLASH)}
                            </Col>
                            <Col span={4}>
                              {item?.toDate?.format(DATE_FORMAT_SLASH)}
                            </Col>
                            <Col span={12}>{item.time}</Col>
                          </Row>
                        }
                        key={item.key}
                      >
                        {item.detail.map((detail, index) => (
                          <Row key={index} style={{ paddingLeft: "24px" }}>
                            <Col xs={8}>{detail.product}</Col>
                            <Col xs={4}>
                              {detail?.toDate?.format(DATE_FORMAT_SLASH)}
                            </Col>
                            <Col xs={12}>{detail.time}</Col>
                          </Row>
                        ))}
                      </Panel>
                    ))}
                  </Collapse>
                )}
              </>
            ),
            rowExpandable: (record) => record.detail?.length > 0,
            expandIconColumnIndex: 0,
            rowClassName: (record) =>
              isCurrentMilestone(record) ? "highlight" : "",
          }}
          rowClassName={(record) =>
            isCurrentMilestone(record) ? "highlight" : ""
          }
        />
        <MilestoneEvaluationModal
          visible={visiblePopup}
          setVisiblePopup={setVisiblePopup}
          currentMilestone={currentMilestone}
          group={group}
          handleCancel={handleCancel}
        />
        <ReportPopup
          visible={showReportPreviewPopup}
          setVisiblePopup={setShowReportPreviewPopup}
          handleCancel={handleCancelReport}
        />
        <ViewAllEvaluationModal
          visible={visiblePopupAll}
          semesterId={selectedSemesterId}
          setVisiblePopup={setVisiblePopupAll}
          group={group}
          handleCancel={handleCancelPopupAll}
        />
      </ContentBlockWrapper>
    </DashboardLayout>
  );
};
export default memo(
  withRouter(
    inject(
      "authenticationStore",
      "loadingAnimationStore",
      "semesterStore",
      "groupStore"
    )(observer(ManageGroupProgressPage))
  )
);

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
import DashboardLayout from "../../../layouts/DashboardLayout";
import ContentBlockWrapper from "../../../components/ContentBlockWrapper";
import { NoMarginBottom } from "./ManageGroupProgressPageStyled";
import PageTitle from "../../../components/PageTitle";
import { Helmet } from "react-helmet/es/Helmet";
import ViewProgress from "../../../components/ViewProgress/ViewProgress";
import moment from "moment";
import utils from "../../../utils";
import { DATE_FORMAT_SLASH } from "../../../constants";
const { TextArea } = Input;
const { Title } = Typography;
import MemberItem from "../../Registration/TeamPage/MemberItem";

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
      title: "Nhận xét",
      dataIndex: "feedback",
      key: "feedback",
      width: 200,
      render: (feedback) => feedback || "Chưa có nhận xét",
    },
    {
      title: "Đánh giá",
      dataIndex: "score",
      key: "score",
      width: 200,
      render: (score, record) => (
        <div>
          {score ? (
            <div>{score}</div>
          ) : (
            <Button type="primary" onClick={() => setVisiblePopup(true)}>
              Đánh giá
            </Button>
          )}
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
      title: "Requirement",
      render: (record) => <div className="flex">submitted</div>,
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
              {group?.status === "PENDING" && (
                <Button
                  type="primary"
                  shape="round"
                  icon={<EditOutlined />}
                  onClick={navigateToEdit}
                  className="flex items-center "
                >
                  Edit Team Profile
                </Button>
              )}
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
        <div className="border rounded-md shadow-md m-4 w-1/2 mx-auto">
          <div className="p-4 flex items-center justify-center">
            <div>GROUP: SEP490 _ G27</div>
          </div>
          <div className="flex items-center justify-center">
            <div className="p-4">English name:{group?.name}</div>
            <div className="p-4">Vietnamese name: {group?.vietnameseTitle}</div>
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
        <Modal
          visible={visiblePopup}
          onOk={handleEvaluate}
          onCancel={handleCancel}
          title="Đánh giá"
        >
          <label>Điểm:</label>
          <Input
            type="number"
            // value={score}
            // onChange={(e) => setScore(e.target.value)}
          />
          <label>Nhận xét:</label>
          <TextArea
          // value={feedback}
          // onChange={(e) => setFeedback(e.target.value)}
          />
        </Modal>
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

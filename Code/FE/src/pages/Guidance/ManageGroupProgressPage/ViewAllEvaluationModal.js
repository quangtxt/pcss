import React, { useState, memo, useEffect, useCallback } from "react";
import { inject, observer } from "mobx-react";
import { withRouter } from "react-router-dom";
import { Modal, Table, Button, message } from "antd";
import utils from "../../../utils";
import moment from "moment";
const ViewAllEvaluationModal = ({
  visible,
  setVisiblePopup,
  group,
  semesterId,
  handleCancel,
  scoreStore,
  semesterStore,
  loadingAnimationStore,
}) => {
  const [marks, setMarks] = useState({});
  const [comments, setComments] = useState({});
  const [milestones, setMilestone] = useState([]);

  useEffect(() => {
    if (semesterId) {
      getMilestoneGuidance();
    }
  }, [semesterId]);
  const getMilestoneGuidance = async () => {
    try {
      const res = await semesterStore.getMilestoneGuidancePhase(semesterId);
      setMilestone(res.data);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    const getScore = async () => {
      loadingAnimationStore.showSpinner(true);
      try {
        const res = await scoreStore.getScoreByGroupId(group?.id);

        const newMarks = {};
        const newComments = {};

        res.data.forEach((score) => {
          newMarks[`${score.member.id}-${score.milestone.id}`] = score.score;
          newComments[`${score.member.id}-${score.milestone.id}`] =
            score.comment;
        });
        setMarks(newMarks);
        setComments(newComments);
      } catch (err) {
        console.log(err);
        loadingAnimationStore.showSpinner(false);
      } finally {
        loadingAnimationStore.showSpinner(false);
      }
    };
    if (visible) {
      getScore();
    }
  }, [visible]);
  const tableColumns = [
    {
      title: "Member Name",
      render: (_, member) => member?.student?.user?.name,
    },
    {
      title: "Roll Number",
      render: (_, member) =>
        utils.getRollNumberFromEmail(member?.student?.user?.email),
    },
    ...milestones?.map((milestone) => ({
      title: milestone.milestone.name,
      dataIndex: `${milestone.milestone.id}`,
      key: `milestone-${milestone.milestone.id}`,
      render: (_, member) =>
        marks[`${member.id}-${milestone.milestone.id}`] || "No score",
    })),
  ];

  const [exportLoading, setExportLoading] = useState(false);

  const exportScore = useCallback(async () => {
    setExportLoading(true);

    const col = tableColumns.map((col) => col.title);
    let rows = [];
    rows.push(col);
    try {
      setExportLoading(true);
      if (group?.members) {
        group?.members.map((member) => {
          rows.push([
            member?.student?.user?.name,
            utils.getRollNumberFromEmail(member?.student?.user?.email),
            ...milestones?.map(
              (milestone) =>
                marks[`${member.id}-${milestone.milestone.id}`] || ""
            ),
          ]);
        });
      }
      utils.exportExcel(
        rows,
        `Score - ${group?.name} ` + moment().format("YYYY-MM-DD")
      );
    } catch (error) {
      console.log(error);
      message.error(error.vi || "Đã có lỗi xảy ra!");
    } finally {
      setExportLoading(false);
    }
  }, [group, milestones, marks]);
  return (
    <Modal
      visible={visible}
      onCancel={handleCancel}
      onOk={handleCancel}
      title={`Evaluation`}
      cancelText="Cancel"
      width={1000}
    >
      <Button
        loading={exportLoading}
        onClick={exportScore}
        style={{ marginLeft: "10px" }}
      >
        Export excel
      </Button>
      <Table
        columns={tableColumns}
        dataSource={group?.members}
        rowKey="id"
        pagination={false}
      />
    </Modal>
  );
};
export default memo(
  withRouter(
    inject(
      "loadingAnimationStore",
      "scoreStore",
      "semesterStore"
    )(observer(ViewAllEvaluationModal))
  )
);

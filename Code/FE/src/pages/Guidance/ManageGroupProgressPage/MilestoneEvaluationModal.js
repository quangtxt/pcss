import React, { useState, memo, useEffect } from "react";
import { inject, observer } from "mobx-react";
import { withRouter } from "react-router-dom";
import { Modal, Table, Input, message } from "antd";

const MilestoneEvaluationModal = ({
  visible,
  setVisiblePopup,
  currentMilestone,
  group,
  handleCancel,
  scoreStore,
  loadingAnimationStore,
}) => {
  const [scores, setScores] = useState(null);
  const [marks, setMarks] = useState({});
  const [comments, setComments] = useState({});
  const [isUpdate, setIsUpdate] = useState(false);
  const [isValidateScore, setIsValidateScore] = useState(true);

  useEffect(() => {
    const getScore = async () => {
      loadingAnimationStore.showSpinner(true);
      try {
        const res = await scoreStore.getScoreByGroupIdAndMileStoneId(
          group?.id,
          currentMilestone?.id
        );
        setScores(res.data);
        const newMarks = res.data.reduce((acc, score) => {
          acc[score.member.id] = score.score;
          return acc;
        }, {});
        setMarks(newMarks);
        const newComments = res.data.reduce((acc, score) => {
          acc[score.member.id] = score.comment;
          return acc;
        }, {});
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
  }, [currentMilestone, visible]);
  const handleMarkChange = (e, id) => {
    setMarks({
      ...marks,
      [id]: parseFloat(e.target.value),
    });
  };
  const handleMarkValidation = (e, memberId) => {
    const value = parseFloat(e.target.value);
    if (value < 0 || value > 10) {
      message.error("Mark should be between 0 and 10");
      setIsUpdate(false);
      setIsValidateScore(false);
    } else {
      setIsUpdate(true);
      setIsValidateScore(true);
    }
  };
  const handleCommentChange = (e, id) => {
    if (e.target.value) {
      setComments({
        ...comments,
        [id]: e.target.value,
      });
      setIsUpdate(true);
    }
  };

  const handleEvaluate = async () => {
    const scoreEvaluateRequests = Object.keys(marks).map((id) => ({
      memberId: id,
      milestoneId: currentMilestone.id,
      score: marks[id],
      comment: comments[id] ?? "",
    }));
    try {
      await scoreStore.saveEvaluation(scoreEvaluateRequests);
      message.success("Scores updated successfully");
      setVisiblePopup(false);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Modal
      visible={visible}
      onOk={handleEvaluate}
      onCancel={handleCancel}
      title={`Mark for ${currentMilestone?.name}`}
      okText={scores?.length > 0 ? "Update evaluation member" : "Evaluate"}
      cancelText="Cancel"
      okButtonProps={{ disabled: !(isUpdate && isValidateScore) }}
    >
      <Table
        columns={[
          {
            title: "Member Name",
            render: (_, member) => member?.student?.user?.name,
          },
          {
            title: "Mark",
            dataIndex: "mark",
            key: "mark",
            render: (_, member) => (
              <Input
                placeholder="Enter mark"
                value={marks[member.id] || ""}
                onChange={(e) => handleMarkChange(e, member.id)}
                type="number"
                step="0.01"
                min="0"
                max="10"
                onBlur={(e) => handleMarkValidation(e, member.id)}
              />
            ),
          },
          {
            title: "Comment",
            dataIndex: "comment",
            key: "comment",
            render: (_, member) => (
              <Input
                placeholder="Enter comment"
                value={comments[member.id] || ""}
                onChange={(e) => handleCommentChange(e, member.id)}
              />
            ),
          },
        ]}
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
      "scoreStore"
    )(observer(MilestoneEvaluationModal))
  )
);

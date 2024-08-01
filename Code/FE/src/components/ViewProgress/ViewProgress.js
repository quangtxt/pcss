import React, { memo, useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
// Component
// Ant design
import { Avatar, Badge, Dropdown, Menu, message, Tabs, Steps } from "antd";
import {
  BellFilled,
  CloseOutlined,
  LogoutOutlined,
  UserOutlined,
} from "@ant-design/icons";
// Other
import { inject, observer } from "mobx-react";
import { withRouter } from "react-router-dom";
import moment from "moment";

const { Step } = Steps;
const ViewProgress = (props) => {
  const { history, semesterStore, id } = props;
  const currentDate = moment();
  const [milestones, setMilestone] = useState([]);

  useEffect(() => {
    getMilestoneGuidance();
  }, [id]);
  const getMilestoneGuidance = async () => {
    try {
      const res = await semesterStore.getMilestoneGuidancePhase(id);
      setMilestone(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  const getCurrentStepIndex = () => {
    for (let i = 0; i < milestones.length; i++) {
      if (
        moment(currentDate).format("YYYY-MM-DD") >=
          moment(milestones[i].startDate).format("YYYY-MM-DD") &&
        moment(currentDate).format("YYYY-MM-DD") <=
          moment(milestones[i].endDate).format("YYYY-MM-DD")
      ) {
        return i;
      }
    }
    return -1;
  };

  const currentStepIndex = getCurrentStepIndex();
  return (
    <div
      className="sticky z-40 top-0 p-4"
      style={{ backgroundColor: "#f1f5f9" }}
    >
      <Steps
        labelPlacement="vertical"
        current={currentStepIndex === -1 ? 0 : currentStepIndex}
      >
        {milestones.map((milestone, index) => (
          <Step
            key={index}
            title={milestone.milestone?.name}
            status={
              currentStepIndex === -1
                ? "wait"
                : index < currentStepIndex
                ? "finish"
                : index === currentStepIndex
                ? "process"
                : "wait"
            }
          />
        ))}
      </Steps>
    </div>
  );
};

export default memo(
  withRouter(
    inject("semesterStore", "loadingAnimationStore")(observer(ViewProgress))
  )
);

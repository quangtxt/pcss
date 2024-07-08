import React from "react";

import { Tag } from "antd";
import { NOTIFICATION_STATUS } from "../../constants";

export const StatusTag = (typePage, status, isText = false) => {
  let text = "Không rõ";
  let color = null;

  if (status === NOTIFICATION_STATUS.REQUESTGROUP) {
    color = "green";
    text = "REQUEST_GROUP";
  }
  if (status === NOTIFICATION_STATUS.GROUP) {
    color = "orange";
    text = "GROUP";
  }
  if (status === NOTIFICATION_STATUS.NEWS) {
    color = "purple";
    text = "NEWS";
  }

  // if ([NOTIFICATION_STATUS.PROPOSAL_SALARY].includes(status)) {
  //   color = "cyan";
  //   text = "Duyệt lương";
  // }
  // if (status === NOTIFICATION_STATUS.CONSULT) {
  //   color = "#597ef7";
  //   text = "Xin ý kiến";
  // }
  // if (status === NOTIFICATION_STATUS.POLICY) {
  //   color = "#69c0ff";
  //   text = "Xin chủ chương";
  // }
  // if (status === NOTIFICATION_STATUS.VBLT_DI) {
  //   color = "#69c0ff";
  //   text = "Văn bản liên thông đi";
  // }
  // if (status === NOTIFICATION_STATUS.WORK_SCHEDULE) {
  //   color = "#d03bff";
  //   text = "Lịch cơ quan";
  // }
  // if (status === NOTIFICATION_STATUS.GENERAL) {
  //   color = "blue";
  //   text = "Thông báo chung";
  // }

  if (isText) {
    return text;
  }

  return (
    <span style={{ display: "flex", alignItems: "center" }}>
      {color && (
        <Tag color={color} style={{ borderRadius: 10, margin: 0 }}>
          {text}
        </Tag>
      )}
    </span>
  );
};

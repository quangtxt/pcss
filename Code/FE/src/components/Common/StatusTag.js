import React from "react";

import { Tag } from "antd";

export const StatusTag = (typePage, status, isText = false) => {
  let text = "Không rõ";
  let color = null;

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

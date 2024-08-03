import React, { useState, memo, useEffect } from "react";
import { inject, observer } from "mobx-react";
import { withRouter } from "react-router-dom";
import { Modal, Table, Input, message } from "antd";
import mammoth from "mammoth";

const ReportPopup = ({
  visible,
  setVisiblePopup,
  currentMilestone,
  group,
  handleCancel,
  scoreStore,
  loadingAnimationStore,
}) => {
  const [docContent, setDocContent] = useState("");

  useEffect(() => {
    async function fetchDocContent() {
      const response = await fetch(
        "https://gitlab.com/api/v4/projects/57799309/repository/files/Report%2FReport2_Project%20Management%20Plan.docx?ref=main"
      );
      const data = await response.json();
      const decodedContent = atob(data.content);
      const arrayBuffer = Uint8Array.from(decodedContent, (c) =>
        c.charCodeAt(0)
      ).buffer;

      mammoth
        .convertToHtml({ arrayBuffer: arrayBuffer })
        .then((result) => {
          setDocContent(result.value);
        })
        .catch((err) => {
          console.error("Error converting DOCX to HTML:", err);
        });
    }

    fetchDocContent();
  }, []);

  return (
    <Modal
      visible={visible}
      onOk={handleCancel}
      onCancel={handleCancel}
      title={`Report preview`}
      width={1000}
    >
      <div dangerouslySetInnerHTML={{ __html: docContent }} />
    </Modal>
  );
};
export default memo(
  withRouter(
    inject("loadingAnimationStore", "scoreStore")(observer(ReportPopup))
  )
);

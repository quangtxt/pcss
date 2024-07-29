import React, { useEffect, useState } from "react";
import {
  Button,
  Form,
  message,
  Modal,
  Space,
  Input,
  Upload,
  Typography,
} from "antd";
import { withRouter } from "react-router-dom";
import { inject, observer } from "mobx-react";
import {
  CheckOutlined,
  CloseOutlined,
  UploadOutlined,
  VerticalAlignBottomOutlined,
} from "@ant-design/icons";
import {
  Profile,
  GroupButton,
  BoldContent,
  NoMarginBottom,
} from "../ProfilePage/ProfilePageStyled";
import { FlexBox, PopupImport } from "./ListStudentPageStyled";
import TableComponent from "../../components/Common/TableComponent";

const { Title } = Typography;
const PopupImportExcel = (props) => {
  const { isVisiblePopup, setIsVisiblePopup, handleClosePopup } = props;
  const { TextArea } = Input;
  const [form] = Form.useForm();
  const [supervisor, setSupervisor] = useState();
  const {
    history,
    loadingAnimationStore,
    fileStore,
    authenticationStore,
  } = props;
  const handleDownLoadTemplate = async () => {
    try {
      loadingAnimationStore.showSpinner(true);
      const response = await fileStore.downloadTemplateAccount();
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "template.xlsx");
      document.body.appendChild(link);
      link.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading template:", error);
    } finally {
      loadingAnimationStore.showSpinner(false);
    }
  };
  return (
    <Modal
      footer={null}
      title={
        <NoMarginBottom>
          <Title level={4}>Import file excel</Title>
        </NoMarginBottom>
      }
      className="custom-modal"
      closable={true}
      visible={isVisiblePopup}
      onCancel={handleClosePopup}
    >
      <Form form={form}>
        <div className="flex items-center justify-center gap-6 mb-4">
          <Button
            className="flex items-center justify-center text-white"
            style={{ backgroundColor: "#0F9D58" }}
          >
            <UploadOutlined />
            Click to Upload
          </Button>

          <Button
            className="flex items-center justify-center"
            onClick={handleDownLoadTemplate}
          >
            <VerticalAlignBottomOutlined />
            Download template
          </Button>
        </div>
        <div className="flex items-center justify-center gap-2">
          <Button type="danger" onClick={handleClosePopup}>
            Cancel
          </Button>
          <Button type="primary">Submit</Button>
        </div>
      </Form>
    </Modal>
  );
};

PopupImportExcel.propTypes = {};

export default withRouter(
  inject(
    "loadingAnimationStore",
    "authenticationStore",
    "fileStore"
  )(observer(PopupImportExcel))
);

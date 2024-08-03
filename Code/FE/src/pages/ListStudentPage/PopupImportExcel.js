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
import uuid from "uuid";

import {
  CheckOutlined,
  InboxOutlined,
  UploadOutlined,
  VerticalAlignBottomOutlined,
} from "@ant-design/icons";
import { NoMarginBottom } from "../ProfilePage/ProfilePageStyled";
import ModalPreView from "./ModalPreView";

const { Dragger } = Upload;

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

  const [fileExcel, setFileExcel] = useState(null);
  const [dataExcel, setDataExcel] = useState(null);
  const [preViewVisible, setPreViewVisible] = useState(false);
  const handleGetDataExcel = async () => {
    if (!fileExcel) {
      message.error("You have not selected an Excel file.");
      return;
    }
    const fileExtension = fileExcel.name.split(".").pop();

    if (fileExtension !== "xlsx" && fileExtension !== "xls") {
      message.error("Incorrect file format.");
      return;
    }
    loadingAnimationStore.showSpinner(true);
    const formData = new FormData();
    formData.append("file", fileExcel);
    try {
      const response = await fileStore.sendDataExcelStudent(formData);
      console.log("response", response);
      setDataExcel(response);
      setPreViewVisible(true);
      loadingAnimationStore.showSpinner(false);
    } catch (error) {
      console.error("Error importing Excel:", error);
      message.error("An error occurred while importing the Excel file.");
      loadingAnimationStore.showSpinner(false);
    } finally {
      loadingAnimationStore.showSpinner(false);
    }
  };
  useEffect(() => {
    if (fileExcel == null) return;
    handleGetDataExcel();
  }, [fileExcel]);
  const handleDownLoadTemplate = async () => {
    try {
      loadingAnimationStore.showSpinner(true);
      const response = await fileStore.downloadTemplateAccountStudent();
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "template-student.xlsx");
      document.body.appendChild(link);
      link.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading template:", error);
    } finally {
      loadingAnimationStore.showSpinner(false);
    }
  };

  const handleCancelImport = () => {
    setIsVisiblePopup(false);
    setFileExcel(null);
  };

  const handleRemoveFile = () => {
    setFileExcel(null);
  };
  return (
    <>
      <Modal
        title={
          <NoMarginBottom>
            <Title level={4}>Import file excel</Title>
          </NoMarginBottom>
        }
        className="custom-modal"
        closable={true}
        visible={isVisiblePopup}
        onCancel={handleCancelImport}
        footer={[
          <Button danger ghost onClick={handleCancelImport} key={uuid()}>
            Hủy
          </Button>,
          <Button onClick={handleDownLoadTemplate} key={uuid()}>
            Tải mẫu nhập
          </Button>,
        ]}
      >
        <Dragger
          fileList={fileExcel ? [fileExcel] : []}
          onRemove={handleRemoveFile}
          beforeUpload={(file) => {
            setFileExcel(file);
            return false;
          }}
          multiple={false}
        >
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">
            Drag and drop or click to select excel file
          </p>
        </Dragger>
      </Modal>
      {preViewVisible && (
        <ModalPreView
          data={dataExcel}
          setPreViewVisible={setPreViewVisible}
          onCancel={() => setPreViewVisible(false)}
        />
      )}
    </>
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

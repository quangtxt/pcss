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
import { FlexBox, PopupImport } from "./ListSupervisorPageStyled";
import TableComponent from "../../components/Common/TableComponent";

const { Title } = Typography;
const PopupCreateStudent = (props) => {
  const {
    history,
    loadingAnimationStore,
    supervisorStore,
    studentStore,
    authenticationStore,
    isVisiblePopup,
    setIsVisiblePopup,
    handleClosePopup,
  } = props;
  const [form] = Form.useForm();

  useEffect(() => {
    if (authenticationStore.currentUser) {
      loadingAnimationStore.setTableLoading(true);
      supervisorStore.getSupervisorList().finally(() => {
        loadingAnimationStore.setTableLoading(false);
      });
    }
    return () => {
      supervisorStore.clearStore();
    };
  }, [authenticationStore.currentUser]);

  const handleSubmit = async (values) => {
    try {
      loadingAnimationStore.showSpinner(true);
      await studentStore.createStudent(values.email, values.name);
      handleClosePopup;
      message.success("Add student successfully!!!");
    } catch (err) {
      console.log(err);
      loadingAnimationStore.showSpinner(false);
      message.error(err.en || "Login failed response status!");
    } finally {
      loadingAnimationStore.showSpinner(false);
    }
  };

  return (
    <Modal
      footer={null}
      title={
        <NoMarginBottom>
          <Title level={4}>Create Student</Title>
        </NoMarginBottom>
      }
      className="custom-modal"
      closable={true}
      visible={isVisiblePopup}
      onCancel={handleClosePopup}
    >
      <Form
        form={form}
        scrollToFirstError
        labelAlign="left"
        layout="horizontal"
        labelCol={{
          span: 6,
        }}
        wrapperCol={{
          span: 20,
        }}
        onFinish={handleSubmit}
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input!" }]}
        >
          <Input style={{ maxWidth: "100%" }} placeholder="Enter email" />
        </Form.Item>
        <Form.Item
          label="Full Name"
          name="name"
          rules={[{ required: true, message: "Please input!" }]}
        >
          <Input style={{ maxWidth: "100%" }} placeholder="Enter full name" />
        </Form.Item>
        <div className="flex items-center justify-center gap-2">
          <Button type="danger" onClick={handleClosePopup}>
            Cancel
          </Button>
          <Button type="primary" htmlType={"submit"}>
            Submit
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

PopupCreateStudent.propTypes = {};

export default withRouter(
  inject(
    "loadingAnimationStore",
    "authenticationStore",
    "supervisorStore",
    "studentStore"
  )(observer(PopupCreateStudent))
);

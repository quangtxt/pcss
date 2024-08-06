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
} from "../../ProfilePage/ProfilePageStyled";

const { Title } = Typography;
const PopupCreateSupervisors = (props) => {
  const { isVisiblePopup, setIsVisiblePopup, handleClosePopup } = props;
  const [form] = Form.useForm();
  const {
    history,
    loadingAnimationStore,
    supervisorStore,
    studentStore,
    authenticationStore,
  } = props;

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
      await supervisorStore.createSupervisor(values.fullName, values.fptEmail);
      handleClosePopup;
      message.success("Add supervisor successfully!!!");
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
          <Title level={4}>Create Supervisors</Title>
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
          label="Full Name"
          name="fullName"
          rules={[{ required: true, message: "Please input!" }]}
        >
          <Input style={{ maxWidth: "100%" }} placeholder="Enter full name" />
        </Form.Item>
        <Form.Item
          label="FPT Email"
          name="fptEmail"
          rules={[{ required: true, message: "Please input!" }]}
        >
          <Input style={{ maxWidth: "100%" }} placeholder="Enter email" />
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

PopupCreateSupervisors.propTypes = {};

export default withRouter(
  inject(
    "loadingAnimationStore",
    "authenticationStore",
    "supervisorStore",
    "studentStore"
  )(observer(PopupCreateSupervisors))
);

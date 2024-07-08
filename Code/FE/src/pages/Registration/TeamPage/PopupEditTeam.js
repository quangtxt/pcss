import React, { useEffect, useState } from "react";
import { Button, Form, message, Modal, Space, Input } from "antd";
import { withRouter } from "react-router-dom";
import { inject, observer } from "mobx-react";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import moment from "moment";

const PopupEditTeam = (props) => {
  const {
    isVisiblePopupEdit,
    setIsVisiblePopupEdit,
    handleClosePopup,
    group,
    loadingAnimationStore,
    groupStore,
    setRefresh,
  } = props;
  const { TextArea } = Input;
  const [form] = Form.useForm();
  useEffect(() => {
    if (group) {
      form.setFieldsValue({
        name: group?.name,
        abbreviations: group?.abbreviations,
        vietnameseTitle: group?.vietnameseTitle,
        keywords: group?.keywords,
        description: group?.description,
      });
    }
  }, [group]);
  const handleEdit = async (values) => {
    try {
      loadingAnimationStore.showSpinner(true);
      console.log(
        "Dataa",
        group?.id,
        values.name,
        values.description,
        values.abbreviations,
        values.vietnameseTitle,
        values.keywords
      );
      const response = await groupStore.editGroup(
        group?.id,
        values.name,
        values.description,
        values.abbreviations,
        values.vietnameseTitle,
        values.keywords
      );
      if (response.status === 200) {
        setRefresh(true);
        setIsVisiblePopupEdit(false);
        message.success("Edit group successfully");
      }
    } catch (err) {
      console.log(err);
      loadingAnimationStore.showSpinner(false);
      message.error(err.en || "Error not edit team!");
    } finally {
      loadingAnimationStore.showSpinner(false);
    }
  };

  return (
    <Modal
      title="Edit Team Profiles"
      footer={null}
      closable={true}
      visible={isVisiblePopupEdit}
      onCancel={handleClosePopup}
    >
      <Form
        onFinish={handleEdit}
        form={form}
        labelAlign="left"
        layout="horizontal"
        labelCol={{
          span: 7,
        }}
        wrapperCol={{
          span: 20,
        }}
        scrollToFirstError
      >
        <Form.Item label="Name" name="name">
          <Input />
        </Form.Item>
        <Form.Item label="Abbreviations" name="abbreviations">
          <Input />
        </Form.Item>
        <Form.Item label="Vietnamese Title" name="vietnameseTitle">
          <Input style={{ maxWidth: "100%" }} />
        </Form.Item>
        <Form.Item label="Keywords" name="keywords">
          <Input style={{ maxWidth: "100%" }} />
        </Form.Item>
        <Form.Item label="Description" name="description">
          <TextArea rows={5} style={{ maxWidth: "100%", resize: "none" }} />
        </Form.Item>
        <div className="flex items-center justify-center gap-16">
          <Button icon={<CloseOutlined />} onClick={handleClosePopup} danger>
            Cancel
          </Button>
          <Button icon={<CheckOutlined />} htmlType={"submit"} type={"primary"}>
            Edit
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

PopupEditTeam.propTypes = {};

export default withRouter(
  inject(
    "loadingAnimationStore",
    "authenticationStore",
    "groupStore"
  )(observer(PopupEditTeam))
);

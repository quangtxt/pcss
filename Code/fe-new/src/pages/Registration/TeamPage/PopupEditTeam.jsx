import React, { useEffect, useState, useContext } from "react";
import { Button, Form, message, Modal, Space, Input } from "antd";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { StoreContext } from "../../../App";

const PopupEditTeam = (props) => {
  const {
    isVisiblePopup,
    setIsVisiblePopup,
    handleClosePopup,
    group,
    setRefresh,
  } = props;
  const { loadingAnimationStore, groupStore } = useContext(StoreContext);
  const { TextArea } = Input;
  const [form] = Form.useForm();
  const [mentor, setMentor] = useState();
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
      const response = await groupStore.editGroup(
        group?.id,
        values.abbreviations,
        values.description,
        values.keywords,
        values.name,
        values.vietnameseTitle
      );
      if (response.status === 200) {
        //sua gr thanh cong
        setRefresh(true);
        setIsVisiblePopup(false);
        message.success("Edit group successfully");
      }
    } catch (err) {
      console.log(err);
      loadingAnimationStore.showSpinner(false);
      message.error(err.en || "Error edit group!");
    } finally {
      loadingAnimationStore.showSpinner(false);
    }
  };

  return (
    <Modal
      title="Edit Team Profiles"
      footer={null}
      closable={true}
      open={isVisiblePopup}
      onCancel={handleClosePopup}
    >
      <Form onFinish={handleEdit} form={form} scrollToFirstError>
        <div className="inputForm">
          <Form.Item label="Name" name="name">
            <Input />
          </Form.Item>
        </div>
        <div className="inputForm">
          <Form.Item label="Abbreviations" name="abbreviations">
            <Input />
          </Form.Item>
        </div>
        <div className="inputForm">
          <Form.Item label="Vietnamese Title" name="vietnameseTitle">
            <Input style={{ maxWidth: "100%" }} />
          </Form.Item>
        </div>
        <div className="inputForm">
          <Form.Item label="Keywords" name="keywords">
            <Input style={{ maxWidth: "100%" }} />
          </Form.Item>
        </div>
        <div className="inputForm">
          <Form.Item label="Description" name="description">
            <TextArea rows={5} style={{ maxWidth: "100%" }} />
          </Form.Item>
        </div>
        <Space
          style={{
            marginTop: 20,
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Button icon={<CloseOutlined />} onClick={handleClosePopup} danger>
            Cancel
          </Button>
          <Button icon={<CheckOutlined />} htmlType={"submit"} type={"primary"}>
            Edit
          </Button>
        </Space>
      </Form>
    </Modal>
  );
};

export default PopupEditTeam;

import React, { useEffect, useState, useRef } from "react";
import { Button, Form, message, Modal, Space, Input } from "antd";
import { withRouter } from "react-router-dom";
import { inject, observer } from "mobx-react";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import RichEditor from "../../../components/RichEditor/RichEditor";
import { toJS } from "mobx";

const PopupViewDetail = (props) => {
  const {
    isVisiblePopup,
    setIsVisiblePopup,
    handleClosePopup,
    note,
    meetingId,
    authenticationStore,
    loadingAnimationStore,
    meetingStore,
  } = props;
  const { currentUser } = authenticationStore;
  const { TextArea } = Input;
  const [form] = Form.useForm();
  const [supervisor, setSupervisor] = useState();
  const EDITOR_REF = useRef();
  useEffect(() => {
    if (note) {
      form.setFieldsValue({ title: note?.title, content: note?.content });
    }
  }, [note]);

  const handleSubmit = async (values) => {
    try {
      loadingAnimationStore.showSpinner(true);
      const response = await meetingStore.editNote(
        meetingId,
        values.title,
        EDITOR_REF.current.editor.getData(),
        note?.id,
        currentUser?.id
      );
      if (response.status === 200) {
        message.success("Edit note successfully");
        setIsVisiblePopup(false);
      }
    } catch (err) {
      console.log(err);
      loadingAnimationStore.showSpinner(false);
      message.error(err.en || "Failed response status!");
    } finally {
      loadingAnimationStore.showSpinner(false);
    }
  };
  return (
    <Modal
      title="Note"
      footer={null}
      closable={true}
      visible={isVisiblePopup}
      onCancel={handleClosePopup}
      width={1000}
    >
      <Form form={form} onFinish={handleSubmit}>
        <div className="inputForm">
          <Form.Item label="Title" name="title">
            <Input style={{ maxWidth: "100%" }} disabled />
          </Form.Item>
        </div>
        <div className="inputForm">
          <Form.Item label="Content" name="content">
            <RichEditor
              EDITOR_REF={EDITOR_REF}
              placeholder={"Nhập nội dung"}
              editorContent={note && toJS(note?.content)}
            />
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
            Close
          </Button>
          <Button icon={<CheckOutlined />} htmlType={"submit"} type={"primary"}>
            Edit
          </Button>
        </Space>
      </Form>
    </Modal>
  );
};

PopupViewDetail.propTypes = {};

export default withRouter(
  inject(
    "loadingAnimationStore",
    "authenticationStore",
    "meetingStore"
  )(observer(PopupViewDetail))
);

import React, { useEffect, useState, useRef } from "react";
import { Button, Form, message, Modal, Space, Input } from "antd";
import { withRouter } from "react-router-dom";
import { inject, observer } from "mobx-react";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import RichEditor from "../../../components/RichEditor/RichEditor";
import { toJS } from "mobx";

const PopupViewDetail = (props) => {
  const { isVisiblePopup, setIsVisiblePopup, handleClosePopup, note } = props;
  const { TextArea } = Input;
  const [form] = Form.useForm();
  const [mentor, setMentor] = useState();
  const EDITOR_REF = useRef();
  useEffect(() => {
    console.log("note", note);
    if (note) {
      form.setFieldsValue({ title: note?.title, content: note?.content });
    }
  }, [note]);
  return (
    <Modal
      title="Note"
      footer={null}
      closable={true}
      visible={isVisiblePopup}
      onCancel={handleClosePopup}
      width={1000}
    >
      <Form form={form}>
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
    "authenticationStore"
  )(observer(PopupViewDetail))
);

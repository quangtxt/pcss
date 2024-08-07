import React, { memo, useCallback, useEffect, useState, useRef } from "react";
import { inject, observer } from "mobx-react";
import { withRouter } from "react-router-dom";
import {
  Button,
  Form,
  Input,
  message,
  Row,
  Col,
  Typography,
  Modal,
} from "antd";
import { FormActionFooter } from "./CreateIdeaNoteStyled";
import RichEditor from "../../../components/RichEditor/RichEditor";

const { Title } = Typography;

const CreateNotePage = (props) => {
  const {
    studentStore,
    loadingAnimationStore,
    meetingId,
    meetingStore,
    authenticationStore,
    history,
    isVisiblePopup,
    setIsVisiblePopup,
    handleClosePopup,
  } = props;
  const { currentUser } = authenticationStore;
  const EDITOR_REF = useRef();
  const [form] = Form.useForm();

  // // Reset form fields and editor content when the popup is closed
  // useEffect(() => {
  //   if (!isVisiblePopup) {
  //     form.resetFields();
  //     if (EDITOR_REF.current) {
  //       EDITOR_REF.current.editor.setData("");
  //     }
  //   }
  // }, [isVisiblePopup, form]);

  const handleSubmit = async (values) => {
    try {
      loadingAnimationStore.showSpinner(true);
      const response = await meetingStore.createNote(
        meetingId,
        values.title,
        EDITOR_REF.current.editor.getData()
      );
      if (response.status === 200) {
        message.success("Created note successfully");
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

  const handlePopupClose = () => {
    setIsVisiblePopup(false);
  };

  return (
    <Modal
      footer={null}
      title={<Title level={4}>Create Note</Title>}
      className="custom-modal"
      closable={true}
      visible={isVisiblePopup}
      onCancel={handlePopupClose}
      width={1000}
    >
      <Form
        scrollToFirstError={true}
        name={"create-incoming-document"}
        layout={"vertical"}
        style={{ paddingTop: "2rem" }}
        onFinish={handleSubmit}
        form={form}
      >
        <Row type={"flex"} gutter={30}>
          <Col xs={24} md={24}>
            <Form.Item
              label={"Title"}
              name={"title"}
              rules={[
                {
                  required: true,
                  message: "Please enter title!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row type={"flex"} gutter={30}>
          <Col xs={24} md={24}>
            <Form.Item label={"Content"} name={"content"}>
              <RichEditor
                EDITOR_REF={EDITOR_REF}
                placeholder={"Enter content"}
                editorContent={""}
              />
            </Form.Item>
          </Col>
        </Row>

        <FormActionFooter>
          <Button onClick={handlePopupClose}>Huỷ bỏ</Button>
          <Button
            style={{ marginLeft: 10 }}
            type={"primary"}
            htmlType={"submit"}
          >
            Tạo note
          </Button>
        </FormActionFooter>
      </Form>
    </Modal>
  );
};
export default memo(
  withRouter(
    inject(
      "authenticationStore",
      "loadingAnimationStore",
      "groupStore",
      "studentStore",
      "meetingStore"
    )(observer(CreateNotePage))
  )
);

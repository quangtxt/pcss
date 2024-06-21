import React, { memo, useCallback, useEffect, useState, useRef } from "react";
import { inject, observer } from "mobx-react";
import { withRouter } from "react-router-dom";
import { UserOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Form, Input, message, Row, Col } from "antd";
import ContentBlockWrapper from "../../../components/ContentBlockWrapper";
import DashboardLayout from "../../../layouts/DashboardLayout";
import { Helmet } from "react-helmet/es/Helmet";
import { PortalContent } from "./CreateIdeaNoteStyled";
import PageTitle from "../../../components/PageTitle";
import { FormActionFooter } from "./CreateIdeaNoteStyled";
import EmptyPage from "../../EmptyPage/EmptyPage";
import RichEditor from "../../../components/RichEditor/RichEditor";

import { Container } from "../../../layouts/Container/Container";

const CreateNotePage = (props) => {
  const {
    studentStore,
    loadingAnimationStore,
    groupStore,
    meetingStore,
    authenticationStore,
    history,
  } = props;
  const { currentUser } = authenticationStore;
  const EDITOR_REF = useRef();

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 6 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 14 },
    },
  };
  const handleSubmit = async (values) => {
    try {
      loadingAnimationStore.showSpinner(true);
      const response = await meetingStore.createNote(
        1,
        values.title,
        EDITOR_REF.current.editor.getData()
      );
      if (response.status === 200) {
        //neu tao gr thanh cong
        message.success("Created note successfully");
        // await authenticationStore.checkCurrentUser();
        // history.push("/registration/team");
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
    <DashboardLayout>
      <Helmet>
        <title>Guidance || Create Note</title>
      </Helmet>
      <PageTitle
        location={props.location}
        title={"Create Note"}
        hiddenGoBack
      ></PageTitle>
      <ContentBlockWrapper>
        <Container maxWidth={1000}>
          <Form
            scrollToFirstError={true}
            name={"create-incoming-document"}
            layout={"vertical"}
            style={{ paddingTop: "2rem" }}
            onFinish={handleSubmit}
          >
            <Row type={"flex"} gutter={30}>
              <Col xs={24} md={24}>
                <Form.Item
                  label={"Title"}
                  name={"title"}
                  rules={[
                    {
                      required: true,
                      message: " Vui lòng chọn nhóm sổ văn bản!",
                    },
                  ]}
                >
                  <Input></Input>
                </Form.Item>
              </Col>
            </Row>
            <Row type={"flex"} gutter={30}>
              <Col xs={24} md={24}>
                <Form.Item label={"Content"} name={"content"}>
                  <RichEditor
                    EDITOR_REF={EDITOR_REF}
                    placeholder={"Nhập nội dung"}
                    editorContent={""}
                  />
                </Form.Item>
              </Col>
            </Row>

            <FormActionFooter>
              <Button>Huỷ bỏ</Button>
              <Button
                style={{ marginLeft: 10 }}
                type={"primary"}
                htmlType={"submit"}
              >
                Tạo note
              </Button>
            </FormActionFooter>
          </Form>
        </Container>
      </ContentBlockWrapper>
    </DashboardLayout>
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

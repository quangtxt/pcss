import React, { memo, useCallback, useEffect, useState } from "react";
import { inject, observer } from "mobx-react";
import { withRouter } from "react-router-dom";
import { UserOutlined, EditOutlined } from "@ant-design/icons";
import {
  Cascader,
  DatePicker,
  InputNumber,
  Mentions,
  Select,
  TreeSelect,
  Button,
  Form,
  Input,
  message,
  Avatar,
  Space,
  Radio,
} from "antd";
import DashboardLayout from "../../../layouts/DashboardLayout";
import { Helmet } from "react-helmet/es/Helmet";
import { PortalContent } from "./CreateIdeaPageStyled";
import PageTitle from "../../../components/PageTitle";
import { Profile } from "./CreateIdeaPageStyled";
import InviteForm from "./InviteForm";
import EmptyPage from "../../EmptyPage/EmptyPage";

import {
  Container,
  UserItem,
  UserAvatar,
  Title,
  UserEmail,
} from "./InviteFormStyled";

const CreateIdeaPage = (props) => {
  const {
    studentStore,
    loadingAnimationStore,
    groupStore,
    authenticationStore,
    history,
  } = props;
  const { currentUser } = authenticationStore;

  const { TextArea } = Input;

  const [selectedStudent, setSelectedStudent] = useState([]);
  const [refresh, setRefresh] = useState(false);

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
      const response = await groupStore.createGroup(
        values.abbreviations,
        values.description,
        values.keywords,
        values.name,
        values.vietnameseTitle,
        selectedStudent
      );
      if (response.status === 200) {
        //neu tao gr thanh cong
        message.success("Created group successfully");
        await authenticationStore.checkCurrentUser();
        history.push("/registration/team");
      }
    } catch (err) {
      console.log(err);
      loadingAnimationStore.showSpinner(false);
      message.error(err.en || "Login failed response status!");
    } finally {
      loadingAnimationStore.showSpinner(false);
    }
  };

  return (
    <DashboardLayout>
      <Helmet>
        <title>Registration || Create Idea</title>
      </Helmet>
      <PageTitle
        location={props.location}
        title={"Create Idea"}
        hiddenGoBack
      ></PageTitle>
      {!currentUser?.group ? (
        <div>
          {" "}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <h1
              style={{
                textAlign: "center",
                marginBottom: "16px",
                fontFamily: "Montserrat, sans-serif",
                padding: "8px 16px",
                borderRadius: "24px",
                display: "inline-block",
                backgroundColor: "#f0f0f0",
              }}
            >
              Create Group
            </h1>
          </div>
          <Profile>
            <Form
              {...formItemLayout}
              variant="filled"
              onFinish={handleSubmit}
              className="formProfile"
              scrollToFirstError
            >
              <div className="">
                <div className="contactInfor">
                  <div className="groupInput">
                    <Form.Item
                      label="Name"
                      name="name"
                      rules={[{ required: true, message: "Please input!" }]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      label="Vietnamese Title"
                      name="vietnameseTitle"
                      rules={[{ required: true, message: "Please input!" }]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      label="Abbreviations"
                      name="abbreviations"
                      rules={[{ required: true, message: "Please input!" }]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      label="Keywords"
                      name="keywords"
                      rules={[{ required: true, message: "Please input!" }]}
                    >
                      <Input />
                    </Form.Item>
                  </div>
                  <div className="textarea-form">
                    <Form.Item
                      label="Description"
                      name="description"
                      rules={[{ required: true, message: "Please input!" }]}
                    >
                      <Input.TextArea
                        rows={4}
                        autoSize={{ minRows: 4, maxRows: 6 }}
                        style={{ resize: "none" }}
                      />
                    </Form.Item>
                  </div>
                  <Container>
                    <Title>Existed Members</Title>
                    <UserItem>
                      <UserAvatar></UserAvatar>
                      <div
                        style={{
                          display: "flex",
                          flexGrow: 1,
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <UserEmail>{currentUser?.email}</UserEmail>
                        <strong style={{ marginRight: "50px" }}>OWNER</strong>
                      </div>
                    </UserItem>
                    <InviteForm
                      setSelectedStudent={setSelectedStudent}
                      setRefresh={setRefresh}
                    />
                  </Container>

                  <Form.Item>
                    <Button className="btnEdit" htmlType="submit">
                      Submit
                    </Button>
                  </Form.Item>
                </div>
              </div>
            </Form>
          </Profile>
        </div>
      ) : (
        <EmptyPage
          title={"You are ingroup"}
          content={
            "When students are in any group, they cannot create groups anymore"
          }
        />
      )}
    </DashboardLayout>
  );
};
export default memo(
  withRouter(
    inject(
      "authenticationStore",
      "loadingAnimationStore",
      "groupStore",
      "studentStore"
    )(observer(CreateIdeaPage))
  )
);

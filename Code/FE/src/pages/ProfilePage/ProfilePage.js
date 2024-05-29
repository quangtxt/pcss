import React, { memo, useCallback, useEffect, useState } from "react";
import { inject, observer } from "mobx-react";
import { withRouter } from "react-router-dom";
import { UserOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Form, Input, message, Avatar, Space, Radio } from "antd";
import DashboardLayout from "../../layouts/DashboardLayout";
import { Helmet } from "react-helmet/es/Helmet";
import { Profile } from "./ProfilePageStyled";

const ProfilePage = (props) => {
  const {
    history,
    authenticationStore,
    loadingAnimationStore,
    groupStore,
  } = props;

  const { TextArea } = Input;
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingEmail, setIsChangingEmail] = useState(false);
  const [isChangingPass, setIsChangingPass] = useState(false);

  useEffect(() => {
    (async () => {
      loadingAnimationStore.showSpinner(true);
      try {
        const { data } = await authenticationStore.checkCurrentUser();
        console.log("response", data);
        setUser(data);
      } catch (err) {
        console.log(err);
        loadingAnimationStore.showSpinner(false);
      } finally {
        loadingAnimationStore.showSpinner(false);
      }
    })();
  }, []);
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
        values.vietnameseTitle
      );
      if (response.status === 200) {
        //neu tao gr thanh cong
        message.success("create ok");
        console.log(response);
      }
    } catch (err) {
      console.log(err);
      loadingAnimationStore.showSpinner(false);
      message.error(err.en || "Login failed response status!");
    } finally {
      loadingAnimationStore.showSpinner(false);
    }
  };

  const handleEditProfile = useCallback(() => {
    setIsEditing((prevState) => !prevState);
  }, []);
  const handleChangeEmail = useCallback(() => {
    setIsChangingEmail((prevState) => !prevState);
  }, []);
  const handleChangePass = useCallback(() => {
    setIsChangingPass((prevState) => !prevState);
  }, []);

  return (
    <DashboardLayout>
      <Helmet>
        <title>Profile</title>
      </Helmet>
      <Profile>
        <Form
          {...formItemLayout}
          variant="filled"
          onFinish={handleSubmit}
          className="formProfile"
        >
          <div className="left">
            <p className="bigTitle">Avatar</p>
            <Space direction="vertical" size={16}>
              <Space wrap size={16}>
                <Avatar size={168} icon={<UserOutlined />} />
              </Space>
            </Space>
            <div className="contactInfor">
              <p className="bigTitle">Contact Information</p>
              <div
                className={`inputForm important ${isEditing ? "active" : ""}`}
              >
                <Form.Item
                  label="Phone Number"
                  name="name"
                  rules={[{ required: true, message: "Please input!" }]}
                >
                  <Input style={{ maxWidth: "100%" }} />
                </Form.Item>
              </div>
              <div className={`inputForm ${isEditing ? "active" : ""}`}>
                <Form.Item
                  label="Facebook"
                  name="name"
                  rules={[{ required: true, message: "Please input!" }]}
                >
                  <Input style={{ maxWidth: "100%" }} />
                </Form.Item>
              </div>
              <div
                className={`inputForm change important ${isEditing ? "" : ""}`}
              >
                <Form.Item
                  label="Alternative Email"
                  name="name"
                  rules={[{ required: true, message: "Please input!" }]}
                >
                  <Input
                    style={{ maxWidth: "100%" }}
                    value={"hieupbhe163832@fpt.edu.vn"}
                  />
                  <Button className="btnChange" onClick={handleChangeEmail}>
                    Change
                  </Button>
                </Form.Item>
              </div>
              <div className={`inputForm ${isEditing ? "active" : ""}`}>
                <Form.Item
                  label="Password"
                  name="name"
                  rules={[{ required: true, message: "Please input!" }]}
                >
                  <Button className="btnChange" onClick={handleChangePass}>
                    Change
                  </Button>
                </Form.Item>
              </div>
            </div>
          </div>
          <div className="right">
            <div className="basicInfor">
              <div className="title">
                <p className="bigTitle">Basic Information</p>
                <Button
                  className={`btnEdit ${isEditing ? "active" : ""}`}
                  onClick={handleEditProfile}
                >
                  <EditOutlined /> Edit My Profile
                </Button>
              </div>
              <div className={`inputForm ${isEditing ? "active" : ""}`}>
                <Form.Item
                  label="Name"
                  name="name"
                  rules={[{ required: true, message: "Please input!" }]}
                >
                  <Input style={{ maxWidth: "100%" }} />
                </Form.Item>
              </div>
              <div className="inputForm">
                <Form.Item
                  label="Roll Number"
                  name="name"
                  rules={[{ required: true, message: "Please input!" }]}
                >
                  <Input
                    style={{ maxWidth: "100%" }}
                    value={"hieupbhe163832@fpt.edu.vn"}
                  />
                </Form.Item>
              </div>
              <div className="inputForm">
                <Form.Item
                  label="Semester"
                  name="name"
                  rules={[{ required: true, message: "Please input!" }]}
                >
                  <Input style={{ maxWidth: "100%" }} />
                </Form.Item>
              </div>
              <div className="inputForm">
                <Form.Item
                  label="Profession"
                  name="name"
                  rules={[{ required: true, message: "Please input!" }]}
                >
                  <Input style={{ maxWidth: "100%" }} />
                </Form.Item>
              </div>
              <div className="inputForm">
                <Form.Item
                  label="Specialty"
                  name="name"
                  rules={[{ required: true, message: "Please input!" }]}
                >
                  <Input style={{ maxWidth: "100%" }} />
                </Form.Item>
              </div>
              <div className={`inputForm ${isEditing ? "active" : ""}`}>
                <Form.Item label="Gender" name="">
                  <Radio.Group>
                    <Radio value=""> Male </Radio>
                    <Radio value=""> Female </Radio>
                    <Radio value=""> Other </Radio>
                  </Radio.Group>
                </Form.Item>
              </div>
              <div className="inputForm">
                <Form.Item
                  label="Email"
                  name="name"
                  rules={[{ required: true, message: "Please input!" }]}
                >
                  <Input style={{ maxWidth: "100%" }} />
                </Form.Item>
              </div>
              <div className={`inputForm ${isEditing ? "active" : ""}`}>
                <Form.Item
                  label="Expect Role"
                  name="name"
                  rules={[{ required: true, message: "Please input!" }]}
                >
                  <Input style={{ maxWidth: "100%" }} />
                </Form.Item>
              </div>
              <div className={`inputForm ${isEditing ? "active" : ""}`}>
                <Form.Item
                  label="Bio"
                  name="name"
                  rules={[{ required: true, message: "Please input!" }]}
                >
                  <TextArea rows={4} style={{ maxWidth: "100%" }} />
                </Form.Item>
              </div>
              <div className={`radioForm ${isEditing ? "active" : ""}`}>
                <Form.Item label="Do you want to be grouped in a random group?">
                  <Radio.Group>
                    <Radio value="apple"> Yes </Radio>
                    <Radio value="pear"> No </Radio>
                  </Radio.Group>
                </Form.Item>
              </div>
              <div className={`grBtn ${isEditing ? "active" : ""}`}>
                <Button className="btnCancel" onClick={handleEditProfile}>
                  Cancel
                </Button>
                <Button className="btnEdit">Submit</Button>
              </div>
            </div>
          </div>
        </Form>
        <Form
          {...formItemLayout}
          variant="filled"
          onFinish={handleSubmit}
          className={`changeEmail ${isChangingEmail ? "active" : ""}`}
        >
          <p className="bigTitle">Verify Your Alternative Email</p>
          <div className="content">
            <p>Enter the verify code sent to</p>
            <p>
              <span>hieupbhe163832@fpt.edu.vn</span>. Did not get the code?
            </p>
            <a href="">Resend</a>
          </div>
          <p className="verify">Verification Code</p>
          <div className="inputForm">
            <Form.Item
              name="name"
              rules={[{ required: true, message: "Please input!" }]}
            >
              <Input
                style={{ maxWidth: "100%" }}
                placeholder="Enter verification code"
              />
            </Form.Item>
          </div>
          <div className="grBtn">
            <Button className="btnCancel" onClick={handleChangeEmail}>
              Cancel
            </Button>
            <Button className="btnEdit">Submit</Button>
          </div>
        </Form>
        <Form
          {...formItemLayout}
          variant="filled"
          onFinish={handleSubmit}
          className={`changeEmail ${isChangingPass ? "active" : ""}`}
        >
          <p className="bigTitle">Old Password</p>
          <div className="content">
            <p>Input Your Password</p>
          </div>
          <p className="verify">Password</p>
          <div className="inputForm">
            <Form.Item
              name="name"
              rules={[{ required: true, message: "Please input!" }]}
            >
              <Input
                style={{ maxWidth: "100%" }}
                placeholder="Enter your password"
                type="password"
              />
            </Form.Item>
          </div>
          <div className="grBtn">
            <Button className="btnCancel" onClick={handleChangePass}>
              Cancel
            </Button>
            <Button className="btnEdit">Submit</Button>
          </div>
        </Form>
        <div
          className={`overlay ${isChangingEmail ? "active" : ""} ${
            isChangingPass ? "active" : ""
          }`}
        ></div>
      </Profile>
    </DashboardLayout>
  );
};
export default memo(
  withRouter(
    inject(
      "authenticationStore",
      "loadingAnimationStore",
      "groupStore"
    )(observer(ProfilePage))
  )
);

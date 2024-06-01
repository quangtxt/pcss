import React, { memo, useCallback, useEffect, useState } from "react";
import { inject, observer } from "mobx-react";
import { withRouter } from "react-router-dom";
import { UserOutlined, EditOutlined } from "@ant-design/icons";

import {
  Button,
  Form,
  Input,
  message,
  Avatar,
  Space,
  Radio,
  Modal,
} from "antd";
import DashboardLayout from "../../layouts/DashboardLayout";
import { Helmet } from "react-helmet/es/Helmet";
import { Profile } from "./ProfilePageStyled";

const ProfilePage = (props) => {
  const {
    history,
    authenticationStore,
    loadingAnimationStore,
    groupStore,
    studentStore,
  } = props;

  const { currentUser } = authenticationStore;
  const { TextArea } = Input;
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingEmail, setIsChangingEmail] = useState(false);
  const [isChangingPass, setIsChangingPass] = useState(false);

  useEffect(() => {
    if (authenticationStore.currentUser) {
      getStudentProfile(currentUser?.id);
    }
  }, [authenticationStore.currentUser]);

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

  const handleEditProfile = useCallback(() => {
    setIsEditing((prevState) => !prevState);
  }, []);
  const handleChangeEmail = useCallback(() => {
    setIsChangingEmail((prevState) => !prevState);
  }, []);
  const handleChangePass = useCallback(() => {
    setIsChangingPass((prevState) => !prevState);
  }, []);

  const [form] = Form.useForm();

  const getStudentProfile = async (userId) => {
    try {
      loadingAnimationStore.showSpinner(true);
      const response = await studentStore.getStudentProfileById(userId);
      if (response.status === 200) {
        form.setFieldsValue({
          // alternativeEmail: response.data.alternativeEmail,
          facebook: response.data.facebook,
          gender: response.data.gender ? "male" : "female",
          phone: response.data.phone,
          profession: response.data.profession,
          rollNumber: response.data.rollNumber,
          fullName: response.data.fullName,
          email: response.data.email,
          semester: response.data.semester,
          specialty: response.data.specialty,
        });
      }
    } catch (err) {
      loadingAnimationStore.showSpinner(false);
      message.error(err.en);
      console.log("log", err);
    } finally {
      loadingAnimationStore.showSpinner(false);
    }
  };

  const handleSubmit = async (values) => {
    try {
      loadingAnimationStore.showSpinner(true);
      const response = await studentStore.updateStudent(
        values.fullName,
        values.gender == "male" ? true : false,
        values.phone,
        values.facebook,
        values.alternativeEmail
      );
      if (response.status === 200) {
        getStudentProfile(currentUser?.id);
        handleEditProfile();
        message.success("Update profile successfully");
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
        <title>Profile</title>
      </Helmet>
      <Profile>
        <Form
          {...formItemLayout}
          onFinish={handleSubmit}
          className="formProfile"
          form={form}
          scrollToFirstError
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
                  name="phone"
                  rules={[{ required: true, message: "Please input!" }]}
                >
                  <Input style={{ maxWidth: "100%" }} />
                </Form.Item>
              </div>
              <div className={`inputForm ${isEditing ? "active" : ""}`}>
                <Form.Item
                  label="Facebook"
                  name="facebook"
                  rules={[{ required: true, message: "Please input!" }]}
                >
                  <Input style={{ maxWidth: "100%" }} />
                </Form.Item>
              </div>
              {/* <div
                className={`inputForm change important ${isEditing ? "" : ""}`}
              >
                <Form.Item
                  label="Alternative Email"
                  name="alternativeEmail"
                  rules={[{ required: true, message: "Please input!" }]}
                >
                  <Input style={{ maxWidth: "100%" }} />
                  <Button className="btnChange" onClick={handleChangeEmail}>
                    Change
                  </Button>
                </Form.Item>
              </div> */}
              {/* <div className={`inputForm ${isEditing ? "active" : ""}`}>
                <Form.Item
                  label="Password"
                  name="pass"
                  rules={[{ required: true, message: "Please input!" }]}
                >
                  <Button className="btnChange" onClick={handleChangePass}>
                    Change
                  </Button>
                </Form.Item>
              </div> */}
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
                  name="fullName"
                  rules={[{ required: true, message: "Please input!" }]}
                >
                  <Input style={{ maxWidth: "100%" }} />
                </Form.Item>
              </div>
              <div className="inputForm">
                <Form.Item
                  label="Roll Number"
                  name="rollNumber"
                  rules={[{ required: true, message: "Please input!" }]}
                >
                  <Input style={{ maxWidth: "100%" }} />
                </Form.Item>
              </div>
              <div className="inputForm">
                <Form.Item
                  label="Semester"
                  name="semester"
                  rules={[{ required: true, message: "Please input!" }]}
                >
                  <Input style={{ maxWidth: "100%" }} />
                </Form.Item>
              </div>
              <div className="inputForm">
                <Form.Item
                  label="Profession"
                  name="profession"
                  rules={[{ required: true, message: "Please input!" }]}
                >
                  <Input style={{ maxWidth: "100%" }} />
                </Form.Item>
              </div>
              <div className="inputForm">
                <Form.Item
                  label="Specialty"
                  name="specialty"
                  rules={[{ required: true, message: "Please input!" }]}
                >
                  <Input style={{ maxWidth: "100%" }} />
                </Form.Item>
              </div>
              <div className={`inputForm ${isEditing ? "active" : ""}`}>
                <Form.Item label="Gender" name="gender">
                  <Radio.Group>
                    <Radio value="male"> Male </Radio>
                    <Radio value="female"> Female </Radio>
                  </Radio.Group>
                </Form.Item>
              </div>
              <div className="inputForm">
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[{ required: true, message: "Please input!" }]}
                >
                  <Input style={{ maxWidth: "100%" }} />
                </Form.Item>
              </div>
              <div className={`radioForm ${isEditing ? "active" : ""}`}>
                <Form.Item label="Do you want to be grouped in a random group?">
                  <Radio.Group>
                    <Radio value="yes"> Yes </Radio>
                    <Radio value="no"> No </Radio>
                  </Radio.Group>
                </Form.Item>
              </div>
              <div className={`grBtn ${isEditing ? "active" : ""}`}>
                <Button className="btnCancel" onClick={handleEditProfile}>
                  Cancel
                </Button>
                <Button className="btnEdit" htmlType={"submit"}>
                  Submit
                </Button>
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
              label="Code"
              name="code"
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
          className="changeEmail"
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
              label="Password"
              name="password"
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
      "studentStore"
    )(observer(ProfilePage))
  )
);

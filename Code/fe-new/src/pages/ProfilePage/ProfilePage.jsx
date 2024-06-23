import React, {
  memo,
  useCallback,
  useEffect,
  useState,
  useContext,
} from "react";
import { UserOutlined, EditOutlined } from "@ant-design/icons";
import ContentBlockWrapper from "../../components/ContentBlockWrapper";
import {
  Button,
  Form,
  Input,
  message,
  Avatar,
  Space,
  Radio,
  Modal,
  Typography,
  Checkbox,
} from "antd";
import DashboardLayout from "../../layouts/DashboardLayout";
import {
  Profile,
  ContentInformation,
  MarginLeftLabel,
  NoMarginBottom,
  GroupBtn,
} from "./ProfilePageStyled";
import { FlexBox } from "../ListGroupPage/ListGroupPageStyled";
import { Helmet, HelmetProvider } from "react-helmet-async";

import { StoreContext } from "../../App";

const ProfilePage = (props) => {
  const { loadingAnimationStore, studentStore, currentUser } =
    useContext(StoreContext);

  const [isEditing, setIsEditing] = useState(false);
  const [isChangingEmail, setIsChangingEmail] = useState(false);
  const [isChangingPass, setIsChangingPass] = useState(false);
  const { Title } = Typography;

  useEffect(() => {
    if (currentUser) {
      getStudentProfile(currentUser?.id);
    }
  }, [currentUser]);

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
  const [isDisable, setIsDisable] = useState(false);
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
  const handleDisable = useCallback(() => {
    setIsDisable((prevState) => !prevState);
  }, []);

  return (
    <HelmetProvider>
      <DashboardLayout>
        <Helmet>
          <title>Profile</title>
        </Helmet>
        <ContentBlockWrapper>
          <Profile>
            <Form
              form={form}
              onFinish={handleSubmit}
              scrollToFirstError
              labelAlign="left"
              layout="horizontal"
              labelCol={{
                span: 6,
              }}
              wrapperCol={{
                span: 20,
              }}
            >
              <ContentInformation>
                <Title level={4}>Avatar</Title>
                <Space
                  direction="vertical"
                  size={16}
                  style={{ marginBottom: "24px" }}
                >
                  <Space wrap size={16}>
                    <Avatar size={150} icon={<UserOutlined />} />
                  </Space>
                </Space>
                <Title level={4} style={{ marginBottom: "24px" }}>
                  Contact Information
                </Title>
                <Form.Item
                  label="Phone Number"
                  name="phone"
                  rules={[{ required: true, message: "Please input!" }]}
                  disabled
                >
                  <Input style={{ maxWidth: "100%" }} readOnly={!isDisable} />
                </Form.Item>
                <MarginLeftLabel>
                  <Form.Item label="Email" name="email">
                    <Input style={{ maxWidth: "100%" }} readOnly={!isDisable} />
                  </Form.Item>
                  <Form.Item label="Facebook" name="facebook">
                    <Input style={{ maxWidth: "100%" }} readOnly={!isDisable} />
                  </Form.Item>
                </MarginLeftLabel>
              </ContentInformation>
              <ContentInformation>
                <FlexBox>
                  <NoMarginBottom>
                    <Title level={4}>Basic Information</Title>
                  </NoMarginBottom>
                  <Button
                    type="primary"
                    icon={<EditOutlined />}
                    onClick={handleDisable}
                    style={{ display: !isDisable ? "inline-block" : "none" }}
                  >
                    Edit My Profile
                  </Button>
                </FlexBox>
                <MarginLeftLabel>
                  <Form.Item label="Name" name="fullName">
                    <Input style={{ maxWidth: "100%" }} readOnly={!isDisable} />
                  </Form.Item>
                  <Form.Item label="Gender" name="gender">
                    <Radio.Group disabled={!isDisable}>
                      <Radio value="male"> Male </Radio>
                      <Radio value="female"> Female </Radio>
                    </Radio.Group>
                  </Form.Item>
                  <Form.Item label="Roll Number" name="rollNumber">
                    <Input style={{ maxWidth: "100%" }} readOnly={!isDisable} />
                  </Form.Item>
                  <Form.Item label="Semester" name="semester">
                    <Input style={{ maxWidth: "100%" }} readOnly={!isDisable} />
                  </Form.Item>
                  <Form.Item label="Profession" name="profession">
                    <Input style={{ maxWidth: "100%" }} readOnly={!isDisable} />
                  </Form.Item>
                  <Form.Item label="Specialty" name="specialty">
                    <Input style={{ maxWidth: "100%" }} readOnly={!isDisable} />
                  </Form.Item>

                  <NoMarginBottom>
                    <Form.Item
                      label="Do you want to be grouped in a random group?"
                      labelCol={{ span: 17 }}
                      wrapperCol={{ span: 15 }}
                    >
                      <Radio.Group disabled={!isDisable}>
                        <Radio value="yes"> Yes </Radio>
                        <Radio value="no"> No </Radio>
                      </Radio.Group>
                    </Form.Item>
                    {/* <div className={`grBtn ${isEditing ? "active" : ""}`}> */}
                    <GroupBtn style={{ display: !isDisable ? "none" : "flex" }}>
                      <Button onClick={handleDisable}>Cancel</Button>
                      <Button
                        onClick={handleDisable}
                        type="primary"
                        htmlType={"submit"}
                      >
                        Submit
                      </Button>
                    </GroupBtn>
                    {/* </div>  */}
                  </NoMarginBottom>
                </MarginLeftLabel>
              </ContentInformation>
            </Form>
          </Profile>
        </ContentBlockWrapper>
      </DashboardLayout>
    </HelmetProvider>
  );
};
export default ProfilePage;

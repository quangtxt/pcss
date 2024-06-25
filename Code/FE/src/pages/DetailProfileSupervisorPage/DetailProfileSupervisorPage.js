import React, { memo, useCallback, useEffect, useState } from "react";
import { inject, observer } from "mobx-react";
import { withRouter, useLocation } from "react-router-dom";
import { UserOutlined, EditOutlined } from "@ant-design/icons";
import {
  Button,
  Form,
  Input,
  message,
  Avatar,
  Space,
  Radio,
  Card,
  Typography,
} from "antd";
import DashboardLayout from "../../layouts/DashboardLayout";
import { Helmet } from "react-helmet/es/Helmet";
import { ContentInformation } from "../ProfilePage/ProfilePageStyled";
import PageTitle from "../../components/PageTitle";

const DetailProfileSupervisorPage = (props) => {
  const { history, mentorStore, loadingAnimationStore } = props;
  const { state } = useLocation();
  const { Title } = Typography;

  useEffect(() => {
    if (state && state.userId) {
      getMentorProfile(state.userId);
    } else {
      history.push("/");
    }
  }, [state]);
  const { TextArea } = Input;
  const [form] = Form.useForm();

  const [mentor, setMentor] = useState();

  const getMentorProfile = async (userId) => {
    try {
      loadingAnimationStore.showSpinner(true);
      const response = await mentorStore.getMentorProfileById(userId);
      if (response.status === 200) {
        setMentor(response.data);
        form.setFieldsValue({
          fptEmail: response.data.fptEmail,
          personalEmail: response.data.personalEmail,
          phone: response.data.phone,
          selfDescription: response.data.selfDescription,
        });
      }
    } catch (err) {
      loadingAnimationStore.showSpinner(false);
      message.error(err.en);
    } finally {
      loadingAnimationStore.showSpinner(false);
    }
  };
  return (
    <DashboardLayout>
      <Helmet>
        <title>Detail Profile of Supervisor</title>
      </Helmet>
      <PageTitle
        location={location}
        title={"Detail Supervisors"}
        showTitle={true}
      ></PageTitle>
      <div className="flex items-start gap-30">
        <ContentInformation className="flex flex-col items-center justify-center w-30p p-8 rounded-md">
          <Space direction="vertical" size={16} className="">
            <Space wrap size={16}>
              <img
                src="https://tse2.mm.bing.net/th?id=OIP.gHmt_-48RFhIluX7nT5zBwHaHa&pid=Api&P=0&h=180"
                alt="Avatar"
                className="rounded-circle"
                width="171"
              />
            </Space>
          </Space>
          <Title level={4}>{mentor?.fullName}</Title>
        </ContentInformation>
        <ContentInformation className="w-70p p-8 rounded-md">
          <Form
            form={form}
            labelAlign="left"
            layout="horizontal"
            labelCol={{
              span: 6,
            }}
            wrapperCol={{
              span: 20,
            }}
          >
            <Form.Item label="FPT Email" name="fptEmail">
              <Input style={{ maxWidth: "100%" }} readOnly />
            </Form.Item>
            <Form.Item label="Personal Email" name="personalEmail">
              <Input style={{ maxWidth: "100%" }} readOnly />
            </Form.Item>
            <Form.Item label="Phone" name="phone">
              <Input style={{ maxWidth: "100%" }} readOnly />
            </Form.Item>
            <Form.Item label="Self Description" name="selfDescription">
              <TextArea
                rows={5}
                style={{ maxWidth: "100%", resize: "none" }}
                readOnly
                value={mentor?.selfDescription}
              />
            </Form.Item>
          </Form>
        </ContentInformation>
      </div>
    </DashboardLayout>
  );
};
export default memo(
  withRouter(
    inject(
      "mentorStore",
      "loadingAnimationStore"
    )(observer(DetailProfileSupervisorPage))
  )
);

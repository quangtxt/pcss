import React, { useEffect, useState, useContext } from "react";
import { inject, observer } from "mobx-react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Button, Form, Input, message, Avatar, Space, Radio, Card } from "antd";
import DashboardLayout from "../../layouts/DashboardLayout";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Profile } from "../ProfilePage/ProfilePageStyled";
import PageTitle from "../../components/PageTitle";
import { StoreContext } from "../../App";

const DetailProfileSupervisorPage = (props) => {
  const { loadingAnimationStore, supervisorStore } = useContext(StoreContext);

  const { supervisorId } = useParams();

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (supervisorId) {
      getMentorProfile(supervisorId);
    } else {
      navigate("/");
    }
  }, [supervisorId]);
  const { TextArea } = Input;
  const [form] = Form.useForm();

  const [mentor, setMentor] = useState();

  const getMentorProfile = async (userId) => {
    try {
      loadingAnimationStore.showSpinner(true);
      const response = await supervisorStore.getMentorProfileById(userId);
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
      console.log("err", err);
    } finally {
      loadingAnimationStore.showSpinner(false);
    }
  };
  return (
    <HelmetProvider>
      <DashboardLayout>
        <Helmet>
          <title>Detail Profile of Supervisor</title>
        </Helmet>
        <PageTitle
          location={location}
          title={"Detail Supervisors"}
          showTitle={true}
        ></PageTitle>
        <Profile>
          <div className="detailProfileSupervisor">
            <div className="left">
              <Space direction="vertical" size={16}>
                <Space wrap size={16}>
                  <img
                    src="https://tse2.mm.bing.net/th?id=OIP.gHmt_-48RFhIluX7nT5zBwHaHa&pid=Api&P=0&h=180"
                    alt="Avatar"
                    className="rounded-circle"
                    width="150"
                  />
                </Space>
              </Space>
              <p className="bigTitle">{mentor?.fullName}</p>
            </div>
            <div className="right">
              <Form form={form}>
                <div className="inputForm">
                  <Form.Item label="FPT Email" name="fptEmail">
                    <Input style={{ maxWidth: "100%" }} disabled />
                  </Form.Item>
                </div>
                <div className="inputForm">
                  <Form.Item label="Personal Email" name="personalEmail">
                    <Input style={{ maxWidth: "100%" }} disabled />
                  </Form.Item>
                </div>
                <div className="inputForm">
                  <Form.Item label="Phone" name="phone">
                    <Input style={{ maxWidth: "100%" }} disabled />
                  </Form.Item>
                </div>
                <div className="inputForm">
                  <Form.Item label="Self Description" name="selfDescription">
                    <TextArea
                      rows={5}
                      style={{ maxWidth: "100%" }}
                      disabled
                      value={mentor?.selfDescription}
                    />
                  </Form.Item>
                </div>
              </Form>
            </div>
          </div>
        </Profile>
      </DashboardLayout>
    </HelmetProvider>
  );
};
export default DetailProfileSupervisorPage;

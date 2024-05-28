import React, { memo, useCallback, useEffect, useState } from "react";
import { inject, observer } from "mobx-react";
import { withRouter } from "react-router-dom";
import { UserOutlined, EditOutlined } from '@ant-design/icons';
import {
  Button,
  Form,
  Input,
  message,
  Avatar, Space,
  Radio,
} from "antd";
import DashboardLayout from "../../layouts/DashboardLayout";
import { Helmet } from "react-helmet/es/Helmet";
import { Profile } from "../RegProfilePage/RegProfilePageStyled";

const DetailProfileSupervisorPage = (props) => {
  const {
    authenticationStore,
    loadingAnimationStore,
  } = props;

  const { TextArea } = Input;

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

  return (
    <DashboardLayout>
      <Helmet>
        <title>Detail Profile of Supervisor</title>
      </Helmet>
      <Profile>
        <div className="detailProfileSupervisor">
          <div className="left">
            <Space direction="vertical" size={16}>
              <Space wrap size={16}>
                <Avatar size={150} icon={<UserOutlined />} />
              </Space>
            </Space>
            <p className="bigTitle">Phạm Bá Hiếu</p>
          </div>
          <div className="right">
            <div className="inputForm">
              <Form.Item
                label="FPT Email"
                name="name"
                rules={[{ required: true, message: "Please input!" }]}
              >
                <Input style={{ maxWidth: '100%' }} value={"hieupbhe163832@fpt.edu.vn"} />
              </Form.Item>
            </div>
            <div className="inputForm">
              <Form.Item
                label="Persional Email"
                name="name"
                rules={[{ required: true, message: "Please input!" }]}
              >
                <Input style={{ maxWidth: '100%' }} value={"hieupbhe163832@fpt.edu.vn"} />
              </Form.Item>
            </div>
            <div className="inputForm">
              <Form.Item
                label="Phone"
                name="name"
                rules={[{ required: true, message: "Please input!" }]}
              >
                <Input style={{ maxWidth: '100%' }} value={"hieupbhe163832@fpt.edu.vn"} />
              </Form.Item>
            </div>
            <div className="inputForm">
                <Form.Item
                  label="Bio"
                  name="name"
                  rules={[{ required: true, message: "Please input!" }]}
                >
                  <TextArea
                    rows={5}
                    style={{ maxWidth: '100%' }} />
                </Form.Item>
              </div>
          </div>
        </div>
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
    )(observer(DetailProfileSupervisorPage))
  )
);

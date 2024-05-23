import {
  FileTextOutlined,
  LeftOutlined,
  RightOutlined,
  QuestionOutlined,
} from "@ant-design/icons";
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  List,
  message,
  Row,
  Tabs,
  Tooltip,
  Typography,
  Space,
  Table,
  Tag,
} from "antd";
import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { runInAction, toJS } from "mobx";
import { inject, observer } from "mobx-react";
import moment from "moment";
import React, { memo, useEffect, useState } from "react";
import { Helmet } from "react-helmet/es/Helmet";

import DashboardLayout from "../../layouts/DashboardLayout";
import utils from "../../utils";
import validator from "../../validator";
import { FormLogin, LoginWrapper } from "./HomePageStyled";

const HomePage = (props) => {
  const {
    history,
    location,
    authenticationStore,
    loadingAnimationStore,
  } = props;

  const {
    currentUser,
    isAccountAdmin,
    isStudent,
    isMentor,
  } = authenticationStore;
  // const { statistic } = statisticStore
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [campus, setCampus] = useState("");
  const handleOk = async (values) => {
    setConfirmLoading(true);
    try {
      const response = await authenticationStore.userLogin(
        values.identifier,
        values.password
      );
      if (response.status === 200) {
        setShowDialog(false);
        message.success(`Xin chào, ${utils.getNameInCapitalize("quang")}!`);
      }
    } catch (err) {
      console.log(err);
      message.error(err.en || "Login failed response status!");
    } finally {
      setConfirmLoading(false);
    }
  };
  const handleCampusChange = (e) => {
    setCampus(e.target.value);
  };
  const handleGoogleSignInClick = async () => {
    if (!campus) {
      message.error("Please select a campus before signing in with Google.");
      return;
    }
    await handleGoogleSignIn();
  };

  const handleGoogleSignIn = useGoogleLogin({
    onSuccess: async (response) => {
      loadingAnimationStore.showSpinner(true);
      try {
        const res = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${response.access_token}`,
            },
          }
        );
        await loginWithGoogle(res);
      } catch (err) {
        console.log(err);
        loadingAnimationStore.showSpinner(false);
      } finally {
        loadingAnimationStore.showSpinner(false);
      }
    },
  });

  const loginWithGoogle = async (values) => {
    try {
      const response = await authenticationStore.userLoginWithGoogle(
        values.data.email,
        campus
      );
      if (response.status === 200) {
        loadingAnimationStore.showSpinner(true);
        const res = await authenticationStore.checkCurrentUser();
        console.log(res);
        message.success(
          `Xin chào, ${utils.getNameInCapitalize(res.data.username)}!`
        );
      }
    } catch (err) {
      loadingAnimationStore.showSpinner(false);
      message.error(err.en || "Login failed response status!");
    } finally {
      loadingAnimationStore.showSpinner(false);
    }
  };
  const handleSignInByEmail = useGoogleLogin({
    onSuccess: (tokenResponse) => console.log(tokenResponse),
  });
  const loginPage = (
    <>
      <LoginWrapper
        bgImage={`${process.env.PUBLIC_URL}/assets/photos/bg-diagram.png`}
      >
        {/* <Form layout={"vertical"} name={"loginForm"} onFinish={handleOk}>
        
          <Form.Item style={{ textAlign: "center" }}>
            <img
              alt="login_logo"
              height={32}
              src={`${process.env.PUBLIC_URL}/assets/photos/travelowky-logo.webp`}
            />
          </Form.Item>
          <Form.Item
            label="Tên đăng nhập"
            name="identifier"
            rules={[
              { required: true, message: "Vui lòng nhập tên đăng nhập!" },
              // { validator: validator.validateUsername },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
          >
            <Input.Password />
          </Form.Item>
          <Button
            type={"primary"}
            block
            htmlType={"submit"}
            loading={confirmLoading}
          >
            {" "}
            Đăng nhập
          </Button>
          <Button style={{ marginTop: 8 }} type={"link"} block>
            {" "}
            Quên mật khẩu?
          </Button>
          <Button style={{ marginTop: 0 }} type={'link'} block onClick={showModal}> Lịch cơ quan</Button>
      </Form> */}
        <FormLogin>
          <div className="formLogin">
            <div className="formLoginGG">
              <div className="intro">
                <h1>Sign In</h1>
                <p>
                  The system for manager the <br />
                  Capstone Project in FPT University
                </p>
              </div>
              <div id="textError"></div>
              <div className="logIn">
                <div className="selectCampus">
                  <label htmlFor="campus">Select Campus</label>
                  <select
                    name="campus"
                    id="campus"
                    value={campus}
                    onChange={handleCampusChange}
                  >
                    <option value="" className="optionCampus" defaultValue="">
                      --Select Campus--
                    </option>
                    <option value="HL" className="optionCampus">
                      Hoa Lac
                    </option>
                    <option value="CT" className="optionCampus">
                      Can Tho
                    </option>
                    <option value="HCM" className="optionCampus">
                      Ho Chi Minh
                    </option>
                    <option value="DN" className="optionCampus">
                      Da Nang
                    </option>
                    <option value="QN" className="optionCampus">
                      Quy Nhon
                    </option>
                  </select>
                </div>
                <div className="signIn">
                  <div className="signInGG">
                    <button
                      className="signGG"
                      id="signinGg"
                      onClick={handleGoogleSignInClick}
                    >
                      <img
                        src={`${process.env.PUBLIC_URL}/assets/photos/Google__G__Logo.svg.png`}
                        alt=""
                      />
                      <p id="signGG">Login with google</p>
                    </button>

                    {/* <p>or</p>
                    <a
                      href="/User/SignInByAffiliateAccount"
                      id="signInForm"
                      onClick={handleSignInByEmail}
                    >
                      Sign in with Email &amp; Password
                    </a> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </FormLogin>
      </LoginWrapper>
    </>
  );
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Tags",
      key: "tags",
      dataIndex: "tags",
      render: (_, { tags }) => (
        <>
          {tags.map((tag) => {
            let color = tag.length > 5 ? "geekblue" : "green";
            if (tag === "loser") {
              color = "volcano";
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a>Invite {record.name}</a>
          <a>Delete</a>
        </Space>
      ),
    },
  ];
  const data = [
    {
      key: "1",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
      tags: ["nice", "developer"],
    },
    {
      key: "2",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      tags: ["loser"],
    },
    {
      key: "3",
      name: "Joe Black",
      age: 32,
      address: "Sydney No. 1 Lake Park",
      tags: ["cool", "teacher"],
    },
  ];
  return (
    <div>
      {currentUser != null ? (
        <DashboardLayout
          title={"Link People - Link the World"}
          backgroundColor={"#f2f3f8"}
        >
          <Helmet>
            <title>Home</title>
          </Helmet>

          <Table columns={columns} dataSource={data} />
        </DashboardLayout>
      ) : (
        loginPage
      )}
    </div>
  );
};

export default memo(
  inject("loadingAnimationStore", "authenticationStore")(observer(HomePage))
);

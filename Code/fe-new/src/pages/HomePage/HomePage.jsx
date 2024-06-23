import React, { memo, useEffect, useState, useContext } from "react";
import { message, Table } from "antd";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { Helmet, HelmetProvider } from "react-helmet-async";

import { FormLogin, LoginWrapper } from "./HomePageStyled";

import ContentBlockWrapper from "../../components/ContentBlockWrapper";

import GoogleLogo from "../../assets/photos/Google__G__Logo.svg.png";
import DashboardLayout from "../../layouts/DashboardLayout";

import { StoreContext } from "../../App";
import utils from "../../utils";

const HomePage = (props) => {
  const {
    authenticationStore,
    loadingAnimationStore,
    currentUser,
    setCurrentUser,
  } = useContext(StoreContext);
  const current =
    localStorage.getItem("jwt") ||
    sessionStorage.getItem("jwt") ||
    sessionStorage.getItem("jwt")
      ? true
      : false;
  const [confirmLoading, setConfirmLoading] = useState(false);
  // const { currentUser } = authenticationStore;
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
        setCurrentUser(res.data);
        message.success(
          `Xin chào, ${utils.getNameInCapitalize(res.data.username)}!`
        );
        setConfirmLoading(!confirmLoading);
      }
    } catch (err) {
      loadingAnimationStore.showSpinner(false);
      console.log("er", err);
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
      <LoginWrapper>
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
                      <img src={GoogleLogo} alt="" />
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
  return (
    <div>
      {currentUser != null ? (
        <HelmetProvider>
          <DashboardLayout
            title={"Link People - Link the World"}
            backgroundColor={"#f2f3f8"}
          >
            <Helmet>
              <title>Home</title>
            </Helmet>
            <div>hihi</div>
          </DashboardLayout>
        </HelmetProvider>
      ) : (
        loginPage
      )}
    </div>
  );
};

export default HomePage;

import {
  FileTextOutlined,
  LeftOutlined,
  RightOutlined,
  QuestionOutlined,
} from "@ant-design/icons";
import { Button, message, Table, Collapse, Row, Col } from "antd";
import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { runInAction, toJS } from "mobx";
import { inject, observer } from "mobx-react";
import moment from "moment";
import React, {
  memo,
  useEffect,
  useState,
  useRef,
  useLayoutEffect,
} from "react";
import { Helmet } from "react-helmet/es/Helmet";

import DashboardLayout from "../../layouts/DashboardLayout";
import utils from "../../utils";
import validator from "../../validator";
import { FormLogin, LoginWrapper, Container } from "./HomePageStyled";
const { Panel } = Collapse;
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
  const renderTest1 = [
    {
      key: "1",
      milestone: "Initiation",
      from: "6/May",
      to: "11/May",
      notes: "1 week (week 1)",
    },
    {
      key: "1-1",
      milestone: "Report 1 (Intro)",
      from: "",
      to: "11/May",
      notes:
        "Giới thiệu về team, đề tài, các tính/chức năng chính, giải pháp tham khảo (hiện có)",
    },
    {
      key: "2",
      milestone: "Definition",
      from: "13/May",
      to: "26/May",
      notes: "2 weeks (weeks 2-3)",
    },
    {
      key: "2-1",
      milestone: "Report 2 (Plan)",
      from: "",
      to: "19/May",
      notes: "Kế hoạch dự án dự kiến (v0.9)",
    },
    {
      key: "2-2",
      milestone: "Report 3 (SRS)",
      from: "",
      to: "26/May",
      notes: "Đặc tả yêu cầu tổng quát (v0.9)",
    },
    {
      key: "2-3",
      milestone: "Project Plan v1.0",
      from: "",
      to: "26/May",
      notes: "Kế hoạch dự án chính thức (v1.0)",
    },
    {
      key: "2-4",
      milestone: "Tech Prototype",
      from: "",
      to: "26/May",
      notes:
        "Technical training & prototype (sample workable full-stack codes)",
    },
    {
      key: "3",
      milestone: "Solution",
      from: "27/May",
      to: "9/June",
      notes: "2 weeks (weeks 4-5)",
    },
    {
      key: "3-1",
      milestone: "Report 4 (SDD)",
      from: "",
      to: "9/June",
      notes: "Đặc tả thiết kế tổng quát (v0.9)",
    },
    {
      key: "3-2",
      milestone: "SW Package v0.9",
      from: "",
      to: "9/June",
      notes:
        "Code/UT xong & demo khung chức năng & một số chức năng chung của ứng dụng",
    },
    {
      key: "3-3",
      milestone: "Project Plan v1.1",
      from: "",
      to: "9/June",
      notes: "Project plan v1.1, Test plan document",
    },
    {
      key: "3-4",
      milestone: "SRS v1.0",
      from: "",
      to: "9/June",
      notes: "Detailed requirements for iteration 1",
    },
  ];

  const renderTest = [
    {
      key: "1",
      milestone: "Initiation",
      from: "6/May",
      to: "11/May",
      notes: "1 week (week 1)",
      details: [
        {
          name: "- Report 1 (Intro)",
          deadline: "11/May",
          content:
            "Giới thiệu về team, đề tài, các tính/chức năng chính, giải pháp tham khảo (hiện có)",
        },
      ],
    },
    {
      key: "2",
      milestone: "Definition",
      from: "13/May",
      to: "26/May",
      notes: "2 weeks (weeks 2-3)",
      details: [
        {
          name: "- Report 2 (Plan)",
          deadline: "19/May",
          content: "Kế hoạch dự án dự kiến (v0.9)",
        },
        {
          name: "- Report 3 (SRS)",
          deadline: "26/May",
          content: "Đặc tả yêu cầu tổng quát (v0.9)",
        },
      ],
    },
    {
      key: "3",
      milestone: "Solution",
      from: "27/May",
      to: "9/June",
      notes: "2 weeks (weeks 4-5)",
      details: [
        {
          name: "Report 4 (SDD)",
          deadline: "9/June",
          content: "Đặc tả thiết kế tổng quát (v0.9)",
        },
        {
          name: "SW Package v0.9",
          deadline: "9/June",
          content:
            "Code/UT xong & demo khung chức năng & một số chức năng chung của ứng dụng",
        },
        {
          name: "Project Plan v1.1",
          deadline: "9/June",
          content: "Project plan v1.1, Test plan document",
        },
        {
          name: "SRS v1.0",
          deadline: "9/June",
          content: "Detailed requirements for iteration 1",
        },
      ],
    },
  ];
  const columnMilestonePhase2 = [
    {
      title: "#",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "Milestone",
      dataIndex: "milestone",
      key: "milestone",
    },
    {
      title: "From",
      dataIndex: "from",
      key: "from",
    },
    {
      title: "To/Deadline",
      dataIndex: "to",
      key: "to",
    },
    {
      title: "Notes",
      dataIndex: "notes",
      key: "notes",
    },
  ];
  const data = [
    {
      key: "1",
      step: "Lập Danh sách sinh viên dự kiến đủ điều kiện làm khóa luận",
      requirement:
        "Sinh viên phải đáp ứng yêu cầu môn điều kiện và syllabus khóa luận với giá trị điểm là các môn đang học đều pass.",
      product: "Danh sách sinh viên dự kiến đủ điều kiện làm đồ án",
      time: "Tuần 5 của học kỳ n-1",
      person: "Phòng TC&QLĐT",
      detail: "",
      startDate: "2024-04-01",
      endDate: "2024-04-07",
    },
    {
      key: "2",
      step: "Tổ chức ORT cho sinh viên",
      requirement:
        "100% sinh viên nằm trong DSSV dự kiến đủ điều kiện làm đồ án được mời tham gia ORT.",
      product: "Thông báo/mời tham gia ORT, Slide ORT",
      time: "x+4 tuần",
      person: "Trường ban đào tạo Sinh viên",
      detail: "",
      startDate: "2024-07-08",
      endDate: "2024-07-14",
    },
    {
      key: "3",
      step: "Tiếp nhận đăng ký đề tài và nhóm",
      requirement:
        "Đề tài phải phù hợp với chuyên ngành học của sinh viên, quy mô, phạm vi phải phù hợp với sinh viên và thời gian làm đồ án. Bộ môn cần có ý kiến cho sinh viên và GV hướng dẫn với những đồ án không phù hợp. Số lượng sinh viên tối đa, tối thiểu mỗi nhóm tùy theo từng đề tài.",
      product: "Phiếu đăng ký đề tài và nhóm",
      time: "x+4 tuần",
      person: "Phòng TC&QLĐT Sinh viên",
      detail: "",
      startDate: "2024-01-15",
      endDate: "2024-01-21",
    },
    {
      key: "4",
      step: "Phân GVHD, ra quyết định giao khóa luận",
      requirement:
        "1 GVHD chỉ được hướng dẫn tối đa 4 nhóm trong 1 học kỳ. GVHD có chuyên môn phù hợp với đề tài được giao.",
      product: "Quyết định giao đề tài",
      time: "x+2 tuần",
      person:
        "Lập: Phòng TC&QLĐT, Trưởng môn các ngành. Phê duyệt: Hiệu trưởng/Giám đốc cơ sở",
      detail: "",
      startDate: "2024-01-22",
      endDate: "2024-01-28",
    },
    {
      key: "5",
      step: "Tổ chức thực hiện khóa luận",
      requirement:
        "Đảm bảo khóa luận đúng tiến độ và nội dung theo yêu cầu của syllabus. Các báo cáo nộp trong quá trình làm phải đúng theo tài liệu hướng dẫn. GVHD phải gặp nhóm làm khóa luận số buổi tối thiểu theo Syllabus.",
      product:
        "Khóa luận tốt nghiệp bản cứng/mềm. Các báo cáo và điểm đánh giá theo từng phần.",
      time: "x+14 tuần",
      person: "Sinh viên Giảng viên hướng dẫn",
      detail: (
        <Collapse accordion>
          {renderTest.map((item) => (
            <Panel
              header={
                <Row style={{ width: "100%" }}>
                  <Col span={4}>{item.milestone}</Col>
                  <Col span={4}>{item.from}</Col>
                  <Col span={4}>{item.to}</Col>
                  <Col span={12}>{item.notes}</Col>
                </Row>
              }
              key={item.key}
            >
              {item.details.map((detail, index) => (
                <Row key={index} style={{ paddingLeft: "24px" }}>
                  <Col xs={8}>{detail.name}</Col>
                  <Col xs={4}>{detail.deadline}</Col>
                  <Col xs={12}>{detail.content}</Col>
                </Row>
              ))}
            </Panel>
          ))}
        </Collapse>
      ),
      startDate: "2024-06-08",
      endDate: "2024-08-14",
    },
    {
      key: "6",
      step: "Nhận xét của GVHD",
      requirement:
        "Đảm bảo khóa luận được đánh giá đầy đủ theo các tiêu chí theo mẫu nhận xét. GVHD phải gửi phiếu đánh giá về Khoa tối thiểu trước ngày báo vệ 3 ngày. GVHD chuyển điểm thành phần và nhận xét khóa luận trước buổi bảo vệ 3 ngày.",
      product: "Phiếu nhận xét khóa luận của GVHD",
      time: "Trước ngày báo vệ 3 ngày",
      person: "Giảng viên hướng dẫn",
      detail: "",
      startDate: "2024-02-05",
      endDate: "2024-02-11",
    },
    // Thêm các bước khác
  ];

  const columns = [
    {
      title: "TT",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "Các bước hoạt động",
      dataIndex: "step",
      key: "step",
    },
    {
      title: "Yêu cầu của các bước",
      dataIndex: "requirement",
      key: "requirement",
    },
    {
      title: "Sản phẩm",
      dataIndex: "product",
      key: "product",
    },
    {
      title: "Thời gian thực hiện",
      dataIndex: "time",
      key: "time",
    },
    {
      title: "Người thực hiện",
      dataIndex: "person",
      key: "person",
    },
  ];

  const [currentStep, setCurrentStep] = useState(null);
  const [tableData, setTableData] = useState(data);
  const [expandedRowKeys, setExpandedRowKeys] = useState([]);
  useEffect(() => {
    const today = new Date();
    const currentMilestone = data.find(
      (item) =>
        new Date(item.startDate) <= today && new Date(item.endDate) >= today
    );
    if (currentMilestone) {
      console.log("hi");
      setCurrentStep(currentMilestone.key);
      setTableData(
        !showAllSteps
          ? data.filter((item) => item.key === currentMilestone.key)
          : data
      );
      setExpandedRowKeys([currentMilestone.key]);
    }
  }, []);

  const [showAllSteps, setShowAllSteps] = useState(false);

  const handleViewAllClick = () => {
    setShowAllSteps(!showAllSteps);
    setTableData(
      showAllSteps ? data.filter((item) => item.key === currentStep) : data
    );
    setExpandedRowKeys(!showAllSteps ? [] : [currentStep]);
  };
  console.log("expandedRowKeys", expandedRowKeys);

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
          <Container>
            <div className="flex justify-between items-center border rounded-md shadow-md mb-2 p-2">
              <div className="font-bold px-4">Minestone</div>
              <Button onClick={handleViewAllClick} type={"primary"}>
                {showAllSteps ? "Show Current Step" : "View All Steps"}
              </Button>
            </div>

            <Table
              className="custom-table"
              columns={columns}
              expandable={{
                expandedRowRender: (record) => <>{record.detail}</>,
                rowExpandable: (record) => record.detail !== "",
              }}
              expandedRowKeys={expandedRowKeys}
              onExpand={(expanded, record) => {
                if (showAllSteps) {
                  setExpandedRowKeys(
                    expanded
                      ? [...expandedRowKeys, record.key]
                      : expandedRowKeys.filter((key) => key !== record.key)
                  );
                } else {
                  setExpandedRowKeys(expanded ? [record.key] : []);
                }
              }}
              dataSource={tableData}
              rowClassName={(record) =>
                record.key === currentStep && !showAllSteps
                  ? "current-milestone"
                  : ""
              }
              pagination={false}
            />
          </Container>
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

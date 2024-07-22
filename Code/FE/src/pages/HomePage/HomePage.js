import { PrinterOutlined } from "@ant-design/icons";
import { Button, message, Table, Collapse, Row, Tabs, Col } from "antd";
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
import { DATE_FORMAT_SLASH } from "../../constants";
import uuid from "uuid";
import DashboardLayout from "../../layouts/DashboardLayout";
import utils from "../../utils";
import validator from "../../validator";
import { FormLogin, LoginWrapper, Container } from "./HomePageStyled";
import MilestonePDF from "./MilestonePDF";
const { Panel } = Collapse;
const { TabPane } = Tabs;
const HomePage = (props) => {
  const {
    history,
    location,
    authenticationStore,
    loadingAnimationStore,
    semesterStore,
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
      title: "No.",
      render: (record) => record.milestone.id,
    },
    {
      title: "Activity",
      render: (record) => record.milestone.name,
    },
    {
      title: "Requirements",
      render: (record) => record.milestone.requirement,
    },
    {
      title: "Product",
      render: (record) => record.milestone.product,
    },
    {
      title: "Time",
      render: (record) => record.milestone.time,
    },
    {
      title: "Responsible Person",
      render: (record) => record.milestone.person,
    },
  ];
  const columnMilestoneGuidance = [
    {
      title: "#",
      dataIndex: "key",
      key: "key",
      width: 50,
    },
    {
      title: "Milestone",
      dataIndex: "name",
      key: "name",
      width: 200,
    },
    {
      title: "From",
      render: (record) => record.fromDate.format(DATE_FORMAT_SLASH),
      width: 200,
    },
    {
      title: "To/Deadline",
      render: (record) => record.toDate.format(DATE_FORMAT_SLASH),
      width: 200,
    },
    {
      title: "Notes",
      dataIndex: "time",
      key: "time",
    },
  ];
  const columnMilestone2 = [
    {
      title: "#",
      width: 50,
    },
    {
      title: "Product",
      dataIndex: "product",
      key: "product",
      width: 200,
    },
    {
      title: "From",
      width: 200,
      // render: (record) => record.fromDate.format(DATE_FORMAT_SLASH),
    },
    {
      title: "To/Deadline",
      render: (record) => record.toDate.format(DATE_FORMAT_SLASH),
      width: 200,
    },
    {
      title: "Requirement",
      dataIndex: "requirement",
      key: "requirement",
    },
  ];

  const [data1, setTable1] = useState();
  useEffect(() => {
    getSemester();
  }, [currentUser]);
  const [data, setData] = useState([]);
  const [semesters, setSemesters] = useState([]);
  const getSemester = async () => {
    try {
      const res = await semesterStore.getSemesters();
      setSemesters(res.data);
      setSemesterCurrent(res.data);
    } catch (e) {
      console.log(e);
    }
  };
  const setSemesterCurrent = (semesters) => {
    if (semesters.length > 0) {
      const currentDate = moment();
      const closestSemester = semesters.reduce((prev, curr) => {
        const startDate = moment(curr.beginAt);
        const endDate = startDate.clone().add(14, "weeks");
        if (currentDate.isBetween(startDate, endDate, null, "[]")) {
          return curr;
        } else {
          if (prev !== null) {
            const prevDiff = Math.abs(
              moment(prev.beginAt).diff(currentDate, "days")
            );
            const currDiff = Math.abs(startDate.diff(currentDate, "days"));
            return currDiff < prevDiff ? curr : prev;
          } else {
            // If prev is null, return curr by default
            return curr;
          }
        }
      }, null);

      if (closestSemester) {
        setData(transformData(closestSemester.milestones));
      }
    }
  };
  function transformData(datatrs) {
    const result = {};

    function buildTree(items) {
      // Lọc các phần tử có parent là null (cấp gốc)
      const rootItems = items.filter((item) => item.milestone.parent === null);
      // Duyệt qua các phần tử ở cấp gốc và xây dựng cây
      setTable1(rootItems);
      rootItems.forEach((root) => {
        result[root.milestone.id] = {
          id: root.milestone.id,
          name: root.milestone.name,
          requirement: root.milestone.requirement,
          product: root.milestone.product,
          time: root.milestone.time,
          person: root.milestone.person,
          detail: buildSubTree(items, root.milestone.id, 1),
        };
      });
    }

    // Hàm helper để xây dựng các cấp con
    function buildSubTree(items, parentId, startingChildId) {
      const children = items.filter(
        (item) => item.milestone.parent === parentId
      );
      return children.map((child, index) => ({
        id: child.milestone.id,
        name: child.milestone.name,
        requirement: child.milestone.requirement,
        product: child.milestone.product,
        time: child.milestone.time,
        person: child.milestone.person,
        fromDate: moment(child.startDate),
        toDate: moment(child.endDate),
        key: `${startingChildId + index}`,
        detail: buildSubTree(items, child.milestone.id, 1),
      }));
    }

    // Bắt đầu xây dựng cây
    buildTree(datatrs);
    return Object.values(result);
  }
  const exportToExcel = () => {
    utils.exportPDF("divToPrint", "SEP490");
  };

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
            <Tabs
              defaultActiveKey="tab1"
              tabBarExtraContent={
                isMentor && (
                  <Button
                    type="primary"
                    icon={<PrinterOutlined />}
                    onClick={() => {
                      exportToExcel();
                    }}
                  >
                    Export to PDF
                  </Button>
                )
              }
            >
              <TabPane tab="Milestone for guildance phase" key="tab1">
                <Table
                  columns={columnMilestoneGuidance}
                  dataSource={data[4]?.detail}
                  rowKey={(record) => record.id || uuid()}
                  pagination={false}
                  expandable={{
                    expandedRowRender: (record) => (
                      <>
                        {record?.detail[0]?.name == null ? (
                          <Table
                            columns={columnMilestone2}
                            dataSource={record?.detail}
                            rowKey={(record) => record.id || uuid()}
                            expandable={false}
                            pagination={false}
                            showHeader={false}
                          />
                        ) : (
                          <Collapse accordion>
                            {record?.detail.map((item) => (
                              <Panel
                                header={
                                  <Row
                                    style={{
                                      width: "100%",
                                      // paddingLeft: "50px",
                                    }}
                                  >
                                    <Col span={4}>{item.name}</Col>
                                    <Col span={4}>
                                      {item?.fromDate?.format(
                                        DATE_FORMAT_SLASH
                                      )}
                                    </Col>
                                    <Col span={4}>
                                      {item?.toDate?.format(DATE_FORMAT_SLASH)}
                                    </Col>
                                    <Col span={12}>{item.time}</Col>
                                  </Row>
                                }
                                key={item.key}
                              >
                                {item.detail.map((detail, index) => (
                                  <Row
                                    key={index}
                                    style={{ paddingLeft: "24px" }}
                                  >
                                    <Col xs={8}>{detail.product}</Col>
                                    <Col xs={4}>
                                      {detail?.toDate?.format(
                                        DATE_FORMAT_SLASH
                                      )}
                                    </Col>
                                    <Col xs={12}>{detail.time}</Col>
                                  </Row>
                                ))}
                              </Panel>
                            ))}
                          </Collapse>
                        )}
                      </>
                    ),
                    rowExpandable: (record) => record.detail?.length > 0,
                    expandIconColumnIndex: 0,
                  }}
                />
              </TabPane>
              <TabPane tab="Milestone" key="tab2">
                <Table
                  columns={columns}
                  dataSource={data1}
                  rowKey={(record) => record.id || uuid()}
                  expandable={false}
                  pagination={false}
                />
              </TabPane>
            </Tabs>
            <div style={{ display: "none" }}>
              <MilestonePDF milestones={data[4]?.detail} />
            </div>
          </Container>
        </DashboardLayout>
      ) : (
        loginPage
      )}
    </div>
  );
};

export default memo(
  inject(
    "loadingAnimationStore",
    "authenticationStore",
    "semesterStore"
  )(observer(HomePage))
);

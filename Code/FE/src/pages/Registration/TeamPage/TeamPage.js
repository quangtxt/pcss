import React, { memo, useCallback, useState } from "react";
import { inject, observer } from "mobx-react";
import { withRouter } from "react-router-dom";
import { Button, Form, message, Menu, Icon, Dropdown, Modal } from "antd";
import { MoreOutlined, SendOutlined, EditOutlined } from "@ant-design/icons";
import DashboardLayout from "../../../layouts/DashboardLayout";
import { Helmet } from "react-helmet/es/Helmet";
import { PortalContent } from "./TeamPageStyled";
import PageTitle from "../../../components/PageTitle";
import { Team, MemberItem } from "./TeamPageStyled";

const RegTeamPage = (props) => {
  const {
    history,
    authenticationStore,
    loadingAnimationStore,
    groupStore,
  } = props;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const [size, setSize] = useState("large");
  const [isEditing, setIsEditing] = useState(false);
  const [form] = Form.useForm();
  const { setFieldValue } = form;

  const { currentUser, isAccountAdmin, isSuperAdmin } = authenticationStore;
  const [user, setUser] = useState("");
  // useEffect(() => {
  //   (async () => {
  //     loadingAnimationStore.showSpinner(true);
  //     try {
  //       const { data } = await authenticationStore.checkCurrentUser();
  //       console.log("response", data);
  //       setUser(data);
  //     } catch (err) {
  //       console.log(err);
  //       loadingAnimationStore.showSpinner(false);
  //     } finally {
  //       loadingAnimationStore.showSpinner(false);
  //     }
  //   })();
  // }, []);
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
  const [filteredEmails, setFilteredEmails] = useState([]);

  const handleSearchChange = (event) => {
    const term = event.target.value;
    setSearchTerm(term);

    // Lọc danh sách emails dựa trên từ khóa tìm kiếm
    const filtered = emails.filter((email) =>
      email.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredEmails(filtered);
  };

  const menu = (
    <Menu>
      <Menu.Item key="view-profile">
        <a target="_blank" rel="noopener noreferrer" href="#">
          View Profile
        </a>
      </Menu.Item>
      <Menu.Item key="change-to-leader">Change to Leader</Menu.Item>
      <Menu.Item key="remove-member">Remove Member</Menu.Item>
    </Menu>
  );

  const MemberItem = ({ name, email, avatar, role }) => {
    return (
      <div className="informMember">
        <div className="info">
          <img src={avatar} alt="Avatar" />
          <div className="memInfo">
            <a href={`/StudentProfile/Index?studentId=${email}`}>{email}</a>
            <p>{name}</p>
          </div>
        </div>
        <div className="role">
          <p>{role}</p>
        </div>
        <Dropdown overlay={menu}>
          <Button type="text">
            <MoreOutlined style={{ fontSize: "15px" }} />
          </Button>
        </Dropdown>
      </div>
    );
  };

  const handleEmailSelect = (email) => {
    setSearchTerm(email);
    setFilteredEmails([]);
  };

  console.log("isModalOpen ", isModalOpen);
  return (
    <DashboardLayout>
      <Helmet>
        <title>Registration || News</title>
      </Helmet>
      <PageTitle
        location={props.location}
        title={"Team Page"}
        hiddenGoBack
      ></PageTitle>
      <Team>
        <div className="container">
          <div className="main">
            <div className="informGroup">
              <div className="introGroup">
                <div className="nameProject">
                  <img
                    src="https://lh3.googleusercontent.com/a/ACg8ocI0Exl7P4CfPQjZK2gS_yWbGqpn80JFQg3xICctXAomZ0Rc8Q=s96-c"
                    alt="Avatar"
                  />
                  <div className="inforGro">
                    <p>TH Company management system</p>
                    <p className="createDate">
                      Created at: 4/11/2024 8:14:56 PM
                    </p>
                  </div>
                </div>
                <div className="btnAddMem">
                  <form
                    action="/MyGroup/LeaveGroup?projectId=3929"
                    method="post"
                    id="formLeaveGroup"
                  ></form>
                </div>
              </div>
              <div className="someInforms">
                <div className="someInforms--top">
                  <div className="abbreviations">
                    <p className="title">Abbreviations</p>
                    <p className="content">THC</p>
                  </div>
                  <div className="vietnamTitle">
                    <p className="title">Vietnamese Title</p>
                    <p className="content">Hệ thống quản lý công ty</p>
                  </div>
                </div>
                <div className="someInforms--bottom">
                  <div className="professional">
                    <p className="title">Profession</p>
                    <p className="content">
                      Information Technology A (K15 trở đi)
                    </p>
                  </div>
                  <div className="specialty">
                    <p className="title">Specialty</p>
                    <p className="content">Lập trình .NET</p>
                  </div>
                </div>
              </div>
              <div className="desIdea">
                <p className="title">Description</p>
                <p className="content">
                  The TH Company management system is a comprehensive software
                  solution designed specifically for organizations. It offers a
                  wide range of features to streamline company management,
                  including project management, resource allocation, employee
                  tracking, and financial management. This system provides a
                  centralized platform for managers to monitor project progress,
                  assign tasks, and track deadlines, ensuring efficient project
                  execution. It also facilitates resource allocation by
                  providing an overview of available resources, allowing
                  managers to assign them based on availability and skill sets.
                  The employee tracking feature enables monitoring of individual
                  performance and productivity, providing insights for effective
                  evaluations and resource optimization. Financial management is
                  seamlessly integrated, allowing real-time tracking of budgets,
                  expenses, and revenue, enabling informed decision-making for
                  budget allocation and cost reduction.
                </p>
              </div>
              <div className="keyword">
                <p className="title">Keywords</p>
                <div className="keywordText">
                  <p className="content">123</p>
                </div>
              </div>

              <div className="showMember">
                <p className="title">Members</p>
                <div className="numMember">
                  <p className="numMemberInfor">
                    Max: <span>5 members</span>
                  </p>
                  <p className="numMemberInfor">
                    Available Slot: <span>0</span>
                  </p>
                </div>
                <div className="members">
                  <MemberItem
                    name="quangnvhe161807"
                    email="quangnvhe161807@fpt.edu.vn"
                    avatar="https://lh3.googleusercontent.com/a/ACg8ocI0Exl7P4CfPQjZK2gS_yWbGqpn80JFQg3xICctXAomZ0Rc8Q=s96-c"
                    role="Owner | Leader"
                  />
                  <MemberItem
                    name="hieupbhe163832"
                    email="hieupbhe163832@fpt.edu.vn"
                    avatar="https://lh3.googleusercontent.com/a/ACg8ocJRAMQFmpCJm1u1YRaij6fYlBy5toa5ops12Q5MlweE609qMj9I=s96-c"
                    role="Member"
                  />
                  <MemberItem
                    name="anhlqhe163875"
                    email="anhlqhe163875@fpt.edu.vn"
                    avatar="https://lh3.googleusercontent.com/a/ACg8ocIeOwginA7EcndYQCm4sRL2kY2ZgAhF09icKTv35d0PztkVxA=s96-c"
                    role="Member"
                  />
                  <MemberItem
                    name="quangnhhe160214"
                    email="quangnhhe160214@fpt.edu.vn"
                    avatar="https://lh3.googleusercontent.com/a/ACg8ocJyVe4b--6zurg8_K559s8KCyQCHYOw8oB4dsF2R-DYILAFxA=s96-c"
                    role="Member"
                  />
                  <MemberItem
                    name="congvthe160103"
                    email="congvthe160103@fpt.edu.vn"
                    avatar="https://lh3.googleusercontent.com/a/ACg8ocL_az3VoKiySTOhR5wd2DmOFs_OiWqiyXDM-fzDRH-ZAOFJEQ=s96-c"
                    role="Member"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="sidebar--right">
            <div className="inforGro">
              <p style={{ padding: "20px 20px" }}>Register Group</p>
            </div>
            <div className="centered-button">
              <Button
                type="primary"
                shape="round"
                icon={<SendOutlined />}
                size={size}
              >
                Send
              </Button>
            </div>
            <div className="centered-button">
              <Button
                style={{ marginTop: "20px " }}
                className="btnAdd"
                type="primary"
                shape="round"
                icon={<EditOutlined />}
                onClick={showModal}
              >
                Edit Team Profile
              </Button>
            </div>
            <Modal
              title="Basic Modal"
              open={isModalOpen}
              onOk={handleOk}
              onCancel={handleCancel}
            >
              <p>Some contents...</p>
              <p>Some contents...</p>
              <p>Some contents...</p>
            </Modal>
          </div>
        </div>
      </Team>
    </DashboardLayout>
  );
};
export default memo(
  withRouter(
    inject(
      "authenticationStore",
      "loadingAnimationStore",
      "groupStore"
    )(observer(RegTeamPage))
  )
);

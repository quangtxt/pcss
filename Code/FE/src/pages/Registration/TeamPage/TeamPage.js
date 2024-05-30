import React, { memo, useEffect, useCallback, useState } from "react";
import { inject, observer } from "mobx-react";
import { withRouter } from "react-router-dom";
import { Button, Form, message, Menu, Icon, Dropdown, Modal } from "antd";
import { MoreOutlined, SendOutlined, EditOutlined } from "@ant-design/icons";
import DashboardLayout from "../../../layouts/DashboardLayout";
import { Helmet } from "react-helmet/es/Helmet";
import PageTitle from "../../../components/PageTitle";
import { Team } from "./TeamPageStyled";
import MemberItem from "./MemberItem";
import InviteForm from "../CreateIdeaPage/InviteForm";
import { DATE_FORMAT_SLASH } from "../../../constants";
import moment from "moment";
import EmptyPage from "../../EmptyPage/EmptyPage";

const RegTeamPage = (props) => {
  const {
    history,
    loadingAnimationStore,
    groupStore,
    authenticationStore,
  } = props;
  const { currentUser } = authenticationStore;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [members, setMembers] = useState([]);
  const [group, setGroup] = useState();
  const [availableSlotMember, setAvailableSlotMember] = useState(0);
  const [selectedStudent, setSelectedStudent] = useState([]);
  const [refresh, setRefresh] = useState(false);

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

  useEffect(() => {
    if (authenticationStore.currentUser?.group) {
      getGroupInfo();
    }
  }, [refresh, authenticationStore.currentUser]);

  const getGroupInfo = async () => {
    loadingAnimationStore.showSpinner(true);
    try {
      const res = await groupStore.getGroupByMemberId();
      setGroup(res.data);
      setMembers(res.data.members);
      setAvailableSlotMember(5 - res.data.members.length);
    } catch (err) {
      console.log(err);
      loadingAnimationStore.showSpinner(false);
    } finally {
      loadingAnimationStore.showSpinner(false);
    }
  };
  return (
    <DashboardLayout>
      <Helmet>
        <title>Registration || team</title>
      </Helmet>
      <PageTitle
        location={props.location}
        title={"Team Page"}
        hiddenGoBack
      ></PageTitle>
      {currentUser?.group ? (
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
                      <p>{group?.name}</p>
                      <p className="createDate">
                        Created at:{" "}
                        {moment(group?.createdAt).format(DATE_FORMAT_SLASH)}
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
                      <p className="content">{group?.abbreviations}</p>
                    </div>
                    <div className="vietnamTitle">
                      <p className="title">Vietnamese Title</p>
                      <p className="content">{group?.vietnameseTitle}</p>
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
                  <p className="content">{group?.description}</p>
                </div>
                <div className="keyword">
                  <p className="title">Keywords</p>
                  <div className="keywordText">
                    <p className="content">{group?.keywords}</p>
                  </div>
                </div>

                <div className="showMember">
                  <p className="title">Members</p>
                  <div className="numMember">
                    <p className="numMemberInfor">
                      Max: <span>5 members</span>
                    </p>
                    <p className="numMemberInfor">
                      Available Slot: <span>{availableSlotMember}</span>
                    </p>
                  </div>
                  {availableSlotMember > 0 ? (
                    <InviteForm
                      setSelectedStudent={setSelectedStudent}
                      setRefresh={setRefresh}
                      group={group}
                    ></InviteForm>
                  ) : (
                    <></>
                  )}
                  <div className="members">
                    {members
                      .sort((a, b) => {
                        // Ưu tiên thành viên có role là "OWNER"
                        if (a.role.includes("OWNER")) return -1;
                        if (b.role.includes("OWNER")) return 1;

                        // Nếu không phải "OWNER", ưu tiên "ingroup" giảm dần theo updateAt
                        if (a.status === "ingroup" && b.status === "ingroup") {
                          return b.updateAt - a.updateAt;
                        }
                        if (a.status === "ingroup") return -1;
                        if (b.status === "ingroup") return 1;

                        // Cuối cùng là những thành viên "pending"
                        if (a.status === "pending" && b.status !== "pending")
                          return 1;
                        if (b.status === "pending" && a.status !== "pending")
                          return -1;

                        // Nếu cùng status, giữ nguyên thứ tự
                        return 0;
                      })
                      .map((member, index) => (
                        <MemberItem
                          key={index}
                          member={member}
                          group={group}
                          setRefresh={setRefresh}
                        />
                      ))}
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
      ) : (
        <EmptyPage
          title={"You are not ingroup"}
          content={"Please join the group to see your group information"}
        />
      )}
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

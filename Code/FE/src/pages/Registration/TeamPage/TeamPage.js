import React, { memo, useEffect, useCallback, useState } from "react";
import { inject, observer } from "mobx-react";
import { withRouter } from "react-router-dom";
import {
  Button,
  Form,
  message,
  Menu,
  Icon,
  Dropdown,
  Modal,
  Space,
  Typography,
} from "antd";
import { MoreOutlined, SendOutlined, EditOutlined } from "@ant-design/icons";
import DashboardLayout from "../../../layouts/DashboardLayout";
import { Helmet } from "react-helmet/es/Helmet";
import PageTitle from "../../../components/PageTitle";
import { Team } from "./TeamPageStyled";
import MemberItem from "./MemberItem";
import InviteForm from "../CreateIdeaPage/InviteForm";
import { DATE_FORMAT_SLASH, MEMBER_STATUS } from "../../../constants";
import moment from "moment";
import EmptyPage from "../../EmptyPage/EmptyPage";
import PopupEditTeam from "./PopupEditTeam";
import PopupSendToMentor from "./PopupSendToMentor";
import ContentBlockWrapper from "../../../components/ContentBlockWrapper";
import {
  ContentInformation,
  NoMarginBottom,
} from "../../ProfilePage/ProfilePageStyled";
import {
  FlexBox,
  ForContent,
  TableStudents,
} from "../../ListStudentPage/ListStudentPageStyled";

const RegTeamPage = (props) => {
  const {
    history,
    loadingAnimationStore,
    groupStore,
    authenticationStore,
  } = props;
  const { currentUser } = authenticationStore;

  const [isVisiblePopup, setIsVisiblePopup] = useState(false);
  const [isVisiblePopupSend, setIsVisiblePopupSend] = useState(false);
  const { Title } = Typography;
  const [members, setMembers] = useState([]);
  const [group, setGroup] = useState();
  const [availableSlotMember, setAvailableSlotMember] = useState(0);
  const [selectedStudent, setSelectedStudent] = useState([]);
  const [refresh, setRefresh] = useState(false);

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

  const showConfirmModal = () => {
    Modal.confirm({
      title: `Are you sure you want to cancel request submit group?`,
      onOk: () => {},
      onCancel: () => {},
      okText: "Confirm request cancel",
      cancelText: "No",
    });
  };

  function navigateToEdit() {
    setIsVisiblePopup(true);
  }

  function navigateToSend() {
    setIsVisiblePopupSend(true);
  }

  return (
    <DashboardLayout>
      <Helmet>
        <title>Registration || team</title>
      </Helmet>
      <PageTitle
        location={location}
        title={"Team Page"}
        hiddenGoBack
      ></PageTitle>
      {currentUser?.group ? (
        <Team>
          <ContentBlockWrapper className="flex">
            <ContentInformation
              className="w-70p pr-8"
              style={{ borderRight: "1px solid #d9d9d9" }}
            >
              <FlexBox>
                <div className="flex items-center gap-10">
                  <Space direction="vertical">
                    <img
                      src="https://lh3.googleusercontent.com/a/ACg8ocI0Exl7P4CfPQjZK2gS_yWbGqpn80JFQg3xICctXAomZ0Rc8Q=s96-c"
                      alt="Avatar"
                      className="rounded-lg"
                      width="60"
                    />
                  </Space>
                  <NoMarginBottom>
                    <Title level={4}>{group?.name}</Title>
                    <p>
                      Created at:{" "}
                      {moment(group?.createdAt).format(DATE_FORMAT_SLASH)}
                    </p>
                  </NoMarginBottom>
                </div>
                <Button
                  group={group}
                  type="primary"
                  shape="round"
                  icon={<EditOutlined />}
                  onClick={navigateToEdit}
                >
                  Edit Team Profile
                </Button>
              </FlexBox>
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

                      /// Nếu không phải "OWNER", ưu tiên "ingroup" giảm dần theo updateAt
                      if (
                        a.status === MEMBER_STATUS.INGROUP &&
                        b.status === MEMBER_STATUS.INGROUP
                      ) {
                        return b.updateAt - a.updateAt;
                      }
                      if (a.status === MEMBER_STATUS.INGROUP) return -1;
                      if (b.status === MEMBER_STATUS.INGROUP) return 1;

                      // Cuối cùng là những thành viên "pending"
                      if (
                        a.status === MEMBER_STATUS.PENDING &&
                        b.status !== MEMBER_STATUS.PENDING
                      )
                        return 1;
                      if (
                        b.status === MEMBER_STATUS.PENDING &&
                        a.status !== MEMBER_STATUS.PENDING
                      )
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
            </ContentInformation>
            <ContentInformation className="w-30p pl-8 flex flex-col items-center justify-start gap-16">
              <NoMarginBottom className="w-full">
                <Title level={4}>Register Group</Title>
              </NoMarginBottom>
              <p className="w-full">Send group registration request</p>
              {group?.status === "SUBMITTED" ? (
                <Button
                  shape="round"
                  icon={<SendOutlined />}
                  size={size}
                  onClick={showConfirmModal}
                >
                  Cancel Request
                </Button>
              ) : (
                <>
                  <Button
                    group={group}
                    shape="round"
                    icon={<SendOutlined />}
                    onClick={navigateToSend}
                    className=""
                  >
                    Send
                  </Button>
                </>
              )}
            </ContentInformation>
          </ContentBlockWrapper>
        </Team>
      ) : (
        <EmptyPage
          title={"You are not ingroup"}
          content={"Please join the group to see your group information"}
        />
      )}
      <PopupEditTeam
        group={group}
        isVisiblePopup={isVisiblePopup}
        setIsVisiblePopup={setIsVisiblePopup}
        handleClosePopup={() => setIsVisiblePopup(false)}
        setRefresh={setRefresh}
      />

      <PopupSendToMentor
        group={group}
        isVisiblePopup={isVisiblePopupSend}
        setIsVisiblePopup={setIsVisiblePopupSend}
        handleClosePopup={() => setIsVisiblePopupSend(false)}
      />
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

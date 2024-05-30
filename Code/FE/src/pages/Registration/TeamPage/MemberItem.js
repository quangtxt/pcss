import React, { memo, useCallback, useEffect, useState } from "react";
import { inject, observer } from "mobx-react";
import { withRouter } from "react-router-dom";
import { MoreOutlined } from "@ant-design/icons";
import { Button, Form, message, Menu, Icon, Dropdown, Modal } from "antd";
import styled from "styled-components";
import { MEMBER_STATUS, DATE_FORMAT_SLASH } from "../../../constants";

const InformMember = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  align-items: baseline;
`;

const Info = styled.div`
  display: flex;
  align-items: center;
  width: 60%;
`;

const UserAvatar = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 8px;
  margin-right: 12px;
  margin-right: 16px;
`;

const MemberInfo = styled.div``;

const MemberEmail = styled.a`
  text-decoration: none;
  color: #1c1f27;
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 8px;
`;

const MemberName = styled.p`
  color: rgba(28, 31, 39, 0.5);
  font-weight: 400;
  font-size: 14px;
`;

const Role = styled.div`
  font-weight: 600;
  font-size: 14px;
  color: rgba(28, 31, 39, 0.5);
  p {
    font-size: 16px;
  }
`;
const MemberItem = (props) => {
  const {
    authenticationStore,
    groupStore,
    history,
    setRefresh,
    group,
    member,
  } = props;
  const { currentUser } = authenticationStore;

  const [isLeader, setIsLeader] = useState(false);

  const handleEmailClick = (studentId) => {
    // history.push(`/profile`, { studentId });
  };

  useEffect(() => {
    checkLeader();
  }, [currentUser]);

  const checkLeader = () => {
    const owner = group.members[0];
    if (currentUser.id === owner.student.user.id) setIsLeader(true);
  };

  const handleMenuClick = (e) => {
    if (e.key === "view-profile") {
      // handleRemoveMember();
    } else if (e.key === "change-to-leader") {
      handleChangeLeader();
    } else {
      handleRemoveMember();
    }
  };
  const handleChangeLeader = async () => {
    try {
      console.log("groupId", group.id);
      console.log("studentId", member?.student.id);
      await groupStore.empowerOwner(group.id, member?.student.id);
      setRefresh(true);
    } catch (err) {
      console.log(err);
    }
  };
  const handleRemoveMember = async () => {
    try {
      await groupStore.updateStatus(
        group.id,
        MEMBER_STATUS.PENDING,
        member?.student.id
      );
      setRefresh(true);
    } catch (err) {
      console.log(err);
    }
  };
  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="view-profile">View Profile</Menu.Item>
      {isLeader && (
        <>
          {member?.status === MEMBER_STATUS.INGROUP && (
            <>
              <Menu.Item key="change-to-leader">Change to Leader</Menu.Item>
            </>
          )}
          <Menu.Item key="remove-member">Remove Member</Menu.Item>
        </>
      )}
    </Menu>
  );
  return (
    <InformMember>
      <Info>
        <UserAvatar src={member?.avatar} alt="Avatar" />
        <MemberInfo>
          <MemberEmail onClick={() => handleEmailClick(member?.student.id)}>
            {member?.student.user.email}
          </MemberEmail>
          <MemberName>{member?.student.user.name}</MemberName>
        </MemberInfo>
      </Info>
      <Role>
        <p>
          {member?.status == "INGROUP"
            ? member?.role == "OWNER"
              ? "OWNER | LEADER"
              : member?.role
            : "PENDING"}
        </p>
      </Role>
      <Dropdown overlay={menu}>
        <Button type="text">
          <MoreOutlined style={{ fontSize: "15px" }} />
        </Button>
      </Dropdown>
    </InformMember>
  );
};

export default memo(
  inject("authenticationStore", "groupStore")(observer(MemberItem))
);

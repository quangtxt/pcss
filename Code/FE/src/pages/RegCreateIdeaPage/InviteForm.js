import React, { memo, useCallback, useEffect, useState } from "react";
import { inject, observer } from "mobx-react";
import { withRouter } from "react-router-dom";
import { UserOutlined, EditOutlined } from "@ant-design/icons";
import { Radio } from "antd";

import {
  Container,
  Title,
  InviteSection,
  Instruction,
  InviteButton,
  InviteInput,
  UserList,
  UserItem,
  UserAvatar,
  UserEmail,
} from "./InviteFormStyled";

const InviteForm = (props) => {
  const [email, setEmail] = useState("");
  const [invitedUsers, setInvitedUsers] = useState([]);

  const handleInvite = () => {
    if (email && invitedUsers.length < 4) {
      setInvitedUsers([...invitedUsers, email]);
      setEmail("");
    }
  };

  return (
    <Container>
      <Title>Existed Members</Title>
      <UserItem>
        <UserAvatar></UserAvatar>
        <UserEmail>hieupbhe163832@fpt.edu.vn</UserEmail>
      </UserItem>

      <InviteSection>
        <Title>Invite</Title>
        <Instruction>
          You can only invite those students whose specialties is allowed to
          work on the same thesis topic as yours in this term.
        </Instruction>
        <div>
          <InviteInput
            type="email"
            placeholder="Example@fpt.edu.vn"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <InviteButton onClick={handleInvite}>Invite</InviteButton>
        </div>
      </InviteSection>

      <UserList>
        {invitedUsers.map((user, index) => (
          <UserItem key={index}>
            <UserAvatar></UserAvatar>
            <UserEmail>{user}</UserEmail>
          </UserItem>
        ))}
      </UserList>
    </Container>
  );
};

export default InviteForm;

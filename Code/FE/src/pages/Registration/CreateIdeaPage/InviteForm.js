import React, { memo, useCallback, useEffect, useState } from "react";
import { inject, observer } from "mobx-react";
import { withRouter } from "react-router-dom";
import { UserOutlined, EditOutlined } from "@ant-design/icons";
import { message } from "antd";
import Select from "react-select";

import {
  Title,
  InviteSection,
  Instruction,
  InviteInput,
  InviteContainer,
  InviteButton,
} from "./InviteFormStyled";

const InviteForm = (props) => {
  const {
    authenticationStore,
    studentStore,
    loadingAnimationStore,
    groupStore,
    setSelectedStudent,
    group,
  } = props;
  const { currentUser } = authenticationStore;

  const [selectedOption, setSelectedOption] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [studentsToInvite, setStudentsToInvite] = useState([]);

  useEffect(() => {
    async function getStudentList() {
      const res = await studentStore.getStudentsToInvite();
      let studentsToInviteFiltered;
      if (group) {
        const memberEmails = group.members.map(
          (member) => member.student.user.email
        );
        studentsToInviteFiltered = res.data.filter(
          (student) => !memberEmails.includes(student.user.email)
        );
      } else {
        studentsToInviteFiltered = res.data.filter(
          (student) => student.user.email !== currentUser.email
        );
      }
      setStudentsToInvite(studentsToInviteFiltered);
    }
    if (authenticationStore.currentUser) getStudentList();
  }, [authenticationStore.currentUser]);
  const handleOptionChange = (option) => {
    setSelectedOption(option);
    const selectedIds = option.map((option) => option.value);
    setSelectedStudent(selectedIds);
  };

  const getOptions = () => {
    if (studentsToInvite.length > 0) {
      return studentsToInvite.map((student) => ({
        value: student.id,
        label: student.user.email,
      }));
    } else {
      return [{ value: "", label: "Loading..." }];
    }
  };
  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !isMenuOpen) {
      event.preventDefault();
    }
  };
  const handleMenuOpen = () => {
    setIsMenuOpen(true);
  };

  const handleMenuClose = () => {
    setIsMenuOpen(false);
  };
  const handleInvite = async () => {
    if (selectedOption && selectedOption.length > 0) {
      const selectedIds = selectedOption.map(
        (selectedOption) => selectedOption.value
      );
      loadingAnimationStore.showSpinner(true);
      try {
        const res = await groupStore.inviteMember(group?.id, selectedIds);
        message.success("Invite members successfully.");
        setSelectedStudent([]);
      } catch (err) {
        console.log(err);
        loadingAnimationStore.showSpinner(false);
      } finally {
        loadingAnimationStore.showSpinner(false);
      }
    } else {
      message.error("Please select email to invite.");
    }
  };
  return (
    <InviteSection>
      <Title>Invite</Title>
      <Instruction>
        You can only invite those students whose specialties is allowed to work
        on the same thesis topic as yours in this term.
      </Instruction>
      <InviteContainer>
        <InviteInput>
          <Select
            value={selectedOption}
            components={{
              DropdownIndicator: () => null,
              IndicatorSeparator: () => null,
            }}
            onChange={handleOptionChange}
            options={getOptions()}
            placeholder="Example@fpt.edu.vn"
            isMulti
            openMenuOnClick={false}
            onMenuOpen={handleMenuOpen}
            onMenuClose={handleMenuClose}
            onKeyDown={handleKeyDown}
          />
        </InviteInput>
        {group && <InviteButton onClick={handleInvite}>Invite</InviteButton>}
      </InviteContainer>
    </InviteSection>
  );
};

export default memo(
  inject(
    "authenticationStore",
    "studentStore",
    "groupStore",
    "loadingAnimationStore"
  )(observer(InviteForm))
);

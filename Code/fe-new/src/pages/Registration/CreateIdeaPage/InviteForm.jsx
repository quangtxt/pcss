import React, { useEffect, useState, useContext } from "react";
import { message } from "antd";
import Select from "react-select";
import { StoreContext } from "../../../App";

import {
  Title,
  InviteSection,
  Instruction,
  InviteInput,
  InviteContainer,
  InviteButton,
} from "./InviteFormStyled";

const InviteForm = (props) => {
  const { setSelectedStudent, setRefresh, group } = props;
  const { loadingAnimationStore, groupStore, currentUser, studentStore } =
    useContext(StoreContext);

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
    if (currentUser) getStudentList();
  }, [currentUser, group]);
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
      console.log("selectedIds", selectedIds);
      loadingAnimationStore.showSpinner(true);
      try {
        const res = await groupStore.inviteMember(group?.id, selectedIds);
        message.success("Invite members successfully.");
        setRefresh(true);
        setSelectedStudent([]);
        setSelectedOption(null);
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
    <div className="mt-5">
      <h2 className="text-lg mb-2.5">Invite</h2>
      <p className="text-sm text-gray-600">
        {" "}
        You can only invite those students whose specialties is allowed to work
        on the same thesis topic as yours in this term.
      </p>
      <div className="flex items-center w-full justify-between">
        <div className="flex-grow mr-2.5">
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

          {group && <InviteButton onClick={handleInvite}>Invite</InviteButton>}
        </div>
      </div>
    </div>
  );
};

export default InviteForm;

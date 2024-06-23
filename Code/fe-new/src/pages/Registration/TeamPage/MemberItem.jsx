import React, { useCallback, useEffect, useState, useContext } from "react";

import { MoreOutlined } from "@ant-design/icons";
import { Button, Form, message, Menu, Dropdown } from "antd";
import { MEMBER_STATUS, DATE_FORMAT_SLASH } from "../../../constants";
import { StoreContext } from "../../../App";

import {
  InformMember,
  Role,
  MemberName,
  MemberEmail,
  UserAvatar,
  MemberInfo,
  Info,
} from "./TeamPageStyled";
const MemberItem = (props) => {
  const { setRefresh, group, member } = props;
  const { groupStore, currentUser } = useContext(StoreContext);

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
    console.log("useNavigate");
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
  const items = [
    {
      key: "view-profile",
      label: <div onClick={() => navigate("/profile")}>View Profile</div>,
    },
    isLeader &&
      member?.status === MEMBER_STATUS.INGROUP && {
        key: "change-to-leader",
        label: (
          <div onClick={() => handleChangeLeader()} style={{ color: "green" }}>
            Change to Leader
          </div>
        ),
      },
    isLeader && {
      key: "remove-member",
      label: (
        <div onClick={() => handleRemoveMember()} style={{ color: "red" }}>
          Remove Member
        </div>
      ),
    },
  ].filter(Boolean);
  return (
    <div className="w-full flex justify-between mb-5 items-baseline">
      <div className="flex items-center w-3/5">
        <img
          className="w-12 h-12 rounded-2xl mr-4"
          src={member?.avatar}
          alt="User Avatar"
        />
        <div className="space-y-2">
          <a
            className="text-gray-800 font-semibold text-2xl"
            onClick={() => handleEmailClick(member?.student.id)}
          >
            {member?.student.user.email}
          </a>
          <p className="text-gray-500 font-normal text-base">
            {member?.student.user.name}
          </p>
        </div>
      </div>
      <div className="font-semibold text-base text-gray-500">
        <p className="text-lg">
          {member?.status == "INGROUP"
            ? member?.role == "OWNER"
              ? "OWNER | LEADER"
              : member?.role
            : "PENDING"}
        </p>
      </div>
      <Dropdown menu={{ items }}>
        <Button type="text">
          <MoreOutlined style={{ fontSize: "15px" }} />
        </Button>
      </Dropdown>
    </div>
  );
};

export default MemberItem;

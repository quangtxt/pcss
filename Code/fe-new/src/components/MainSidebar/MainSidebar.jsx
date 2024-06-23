import React, {
  useCallback,
  useEffect,
  useState,
  useContext,
  createRef,
} from "react";
import { Menu } from "antd";
import { Link, useLocation } from "react-router-dom";
import {
  BarChartOutlined,
  CalendarOutlined,
  FileProtectOutlined,
  HomeOutlined,
  ProfileOutlined,
  SnippetsOutlined,
  ScheduleOutlined,
  ReconciliationOutlined,
} from "@ant-design/icons";
import { SiderbarWrapper } from "./MainSidebarStyled";
import { StoreContext } from "../../App";

const MainSidebar = (props) => {
  const location = useLocation();
  const { commonStore, currentUser } = useContext(StoreContext);
  const { openedSubMenu, setOpenedSubMenu, collapsedMenu, pageName, setPage } =
    commonStore;
  // console.log("openedSubMenu", openedSubMenu);
  const isStudent = () => {
    return (
      currentUser &&
      currentUser.roles.some((role) => role.name.includes("STUDENT"))
    );
  };
  const isMentor = () => {
    return (
      currentUser &&
      currentUser.roles.some((role) => role.name.includes("MENTOR"))
    );
  };
  const isStaff = () => {
    return (
      currentUser &&
      currentUser.roles.some((role) => role.name.includes("STAFF"))
    );
  };
  const items = [
    {
      key: "home",
      label: <Link to={"/home"}>Trang chủ</Link>,
      icon: <HomeOutlined />,
    },
    {
      key: "registration",
      label: "Registration Phase",
      icon: <CalendarOutlined />,
      children: [
        isMentor() && {
          key: "/registration/std-request",
          label: (
            <Link to={"/registration/std-request"}>
              Registration Group You Recommend
            </Link>
          ),
        },
        isStaff() && {
          key: "/registration/student",
          label: <Link to={"/registration/student"}>Manager Student</Link>,
        },
        isStaff() && {
          key: "/registration/mentor",
          label: <Link to={"/registration/mentor"}>Manager Mentor</Link>,
        },
        isStudent() && {
          key: "/registration/team",
          label: <Link to={"/registration/team"}>Team</Link>,
        },

        isStudent() && {
          key: "/registration/myRequest",
          label: <Link to={"/registration/myRequest"}>My Request</Link>,
        },
        isStudent() && {
          key: "/registration/createIdea",
          label: <Link to={"/registration/createIdea"}>Create Idea</Link>,
        },
        isStudent() && {
          key: "/registration/supervisors",
          label: <Link to={"/registration/supervisors"}>Supervisors</Link>,
        },
      ],
    },
    {
      key: "guidance",
      label: "Guidance Phase",
      icon: <ProfileOutlined />,
      children: [
        {
          key: "/guidance/schedule",
          label: <Link to={"/guidance/schedule"}>Schedule </Link>,
        },
        isStudent() && {
          key: "/guidance/task",
          label: <Link to={"/guidance/task"}>Manage Task</Link>,
        },
      ],
    },
  ];
  const onSubMenuToggle = useCallback((keys) => {
    setOpenedSubMenu(keys);
  }, []);

  const onClickMenuItem = ({ keyPath }) => {
    setOpenedSubMenu([keyPath[1]]);
  };

  useEffect(() => {
    // Trang chủ
    if (location.pathname.includes("/home")) {
      setPage(["/home"]);
      setOpenedSubMenu([]);
      return;
    }
    // Đăng ký đồ án
    if (location.pathname.includes("/registration/team")) {
      setPage(["/registration/team"]);
      setOpenedSubMenu(["registration"]);
      return;
    }
    if (location.pathname.includes("/registration/myRequest")) {
      setPage(["/registration/myRequest"]);
      setOpenedSubMenu(["registration"]);
      return;
    }
    if (location.pathname.includes("/registration/createIdea")) {
      setPage(["/registration/createIdea"]);
      setOpenedSubMenu(["registration"]);
      return;
    }
    if (location.pathname.includes("/registration/supervisors")) {
      setPage(["/registration/supervisors"]);
      setOpenedSubMenu(["registration"]);
      return;
    }
    setPage([location.pathname]);
  }, [location.pathname]);
  return (
    <SiderbarWrapper>
      <Menu
        onClick={onClickMenuItem}
        defaultSelectedKeys={pageName}
        // openKeys={openedSubMenu}
        mode="inline"
        items={items}
        inlineCollapsed={!collapsedMenu}
      />
    </SiderbarWrapper>
  );
};

export default MainSidebar;

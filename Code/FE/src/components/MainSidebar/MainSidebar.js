import React, { memo, useCallback, useEffect, useState } from "react";
import { Badge, Menu } from "antd";
import { Link, withRouter } from "react-router-dom";
import { inject, observer } from "mobx-react";
import {
  ACL_ACTION_TYPE,
  MODULE_CODE,
  VAN_PHONG_DIEN_TU,
} from "../../constants";
import {
  ApartmentOutlined,
  BarChartOutlined,
  CalendarOutlined,
  FileProtectOutlined,
  FileTextOutlined,
  HomeOutlined,
  ProfileOutlined,
  SnippetsOutlined,
  SolutionOutlined,
  ScheduleOutlined,
  ReconciliationOutlined,
} from "@ant-design/icons";
import { SiderbarWrapper } from "./MainSidebarStyled";
import { toJS } from "mobx";

const sortCommands = (a, b) => {
  const nameA = a.name.toUpperCase();
  const nameB = b.name.toUpperCase();
  let comparison = 0;
  if (nameA > nameB) {
    comparison = 1;
  } else if (nameA < nameB) {
    comparison = -1;
  }
  return comparison;
};

const MainSidebar = (props) => {
  const {
    location,
    history,
    commandStore,
    accountStore,
    authenticationStore,
    commonStore,
    moduleStore,
    aclStore,
  } = props;
  const {
    currentUser,
    isAccountAdmin,
    isSuperAdmin,
    isMentor,
    isStaff,
    isStudent,
  } = authenticationStore;
  const { openedSubMenu, setOpenedSubMenu, collapsedMenu } = commonStore;
  const { moduleList } = moduleStore;
  const { aclActionsByUser } = aclStore;

  const [moduleFlatList, setModuleFlatList] = useState([]);

  useEffect(() => {
    // commandStore.getSideMenuCounter(["WORK", "PROPOSAL", "INTERNAL_MESSAGE"]);
  }, [location.pathname]);

  useEffect(() => {
    const moduleFlatListConvert = [];
    moduleList.forEach((item) => {
      moduleFlatListConvert.push({
        ...toJS(item),
        sub_modules: null,
      });
      if (item.sub_modules?.length > 0) {
        item.sub_modules.forEach((el) => {
          moduleFlatListConvert.push(toJS(el));
        });
      }
    });
    setModuleFlatList(moduleFlatListConvert);
  }, [moduleList]);

  const isAccessControl = (moduleCode, accessControlType) => {
    if (isSuperAdmin) return true;
    if (!moduleStore.checkAccessModule(moduleCode)) return false;
    if (accessControlType)
      return (
        isAccountAdmin ||
        !!aclActionsByUser.find((item) => item.code === accessControlType)
          ?.status
      );
    return true;
  };

  // Menu trang chủ
  const menuTrangChu = (
    <Menu.Item key={"/home"} icon={<HomeOutlined />}>
      <Link to={"/home"}>Trang chủ</Link>
    </Menu.Item>
  );

  // Menu đăng ký đồ án
  const menuRegistrationPhase = (
    <Menu.SubMenu
      key={"registration"}
      icon={<CalendarOutlined />}
      title="Registration Phase"
    >
      {isMentor && (
        <Menu.Item key={"/registration/std-request"}>
          <Link to={"/registration/std-request"}>
            Registration Group You Recommend
          </Link>
        </Menu.Item>
      )}
      {isStaff && (
        <Menu.Item key={"/registration/student"}>
          <Link to={"/registration/student"}>Manager Student</Link>
        </Menu.Item>
      )}
      {isStaff && (
        <Menu.Item key={"/registration/mentor"}>
          <Link to={"/registration/mentor"}>Manager Mentor</Link>
        </Menu.Item>
      )}
      {isStudent && (
        <Menu.Item key={"/registration/team"}>
          <Link to={"/registration/team"}>Team</Link>
        </Menu.Item>
      )}
      {isStudent && (
        <Menu.Item key={"/registration/myRequest"}>
          <Link to={"/registration/myRequest"}>My request</Link>
        </Menu.Item>
      )}
      {isStudent && (
        <Menu.Item key={"/registration/createIdea"}>
          <Link to={"/registration/createIdea"}>Create Idea</Link>
        </Menu.Item>
      )}
      {isStudent && (
        <Menu.Item key={"/registration/listSupervisors"}>
          <Link to={"/registration/listSupervisors"}>List Supervisors</Link>
        </Menu.Item>
      )}
    </Menu.SubMenu>
  );
  // Menu hướng dẫn đồ án
  const menuGuidancePhase = (
    <Menu.SubMenu
      key={"Guidance"}
      icon={<ProfileOutlined />}
      title="Guidance Phase"
    >
      {isMentor && (
        <Menu.Item key={"/kpi"} icon={<BarChartOutlined />} title>
          <Link to={"/kpi"}>Submit results</Link>
        </Menu.Item>
      )}
      {isMentor && (
        <Menu.Item key={"/guidance/schedule"} icon={<ScheduleOutlined />} title>
          <Link to={"/guidance/schedule"}>Schedule </Link>
        </Menu.Item>
      )}
      {isStudent && (
        <Menu.Item key={"/guidance/schedule"} icon={<ScheduleOutlined />} title>
          <Link to={"/guidance/schedule"}>Schedule </Link>
        </Menu.Item>
      )}
      {isStudent && (
        <Menu.Item key={"/guidance/task" } icon={<ReconciliationOutlined />} title>
          <Link to={"/guidance/task"}>Manage Task</Link>
        </Menu.Item>
      )}
    </Menu.SubMenu>
  );
  // Menu chuẩn bị bảo vệ đồ án
  const menuPrepareProjectDefense = (
    <Menu.SubMenu
      key={"Prepare"}
      icon={<FileProtectOutlined />}
      title="Prepare project defense"
    ></Menu.SubMenu>
  );
  // Menu bảo vệ đồ án
  const menuProjectDefense = (
    <Menu.SubMenu
      key={"On"}
      icon={<SnippetsOutlined />}
      title="Project defense"
    ></Menu.SubMenu>
  );
  // Menu sau khi bảo vệ đồ án
  const menuAfterProjectDefense = (
    <Menu.SubMenu
      key={"After"}
      icon={<BarChartOutlined />}
      title="After project defense"
    ></Menu.SubMenu>
  );

  const offsetMenuCounter = [20, 24];

  const menuModule = (
    <Menu.Item key={"/module"}>
      <Link to={"/module"}>Phân hệ</Link>
    </Menu.Item>
  );

  const menuACL = (
    <Menu.Item key={"/acl"}>
      <Link to={"/acl"}>Phân quyền</Link>
    </Menu.Item>
  );

  const onSubMenuToggle = useCallback((keys) => {
    setOpenedSubMenu(keys);
  }, []);

  const onClickMenuItem = ({ keyPath }) => {
    setOpenedSubMenu([keyPath[1]]);
  };

  useEffect(() => {
    // Trang chủ
    if (location.pathname.includes("/home")) {
      commonStore.setPage(["/home"]);
      setOpenedSubMenu([]);
      return;
    }
    // Đăng ký đồ án
    if (location.pathname.includes("/registration/news")) {
      commonStore.setPage(["/registration/news"]);
      setOpenedSubMenu(["registration"]);
      return;
    }
    if (location.pathname.includes("/registration/team")) {
      commonStore.setPage(["/registration/team"]);
      setOpenedSubMenu(["registration"]);
      return;
    }
    if (location.pathname.includes("/registration/myRequest")) {
      commonStore.setPage(["/registration/myRequest"]);
      setOpenedSubMenu(["registration"]);
      return;
    }
    if (location.pathname.includes("/registration/createIdea")) {
      commonStore.setPage(["/registration/createIdea"]);
      setOpenedSubMenu(["registration"]);
      return;
    }
    if (location.pathname.includes("/registration/listSupervisors")) {
      commonStore.setPage(["/registration/listSupervisors"]);
      setOpenedSubMenu(["registration"]);
      return;
    }
    if (location.pathname.includes("/registration/ideaOfSupervisors")) {
      commonStore.setPage(["/registration/ideaOfSupervisors"]);
      setOpenedSubMenu(["registration"]);
      return;
    }
    commonStore.setPage([location.pathname]);
  }, [location.pathname]);

  return (
    <SiderbarWrapper>
      <Menu
        mode="inline"
        selectedKeys={commonStore.pageName}
        openKeys={openedSubMenu}
        onOpenChange={onSubMenuToggle}
        inlineCollapsed={!collapsedMenu}
        onClick={onClickMenuItem}
      >
        {menuTrangChu}
        {menuRegistrationPhase}
        {menuGuidancePhase}
        {menuPrepareProjectDefense}
        {menuProjectDefense}
        {menuAfterProjectDefense}
        {/* {isAccessControl(
          MODULE_CODE.lich_co_quan,
          ACL_ACTION_TYPE.menu__WORK_SCHEDULE
        ) && menuLichCoQuan} */}
      </Menu>
    </SiderbarWrapper>
  );
};

export default memo(
  withRouter(
    inject(
      "commandStore",
      "accountStore",
      "authenticationStore",
      "commonStore",
      "loadingAnimationStore",
      "notificationStore",
      "moduleStore",
      "aclStore"
    )(observer(MainSidebar))
  )
);

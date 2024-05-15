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
  const { currentUser, isAccountAdmin, isSuperAdmin } = authenticationStore;
  const { openedSubMenu, setOpenedSubMenu, collapsedMenu } = commonStore;
  const { moduleList } = moduleStore;
  const { aclActionsByUser } = aclStore;

  const [moduleFlatList, setModuleFlatList] = useState([]);

  useEffect(() => {
    console.log("location.pathname", location.pathname);
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
    <Menu.Item key={"/dashboard"} icon={<HomeOutlined />}>
      <Link to={"/dashboard"}>Trang chủ</Link>
    </Menu.Item>
  );

  // Menu đăng ký đồ án
  const menuRegistrationPhase = (
    <Menu.SubMenu
      key={"registration"}
      icon={<CalendarOutlined />}
      title="Registration Phase"
    >
      <Menu.Item key={"/registration/news"}>
        <Link to={"/utility/contacts"}>News</Link>
      </Menu.Item>
      <Menu.Item key={"/registration/team"}>
        <Link to={"/utility/general-notifications"}>Team</Link>
      </Menu.Item>
      <Menu.Item key={"/registration/myRequest"}>
        <Link to={"/utility/contacts"}>My request</Link>
      </Menu.Item>
      <Menu.Item key={"/registration/createIdea"}>
        <Link to={"/utility/general-notifications"}>Create Idea</Link>
      </Menu.Item>
      <Menu.Item key={"/registration/listSupervisors"}>
        <Link to={"/utility/contacts"}>List Supervisors</Link>
      </Menu.Item>
      <Menu.Item key={"/registration/ideaOfSupervisors"}>
        <Link to={"/utility/general-notifications"}>Ideas of Supervisors</Link>
      </Menu.Item>
    </Menu.SubMenu>
  );
  // Menu hướng dẫn đồ án
  const menuGuidancePhase = (
    <Menu.SubMenu
      key={"Guidance"}
      icon={<ProfileOutlined />}
      title="Guidance Phase"
    >
      <Menu.Item key={"/kpi"} icon={<BarChartOutlined />} title>
        <Link to={"/kpi"}>Submit results</Link>
      </Menu.Item>
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
    if (location.pathname.includes("/dashboard")) {
      commonStore.setPage(["/dashboard"]);
      setOpenedSubMenu([]);
      return;
    }
    // Lịch cơ quan
    if (location.pathname.includes("/company-work-schedule")) {
      commonStore.setPage(["/company-work-schedule"]);
      setOpenedSubMenu([]);
      return;
    }
    // Thông báo
    if (location.pathname.includes("/notification")) {
      commonStore.setPage(["/notification"]);
      return;
    }
    // Văn bản
    if (location.pathname.includes("/document-management/")) {
      commonStore.setPage(["/document-management"]);
      setOpenedSubMenu(["connected-document"]);
      return;
    }
    if (location.pathname.includes("/connected-document/")) {
      commonStore.setPage(["/connected-document/incoming-document"]);
      setOpenedSubMenu(["connected-document"]);
      return;
    }
    if (location.pathname.includes("/connected-committee-document/")) {
      commonStore.setPage(["/connected-committee-document/incoming-document"]);
      setOpenedSubMenu(["connected-document"]);
      return;
    }
    if (location.pathname.includes("/internal-document/")) {
      commonStore.setPage(["/internal-document/incoming-document"]);
      setOpenedSubMenu(["connected-document"]);
      return;
    }

    // Nhiệm vụ
    if (location.pathname.includes("/mission-group/")) {
      commonStore.setPage(["/mission-group/"]);
      setOpenedSubMenu(["missions"]);
      return;
    }
    if (location.pathname.includes("/mission-management/")) {
      commonStore.setPage(["/mission-management"]);
      setOpenedSubMenu(["missions"]);
      return;
    }
    // Công việc
    if (
      location.pathname.includes("/my-tasks") ||
      location.pathname.includes("/my-tasks/")
    ) {
      commonStore.setPage(["/my-tasks"]);
      setOpenedSubMenu([]);
      return;
    }
    // Bảng lương

    if (
      location.pathname.includes("/my-salary") ||
      location.pathname.includes("/my-salary/")
    ) {
      commonStore.setPage(["/my-salary"]);
      setOpenedSubMenu(["salary"]);
      return;
    }

    if (
      location.pathname.includes("/proposal-salary-management") ||
      location.pathname.includes("/proposal-salary-management/")
    ) {
      commonStore.setPage(["/proposal-salary-management"]);
      setOpenedSubMenu(["salary"]);
      return;
    }

    if (
      location.pathname.includes("/salary") ||
      location.pathname.includes("/salary/")
    ) {
      commonStore.setPage(["/salary"]);
      setOpenedSubMenu(["salary"]);
      return;
    }

    if (
      location.pathname.includes("/proposal-salary-request") ||
      location.pathname.includes("/proposal-salary-request/")
    ) {
      commonStore.setPage(["/proposal-salary-request"]);
      setOpenedSubMenu(["salary"]);
      return;
    }
    // Quản lý phân hệ
    if (
      location.pathname.includes("/module") ||
      location.pathname.includes("/module/")
    ) {
      commonStore.setPage(["/module"]);
      // setOpenedSubMenu([])
      return;
    }
    // Quản lý phân quyền
    if (
      location.pathname.includes("/acl") ||
      location.pathname.includes("/acl/")
    ) {
      commonStore.setPage(["/acl"]);
      // setOpenedSubMenu([])
      return;
    }
    if (
      location.pathname.includes("/works") ||
      location.pathname.includes("/works/")
    ) {
      commonStore.setPage(["/works"]);
      setOpenedSubMenu([]);
      return;
    }
    // Quy trình
    if (
      location.pathname.includes("/administrative/consult") ||
      location.pathname.includes("/administrative/consult/")
    ) {
      commonStore.setPage(["/administrative/consult"]);
      setOpenedSubMenu(["administrative"]);
      return;
    }
    if (
      location.pathname.includes("/administrative/policy") ||
      location.pathname.includes("/administrative/policy/")
    ) {
      commonStore.setPage(["/administrative/policy"]);
      setOpenedSubMenu(["administrative"]);
      return;
    }
    if (
      location.pathname.includes("/administrative/advance-payment") ||
      location.pathname.includes("/administrative/advance-payment/")
    ) {
      commonStore.setPage(["/administrative/advance-payment"]);
      setOpenedSubMenu(["administrative"]);
      return;
    }
    if (location.pathname.includes("/administrative/payslip")) {
      commonStore.setPage(["/administrative/payslip"]);
      setOpenedSubMenu(["administrative"]);
      return;
    }
    // Hành chính
    if (
      location.pathname.includes("/proposal-advance") ||
      location.pathname.includes("/proposal-advance/")
    ) {
      commonStore.setPage(["/proposal-advance"]);
      setOpenedSubMenu(["proposal"]);
      return;
    }
    if (
      location.pathname.includes("/proposal") ||
      location.pathname.includes("/proposal/")
    ) {
      commonStore.setPage(["/proposal"]);
      setOpenedSubMenu(["proposal"]);
      return;
    }

    if (location.pathname.includes("/administrative-management/")) {
      commonStore.setPage(["/administrative-management/approval-templates"]);
      setOpenedSubMenu(["proposal"]);
      return;
    }

    // Tiện ích
    if (
      location.pathname.includes("/utility/iso") ||
      location.pathname.includes("/utility/iso/")
    ) {
      commonStore.setPage(["/utility/iso"]);
      setOpenedSubMenu(["utilities"]);
      return;
    }
    if (
      location.pathname.includes("/utility/vbpc") ||
      location.pathname.includes("/utility/vbpc/")
    ) {
      commonStore.setPage(["/utility/vbpc"]);
      setOpenedSubMenu(["utilities"]);
      return;
    }
    if (
      location.pathname.includes("/utility/messages") ||
      location.pathname.includes("/utility/messages/")
    ) {
      commonStore.setPage(["/utility/messages"]);
      setOpenedSubMenu(["utilities"]);
      return;
    }
    if (
      location.pathname.includes("/utility/signed-document") ||
      location.pathname.includes("/utility/signed-document/")
    ) {
      commonStore.setPage(["/utility/signed-document"]);
      setOpenedSubMenu(["utilities"]);
      return;
    }
    if (
      location.pathname.includes("/utility/contacts") ||
      location.pathname.includes("/utility/contacts/")
    ) {
      commonStore.setPage(["/utility/contacts"]);
      setOpenedSubMenu(["utilities"]);
      return;
    }
    if (
      location.pathname.includes("/utility/general-notifications") ||
      location.pathname.includes("/utility/general-notifications/")
    ) {
      commonStore.setPage(["/utility/general-notifications"]);
      setOpenedSubMenu(["utilities"]);
      return;
    }
    if (
      location.pathname.includes("/utility/digital-signature") ||
      location.pathname.includes("/utility/digital-signature/")
    ) {
      commonStore.setPage(["/utility/digital-signature"]);
      setOpenedSubMenu(["utilities"]);
      return;
    }
    // Quản trị
    if (location.pathname.includes("/management/group")) {
      commonStore.setPage(["/management/group"]);
      setOpenedSubMenu(["management"]);
      return;
    }
    if (location.pathname.includes("/management/nhiem-vu-group")) {
      commonStore.setPage(["/management/nhiem-vu-group"]);
      setOpenedSubMenu(["management"]);
      return;
    }

    if (location.pathname.includes("/management/document-books")) {
      commonStore.setPage(["/management/document-books"]);
      setOpenedSubMenu(["management"]);
      return;
    }
    if (location.pathname.includes("/management/sample-document")) {
      commonStore.setPage(["/management/sample-document"]);
      setOpenedSubMenu(["management"]);
      return;
    }
    if (location.pathname.includes("/management//management/sign-account")) {
      commonStore.setPage(["/management/sample-document"]);
      setOpenedSubMenu(["management"]);
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

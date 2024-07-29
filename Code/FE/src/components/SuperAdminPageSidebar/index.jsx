import { ApartmentOutlined, HomeOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import { toJS } from "mobx";
import { inject, observer } from "mobx-react";
import React, { memo, useEffect, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { MODULE_CODE } from "../../constants";
import { SiderbarWrapper } from "../MainSidebar/MainSidebarStyled";

const SuperAdminPageSidebar = (props) => {
  const {
    location,
    commandStore,
    accountStore,
    authenticationStore,
    commonStore,
    moduleStore,
    aclStore,
  } = props;

  const { commandList } = commandStore;
  const { accountList } = accountStore;
  const { currentUser, isAccountAdmin, isSuperAdmin } = authenticationStore;
  const { openedSubMenu, setOpenedSubMenu, collapsedMenu } = commonStore;
  const { moduleList } = moduleStore;
  const { aclActionsByUser } = aclStore;

  const [moduleFlatList, setModuleFlatList] = useState([]);

  useEffect(() => {
    // console.log('location.pathname', location.pathname)
    commandStore.getSideMenuCounter();
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
    let isAccess = false;
    if (isSuperAdmin) return true;
    const currentModule = moduleFlatList.find(
      (item) => item.code === moduleCode
    );
    if (moduleCode && !currentModule?.status) {
      return false;
    } else {
      isAccess = true;
      if (accessControlType) {
        isAccess =
          isAccountAdmin ||
          !!aclActionsByUser.find((item) => item.code === accessControlType)
            ?.status;
      }
    }
    return isAccess;
  };

  const isCurrentUserHasCommand =
    currentUser?.commands && currentUser.commands.length !== 0;
  const menuTrangChu = (
    <Menu.Item key={"/dashboard"} icon={<HomeOutlined />}>
      <Link to={"/dashboard"}>Home</Link>
    </Menu.Item>
  );

  const menuQuanTri = (
    <Menu.Item key={"/module"} icon={<ApartmentOutlined />}>
      {isSuperAdmin && <Link to={"/module"}>Phân hệ</Link>}
    </Menu.Item>
  );

  const onClickMenuItem = ({ keyPath }) => {
    setOpenedSubMenu([keyPath[1]]);
  };

  useEffect(() => {
    if (isCurrentUserHasCommand) {
      currentUser.commands.forEach((userCommand) => {
        commandList.length !== 0 &&
          commandList.forEach((command) => {
            if (command.code === userCommand.code) {
              userCommand.url = command.url;
              userCommand.description = command.description;
              userCommand.image = command.image;
            }
          });
        accountList.length !== 0 &&
          accountList.forEach((account) => {
            if (account.command.code === userCommand.code) {
              userCommand.account_name = account.account_name;
              userCommand.id = account.id;
              userCommand.password = account.password;
            }
          });
      });
    }
  }, [currentUser, commandList, accountList, isCurrentUserHasCommand]);

  useEffect(() => {
    if (
      location.pathname.includes("/module") ||
      location.pathname.includes("/module/")
    ) {
      commonStore.setPage(["/module"]);
      // setOpenedSubMenu([])
      return;
    }
  }, [location.pathname]);
  return (
    <SiderbarWrapper>
      <Menu
        mode="inline"
        selectedKeys={commonStore.pageName}
        openKeys={openedSubMenu}
        inlineCollapsed={!collapsedMenu}
        onClick={onClickMenuItem}
      >
        {menuTrangChu}
        {isAccessControl(MODULE_CODE.quan_tri) && menuQuanTri}
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
    )(observer(SuperAdminPageSidebar))
  )
);

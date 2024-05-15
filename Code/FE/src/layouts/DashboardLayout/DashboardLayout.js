import React from "react";
import PropTypes from "prop-types";
import {
  CollapseSidebarButton,
  ContentWrapper,
  LayoutWrapper,
  MainWrapper,
  SidebarWrapper,
  SmallSidebarWrapper,
} from "./DashboardLayoutStyled";
import MainSidebar from "../../components/MainSidebar";
import MainHeaderBar from "../../components/MainHeaderBar";
import { inject, observer } from "mobx-react";
import { DoubleLeftOutlined, DoubleRightOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
import SuperAdminPageSidebar from "../../components/SuperAdminPageSidebar";

const DashboardLayout = (props) => {
  const { children, title, commonStore, backgroundColor } = props;

  const { collapsedMenu, setCollapsedMenu } = commonStore;

  return (
    <>
      <SmallSidebarWrapper>
        <MainHeaderBar title={title} />
      </SmallSidebarWrapper>
      <MainWrapper className={"main-wrapper"}>
        <LayoutWrapper>
          <SidebarWrapper collapsedMenu={collapsedMenu}>
            {props.isSuperAdminPage ? (
              <SuperAdminPageSidebar />
            ) : (
              <MainSidebar />
            )}
            <Tooltip title={collapsedMenu ? "Thu gọn menu" : "Mở rộng menu"}>
              <CollapseSidebarButton
                collapsedMenu={collapsedMenu}
                onClick={setCollapsedMenu}
              >
                {collapsedMenu ? (
                  <>
                    <DoubleLeftOutlined />
                    <span>Thu gọn menu</span>
                  </>
                ) : (
                  <DoubleRightOutlined />
                )}
              </CollapseSidebarButton>
            </Tooltip>
          </SidebarWrapper>
          <ContentWrapper
            collapsedMenu={collapsedMenu}
            marginTop={50}
            backgroundColor={backgroundColor}
            id="infinityScrollableDiv"
          >
            {children}
          </ContentWrapper>
        </LayoutWrapper>
      </MainWrapper>
    </>
  );
};

DashboardLayout.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
};

export default inject("commonStore")(observer(DashboardLayout));

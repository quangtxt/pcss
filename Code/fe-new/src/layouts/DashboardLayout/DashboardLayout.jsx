import React, { useContext, useState } from "react";
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
import MainHeaderBar from "../../components/MainHeaderBar/MainHeaderBar";

import { DoubleLeftOutlined, DoubleRightOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
import { StoreContext } from "../../App";

const DashboardLayout = (props) => {
  const { children } = props;
  const { commonStore } = useContext(StoreContext);
  const { collapsedMenu, setCollapsedMenu } = commonStore;
  const [load, setReload] = useState(false);
  const setCollapsed = () => {
    setCollapsedMenu();
    setReload(!load);
  };
  return (
    <>
      <SmallSidebarWrapper>
        <MainHeaderBar />
      </SmallSidebarWrapper>
      <MainWrapper className={"main-wrapper"}>
        <LayoutWrapper>
          <SidebarWrapper collapsedmenu={collapsedMenu.toString()}>
            <MainSidebar />

            <Tooltip title={collapsedMenu ? "Thu gọn menu" : "Mở rộng menu"}>
              <CollapseSidebarButton
                collapsedmenu={collapsedMenu.toString()}
                onClick={setCollapsed}
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
            collapsedmenu={collapsedMenu.toString()}
            margintop={50}
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

export default DashboardLayout;

import styled from "styled-components";
import PropTypes from "prop-types";
import { Tabs } from "antd";
import { blue } from "../../color";

export const ListNotification = styled.div``;
export const StyledTabs = styled(Tabs)`
  .ant-tabs-nav {
    margin-bottom: 16px;
  }

  .ant-tabs-ink-bar {
    background-color: ${blue};
  }

  .ant-tabs-tab {
    font-size: 16px;
    font-weight: 500;
    color: #333;

    &.ant-tabs-tab-active .ant-tabs-tab-btn {
      color: ${blue};
    }
  }
`;

import React, { memo, useCallback, useEffect, useState } from "react";
import { inject, observer } from "mobx-react";
import { withRouter } from "react-router-dom";
import { Card, Col, Layout, message, Row } from "antd";
import DashboardLayout from "../../layouts/DashboardLayout";
import { Helmet } from "react-helmet/es/Helmet";
import { PortalContent } from "./RegNewsPageStyled";

const RegNewsPage = (props) => {
  const { history, authenticationStore, accountStore, commandStore } = props;

  const { commandList } = commandStore;
  const { accountList } = accountStore;
  const { currentUser, isAccountAdmin, isSuperAdmin } = authenticationStore;

  return (
    <DashboardLayout>
      <Helmet>
        <title>Registration || News</title>
      </Helmet>
      hihi
    </DashboardLayout>
  );
};
export default memo(
  withRouter(
    inject(
      "authenticationStore",
      "accountStore",
      "userStore",
      "companyStore",
      "notificationStore",
      "loadingAnimationStore",
      "commonStore",
      "commandStore",
      "moduleStore",
      "aclStore"
    )(observer(RegNewsPage))
  )
);

import React, { memo, useCallback, useEffect, useState } from "react";
import { Card, Col, message, Popover, Row, Space } from "antd";
import { AppstoreFilled } from "@ant-design/icons";
import { withRouter } from "react-router-dom";
import { inject, observer } from "mobx-react";
import {
  BAO_CAO_THONG_MINH,
  CLOUD_ACTIVITY,
  CLOUD_DOCUMENT,
  CLOUD_DU_LIEU,
  CLOUD_EMAIL,
  CLOUD_FILE,
  CLOUD_TALK,
  DAO_TAO_TRUC_TUYEN,
  LIEN_THONG,
  NHAN_SU,
  TAI_CHINH_KE_TOAN,
  THU_DIEN_TU,
  VAN_PHONG_DIEN_TU,
  VAN_PHONG_DIEN_TU_OLD,
} from "../../constants";
import { toJS } from "mobx";
import { findLast } from "lodash-es";

const { Meta } = Card;

const PopupAppGrid = (props) => {
  const {
    history,
    authenticationStore,
    accountStore,
    userStore,
    companyStore,
    commonStore,
    commandStore,
    moduleStore,
    aclStore,
  } = props;
  const { currentUser } = authenticationStore;

  const { commandList } = commandStore;
  const { accountList } = accountStore;
  const { moduleList } = moduleStore;
  const [vpdtApp, setVpdtApp] = useState([]);

  useEffect(() => {
    let moduleVpdt = findLast(moduleList, (item) => item.code === "vpdt_app");

    setVpdtApp((moduleVpdt?.status && moduleVpdt?.sub_modules) ?? []);
    // console.log('vpdtApp', toJS(vpdtApp))
  }, [moduleList]);

  const renderWorkingPlace = () => {
    const menuCodes = [
      VAN_PHONG_DIEN_TU,
      CLOUD_FILE,
      CLOUD_TALK,
      VAN_PHONG_DIEN_TU_OLD,
    ];
    const menuList = [
      ...commandList,
      {
        code: VAN_PHONG_DIEN_TU_OLD,
        url:
          "http://14.238.8.234:5555/security/login.aspx?ReturnUrl=%2fmydesktop.aspx",
      },
    ].filter((item) => menuCodes.includes(item.code) && isEnableApp(item.code));
    return menuList.map((item) => renderCommandMenu({ item, col: 6 }));
  };

  const renderMenuApp = () => {
    const menuCodes = [
      CLOUD_DOCUMENT,
      DAO_TAO_TRUC_TUYEN,
      BAO_CAO_THONG_MINH,
      NHAN_SU,
      CLOUD_EMAIL,
    ];
    const menuList = commandList.filter(
      (item) => menuCodes.includes(item.code) && isEnableApp(item.code)
    );
    return menuList.map((item) => renderCommandMenu({ item, col: 6 }));
  };

  const isEnableApp = (code) =>
    findLast(vpdtApp, (module) => module.code === code)?.status === true;

  const renderCommandMenu = ({ item, col }) => {
    let title = null;
    let iconPath = null;
    switch (item.code) {
      case NHAN_SU:
        title = "CeHR";
        iconPath = "cehr.svg";
        break;
      case VAN_PHONG_DIEN_TU:
        title = "E-Office";
        iconPath = "eoffice.svg";
        break;
      case VAN_PHONG_DIEN_TU_OLD:
        title = "E-Office Old";
        iconPath = "E-Office-Old.png";
        break;
      case DAO_TAO_TRUC_TUYEN:
        title = "E-Learning";
        iconPath = "elearning.svg";
        break;
      case TAI_CHINH_KE_TOAN:
        title = "Fast";
        iconPath = "fast.svg";
        break;
      case THU_DIEN_TU:
        title = "Email";
        iconPath = "email.svg";
        break;
      case BAO_CAO_THONG_MINH:
        title = "Mis-BI";
        iconPath = "misbi.svg";
        break;
      case CLOUD_DU_LIEU:
        title = "Cloud";
        iconPath = "cloud.svg";
        break;
      case CLOUD_FILE:
        title = "FILE";
        iconPath = "cloud.svg";
        break;
      case CLOUD_TALK:
        title = "TALK";
        iconPath = "website.svg";
        break;
      case CLOUD_EMAIL:
        title = "E-Mail";
        iconPath = "email.svg";
        break;
      case CLOUD_DOCUMENT:
        title = " Tài liệu";
        iconPath = "document.svg";
        break;
      case CLOUD_ACTIVITY:
        title = "ACTIVITY";
        iconPath = "cloud.svg";
        break;
      case LIEN_THONG:
        title = "Connect";
        iconPath = "website.svg";
        break;
      case "CMD4351234481":
        title = " Office";
        iconPath = "website.svg";
        break;
    }

    return title != null ? cardItem(item, col, title, iconPath) : null;
  };

  const cardItem = (item, col, title, iconPath) => {
    return (
      <Col
        key={item.code}
        span={col}
        onClick={() => clickWidget(item)}
        style={{
          display: "flex",
          justifyContent: "space-around",
          cursor: "pointer",
        }}
      >
        <Space direction={"vertical"} align={"center"}>
          <div style={{ width: 54, height: 54 }}>
            <img
              style={{ width: "100%" }}
              src={`${process.env.PUBLIC_URL}/assets/icons/portal/${iconPath}`}
              alt={title}
            />
          </div>
          <h6 style={{ fontSize: 11, fontWeight: 600 }}>{title}</h6>
        </Space>
      </Col>
    );
  };

  const clickWidget = (item) => {
    switch (item.code) {
      case THU_DIEN_TU:
      case CLOUD_DU_LIEU:
      case CLOUD_FILE:
      case CLOUD_TALK:
      case CLOUD_EMAIL:
      case CLOUD_ACTIVITY:
        appActionHandler(item);
        break;
      case VAN_PHONG_DIEN_TU:
        if (authenticationStore.currentUser) {
          history.push("/dashboard");
        }
        break;
      default:
        window.open(item.url);
        break;
    }
  };

  const appActionHandler = useCallback(
    (app) => {
      let route;
      switch (app.code) {
        case THU_DIEN_TU:
          route = "/eMail";
          break;
        case CLOUD_DU_LIEU:
          route = "/cloud";
          break;
        case CLOUD_FILE:
          route = "/cloud?code=" + CLOUD_FILE;
          break;
        case CLOUD_TALK:
          route = "/cloud?code=" + CLOUD_TALK;
          break;
        case CLOUD_EMAIL:
          route = "https://mail.co/";
          break;
        case CLOUD_ACTIVITY:
          route = "/cloud?code=" + CLOUD_ACTIVITY;
          break;
        case LIEN_THONG:
          route = "connect";
          break;
      }
      if (
        app.code === CLOUD_DU_LIEU ||
        app.code === CLOUD_FILE ||
        app.code === CLOUD_TALK ||
        app.code === CLOUD_EMAIL ||
        app.code === CLOUD_ACTIVITY
      ) {
        const win = window.open(route, "_blank");
        win.focus();
      } else {
        app.account_name
          ? history.push({
              pathname: route,
              state: {
                username: app.account_name,
                password: app.password,
                commandUrl: app.url,
              },
            })
          : message.error(
              "Chưa đăng ký tài khoản, vui lòng liên hệ trung tâm CNTT"
            );
      }
    },
    [history]
  );

  return (
    <Popover
      placement="bottomRight"
      trigger="click"
      content={
        <div style={{ width: 388 }}>
          <Row
            gutter={[8, 24]}
            style={{
              backgroundColor: "white",
              borderRadius: "6px",
              padding: "18px 0",
              marginBottom: 0,
            }}
          >
            {renderWorkingPlace()}
            {renderMenuApp()}
          </Row>
        </div>
      }
    >
      <AppstoreFilled style={{ color: "#fff", fontSize: 18, marginLeft: 14 }} />
    </Popover>
  );
};

PopupAppGrid.propTypes = {};

export default memo(
  withRouter(
    inject(
      "authenticationStore",
      "accountStore",
      "userStore",
      "companyStore",
      "commonStore",
      "commandStore",
      "moduleStore",
      "aclStore"
    )(observer(PopupAppGrid))
  )
);

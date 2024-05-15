import React, { memo, useCallback, useEffect, useState } from "react";
import { inject, observer } from "mobx-react";
import { withRouter } from "react-router-dom";
import { Card, Col, Layout, message, Row } from "antd";
import DashboardAuthLayout from "../../layouts/DashboardAuthLayout";
import { PortalContent } from "./PortalPageV2Styled";
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
} from "../../constants";
import Title from "antd/lib/typography/Title";

const PortalPageV2 = (props) => {
  const { history, authenticationStore, accountStore, commandStore } = props;

  const { commandList } = commandStore;
  const { accountList } = accountStore;
  const { currentUser, isAccountAdmin, isSuperAdmin } = authenticationStore;
  const { Meta } = Card;

  const [confirmLoading, setConfirmLoading] = useState(false);
  const [, setShowDialog] = useState(false);

  const isCurrentUserHasCommand =
    currentUser?.commands && currentUser.commands.length !== 0;

  useEffect(() => {
    if (authenticationStore.currentUser) {
      accountStore
        .getCurrentUserAccount()
        .finally(() => console.log("getCurrentUserAccount done"));
    }
  }, []);

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

  const renderCommandMenu = useCallback(({ item, col }) => {
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
    }

    return title != null ? (
      <Col key={item.code} span={col}>
        <Card onClick={() => clickWidget(item)} bordered={false}>
          <Meta
            avatar={
              <img
                alt="icon"
                height={56}
                src={`${process.env.PUBLIC_URL}/assets/icons/portal/${iconPath}`}
              />
            }
            title={title}
            description={item.name}
          />
        </Card>
      </Col>
    ) : null;
  }, []);

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
        } else {
          setShowDialog(true);
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

  const renderWorkingPlace = () => {
    const menuCodes = [VAN_PHONG_DIEN_TU, CLOUD_FILE, CLOUD_TALK];
    const menuList = commandList.filter((item) =>
      menuCodes.includes(item.code)
    );
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
    const menuList = commandList.filter((item) =>
      menuCodes.includes(item.code)
    );
    return menuList.map((item) => renderCommandMenu({ item, col: 12 }));
  };

  return (
    <div>
      {currentUser != null ? (
        <Layout>
          <DashboardAuthLayout showFooter>
            <PortalContent>
              <div style={{ marginTop: 82, marginBottom: 32 }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 16,
                  }}
                >
                  <Title level={2}> Working Place</Title>
                </div>
                <Row
                  gutter={[30, 30]}
                  style={{
                    backgroundColor: "white",
                    borderRadius: "6px",
                    padding: "16px 0",
                    marginBottom: 48,
                    marginLeft: 0,
                    marginRight: 0,
                  }}
                >
                  {renderWorkingPlace()}
                  {
                    <Col span={6}>
                      <Card
                        onClick={() => window.open("http://co", "_blank")}
                        bordered={false}
                      >
                        <Meta
                          avatar={
                            <img
                              alt="icon"
                              height={56}
                              src={`${process.env.PUBLIC_URL}/assets/icons/portal/E-Office-Old.png`}
                            />
                          }
                          title={"E-Office Old"}
                          description={"Văn phòng điện tử cũ"}
                        />
                      </Card>
                    </Col>
                  }
                </Row>
              </div>
              <div>
                <div
                  style={{
                    marginBottom: 16,
                  }}
                >
                  <Title level={5} type="secondary">
                    Danh sách phần mềm & dịch vụ
                  </Title>
                </div>
                <Row gutter={[30, 30]} style={{ marginBottom: "7rem" }}>
                  {renderMenuApp()}
                  {isAccountAdmin || isSuperAdmin ? (
                    <Col key={"quan-tri"} span={12}>
                      <Card
                        onClick={() =>
                          history.push(
                            "/connected-committee-document-organization"
                          )
                        }
                        bordered={false}
                      >
                        <Meta
                          avatar={
                            <img
                              alt="icon"
                              height={56}
                              src={`${process.env.PUBLIC_URL}/assets/icons/portal/fast.svg`}
                            />
                          }
                          title={"Quản trị"}
                          description={"Quản trị"}
                        />
                      </Card>
                    </Col>
                  ) : null}
                </Row>
              </div>
            </PortalContent>
          </DashboardAuthLayout>
        </Layout>
      ) : (
        <>Đăng nhập</>
      )}
    </div>
  );
};

const sortById = (a, b) => {
  return (
    parseInt(a.code.replace("CMD", "")) - parseInt(b.code.replace("CMD", ""))
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
    )(observer(PortalPageV2))
  )
);

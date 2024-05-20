import {
  FileTextOutlined,
  LeftOutlined,
  RightOutlined,
  QuestionOutlined,
} from "@ant-design/icons";
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  List,
  message,
  Row,
  Tabs,
  Tooltip,
  Typography,
  Space,
  Table,
  Tag,
} from "antd";
import axios from "axios";
import { runInAction, toJS } from "mobx";
import { inject, observer } from "mobx-react";
import moment from "moment";
import React, { memo, useEffect, useState } from "react";
import { Helmet } from "react-helmet/es/Helmet";

import DashboardLayout from "../../layouts/DashboardLayout";
import utils from "../../utils";
import validator from "../../validator";
import { LoginWrapper } from "../PortalPageV2/PortalPageV2Styled";
import {
  BoxChartLoading,
  CardWrapper,
  DayTab,
  DescriptionLink,
  GeneralNotif,
  ItemCalendarContent,
  RowWrapper,
  StatisticList,
  WorkScheduledCard,
  WorkScheduledItem,
} from "./DashboardPageV2Styled";

const { TabPane } = Tabs;
const btnPrevAndNextStyled = {
  cursor: "pointer",
};

const DashboardPageV2 = (props) => {
  const defaultStyle = {
    transition: `all 500ms cubic-bezier(.4,0,.2,1)`,
    opacity: 0,
    margin: 0,
    maxHeight: 0,
  };

  const transitionStyles = {
    entering: { padding: 0, maxHeight: 0, opacity: 0 },
    entered: { maxHeight: 5000, opacity: 1 },
    exiting: { padding: 0, maxHeight: 0, opacity: 0 },
    exited: { padding: 0, maxHeight: 0, opacity: 0 },
  };

  const {
    history,
    location,
    authenticationStore,
    loadingAnimationStore,
  } = props;

  const { currentUser, isAccountAdmin, isSuperAdmin } = authenticationStore;
  // const { statistic } = statisticStore

  // const [dataCongViec, setDataCongViec] = useState([{ type: '', value: 0 }])
  //
  const [isLoadingCalendar, setIsLoadingCalendar] = useState(false);
  const [isLoadingSidemenuCounter, setIsLoadingSidemenuCounter] = useState(
    false
  );
  const [isLoadingTinTuc, setIsLoadingTinTuc] = useState(false);
  //
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  const handleOk = async (values) => {
    setConfirmLoading(true);
    try {
      const response = await authenticationStore.userLogin(
        values.identifier,
        values.password
      );
      if (response.status === 200) {
        setShowDialog(false);
        message.success(`Xin chào, ${utils.getNameInCapitalize("quang")}!`);
      }
    } catch (err) {
      console.log(err);
      message.error(err.en || "Login failed response status!");
    } finally {
      setConfirmLoading(false);
    }
  };

  const loginPage = (
    <>
      <LoginWrapper
        bgImage={`${process.env.PUBLIC_URL}/assets/photos/bg-diagram.png`}
      >
        <Form layout={"vertical"} name={"loginForm"} onFinish={handleOk}>
          <Form.Item style={{ textAlign: "center" }}>
            <img
              alt="login_logo"
              height={32}
              src={`${process.env.PUBLIC_URL}/assets/photos/travelowky-logo.webp`}
            />
          </Form.Item>
          <Form.Item
            label="Tên đăng nhập"
            name="identifier"
            rules={[
              { required: true, message: "Vui lòng nhập tên đăng nhập!" },
              // { validator: validator.validateUsername },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
          >
            <Input.Password />
          </Form.Item>
          <Button
            type={"primary"}
            block
            htmlType={"submit"}
            loading={confirmLoading}
          >
            {" "}
            Đăng nhập
          </Button>
          <Button style={{ marginTop: 8 }} type={"link"} block>
            {" "}
            Quên mật khẩu?
          </Button>
          {/*<Button style={{ marginTop: 0 }} type={'link'} block onClick={showModal}> Lịch cơ quan</Button>*/}
        </Form>
      </LoginWrapper>
    </>
  );
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Tags",
      key: "tags",
      dataIndex: "tags",
      render: (_, { tags }) => (
        <>
          {tags.map((tag) => {
            let color = tag.length > 5 ? "geekblue" : "green";
            if (tag === "loser") {
              color = "volcano";
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a>Invite {record.name}</a>
          <a>Delete</a>
        </Space>
      ),
    },
  ];
  const data = [
    {
      key: "1",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
      tags: ["nice", "developer"],
    },
    {
      key: "2",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      tags: ["loser"],
    },
    {
      key: "3",
      name: "Joe Black",
      age: 32,
      address: "Sydney No. 1 Lake Park",
      tags: ["cool", "teacher"],
    },
  ];
  return (
    <div>
      {currentUser != null ? (
        <DashboardLayout
          title={"Link People - Link the World"}
          backgroundColor={"#f2f3f8"}
        >
          <Helmet>
            <title>Dashboard</title>
          </Helmet>

          <Table columns={columns} dataSource={data} />
        </DashboardLayout>
      ) : (
        loginPage
      )}
    </div>
  );
};

export default memo(
  inject(
    "loadingAnimationStore",
    "authenticationStore"
  )(observer(DashboardPageV2))
);

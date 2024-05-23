import React, { memo, useCallback, useEffect, useState } from "react";
import { inject, observer } from "mobx-react";
import { withRouter } from "react-router-dom";
import {
  Button,
  Cascader,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Mentions,
  Select,
  TreeSelect,
  message,
} from "antd";
import DashboardLayout from "../../layouts/DashboardLayout";
import { Helmet } from "react-helmet/es/Helmet";
import { PortalContent } from "./RegTeamPageStyled";

const RegTeamPage = (props) => {
  const {
    history,
    authenticationStore,
    loadingAnimationStore,
    groupStore,
  } = props;
  const [form] = Form.useForm();
  const { setFieldValue } = form;

  const { currentUser, isAccountAdmin, isSuperAdmin } = authenticationStore;
  const [user, setUser] = useState("");
  useEffect(() => {
    (async () => {
      loadingAnimationStore.showSpinner(true);
      try {
        const { data } = await authenticationStore.checkCurrentUser();
        console.log("response", data);
        setUser(data);
      } catch (err) {
        console.log(err);
        loadingAnimationStore.showSpinner(false);
      } finally {
        loadingAnimationStore.showSpinner(false);
      }
    })();
  }, []);
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 6 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 14 },
    },
  };
  const handleSubmit = async (values) => {
    try {
      loadingAnimationStore.showSpinner(true);

      const response = await groupStore.createGroup(
        values.abbreviations,
        values.description,
        values.keywords,
        values.name,
        values.vietnameseTitle
      );
      if (response.status === 200) {
        //neu tao gr thanh cong
        message.success("create ok");
        console.log(response);
      }
    } catch (err) {
      console.log(err);
      loadingAnimationStore.showSpinner(false);
      message.error(err.en || "Login failed response status!");
    } finally {
      loadingAnimationStore.showSpinner(false);
    }
  };
  const [searchTerm, setSearchTerm] = useState("");
  const [emails, setEmails] = useState([
    "example11@example.com",
    "example2@example.com",
    "example3@example.com",
    "example4@example.com",
    "example5@example.com",
  ]);
  const [filteredEmails, setFilteredEmails] = useState([]);

  const handleSearchChange = (event) => {
    const term = event.target.value;
    setSearchTerm(term);

    // Lọc danh sách emails dựa trên từ khóa tìm kiếm
    const filtered = emails.filter((email) =>
      email.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredEmails(filtered);
  };

  const handleEmailSelect = (email) => {
    setSearchTerm(email);
    setFilteredEmails([]);
  };
  return (
    <DashboardLayout>
      <Helmet>
        <title>Registration || News</title>
      </Helmet>
      <h1>Create Group</h1>
      <Form
        {...formItemLayout}
        variant="filled"
        style={{ maxWidth: 600 }}
        onFinish={handleSubmit}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please input!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
      <div>
        <input
          type="text"
          placeholder="Search emails"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        {filteredEmails.length > 0 && (
          <ul>
            {filteredEmails.map((email) => (
              <li key={email} onClick={() => handleEmailSelect(email)}>
                {email}
              </li>
            ))}
          </ul>
        )}
      </div>
    </DashboardLayout>
  );
};
export default memo(
  withRouter(
    inject(
      "authenticationStore",
      "loadingAnimationStore",
      "groupStore"
    )(observer(RegTeamPage))
  )
);

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
} from 'antd';

import DashboardLayout from "../../layouts/DashboardLayout";
import { Helmet } from "react-helmet/es/Helmet";
import { PortalContent } from "./RegCreateIdeaPageStyled";

const RegCreateIdeaPage = (props) => {
  const { history, authenticationStore, accountStore, commandStore } = props;

  const { commandList } = commandStore;
  const { accountList } = accountStore;
  const { currentUser, isAccountAdmin, isSuperAdmin } = authenticationStore;
  const { RangePicker } = DatePicker;

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

  return (
    <DashboardLayout>
      <Helmet>
        <title>Registration || News</title>
      </Helmet>
      <h1>Create Group</h1>
      <Form {...formItemLayout} variant="filled" style={{ maxWidth: 600 }}>
        <Form.Item label="Input" name="Input" rules={[{ required: true, message: 'Please input!' }]}>
          <Input />
        </Form.Item>

        <Form.Item
          label="InputNumber"
          name="InputNumber"
          rules={[{ required: true, message: 'Please input!' }]}
        >
          <InputNumber style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item
          label="TextArea"
          name="TextArea"
          rules={[{ required: true, message: 'Please input!' }]}
        >
          <Input.TextArea />
        </Form.Item>

        <Form.Item
          label="Mentions"
          name="Mentions"
          rules={[{ required: true, message: 'Please input!' }]}
        >
          <Mentions />
        </Form.Item>

        <Form.Item label="Select" name="Select" rules={[{ required: true, message: 'Please input!' }]}>
          <Select />
        </Form.Item>

        <Form.Item
          label="Cascader"
          name="Cascader"
          rules={[{ required: true, message: 'Please input!' }]}
        >
          <Cascader />
        </Form.Item>

        <Form.Item
          label="TreeSelect"
          name="TreeSelect"
          rules={[{ required: true, message: 'Please input!' }]}
        >
          <TreeSelect />
        </Form.Item>

        <Form.Item
          label="DatePicker"
          name="DatePicker"
          rules={[{ required: true, message: 'Please input!' }]}
        >
          <DatePicker />
        </Form.Item>

        <Form.Item
          label="RangePicker"
          name="RangePicker"
          rules={[{ required: true, message: 'Please input!' }]}
        >
          <RangePicker />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
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
    )(observer(RegCreateIdeaPage))
  )
);

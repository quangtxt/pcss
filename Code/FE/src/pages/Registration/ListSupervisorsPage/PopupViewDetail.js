import React, { useEffect, useState } from "react";
import { Button, Form, message, Modal, Space, Input } from "antd";
import { withRouter } from "react-router-dom";
import { inject, observer } from "mobx-react";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";

const PopupViewDetail = (props) => {
  const { isVisiblePopup, setIsVisiblePopup, handleClosePopup } = props;
  const { TextArea } = Input;
  const [form] = Form.useForm();
  const [mentor, setMentor] = useState();

  return (
    <Modal
      title="Supervisor profile"
      footer={null}
      closable={true}
      visible={isVisiblePopup}
      onCancel={handleClosePopup}
    >
      <Form form={form}>
        <div className="inputForm">
          <Form.Item label="FPT Email" name="fptEmail">
            <Input style={{ maxWidth: "100%" }} disabled />
          </Form.Item>
        </div>
        <div className="inputForm">
          <Form.Item label="Personal Email" name="personalEmail">
            <Input style={{ maxWidth: "100%" }} disabled />
          </Form.Item>
        </div>
        <div className="inputForm">
          <Form.Item label="Phone" name="phone">
            <Input style={{ maxWidth: "100%" }} disabled />
          </Form.Item>
        </div>
        <div className="inputForm">
          <Form.Item label="Self Description" name="selfDescription">
            <TextArea
              rows={5}
              style={{ maxWidth: "100%" }}
              disabled
              value={mentor?.selfDescription}
            />
          </Form.Item>
        </div>
        <Space
          style={{
            marginTop: 20,
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Button icon={<CloseOutlined />} onClick={handleClosePopup} danger>
            Huỷ bỏ
          </Button>
          <Button icon={<CheckOutlined />} htmlType={"submit"} type={"primary"}>
            Đồng ý
          </Button>
        </Space>
      </Form>
    </Modal>
  );
};

PopupViewDetail.propTypes = {};

export default withRouter(
  inject(
    "loadingAnimationStore",
    "authenticationStore"
  )(observer(PopupViewDetail))
);

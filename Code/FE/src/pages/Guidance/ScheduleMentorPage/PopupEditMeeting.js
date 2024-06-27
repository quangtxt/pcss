import React, { useEffect, useState } from "react";
import {
  Button,
  Form,
  Modal,
  message,
  Space,
  Input,
  DatePicker,
  Select,
} from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { withRouter } from "react-router-dom";
import { inject, observer } from "mobx-react";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import moment from "moment";

dayjs.extend(customParseFormat);

const { RangePicker } = DatePicker;

const disabledDate = (current) => {
  // Can not select days before today and today
  return current && current < dayjs().endOf("day");
};

const PopupEditMeeting = (props) => {
  const {
    isVisiblePopupEdit,
    setIsVisiblePopupEdit,
    handleClosePopup,
    loadingAnimationStore,
    setRefresh,
    meetingStore,
    groupStore,
    authenticationStore,
    meetingList,
    meetingId,
    groupsOfMentor,
  } = props;
  const [form] = Form.useForm();
  const [error, setError] = useState("");

  useEffect(() => {
    if (meetingList) {
      meetingList.filter((meeting) => {
        if (meeting.id === meetingId) {
          form.setFieldsValue({
            meetingTime: [moment(meeting?.startAt), moment(meeting?.endAt)],
            type: meeting?.type,
            location: meeting?.location,
            group: meeting?.group?.id,
          });
        }
      });
      console.log("meetingList", meetingList);
    }
  });
  const handleEdit = async (values) => {
    try {
      const { meetingTime, type, location } = values;
      let startAt = undefined;
      let endAt = undefined;
      if (meetingTime && meetingTime.length === 2) {
        startAt = moment(meetingTime[0]);
        endAt = moment(meetingTime[1]);
      }
      const meeting = {
        startAt: startAt,
        endAt: endAt,
        type: type,
        location: location,
        id: meetingId,
      };
      const meetings = [meeting];
      console.log("meetings", meetings);
      loadingAnimationStore.showSpinner(true);
      const response = await meetingStore.updateMeeting(meetings);
      if (response.status === 200) {
        setRefresh(true);
        setIsVisiblePopupEdit(false);
        message.success("Edit successfully");
      }
    } catch (err) {
      console.log(err);
      loadingAnimationStore.showSpinner(false);
      message.error(err.en || "Error not edit meeting!");
    } finally {
      loadingAnimationStore.showSpinner(false);
    }
  };
  const getOptions = () => {
    if (groupsOfMentor.length > 0) {
      return groupsOfMentor.map((item) => ({
        value: item?.group.id,
        label: item?.group.vietnameseTitle,
      }));
    } else {
      return [{ value: "", label: "Loading..." }];
    }
  };

  return (
    <Modal
      title="Edit Meeting"
      footer={null}
      closable={true}
      visible={isVisiblePopupEdit}
      onCancel={handleClosePopup}
    >
      <Form onFinish={handleEdit} form={form} scrollToFirstError>
        <Space
          size={12}
          direction="vertical"
          style={{
            marginTop: 20,
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Form.Item
            label="Meeting Time (1 DAY)"
            name="meetingTime"
            rules={[{ required: true, message: "Please select meeting time!" }]}
          >
            <RangePicker
              style={{
                marginBottom: 20,
              }}
              disabledDate={disabledDate}
              showTime={{
                hideDisabledOptions: true,
                defaultValue: [
                  dayjs("00:00:00", "HH:mm:ss"),
                  dayjs("11:59:59", "HH:mm:ss"),
                ],
              }}
              format="YYYY-MM-DD HH:mm"
            />
          </Form.Item>
          <Form.Item
            label="Type of meeting"
            name="type"
            rules={[
              { required: true, message: "Please select type of meeting!" },
            ]}
          >
            <Select>
              <Option value={"Online"}>Online</Option>
              <Option value={"Offline"}>Offline</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Location or Link of meeting"
            name="location"
            rules={[{ required: true, message: "Please text the location!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Group" name="group">
            <Select
              components={{
                DropdownIndicator: () => null,
                IndicatorSeparator: () => null,
              }}
              options={getOptions()}
              disabled
            />
          </Form.Item>
        </Space>
        <Button icon={<CloseOutlined />} onClick={handleClosePopup} danger>
          Cancel
        </Button>
        <Button icon={<CheckOutlined />} htmlType={"submit"} type={"primary"}>
          Edit
        </Button>
      </Form>
    </Modal>
  );
};

PopupEditMeeting.propTypes = {};

export default withRouter(
  inject(
    "loadingAnimationStore",
    "authenticationStore",
    "meetingStore",
    "authenticationStore",
    "groupStore"
  )(observer(PopupEditMeeting))
);

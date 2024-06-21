import React, { useEffect, useState } from "react";
import {
  Button,
  Form,
  Modal,
  message,
  Space,
  Input,
  DatePicker,
  TimePicker,
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

const PopupCreateMeeting = (props) => {
  const {
    isVisiblePopup,
    setIsVisiblePopup,
    handleClosePopup,
    loadingAnimationStore,
    setRefresh,
    meetingStore,
    groupStore,
    authenticationStore,
    groupsOfMentor,
  } = props;
  const [meetings, setMeetings] = useState([]);
  const { TextArea } = Input;
  const [form] = Form.useForm();
  const [error, setError] = useState("");

  const [selectedGroup, setSelectedGroup] = useState(null);

  useEffect(() => {
    if (authenticationStore.currentUser) {
    }
  }, [authenticationStore.currentUser]);
  const handleCreate = async (values) => {
    try {
      const { meetingTime, week } = values;
      let startAt = undefined;
      let endAt = undefined;
      if (meetingTime && meetingTime.length === 2) {
        startAt = moment(meetingTime[0]);
        endAt = moment(meetingTime[1]);
      }
      // const meeting = {
      //   startAt: startAt,
      //   endAt: endAt,
      //   type: "Online",
      //   location: "meeting location",
      //   groupId: selectedGroup,
      // };
      // const meetings = [meeting];
      const meetings = [];
      //tạo cuộc họp theo tuần
      if (week) {
        for (let i = 0; i < week; i++) {
          const meeting = {
            startAt: startAt.clone().add(i + 1, "weeks"),
            endAt: endAt.clone().add(i + 1, "weeks"),
            type: "Online",
            location: "meeting location",
            groupId: selectedGroup,
          };
          meetings.push(meeting);
        }
      }
      //tạo cuộc họp hiện tại
      const meeting = {
        startAt: startAt,
        endAt: endAt,
        type: "Online",
        location: "meeting location",
        groupId: selectedGroup,
      };
      meetings.push(meeting);

      loadingAnimationStore.showSpinner(true);
      const response = await meetingStore.createMeeting(meetings);
      if (response.status === 200) {
        setRefresh(true);
        setIsVisiblePopup(false);
        message.success("Create meeting successfully");
      }
    } catch (err) {
      console.log(err);
      loadingAnimationStore.showSpinner(false);
      message.error(err.en || "Error not create meetings!");
    } finally {
      loadingAnimationStore.showSpinner(false);
    }
  };

  const onChange = (date, dateString) => {
    console.log(date, dateString);
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

  const handleGroupChange = (option) => {
    setSelectedGroup(option);
  };

  const [selectedRange, setSelectedRange] = useState([]);

  const handleRangeChange = (dates) => {
    setSelectedRange(dates);
  };

  return (
    <Modal
      title="Create Meeting"
      footer={null}
      closable={true}
      visible={isVisiblePopup}
      onCancel={handleClosePopup}
    >
      <Form onFinish={handleCreate} form={form} scrollToFirstError>
        <Space
          size={12}
          direction="vertical"
          style={{
            marginTop: 20,
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Form.Item label="Meeting Time (1 DAY)" name="meetingTime">
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
              onChange={handleRangeChange}
            />
          </Form.Item>
          {selectedRange.length > 0 && (
            <div>
              <Form.Item
                label="Do you want to schedule multiple weeks"
                name="week"
              >
                <Select>
                  <Option value="">none</Option>
                  <Option value={1}>1 weeks</Option>
                  <Option value={2}>2 weeks</Option>
                  <Option value={3}>3 weeks</Option>
                </Select>
              </Form.Item>
            </div>
          )}
          {/* <Form.Item label="Select Day (Multiple Day)" name="day-mul">
            <DatePicker
              disabledDate={disabledDate}
              onChange={onChange}
              maxTagCount="responsive"
              multiple
            />
          </Form.Item>
          <Form.Item label="Select Time (Multiple Day)" name="time-mul">
            <TimePicker />
          </Form.Item> */}
          <Form.Item label="Choose the group" name="group">
            <Select
              value={selectedGroup}
              components={{
                DropdownIndicator: () => null,
                IndicatorSeparator: () => null,
              }}
              onChange={handleGroupChange}
              options={getOptions()}
              placeholder="Group selected"
            />
          </Form.Item>
        </Space>
        <Button icon={<CloseOutlined />} onClick={handleClosePopup} danger>
          Cancel
        </Button>
        <Button icon={<CheckOutlined />} htmlType={"submit"} type={"primary"}>
          Create
        </Button>
      </Form>
    </Modal>
  );
};

PopupCreateMeeting.propTypes = {};

export default withRouter(
  inject(
    "loadingAnimationStore",
    "authenticationStore",
    "meetingStore",
    "authenticationStore",
    "groupStore"
  )(observer(PopupCreateMeeting))
);

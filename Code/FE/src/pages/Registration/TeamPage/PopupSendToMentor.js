import React, { useEffect, useState } from "react";
import { Button, Form, message, Modal, Space, Input, Select } from "antd";
import { withRouter } from "react-router-dom";
import { inject, observer } from "mobx-react";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { Profile } from "../CreateIdeaPage/CreateIdeaPageStyled";
import InviteForm from "../CreateIdeaPage/InviteForm";
import {
  Title,
  InviteSection,
  Instruction,
  InviteInput,
  InviteContainer,
  InviteButton,
} from "../CreateIdeaPage/InviteFormStyled";

const PopupSendToMentor = (props) => {
  const {
    isVisiblePopupSend,
    setIsVisiblePopupSend,
    handleClosePopup,
    members,
    group,
    mentorStore,
    authenticationStore,
    loadingAnimationStore,
    groupStore,
  } = props;

  const { mentorList, setFilter } = mentorStore;

  const [form] = Form.useForm();
  const [selectedOption1, setSelectedOption1] = useState(null);
  const [selectedOption2, setSelectedOption2] = useState(null);
  const [excludedMentors, setExcludedMentors] = useState([]);

  useEffect(() => {
    if (authenticationStore.currentUser) {
      loadingAnimationStore.setTableLoading(true);
      mentorStore.getMentorList().finally(() => {
        loadingAnimationStore.setTableLoading(false);
      });
      console.log("mentorList", mentorList);
      form.setFieldsValue({
        name: group?.name,
        abbreviations: group?.abbreviations,
        vietnameseTitle: group?.vietnameseTitle,
        keywords: group?.keywords,
        description: group?.description,
      });
    }
    return () => {
      mentorStore.clearStore();
    };
  }, [authenticationStore.currentUser, group]);

  const updateExcludedMentors = (oldValue, newValue) => {
    setExcludedMentors((prev) => {
      const newExcluded = [...prev];
      if (oldValue) {
        const index = newExcluded.indexOf(oldValue.label);
        if (index > -1) {
          newExcluded.splice(index, 1);
        }
      }
      if (newValue) {
        newExcluded.push(newValue);
      }
      return newExcluded;
    });
  };

  const handleOptionChange1 = (value, option) => {
    setSelectedOption1(value);
    // setExcludedMentors([...excludedMentors, option.label]);
    updateExcludedMentors(selectedOption1, option.label);
    console.log("ExcludedMentors", excludedMentors);
  };

  const handleOptionChange2 = (value, option) => {
    setSelectedOption2(value);
    // setExcludedMentors([...excludedMentors, option.label]);
    updateExcludedMentors(selectedOption2, option.label);
    console.log("ExcludedMentors", excludedMentors);
  };

  const getOptions = () => {
    if (mentorList.length > 0) {
      return mentorList
        .filter((mentor) => !excludedMentors.includes(mentor.user.email))
        .map((mentor) => ({
          value: mentor.id,
          label: mentor.user.email,
        }));
    } else {
      return [{ value: "", label: "Loading..." }];
    }
  };

  const handleSend = async () => {
    try {
      console.log("ListMentor : ", listMentor);
      loadingAnimationStore.showSpinner(true);
      const response = await groupStore.submitGroup(group?.id, listMentor);
      if (response.status === 200) {
        //sua gr thanh cong
        // setRefresh(true);
        setIsVisiblePopupSend(false);
        message.success("Submit group successfully");
      }
    } catch (err) {
      console.log(err);
      loadingAnimationStore.showSpinner(false);
      message.error(err.en || "Login failed response status!");
    } finally {
      loadingAnimationStore.showSpinner(false);
    }
  };

  return (
    <Modal
      title="Send Invitation for Mentor"
      footer={null}
      closable={true}
      visible={isVisiblePopupSend}
      onCancel={handleClosePopup}
      width="60%"
      style={{ top: 20 }}
    >
      <Form form={form} onFinish={handleSend} scrollToFirstError>
        <Profile>
          <div className="contactInfor">
            <div className="groupInput">
              <Form.Item label="Name" name="name">
                <Input disabled />
              </Form.Item>
              <Form.Item label="Vietnamese Title" name="vietnameseTitle">
                <Input disabled />
              </Form.Item>
              <Form.Item label="Abbreviations" name="abbreviations">
                <Input disabled />
              </Form.Item>
              <Form.Item label="Keywords" name="keywords">
                <Input disabled />
              </Form.Item>
            </div>
            <div className="textarea-form">
              <Form.Item label="Description" name="description">
                <Input.TextArea
                  rows={4}
                  autoSize={{ minRows: 4, maxRows: 6 }}
                  style={{ resize: "none" }}
                  disabled
                />
              </Form.Item>
            </div>
          </div>
        </Profile>
        <p className="title" style={{ fontSize: "14px" }}>
          Send invite to mentor
        </p>
        <p
          className="title"
          style={{
            fontSize: "12px",
            fontWeight: "400",
            color: "rgba(100, 100, 111, 0.8)",
          }}
        >
          You have to select your mentor's FPT email below
        </p>
        <p className="title" style={{ fontSize: "14px" }}>
          Supervisor 1
        </p>
        <InviteContainer>
          <InviteInput>
            <Select
              labelInValue
              value={selectedOption1}
              components={{
                DropdownIndicator: () => null,
                IndicatorSeparator: () => null,
              }}
              onChange={(value, option) => handleOptionChange1(value, option)}
              options={getOptions()}
              placeholder="Example@fpt.edu.vn"
            />
          </InviteInput>
        </InviteContainer>
        <p className="title" style={{ fontSize: "14px", marginTop: "10px" }}>
          Supervisor 2
        </p>
        <InviteContainer>
          <InviteInput>
            <Select
              labelInValue
              value={selectedOption2}
              components={{
                DropdownIndicator: () => null,
                IndicatorSeparator: () => null,
              }}
              onChange={(value, option) => handleOptionChange2(value, option)}
              options={getOptions()}
              placeholder="Example@fpt.edu.vn"
            />
          </InviteInput>
        </InviteContainer>
        <Space
          style={{
            marginTop: 20,
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Button icon={<CloseOutlined />} onClick={handleClosePopup} danger>
            Cancel
          </Button>
          <Button icon={<CheckOutlined />} htmlType={"submit"} type={"primary"}>
            Send
          </Button>
        </Space>
      </Form>
    </Modal>
  );
};

PopupSendToMentor.propTypes = {};

export default withRouter(
  inject(
    "loadingAnimationStore",
    "authenticationStore",
    "mentorStore",
    "groupStore"
  )(observer(PopupSendToMentor))
);

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
    isVisiblePopup,
    setIsVisiblePopup,
    handleClosePopup,
    members,
    group,
    mentorStore,
    authenticationStore,
    loadingAnimationStore,
  } = props;

  const {
    mentorList,
    setFilter,
  } = mentorStore;

  const { TextArea } = Input;
  const [form] = Form.useForm();
  const [mentor, setMentor] = useState();
  const [selectedOption, setSelectedOption] = useState(null);
  const [mentorsToInvite, setMentorsToInvite] = useState([]);

  useEffect(() => {
    if (authenticationStore.currentUser) {
      loadingAnimationStore.setTableLoading(true);
      mentorStore.getMentorList().finally(() => {
        loadingAnimationStore.setTableLoading(false);
      });
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


  const handleOptionChange = (option) => {
    setSelectedOption(option);
    const selectedIds = option.map((option) => option.value);
    setSelectedStudent(selectedIds);
  };
  const getOptions = () => {
    if (mentorList.length > 0) {
      return mentorList.map((mentor) => ({
        value: mentor.id,
        label: mentor.user.email,
      }));
    } else {
      return [{ value: "", label: "Loading..." }];
    }
  };
  const handleMenuOpen = () => {
    setIsMenuOpen(true);
  };
  const handleMenuClose = () => {
    setIsMenuOpen(false);
  };
  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !isMenuOpen) {
      event.preventDefault();
    }
  };
  console.log(group?.abbreviations);
  return (
    <Modal
      title="Send Invitation for Mentor"
      footer={null}
      closable={true}
      visible={isVisiblePopup}
      onCancel={handleClosePopup}
      width="60%"
      style={{ top: 20 }}
    >
      <Form form={form}>
        <Profile>
          <div className="contactInfor">
            <div className="groupInput">
              <Form.Item label="Name" name="name">
                <Input disabled/>
              </Form.Item>
              <Form.Item label="Vietnamese Title" name="vietnameseTitle">
                <Input  disabled/>
              </Form.Item>
              <Form.Item label="Abbreviations" name="abbreviations">
                <Input  disabled/>
              </Form.Item>
              <Form.Item label="Keywords" name="keywords">
                <Input  disabled/>
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
        <InviteContainer>
          <InviteInput>
            <Select
              value={selectedOption}
              components={{
                DropdownIndicator: () => null,
                IndicatorSeparator: () => null,
              }}
              onChange={handleOptionChange}
              options={getOptions()}
              placeholder="Example@fpt.edu.vn"
              openMenuOnClick={false}
              onMenuOpen={handleMenuOpen}
              onMenuClose={handleMenuClose}
              onKeyDown={handleKeyDown}
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
    "mentorStore"
  )(observer(PopupSendToMentor))
);

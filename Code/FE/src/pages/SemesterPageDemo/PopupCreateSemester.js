import React, { useEffect, useState } from "react";
import {
  Button,
  Form,
  message,
  Modal,
  Space,
  Input,
  Upload,
  Typography,
  DatePicker,
} from "antd";
import { withRouter } from "react-router-dom";
import { inject, observer } from "mobx-react";
import {
  CheckOutlined,
  CloseOutlined,
  UploadOutlined,
  VerticalAlignBottomOutlined,
} from "@ant-design/icons";
import {
  NoMarginBottom,
  ContentInformation,
} from "../ProfilePage/ProfilePageStyled";
import { FlexBox, PopupImport } from "../ListStudentPage/ListStudentPageStyled";
import TableComponent from "../../components/Common/TableComponent";
const { Title } = Typography;
const PopupCreateSemester = (props) => {
  const { isVisiblePopup, setIsVisiblePopup, handleClosePopup } = props;
  const { TextArea } = Input;
  const [form] = Form.useForm();
  const [mentor, setMentor] = useState();
  const {
    history,
    loadingAnimationStore,
    mentorStore,
    authenticationStore,
  } = props;

  const {
    mentorList,
    mentorListTotalCount,
    mentorListPageSize,
    mentorListPageIndex,
    setFilter,
  } = mentorStore;

  // const [isVisiblePopup, setIsVisiblePopup] = useState(false);

  useEffect(() => {
    if (authenticationStore.currentUser) {
      loadingAnimationStore.setTableLoading(true);
      mentorStore.getMentorList().finally(() => {
        loadingAnimationStore.setTableLoading(false);
      });
    }
    return () => {
      mentorStore.clearStore();
    };
  }, [authenticationStore.currentUser]);

  const onSearchByEmailOrName = (keyword) => {
    setFilter("mentorListPageIndex", 0);
    setFilter("mentorListKeyword", keyword);
    loadingAnimationStore.setTableLoading(true);
    mentorStore.getMentorList().finally(() => {
      loadingAnimationStore.setTableLoading(false);
    });
  };

  const onChangePagination = (e) => {
    setFilter("mentorListPageIndex", e - 1);
    loadingAnimationStore.setTableLoading(true);
    mentorStore
      .getMentorList()
      .finally(() => loadingAnimationStore.setTableLoading(false));
  };

  function navigateToDetail(userId) {
    history.push("/registration/supervisor/detail", { userId });
    // setIsVisiblePopup(true);
  }

  return (
    <Modal
      title={
        <NoMarginBottom>
          <Title level={4}>Create Semester</Title>
        </NoMarginBottom>
      }
      footer={null}
      closable={true}
      visible={isVisiblePopup}
      onCancel={handleClosePopup}
    >
      <Form
        form={form}
        scrollToFirstError
        labelAlign="left"
        layout="horizontal"
        labelCol={{
          span: 6,
        }}
        wrapperCol={{
          span: 20,
        }}
      >
        <Form.Item label="Semester Name" name="name">
          <Input style={{ maxWidth: "100%" }} />
        </Form.Item>
        <Form.Item label="Semester Code" name="code">
          <Input style={{ maxWidth: "100%" }} />
        </Form.Item>
        <Form.Item label="Begin at" name="name">
          <DatePicker style={{ maxWidth: "100%", width: "100%" }} />
        </Form.Item>
        <Form.Item label="End at" name="name">
          <DatePicker style={{ maxWidth: "100%", width: "100%" }} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

PopupCreateSemester.propTypes = {};

export default withRouter(
  inject(
    "loadingAnimationStore",
    "authenticationStore",
    "mentorStore"
  )(observer(PopupCreateSemester))
);

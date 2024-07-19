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
  Profile,
  GroupButton,
  BoldContent,
  NoMarginBottom,
} from "../ProfilePage/ProfilePageStyled";
import { FlexBox, PopupImport } from "./ListStudentPageStyled";
import TableComponent from "../../components/Common/TableComponent";

const { Title } = Typography;
const PopupImportExcel = (props) => {
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

  const columns = [
    {
      title: "No.",
      render: (record, index, dataSource) => dataSource + 1,
    },
    {
      title: "Full Name",
      render: (record) => record?.user.name,
    },
    {
      title: "Email",
      render: (record) => record?.user.email,
    },
    {
      title: "Action",
      render: (record) => (
        <Button onClick={() => navigateToDetail(record?.user.id)}>View</Button> // Thêm nút View để navigating to detail page
      ),
    },
  ];
  function navigateToDetail(userId) {
    history.push("/registration/supervisor/detail", { userId });
    // setIsVisiblePopup(true);
  }

  return (
    <Modal
      footer={null}
      title={
        <NoMarginBottom>
          <Title level={4}>Import file excel</Title>
        </NoMarginBottom>
      }
      className="custom-modal"
      closable={true}
      visible={isVisiblePopup}
      onCancel={handleClosePopup}
    >
      <Form form={form}>
        <div className="flex items-center justify-center gap-6 mb-4">
          <Button
            className="flex items-center justify-center text-white"
            style={{ backgroundColor: "#0F9D58" }}
          >
            <UploadOutlined />
            Click to Upload
          </Button>

          <Button className="flex items-center justify-center">
            <VerticalAlignBottomOutlined />
            Download template
          </Button>
        </div>
        <div className="flex items-center justify-center gap-2">
          <Button type="danger" onClick={handleClosePopup}>
            Cancel
          </Button>
          <Button type="primary">Submit</Button>
        </div>
      </Form>
    </Modal>
  );
};

PopupImportExcel.propTypes = {};

export default withRouter(
  inject(
    "loadingAnimationStore",
    "authenticationStore",
    "mentorStore"
  )(observer(PopupImportExcel))
);

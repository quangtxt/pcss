import React, { useEffect, useState } from "react";
import { Button, Form, message, Modal, Space, Input, Upload } from "antd";
import { withRouter } from "react-router-dom";
import { inject, observer } from "mobx-react";
import { CheckOutlined, CloseOutlined, UploadOutlined, VerticalAlignBottomOutlined } from "@ant-design/icons";
import { Profile, GroupButton, BoldContent } from "../ProfilePage/ProfilePageStyled";
import { FlexBox, PopupImport } from "./ListStudentPageStyled";
import TableComponent from "../../components/Common/TableComponent";

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
      closable={true}
      visible={isVisiblePopup}
      onCancel={handleClosePopup}
      className="formImport"
      style={{ maxWidth: "570px !important" }}
    >
      <Profile>
        <Form
          form={form}
        >
          <FlexBox style={{ margin: "20px 0", gap: "20px" }}>
            <BoldContent>Import file excel:</BoldContent>
            <Upload>
              <Button className="btnUpload"><UploadOutlined />Click to Upload</Button>
            </Upload>
            <Button className="btnDownload"><VerticalAlignBottomOutlined />Download template</Button>
          </FlexBox>
          <PopupImport>
            <TableComponent
              rowKey={(record) => record.id || uuid()}
              dataSource={mentorList}
              columns={columns}
              pagination={false}
              loading={loadingAnimationStore.tableLoading}
              className="tbStudent"
            />
          </PopupImport>
          <GroupButton>
            <Button className="btnCancel" onClick={handleClosePopup}>Cancel</Button>
            <Button className="btnEdit">Submit</Button>
          </GroupButton>
        </Form>
      </Profile>
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

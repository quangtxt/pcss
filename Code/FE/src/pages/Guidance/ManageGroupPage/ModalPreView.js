import React, { useEffect, useState, useMemo } from "react";
// Ant design
// Mobx
import { inject, observer } from "mobx-react";
import { Button, Comment, message, Modal } from "antd";
import EmptyContent from "../../../components/EmptyContent";
import { EmptyText } from "../../../components/Common/CellText";
import TableComponent from "../../../components/Common/TableComponent";

const ModalPreView = (props) => {
  const {
    data,
    onCancel,
    setPreViewVisible,
    loadingAnimationStore,
    fileStore,
  } = props;

  const [checkErrorData, setCheckErrorData] = useState(false);
  useEffect(() => {
    if (data == null) return;
    data.data.forEach((info) => {
      if (info.note !== "") {
        setCheckErrorData(true);
        return false;
      }
    });
  }, [data]);
  const tableColumns = useMemo(
    () => [
      {
        title: "Group",
        key: "group",
        render: (record) =>
          record.group ? (
            <span>{record.group}</span>
          ) : (
            <EmptyText>Unclear</EmptyText>
          ),
      },
      {
        title: "Roll number",
        key: "rollNumber",
        render: (record) =>
          record.rollNumber ? (
            record.rollNumber
          ) : (
            <EmptyText>Unclear</EmptyText>
          ),
      },
      {
        title: "Email",
        key: "email",
        render: (record) =>
          record.email ? record.email : <EmptyText>Unclear</EmptyText>,
      },
      {
        title: "Member Code",
        key: "memberCode",
        render: (record) =>
          record.memberCode ? (
            record.memberCode
          ) : (
            <EmptyText>Unclear</EmptyText>
          ),
      },
      {
        title: "Full name",
        key: "fullName",
        render: (record) =>
          record.fullName ? (
            <Comment
              author={
                <span style={{ textTransform: "capitalize" }}>
                  {record.fullName}
                </span>
              }
            />
          ) : (
            <EmptyText>Unclear</EmptyText>
          ),
      },
      {
        title: "Note Error",
        key: "note_error",
        width: 200,
        render: (record) => (
          <div style={{ color: "red" }}>
            {record.note ? record.note : <EmptyText>No error</EmptyText>}
          </div>
        ),
      },
    ],
    []
  );

  const HandelCreateGroups = async () => {
    try {
      loadingAnimationStore.showSpinner(true);
      await fileStore.createGroupsFromExcel(data.data);
      loadingAnimationStore.showSpinner(false);
      message.success("Đã tạo người dùng từ file Excel thành công.");
      setPreViewVisible(false);
    } catch (error) {
      loadingAnimationStore.showSpinner(false);
      console.error("Error importing Excel:", error);
      message.error("Đã xảy ra lỗi khi tạo user từ file Excel.");
    }
  };

  return (
    <Modal
      visible={true}
      width={1200}
      title="Xem trước"
      onCancel={onCancel}
      style={{ top: 20 }}
      footer={[
        checkErrorData && (
          <span style={{ color: "red", marginRight: "10px" }}>
            Yêu cầu sửa lại file theo đúng định dạng trước khi import
          </span>
        ),
        <Button danger ghost onClick={onCancel}>
          Quay lại
        </Button>,
        !checkErrorData && (
          <Button type="primary" onClick={HandelCreateGroups}>
            Nhập excel
          </Button>
        ),
      ]}
    >
      <TableComponent
        rowKey={(record) => record?.code}
        dataSource={data && data.data}
        columns={tableColumns}
        pagination={false}
        scroll={{ x: 1000 }}
        locale={{
          emptyText: <EmptyContent />,
        }}
      />
    </Modal>
  );
};

ModalPreView.propTypes = {};

export default inject(
  "authenticationStore",
  "loadingAnimationStore",
  "fileStore"
)(observer(ModalPreView));

import React, { useEffect, useState, useMemo } from "react";
// Ant design
// Mobx
import { inject, observer } from "mobx-react";
import { toJS } from "mobx";
import {
  Avatar,
  Button,
  Col,
  Comment,
  Input,
  message,
  Pagination,
  Row,
  Switch,
  Tooltip,
  Upload,
  Modal,
} from "antd";
import {
  CloseCircleOutlined,
  EditOutlined,
  FilterOutlined,
  PlusCircleOutlined,
  FileAddOutlined,
  InboxOutlined,
} from "@ant-design/icons";
import EmptyContent from "../../components/EmptyContent";
import { EmptyText } from "../../components/Common/CellText";
import {
  CellEclipseBox,
  TableBottomPaginationBlock,
} from "../../components/Common/Table";
import TableComponent from "../../components/Common/TableComponent";
import fileStore from "../../stores/fileStore";

const ModalPreView = (props) => {
  const {
    userStore,
    selectUserStore,
    typeModalSelectDepartment,
    data,
    renderCustomTitleModalDepartment,
    onCancel,
    setPreViewVisible,
    preViewVisible,
    authenticationStore,
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
        title: "No",
        key: "no",
        render: (record) =>
          record.stt ? (
            <span>{record.stt}</span>
          ) : (
            <EmptyText>Unclear</EmptyText>
          ),
      },
      {
        title: "Full name",
        width: 150,
        key: "fullname",
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
        title: "Member code",
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
          record.email ? record?.email : <EmptyText>Unclear</EmptyText>,
      },
      {
        title: "Status",
        key: "status",
        render: (record) =>
          record.status ? (
            <strong>{record.status}</strong>
          ) : (
            <EmptyText>Unclear</EmptyText>
          ),
      },
      {
        title: "Note",
        key: "note",
        render: (record) =>
          record.note ? (
            <strong>{record.note}</strong>
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
            {record?.note &&
              record?.note
                .replace(/\.$/, "")
                .split(".")
                .map((sentence, index) => (
                  <React.Fragment key={index}>
                    {sentence.trim()}
                    <br />
                  </React.Fragment>
                ))}
          </div>
        ),
      },
    ],
    []
  );

  const HandelCreateStudent = async () => {
    try {
      loadingAnimationStore.showSpinner(true);
      await fileStore.createStudentsFromExcel(data.data);
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
          <Button type="primary" onClick={HandelCreateStudent}>
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

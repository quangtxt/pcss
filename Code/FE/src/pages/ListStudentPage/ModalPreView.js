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
        title: "STT",
        key: "stt",
        render: (record) =>
          record.stt ? (
            <span>{record.stt}</span>
          ) : (
            <EmptyText>Không rõ</EmptyText>
          ),
      },
      {
        title: "Họ tên",
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
            <EmptyText>Không rõ</EmptyText>
          ),
      },
      {
        title: "Chức vụ",
        key: "position",
        width: 120,
        render: (record) =>
          record.position ? record.position : <EmptyText>Không rõ</EmptyText>,
      },

      {
        title: "Phòng ban",
        key: "department",
        render: (record) =>
          record.department ? (
            record.department
          ) : (
            <EmptyText>Không rõ</EmptyText>
          ),
      },
      {
        title: "Ngày sinh",
        key: "birthday",
        render: (record) =>
          record.birthday ? record?.birthday : <EmptyText>Không rõ</EmptyText>,
      },
      {
        title: "Email",
        key: "email",
        render: (record) =>
          record.email ? record?.email : <EmptyText>Không rõ</EmptyText>,
      },
      {
        title: "Số ĐT",
        key: "phone",
        render: (record) =>
          record.phone ? (
            <strong>{record.phone}</strong>
          ) : (
            <EmptyText>Không rõ</EmptyText>
          ),
      },
      {
        title: "Giới tính",
        key: "gender",
        render: (record) =>
          record.gender ? (
            <strong>{record.gender}</strong>
          ) : (
            <EmptyText>Không rõ</EmptyText>
          ),
      },
      {
        title: "Trạng thái",
        key: "note",
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

  const HandelCreateUsers = async () => {
    try {
      loadingAnimationStore.showSpinner(true);
      await fileStore.createUsersFromExcel(data.data);
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
          <Button type="primary" onClick={HandelCreateUsers}>
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

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
    console.log("data", data);
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
        title: "Empl_ID",
        key: "Empl_ID",
        render: (record) =>
          record.stt ? (
            <span>{record.stt}</span>
          ) : (
            <EmptyText>Unclear</EmptyText>
          ),
      },
      {
        title: "Name",
        width: 150,
        key: "name",
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
        title: "Gender",
        key: "gender",
        render: (record) =>
          record.genderTxt ? record.genderTxt : <EmptyText>Unclear</EmptyText>,
      },
      {
        title: "Branch",
        key: "branch",
        render: (record) =>
          record.email ? record?.email : <EmptyText>Unclear</EmptyText>,
      },
      {
        title: "Parent Department",
        key: "parent_department",
        render: (record) =>
          record.status ? (
            <strong>{record.status}</strong>
          ) : (
            <EmptyText>Unclear</EmptyText>
          ),
      },
      {
        title: "Child Department",
        key: "child_department",
        render: (record) =>
          record.note ? (
            <strong>{record.note}</strong>
          ) : (
            <EmptyText>Unclear</EmptyText>
          ),
      },
      {
        title: "Job title",
        key: "job_title",
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
      {
        title: "Email FPT",
        key: "email_fpt",
        render: (record) =>
          record.emailFPT ? record?.emailFPT : <EmptyText>Unclear</EmptyText>,
      },
      {
        title: "Email FE",
        key: "email_fe",
        render: (record) =>
          record.emailFE ? record?.emailFE : <EmptyText>Unclear</EmptyText>,
      },
      {
        title: "Telephone",
        key: "telephone",
        render: (record) =>
          record.phoneNumber ? (
            record?.phoneNumber
          ) : (
            <EmptyText>Unclear</EmptyText>
          ),
      },
      {
        title: "Contract type",
        key: "contract_type",
        render: (record) =>
          record.email ? record?.email : <EmptyText>Unclear</EmptyText>,
      },
    ],
    []
  );

  const HandelCreateUsers = async () => {
    try {
      loadingAnimationStore.showSpinner(true);
      await fileStore.createSupervisorsFromExcel(data.data);
      loadingAnimationStore.showSpinner(false);
      message.success("Supervisor creation from Excel file successful.");
      setPreViewVisible(false);
    } catch (error) {
      loadingAnimationStore.showSpinner(false);
      console.error("Error importing Excel:", error);
      message.error("Error occurred when creating supervisor from Excel file.");
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

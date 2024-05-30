import React, { memo, useCallback, useEffect, useState } from "react";
import { inject, observer } from "mobx-react";
import { withRouter } from "react-router-dom";
import { Button, Modal, message, Tooltip } from "antd";
import { CloseCircleOutlined, CheckCircleOutlined } from "@ant-design/icons";
import uuid from "uuid";
import DashboardLayout from "../../layouts/DashboardLayout";
import { TableBottomPaginationBlock } from "../../components/Common/Table";
import ContentBlockWrapper from "../../components/ContentBlockWrapper";
import PageTitle from "../../components/PageTitle";
import { Helmet } from "react-helmet/es/Helmet";
import { ForContent } from "./GroupInvitedMentorPageStyled";
import TableComponent from "../../components/Common/TableComponent";

const GroupInvitedMentorPage = (props) => {
  const {
    history,
    loadingAnimationStore,
    mentorStore,
    authenticationStore,
  } = props;

  const [listGroupMentorRegistered, setListGroupMentorRegistered] = useState();
  useEffect(() => {
    if (authenticationStore.currentUser) {
      getListMentorRegistered();
    }
  }, [authenticationStore.currentUser]);
  const getListMentorRegistered = async () => {
    // loadingAnimationStore.setTableLoading(true);
    // const res = await mentorStore.getGroupMentorRegistered().finally(() => {
    //   loadingAnimationStore.setTableLoading(false);
    // });
    // setListGroupMentorRegistered(res.data);
    // console.log(res);
  };

  const showConfirmModal = (action, record) => {
    Modal.confirm({
      title: `Do you want to ${action} to be a mentor of this group?`,
      onOk: () => {
        if (action === "agree") {
          handleAgree(record);
        } else {
          handleRefuse(record);
        }
      },
      onCancel: () => {},
      okText: "Yes",
      cancelText: "No",
    });
  };

  const handleAgree = async (values) => {
    // updateInvitationStatus(values, true);
  };
  const handleRefuse = async (values) => {
    // updateInvitationStatus(values, false);
  };
  const dataSource = [
    {
      id: 1,
      name: "John Doe",
      vietnameseTitle: "Giám đốc",
      studentLeader: "Alice Nguyen",
    },
    {
      id: 2,
      name: "Jane Smith",
      vietnameseTitle: "Trưởng phòng",
      studentLeader: "Bob Tran",
    },
    {
      id: 3,
      name: "Michael Johnson",
      vietnameseTitle: "Kỹ sư trưởng",
      studentLeader: "Charlie Lee",
    },
    {
      id: 4,
      name: "Sarah Lee",
      vietnameseTitle: "Nhân viên",
      studentLeader: "David Pham",
    },
    {
      id: 5,
      name: "David Kim",
      vietnameseTitle: "Quản lý",
      studentLeader: "Emily Vu",
    },
    {
      id: 6,
      name: "Emily Chen",
      vietnameseTitle: "Trợ lý",
      studentLeader: "Frank Hoang",
    },
    {
      id: 7,
      name: "William Park",
      vietnameseTitle: "Chuyên viên",
      studentLeader: "Gina Nguyen",
    },
    {
      id: 8,
      name: "Jessica Nguyen",
      vietnameseTitle: "Trưởng phòng",
      studentLeader: "Henry Tran",
    },
    {
      id: 9,
      name: "Benjamin Lim",
      vietnameseTitle: "Kỹ sư",
      studentLeader: "Isabella Phan",
    },
    {
      id: 10,
      name: "Olivia Tran",
      vietnameseTitle: "Nhân viên",
      studentLeader: "Jacob Le",
    },
  ];

  const columns = [
    {
      title: "No.",
      width: "5%",
      render: (record, index, dataSource) => dataSource + 1,
    },
    {
      title: "Group Name",
      width: "25%",
      render: (record) => record?.name,
    },
    {
      title: "Vietnamese Title",
      width: "25%",
      render: (record) => record?.vietnameseTitle,
    },
    {
      title: "Student Leader",
      width: "25%",
      render: (record) => record?.studentLeader,
    },
    {
      title: "Action",
      width: "20%",
      align: "center",
      render: (record) => (
        <div>
          <Tooltip title="Confirm">
            <Button
              type="primary"
              icon={<CheckCircleOutlined />}
              onClick={() => showConfirmModal("agree", record)}
            >
              Accept
            </Button>
          </Tooltip>
          <Tooltip title="Reject">
            <Button
              type="danger"
              icon={<CloseCircleOutlined />}
              onClick={() => showConfirmModal("refuse", record)}
              style={{ marginLeft: 8 }}
            >
              {" "}
              Reject
            </Button>
          </Tooltip>
        </div>
      ),
    },
  ];
  function navigateToDetail(record) {}
  return (
    <DashboardLayout>
      <Helmet>
        <title>Registration | List Group Registered</title>
      </Helmet>
      <PageTitle
        location={props.location}
        title={"List Group Registered"}
        hiddenGoBack
      ></PageTitle>
      <ContentBlockWrapper>
        <TableComponent
          rowKey={(record) => record.id || uuid()}
          dataSource={dataSource}
          columns={columns}
          pagination={false}
          loading={loadingAnimationStore.tableLoading}
        />
      </ContentBlockWrapper>
    </DashboardLayout>
  );
};
export default memo(
  withRouter(
    inject(
      "authenticationStore",
      "loadingAnimationStore",
      "mentorStore"
    )(observer(GroupInvitedMentorPage))
  )
);

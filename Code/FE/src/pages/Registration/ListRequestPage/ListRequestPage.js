import React, { memo, useCallback, useEffect, useState } from "react";
import { inject, observer } from "mobx-react";
import { withRouter } from "react-router-dom";
import { Button, Pagination, Tooltip, message, Modal } from "antd";
import { CloseCircleOutlined, CheckCircleOutlined } from "@ant-design/icons";
import uuid from "uuid";
import DashboardLayout from "../../../layouts/DashboardLayout";
import { TableBottomPaginationBlock } from "../../../components/Common/Table";
import ContentBlockWrapper from "../../../components/ContentBlockWrapper";
import PageTitle from "../../../components/PageTitle";
import { Helmet } from "react-helmet/es/Helmet";
import { ForContent } from "./ListRequestPageStyled";
import TableComponent from "../../../components/Common/TableComponent";

const ListRequestPage = (props) => {
  const {
    history,
    loadingAnimationStore,
    mentorStore,
    authenticationStore,
    groupStore,
  } = props;

  const [listInvitationToJoinGroup, setListInvitationToJoinGroup] = useState();
  useEffect(() => {
    if (authenticationStore.currentUser) {
      getListInvitationToJoinGroup();
    }
  }, [authenticationStore.currentUser]);

  const getListInvitationToJoinGroup = async () => {
    loadingAnimationStore.setTableLoading(true);
    const res = await groupStore.getListInvitationToJoinGroup().finally(() => {
      loadingAnimationStore.setTableLoading(false);
    });
    setListInvitationToJoinGroup(res.data);
  };
  const handleConfirm = async (values) => {
    updateInvitationStatus(values, true);
  };
  const handleReject = async (values) => {
    updateInvitationStatus(values, false);
  };
  const updateInvitationStatus = async (values, status) => {
    try {
      loadingAnimationStore.showSpinner(true);
      const response = await groupStore.updateInvitationStatus(
        values?.group.id,
        status
      );
      if (response.status === 200) {
        if (status) {
          message.success(`You have successfully joined the group!`);
        } else {
          message.success(`You refused to join the group!`);
        }
        loadingAnimationStore.showSpinner(false);
        getListInvitationToJoinGroup();
      }
    } catch (err) {
      message.error(err.en || "Login failed response status!");
    }
  };
  const showConfirmModal = (action, record) => {
    Modal.confirm({
      title: `Are you sure you want to ${action} this group?`,
      onOk: () => {
        if (action === "confirm") {
          handleConfirm(record);
        } else {
          handleReject(record);
        }
      },
      onCancel: () => {},
      okText: "Yes",
      cancelText: "No",
    });
  };
  const columns = [
    {
      title: "No.",
      width: 100,
      render: (record, index, dataSource) => dataSource + 1,
    },
    {
      title: "Project Name",
      width: 100,
      render: (record) => record?.group.name,
    },
    {
      title: "Invited By",
      width: 100,
      render: (record) => record?.group.owner.username,
    },
    {
      title: "Action",
      width: 100,
      render: (record) => (
        <div>
          <Tooltip title="Confirm">
            <Button
              type="primary"
              icon={<CheckCircleOutlined />}
              onClick={() => showConfirmModal("confirm", record)}
            >
              Accept
            </Button>
          </Tooltip>
          <Tooltip title="Reject">
            <Button
              type="danger"
              icon={<CloseCircleOutlined />}
              onClick={() => showConfirmModal("reject", record)}
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
        <title>Registration | List Supervisors</title>
      </Helmet>
      <PageTitle
        location={props.location}
        title={"List Supervisors"}
        hiddenGoBack
      ></PageTitle>
      <ContentBlockWrapper>
        <TableComponent
          rowKey={(record) => record.id || uuid()}
          dataSource={listInvitationToJoinGroup}
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
      "mentorStore",
      "groupStore"
    )(observer(ListRequestPage))
  )
);

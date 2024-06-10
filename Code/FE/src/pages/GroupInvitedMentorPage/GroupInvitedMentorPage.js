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
import moment from "moment";
import { DATE_FORMAT_SLASH, MENTOR_STATUS } from "../../constants";


const GroupInvitedMentorPage = (props) => {
  const {
    history,
    loadingAnimationStore,
    groupStore,
    authenticationStore,
  } = props;

  const { groupInvitation } = groupStore;

  const [listGroupMentorRegistered, setListGroupMentorRegistered] = useState();
  useEffect(() => {
    if (authenticationStore.currentUser) {
      getListInvitation();
    }
    return () => {
      groupStore.clearStore();
    };
  }, [authenticationStore.currentUser]);
  const getListInvitation = async () => {
    loadingAnimationStore.setTableLoading(true);
    const res = await groupStore.getGroupInvitation().finally(() => {
      loadingAnimationStore.setTableLoading(false);
    });
    setListGroupMentorRegistered(res.data);
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
     updateInvitationStatus(values, MENTOR_STATUS.ACCEPT);
  };
  const handleRefuse = async (values) => {
     updateInvitationStatus(values, MENTOR_STATUS.REJECT);
  };

  const updateInvitationStatus = async (values, status) => {
    try {
      loadingAnimationStore.showSpinner(true);
      const response = await groupStore.updateGroupMentorStatus(
        values?.id,
        status,
      );
      if (response.status === 200) {
        if (status == MENTOR_STATUS.ACCEPT) {
          message.success(`You have successfully accepted to become a mentor for this group!`);
        } else {
          message.success(`You refused to become a mentor for this group!`);
        }
        await getListInvitation();
        loadingAnimationStore.showSpinner(false);
      }
    } catch (err) {
      message.error(err.en || "Login failed response status!");
      loadingAnimationStore.showSpinner(false);
    }
  };

  const columns = [
    {
      title: "No.",
      width: "5%",
      render: (record, index, dataSource) => dataSource + 1,
    },
    {
      title: "Group Name",
      width: "25%",
      render: (record) => record?.group.name,
    },
    {
      title: "Vietnamese Title",
      width: "25%",
      render: (record) => record?.group.vietnameseTitle,
    },
    {
      title: "Create At",
      width: "25%",
      render: (record) =>  moment(record?.group.createdAt).format(DATE_FORMAT_SLASH),
    },
    {
      title: "Action",
      width: "20%",
      align: "center",
      render: (record) => (
        console.log(record),
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
          dataSource={groupInvitation}
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
      "groupStore"
    )(observer(GroupInvitedMentorPage))
  )
);

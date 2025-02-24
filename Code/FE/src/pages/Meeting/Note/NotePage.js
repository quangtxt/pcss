import React, { memo, useCallback, useEffect, useState, useRef } from "react";
import { inject, observer } from "mobx-react";
import { withRouter } from "react-router-dom";
import { UserOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Form, Input, message, Row, Col, Modal } from "antd";
import ContentBlockWrapper from "../../../components/ContentBlockWrapper";
import DashboardLayout from "../../../layouts/DashboardLayout";
import { Helmet } from "react-helmet/es/Helmet";
import { PortalContent } from "./CreateIdeaNoteStyled";
import PageTitle from "../../../components/PageTitle";
import { FormActionFooter } from "./CreateIdeaNoteStyled";
import EmptyPage from "../../EmptyPage/EmptyPage";
import RichEditor from "../../../components/RichEditor/RichEditor";
import PopupViewDetail from "./PopupViewDetail";
import TableComponent from "../../../components/Common/TableComponent";

import { Container } from "../../../layouts/Container/Container";
import CreateNotePage from "./CreateNotePage";
import moment from "moment";

const NotePage = (props) => {
  const {
    studentStore,
    loadingAnimationStore,
    meetingStore,
    groupStore,
    authenticationStore,
    history,
    match,
  } = props;
  const { meetingId } = match.params;
  const { currentUser } = authenticationStore;
  const EDITOR_REF = useRef();
  const [noteList, setNoteList] = useState();
  const [note, setNote] = useState();
  const [meeting, setMeeting] = useState();
  const [isVisiblePopup, setIsVisiblePopup] = useState(false);
  const [isVisiblePopupCreate, setIsVisiblePopupCreate] = useState(false);
  const currentDate = moment();
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    if (authenticationStore.currentUser) {
      getNoteListByMeeting();
      getMeetingByMeeting();
    }
  }, [authenticationStore.currentUser, isVisiblePopupCreate, refresh]);

  const getNoteListByMeeting = async () => {
    loadingAnimationStore.setTableLoading(true);
    const res = await meetingStore
      .getNoteListByMeeting(meetingId)
      .finally(() => {
        loadingAnimationStore.setTableLoading(false);
      });
    setNoteList(res.data);
    setRefresh(false);
  };

  const getMeetingByMeeting = async () => {
    loadingAnimationStore.setTableLoading(true);
    const res = await meetingStore
      .getMeetingByMeeting(meetingId)
      .finally(() => {
        loadingAnimationStore.setTableLoading(false);
      });
    setMeeting(res.data);
    setRefresh(false);
  };

  const showConfirmModal = (action, noteId, handleRemoveNote) => {
    Modal.confirm({
      title: `Are you sure to delete this meeting?`,
      onOk: () => {
        if (action === "delete") {
          handleRemoveNote(noteId);
          message.success("Delete action was successfully");
        }
      },
      onCancel: () => {
        message.info("Delete action was cancelled");
      },
      okText: "Yes",
      cancelText: "No",
    });
  };

  const handleRemoveNote = async (noteId) => {
    try {
      await meetingStore.deleteNote(noteId);
      setRefresh(true);
    } catch (err) {
      console.log(err);
    }
  };

  const columns = [
    {
      title: "No.",
      width: 100,
      render: (record, index, dataSource) => dataSource + 1,
    },
    {
      title: "Title",
      width: "80%",
      render: (record) => record?.title,
    },
    {
      title: "Action",
      render: (record) => (
        <div className="flex justify-start">
          <Button
            onClick={() => {
              setNote(record);
              setIsVisiblePopup(true);
            }}
          >
            View
          </Button>
          <Button
            className="ml-3"
            onClick={() => {
              showConfirmModal("delete", record?.id, handleRemoveNote);
            }}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];
  return (
    <DashboardLayout>
      <Helmet>
        <title>Guidance || Note</title>
      </Helmet>

      <ContentBlockWrapper>
        <div className="flex justify-between mb-3">
          <h2>{currentUser?.group?.name} - List notes</h2>
          {moment(meeting?.startAt) < currentDate &&
          moment(meeting?.endAt) < currentDate ? (
            <></>
          ) : (
            <Button
              type="primary"
              onClick={() => {
                setIsVisiblePopupCreate(true);
              }}
            >
              Create new note
            </Button>
          )}
        </div>
        <TableComponent
          // onRow={(record, rowIndex) => {
          //   return {
          //     onClick: (event) => {
          //       setNote(record);
          //       openEditPopUp();
          //     },
          //   };
          // }}
          rowKey={(record) => record.id || uuid()}
          dataSource={noteList}
          columns={columns}
          pagination={false}
          loading={loadingAnimationStore.tableLoading}
        />
      </ContentBlockWrapper>
      <PopupViewDetail
        meetingId={meetingId}
        note={note}
        isVisiblePopup={isVisiblePopup}
        setIsVisiblePopup={setIsVisiblePopup}
        handleClosePopup={() => setIsVisiblePopup(false)}
      />
      <CreateNotePage
        meetingId={meetingId}
        isVisiblePopup={isVisiblePopupCreate}
        setIsVisiblePopup={setIsVisiblePopupCreate}
        handleClosePopup={() => setIsVisiblePopupCreate(false)}
      />
    </DashboardLayout>
  );
};
export default memo(
  withRouter(
    inject(
      "authenticationStore",
      "loadingAnimationStore",
      "groupStore",
      "studentStore",
      "meetingStore"
    )(observer(NotePage))
  )
);

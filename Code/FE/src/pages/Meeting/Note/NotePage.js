import React, { memo, useCallback, useEffect, useState, useRef } from "react";
import { inject, observer } from "mobx-react";
import { withRouter } from "react-router-dom";
import { UserOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Form, Input, message, Row, Col } from "antd";
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

const NotePage = (props) => {
  const {
    studentStore,
    loadingAnimationStore,
    groupStore,
    authenticationStore,
    history,
    match,
  } = props;
  const { meetingId } = match.params
  const { currentUser } = authenticationStore;
  const EDITOR_REF = useRef();
  const [noteList, setNoteList] = useState();
  const [note, setNote] = useState();
  const [isVisiblePopup, setIsVisiblePopup] = useState(false);
  

  useEffect(() => {
    if (authenticationStore.currentUser) {
      getNoteListByMeeting();
    }
  }, [authenticationStore.currentUser]);

  const getNoteListByMeeting = async () => {
    loadingAnimationStore.setTableLoading(true);
    const res = await groupStore.getNoteListByMeeting(meetingId).finally(() => {
      loadingAnimationStore.setTableLoading(false);
    });
    setNoteList(res.data);
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
        <Button
          onClick={() => {
            setNote(record);
            setIsVisiblePopup(true);
          }}
        >
          View
        </Button> // Thêm nút View để navigating to detail page
      ),
    },
  ];
  return (
    <DashboardLayout>
      <Helmet>
        <title>Guidance || Create Note</title>
      </Helmet>
      <PageTitle
        location={props.location}
        title={"Create Note"}
        hiddenGoBack
      ></PageTitle>
      <ContentBlockWrapper>
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
        note={note}
        isVisiblePopup={isVisiblePopup}
        setIsVisiblePopup={setIsVisiblePopup}
        handleClosePopup={() => setIsVisiblePopup(false)}
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
      "studentStore"
    )(observer(NotePage))
  )
);

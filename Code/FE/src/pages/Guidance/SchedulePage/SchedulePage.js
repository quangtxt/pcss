import React, { memo, useCallback, useEffect, useState } from "react";

import { inject, observer } from "mobx-react";
import { withRouter } from "react-router-dom";
import { Badge, Calendar, Button } from "antd";
import { CloseCircleOutlined, CheckCircleOutlined } from "@ant-design/icons";
import DashboardLayout from "../../../layouts/DashboardLayout";
import { Helmet } from "react-helmet/es/Helmet";
import PageTitle from "../../../components/PageTitle";
import ContentBlockWrapper from "../../../components/ContentBlockWrapper";
import { CalenderStudent } from "./SchedulePageStyled";
import moment from "moment";

const SchedulePage = (props) => {
  const {
    meetingStore,
    loadingAnimationStore,
    groupStore,
    authenticationStore,
    history,
  } = props;
  const { currentUser } = authenticationStore;

  const [meetingList, setMeetingList] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 6 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 14 },
    },
  };

  useEffect(() => {
    if (authenticationStore.currentUser) {
      getListMeeting();
    }
  }, [authenticationStore.currentUser]);

  const getListMeeting = async () => {
    loadingAnimationStore.setTableLoading(true);
    const res = await meetingStore
      .getListMeeting(currentUser.group.id)
      .finally(() => {
        loadingAnimationStore.setTableLoading(false);
      });
    setMeetingList(res.data);
  };

  const getListData = (value) => {
    let listData = [];
    const meetings = meetingList.filter((meeting) => {
      const meetingStartDate = moment(meeting.startAt);
      const meetingEndDate = moment(meeting.endAt);
      return (
        meetingStartDate.date() === value.date() &&
        meetingStartDate.month() === value.month() &&
        meetingStartDate.year() === value.year()
      );
    });

    meetings.forEach((meeting) => {
      const meetingStartDate = moment(meeting.startAt);
      const meetingEndDate = moment(meeting.endAt);

      const meetingStartHour = meetingStartDate.hour();
      const meetingStartMinute = meetingStartDate.minute();
      const meetingEndHour = meetingEndDate.hour();
      const meetingEndMinute = meetingEndDate.minute();

      const noteLength = meeting.notes.length;
      listData.push({
        type: `${meeting.type}`,
        content: `${meeting.type} Meeting`,
        time: `(${meetingStartHour}:${meetingStartMinute
          .toString()
          .padStart(
            2,
            "0"
          )} - ${meetingEndHour}:${meetingEndMinute
          .toString()
          .padStart(2, "0")})`,
        place: meeting.type === "Online" ? "Meeting Link" : meeting.location,
        link: meeting.type === "Online" ? `${meeting.location}` : ``,
        note: noteLength > 0 ? `Note (${noteLength})` : "No notes",
        meetingId: meeting.id,
        endMeeting: meeting.endAt,
      });
    });  

    return listData;
  };

  const getMonthData = (value) => {
    if (value.month() === 8) {
      return 1394;
    }
  };

  const monthCellRender = (value) => {
    const num = getMonthData(value);
    return num ? (
      <div className="notes-month">
        <section>{num}</section>
        <span>Backlog number</span>
      </div>
    ) : null;
  };

  const dateCellRender = (value) => {
    const listData = getListData(value);
    const handleNoteClick = (meetingId) => {
      history.push(`/guidance/meeting/notes/${meetingId}`);
    };
    return (
      <ul className="events">
        {listData.map((item) => {
          const endTime = new Date(item.endMeeting); 
          console.log("123", new Date(endTime - (25200000)));
          console.log("124", endTime);
          return (
            (
              <li key={item.content}>
                <Badge
                  style={{ whiteSpace: "wrap" }}
                  status={moment(item.endMeeting) < new Date() ? "error" : "success"}
                  text={item.content}
                />
                <div>{item.time}</div>
                <div>
                  {item.type === "Online" ? (
                    <a href={item.link} target="_blank">
                      {item.place}
                    </a>
                  ) : (
                    <div>{item.place}</div>
                  )}
                </div>
                <div>
                  {item.note === "No notes" ? (
                    item.note
                  ) : (
                    <a onClick={() => handleNoteClick(item.meetingId)}>
                      {item.note}
                    </a>
                  )}
                </div>
              </li>
            )
          );
        })}
      </ul>
    );
  };

  return (
    <DashboardLayout>
      <Helmet>
        <title>Registration || Create Idea</title>
      </Helmet>
      <PageTitle
        location={props.location}
        title={"Create Idea"}
        hiddenGoBack
      ></PageTitle>
      <ContentBlockWrapper>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "15px",
          }}
        >
          <h1>Calendar</h1>
          <Button
            type="primary"
            icon={<CheckCircleOutlined />}
            // onClick={() => showConfirmModal("agree", record)}
          >
            Request Meeting
          </Button>
        </div>

        <CalenderStudent>
          <Calendar
            dateCellRender={dateCellRender}
            monthCellRender={monthCellRender}
          />
        </CalenderStudent>
      </ContentBlockWrapper>
    </DashboardLayout>
  );
};
export default memo(
  withRouter(
    inject(
      "authenticationStore",
      "loadingAnimationStore",
      "meetingStore"
    )(observer(SchedulePage))
  )
);

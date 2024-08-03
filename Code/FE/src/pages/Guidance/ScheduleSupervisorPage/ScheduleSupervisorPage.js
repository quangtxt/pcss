import React, { memo, useCallback, useEffect, useState } from "react";

import { inject, observer } from "mobx-react";
import { withRouter } from "react-router-dom";
import { Badge, Calendar, Button, Menu, Dropdown } from "antd";
import {
  CloseCircleOutlined,
  CheckCircleOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import DashboardLayout from "../../../layouts/DashboardLayout";
import { Helmet } from "react-helmet/es/Helmet";
import PageTitle from "../../../components/PageTitle";
import ContentBlockWrapper from "../../../components/ContentBlockWrapper";
import { CalenderStudent } from "./ScheduleSupervisorPageStyled";
import PopupCreateMeeting from "./PopupCreateMeeting";
import PopupEditMeeting from "./PopupEditMeeting";
import moment from "moment";

const ScheduleSupervisorPage = (props) => {
  const {
    meetingStore,
    loadingAnimationStore,
    groupStore,
    authenticationStore,
    history,
    semesterStore,
  } = props;
  const { currentUser } = authenticationStore;

  const [isVisiblePopup, setIsVisiblePopup] = useState(false);
  const [isVisiblePopupEdit, setIsVisiblePopupEdit] = useState(false);
  const [meetingId, setMeetingId] = useState("");
  const [meetingList, setMeetingList] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [groupsOfSupervisor, setGroupsOfSupervisor] = useState([]);
  const [value, setValue] = useState(moment());
  const [semesterId, setSemesterId] = useState(null);

  useEffect(() => {
    getSemester();
    getGroupOfSupervisorBySemester(semesterId);
  }, [refresh]);

  const getGroupOfSupervisorBySemester = async (semesterId) => {
    loadingAnimationStore.setTableLoading(true);
    const res = await groupStore
      .getGroupOfSupervisorBySemester(semesterId)
      .finally(() => {
        loadingAnimationStore.setTableLoading(false);
      });
    setGroupsOfSupervisor(res.data);
    setRefresh(false);
    const listMeeting = res.data.flatMap(
      (groupOfSupervisor) => groupOfSupervisor.group.meetings
    );
    setMeetingList(listMeeting);
  };

  const getSemester = async () => {
    try {
      const res = await semesterStore.getSemesters();
      setSemesterData(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  const setSemesterData = (semesters) => {
    if (semesters.length > 0) {
      const currentDate = moment();
      const closestSemester = semesters.reduce((prev, curr) => {
        const startDate = moment(curr.beginAt);
        const endDate = startDate.clone().add(14, "weeks");
        if (currentDate.isBetween(startDate, endDate, null, "[]")) {
          return curr;
        } else {
          if (prev !== null) {
            const prevDiff = Math.abs(
              moment(prev.beginAt).diff(currentDate, "days")
            );
            const currDiff = Math.abs(startDate.diff(currentDate, "days"));
            return currDiff < prevDiff ? curr : prev;
          } else {
            // If prev is null, return curr by default
            return curr;
          }
        }
      }, null);
      if (closestSemester) {
        setSemesterId(closestSemester);
      }
    }
  };
  console.log("semesterId", semesterId);

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
        group: meeting?.group.vietnameseTitle,
      });
    });

    return listData;
  };
  const onPanelChange = (newValue, mode) => {
    setValue(newValue);
  };

  // const getMonthData = (value) => {
  //   if (value.month() === 8) {
  //     return 1394;
  //   }
  // };

  // const monthCellRender = (value) => {
  //   const num = getMonthData(value);
  //   return num ? (
  //     <div className="notes-month">
  //       <section>{num}</section>
  //       <span>Backlog number</span>
  //     </div>
  //   ) : null;
  // };
  const headerRender = ({ value }) => {
    return (
      <div class="flex justify-between">
        <p>{value.format("DD MMMM YYYY")}</p>
        {/* Thêm các thông tin khác trong header nếu cần */}
      </div>
    );
  };

  const handleRemoveMeeting = async (meetingId) => {
    try {
      await meetingStore.deleteMeeting(meetingId);
      setRefresh(true);
    } catch (err) {
      console.log(err);
    }
  };

  const handleMenuClick = (e, meetingId) => {
    if (e.key === "edit-meeting") {
      navigateToEdit(meetingId);
    } else if (e.key === "remove-meeting") {
      console.log("meetingId", meetingId);
      handleRemoveMeeting(meetingId);
    }
  };

  const dateCellRender = (value) => {
    const listData = getListData(value);
    console.log("value", value);
    const dateValue = value.date();
    const isPastDay = value.isBefore(moment(), "day");
    const isCurrentDay = value.isSame(moment(), "day");
    const isCurrentWeek = value.isSame(moment(), "week");
    const isNextWeek = value.isSame(moment().add(1, "week"), "week");
    if (!isCurrentWeek && !isNextWeek) {
      return null;
    }
    const handleNoteClick = (meetingId) => {
      history.push(`/guidance/meeting/notes/${meetingId}`);
    };
    return (
      <div
        onClick={() =>
          !isPastDay && listData.length === 0 && handleDateClick(value)
        }
        style={{
          backgroundColor: isCurrentDay
            ? "#E6F7FF"
            : isCurrentWeek
            ? "#F0F9FF"
            : "white",
          cursor: isPastDay ? "not-allowed" : "pointer",
          padding: "1rem",
          borderRadius: "0.5rem",
          opacity: isPastDay ? 0.6 : 1,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1.5rem",
          boxShadow:
            "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        }}
      >
        <div style={{ fontSize: "1rem", fontWeight: 500, marginRight: "1rem" }}>
          {dateValue}
        </div>
        <ul
          className="events"
          style={{ overflowY: "auto", maxHeight: "190px" }}
        >
          {listData.map((item) => (
            <li key={item.meetingId}>
              <div
                className="meeting-item"
                style={{
                  backgroundColor:
                    moment(item.endMeeting) < new Date()
                      ? "rgba(255, 0, 0, 0.1)"
                      : "rgba(0, 255, 0, 0.1)",
                  padding: "1rem",
                  borderRadius: "0.5rem",
                  marginBottom: "1rem",
                }}
              >
                <div className="flex justify-between items-center">
                  <div className="font-bold text-indigo-800 truncate">
                    {item.group}
                  </div>
                  {moment(item.endMeeting) > new Date() && (
                    <Dropdown
                      overlay={
                        <Menu
                          onClick={(e) => handleMenuClick(e, item.meetingId)}
                        >
                          <Menu.Item key="edit-meeting">Edit meeting</Menu.Item>
                          <Menu.Item key="remove-meeting">
                            Remove meeting
                          </Menu.Item>
                        </Menu>
                      }
                    >
                      <Button type="text" className="p-0">
                        <MoreOutlined style={{ fontSize: "15px" }} />
                      </Button>
                    </Dropdown>
                  )}
                </div>

                <div>
                  <Badge
                    className="font-semibold"
                    style={{ whiteSpace: "wrap" }}
                    status={
                      moment(item.endMeeting) < new Date() ? "error" : "success"
                    }
                    text={item.content}
                  ></Badge>
                </div>

                <div style={{ color: "rgb(136 19 55)" }} className="italic">
                  {item.time}
                </div>

                <div>
                  {item.type === "Online" ? (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {item.place}
                    </a>
                  ) : (
                    <div>{item.place}</div>
                  )}
                </div>

                <div>
                  <a onClick={() => handleNoteClick(item.meetingId)}>
                    {item.note}
                  </a>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  const handleDateClick = (date) => {
    // Handle clicking on a date to add a meeting
    setIsVisiblePopup(true);
  };

  const dateFullCellRender = (value) => {
    const isCurrentWeek = value.isSame(moment(), "week");
    const isNextWeek = value.isSame(moment().add(1, "week"), "week");

    if (isCurrentWeek || isNextWeek) {
      return dateCellRender(value);
    } else {
      return null;
    }
  };

  function navigateToCreate() {
    setIsVisiblePopup(true);
  }
  function navigateToEdit(meetingId) {
    setIsVisiblePopupEdit(true);
    setMeetingId(meetingId);
  }

  return (
    <DashboardLayout>
      <Helmet>
        <title>Guidance Phase || Schedule</title>
      </Helmet>
      <PageTitle
        location={props.location}
        title={"Schedule"}
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
            style={{ marginTop: "20px " }}
            className="btnAdd"
            type="primary"
            shape="round"
            icon={<CheckCircleOutlined />}
            onClick={navigateToCreate}
          >
            Create Meeting
          </Button>
        </div>

        <CalenderStudent>
          <Calendar
            value={value}
            mode="week"
            onPanelChange={onPanelChange}
            setRefresh={setRefresh}
            dateFullCellRender={dateFullCellRender}
          />
        </CalenderStudent>
      </ContentBlockWrapper>

      <PopupCreateMeeting
        groupsOfSupervisor={groupsOfSupervisor}
        isVisiblePopup={isVisiblePopup}
        setIsVisiblePopup={setIsVisiblePopup}
        handleClosePopup={() => setIsVisiblePopup(false)}
        setRefresh={setRefresh}
      />

      <PopupEditMeeting
        groupsOfSupervisor={groupsOfSupervisor}
        meetingId={meetingId}
        meetingList={meetingList}
        isVisiblePopupEdit={isVisiblePopupEdit}
        setIsVisiblePopupEdit={setIsVisiblePopupEdit}
        handleClosePopup={() => setIsVisiblePopupEdit(false)}
        setRefresh={setRefresh}
      />
    </DashboardLayout>
  );
};
export default memo(
  withRouter(
    inject(
      "authenticationStore",
      "loadingAnimationStore",
      "meetingStore",
      "groupStore",
      "semesterStore"
    )(observer(ScheduleSupervisorPage))
  )
);

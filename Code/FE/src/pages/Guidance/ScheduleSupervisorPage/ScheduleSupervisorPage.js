import React, { memo, useCallback, useEffect, useState } from "react";

import { inject, observer } from "mobx-react";
import { withRouter } from "react-router-dom";
import { Badge, Calendar, Button, Menu, Dropdown, Modal, message } from "antd";
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
import ViewProgress from "../../../components/ViewProgress/ViewProgress";

const ScheduleSupervisorPage = (props) => {
  const {
    meetingStore,
    loadingAnimationStore,
    groupStore,
    authenticationStore,
    history,
    semesterStore,
  } = props;
  const [isVisiblePopup, setIsVisiblePopup] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [isVisiblePopupEdit, setIsVisiblePopupEdit] = useState(false);
  const [meetingId, setMeetingId] = useState("");
  const [meetingList, setMeetingList] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [groupsOfSupervisor, setGroupsOfSupervisor] = useState([]);
  const [value, setValue] = useState(moment());
  const [semesterId, setSemesterId] = useState(null);
  const [milestones, setMilestone] = useState([]);
  const currentDate = moment();

  useEffect(() => {
    getSemester();
  }, []);

  useEffect(() => {
    if (semesterId) {
      getGroupOfSupervisorBySemester(semesterId.id);
      getMilestoneGuidance();
    }
  }, [semesterId, refresh]);

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

  const getMilestoneGuidance = async () => {
    try {
      const res = await semesterStore.getMilestoneGuidancePhase(semesterId.id);
      setMilestone(res.data);
      // console.log("resdata", res.data);
    } catch (e) {
      console.log(e);
    }
  };

  const getCurrentStepIndex = () => {
    for (let i = 0; i < milestones.length; i++) {
      if (
        moment(currentDate).format("YYYY-MM-DD") >=
          moment(milestones[i].startDate).format("YYYY-MM-DD") &&
        moment(currentDate).format("YYYY-MM-DD") <=
          moment(milestones[i].endDate).format("YYYY-MM-DD")
      ) {
        return i;
      }
    }
    return -1;
  };

  const currentStepIndex = getCurrentStepIndex();

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
        group: meeting?.group.groupCode,
      });
    });

    return listData;
  };

  const showConfirmModal = (action, meetingId, handleRemoveMeeting) => {
    Modal.confirm({
      title: `Are you sure to delete this meeting?`,
      onOk: () => {
        if (action === "delete") {
          handleRemoveMeeting(meetingId);
        }
      },
      onCancel: () => {
        message.info("Delete action was cancelled");
      },
      okText: "Yes",
      cancelText: "No",
    });
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
      showConfirmModal("delete", meetingId, handleRemoveMeeting);
    }
  };

  const dateCellRender = (value) => {
    const listData = getListData(value);
    const dateValue = value.date();
    const isDay = value.isBefore(moment(), "day");
    const isPastDay = value.isBefore(moment().add(1, "day"), "day");
    const isCurrentDay = value.isSame(moment(), "day");
    const isCurrentWeek = value.isSame(moment(), "week");
    const isNextWeek = value.isSame(moment().add(1, "week"), "week");
    const handleNoteClick = (meetingId) => {
      history.push(`/guidance/meeting/notes/${meetingId}`);
    };

    const firstMilestoneStartDate = moment(milestones[0]?.startDate);
    const lastMilestoneEndDate = moment(
      milestones[milestones.length - 1]?.endDate
    );
    let weekNumber = "";
    if (
      value.isBetween(firstMilestoneStartDate, lastMilestoneEndDate, null, "[]")
    ) {
      weekNumber = value.diff(firstMilestoneStartDate, "weeks") + 1;
    } else {
      weekNumber = " out of milestones";
    }
    return (
      <div
        onClick={() =>
          !isPastDay && listData.length === 0 && handleDateClick(value)
        }
        style={{
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: isCurrentDay
            ? "#3399FF"
            : isCurrentWeek
            ? "#F0F9FF"
            : "white",
          cursor: isPastDay ? "not-allowed" : "pointer",
          padding: "1rem",
          borderRadius: "0.5rem",
          marginBottom: "1.5rem",
          boxShadow:
            "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
          width: "100%",
          height: "210px",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            fontSize: "0.8rem",
            fontWeight: 500,
            marginRight: "1rem",
            color: isDay ? "rgba(0, 0, 0, 0.6)" : "black",
            marginLeft: "1rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "0.5rem",
          }}
        >
          <div>Week - {weekNumber}</div>
          <div>{dateValue}</div>
        </div>

        <ul
          className="events"
          style={{
            overflowY: listData.length > 1 ? "auto" : "",
            maxHeight: "170px",
            width: "100%",
          }}
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

                <div className="text-left">
                  <Badge
                    className="font-semibold "
                    style={{ whiteSpace: "wrap" }}
                    status={
                      moment(item.endMeeting) < new Date() ? "error" : "success"
                    }
                    text={item.content}
                  ></Badge>
                </div>

                <div
                  style={{ color: "rgb(136 19 55)" }}
                  className="italic text-left"
                >
                  {item.time}
                </div>

                <div className="text-left">
                  {item.type === "Online" ? (
                    <a href={item.link} target="_blank">
                      {item.place}
                    </a>
                  ) : (
                    <div>{item.place}</div>
                  )}
                </div>

                <div className="text-left">
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
    setSelectedDate(date);
    setIsVisiblePopup(true);
  };

  const headerRender = ({ value }) => {
    return (
      <div className="relative flex items-center">
        <p className="absolute right-0 ">{value.format("MMMM YYYY")}</p>
        <p className="mx-auto font-bold">
          {currentDate.format("DD MMMM YYYY")}
        </p>
      </div>
    );
  };

  const [currentWeek, setCurrentWeek] = useState(moment());

  const dateFullCellRender = (value) => {
    const isCurrentWeek = value.isSame(currentWeek, "week");
    const isNextWeek = value.isSame(currentWeek.clone().add(1, "week"), "week");

    return <>{isCurrentWeek || isNextWeek ? dateCellRender(value) : null}</>;
  };

  const handlePrevious = () => {
    setCurrentWeek((prevWeek) => prevWeek.clone().subtract(2, "week"));
    setRefresh((prev) => !prev);
  };

  const handleNext = () => {
    setCurrentWeek((prevWeek) => prevWeek.clone().add(2, "week"));
    setRefresh((prev) => !prev);
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
        <div className="flex flex-col space-y-6 mb-6">
          <h1 className="text-3xl font-bold text-blue-600 text-center">
            Calendar
          </h1>
          <div>
            <h2 className="font-bold text-base">Current Milestone</h2>
            <div>{semesterId && <ViewProgress id={semesterId.id} />}</div>
            <p className="p-3 text-center font-bold">
              Duration: {milestones[currentStepIndex]?.milestone?.time}
            </p>
          </div>
          <div className="flex justify-between items-center">
            <Button
              className="bg-blue-500 text-white font-bold py-2 px-4 rounded flex items-center"
              onClick={handlePrevious}
            >
              Back
            </Button>

            <Button
              className="bg-blue-500 text-white font-bold py-2 px-4 rounded flex items-center"
              onClick={handleNext}
            >
              Next
            </Button>
          </div>
          <div className="flex flex-col items-end space-y-4">
            <Button
              className="bg-blue-500 text-white font-bold py-2 px-4 rounded flex items-center"
              icon={<CheckCircleOutlined />}
              onClick={navigateToCreate}
            >
              Create Meeting
            </Button>
          </div>
        </div>

        <CalenderStudent>
          <Calendar
            value={currentWeek}
            setRefresh={setRefresh}
            dateFullCellRender={dateFullCellRender}
            onSelect={null}
            headerRender={headerRender}
          />
        </CalenderStudent>
      </ContentBlockWrapper>

      <PopupCreateMeeting
        groupsOfSupervisor={groupsOfSupervisor}
        isVisiblePopup={isVisiblePopup}
        setIsVisiblePopup={setIsVisiblePopup}
        handleClosePopup={() => setIsVisiblePopup(false)}
        setRefresh={setRefresh}
        selectedDate={selectedDate}
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

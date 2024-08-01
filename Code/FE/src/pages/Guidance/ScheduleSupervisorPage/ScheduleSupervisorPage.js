import React, { memo, useCallback, useEffect, useState } from "react";

import { inject, observer } from "mobx-react";
import { withRouter } from "react-router-dom";
import { Badge, Calendar, Button, Menu, Dropdown, Select } from "antd";
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

  const [selectedSemesterId, setSelectedSemesterId] = useState(null);
  const [semesters, setSemesters] = useState([]);

  useEffect(() => {
    getSemester();
  }, []);
  useEffect(() => {
    if (selectedSemesterId) {
      GetGroupListBySemester(selectedSemesterId);
    }
  }, [selectedSemesterId, refresh]);
  const getSemester = async () => {
    try {
      const res = await semesterStore.getSemesters();
      setSemesters(res.data);
      setSemesterCurrent(res.data);
    } catch (e) {
      console.log(e);
    }
  };
  const GetGroupListBySemester = async (semesterId) => {
    try {
      const res = await groupStore.getGroupOfSupervisorBySemester(semesterId);
      setGroupsOfSupervisor(res.data);
      setRefresh(false);
      const listMeeting = res.data.flatMap(
        (groupOfSupervisor) => groupOfSupervisor.group.meetings
      );
      setMeetingList(listMeeting);
    } catch (e) {
      console.log(e);
    }
  };

  const getSemesterById = (id) => {
    return semesters.find((semester) => semester.id === id);
  };

  const setSemesterCurrent = (semesters) => {
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
        setSelectedSemesterId(closestSemester.id);
      }
    }
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
        group: meeting?.group.vietnameseTitle,
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
    const today = moment();
    const listData = getListData(value);
    const handleNoteClick = (meetingId) => {
      history.push(`/guidance/meeting/notes/${meetingId}`);
    };
    return (
      <div className={`${value.isSame(today, "week") ? "bg-blue-100" : ""}`}>
        <ul className="events">
          {listData.length > 0 ? (
            listData.map((item) => {
              return (
                <div
                  style={{
                    backgroundColor: "rgb(14 165 233)",
                    margin: "0 0.75rem 0.75rem 0.75rem",
                  }}
                  className={`p-3 rounded shadow-lg `}
                >
                  <li key={item.content}>
                    <div className="flex place-items-center">
                      <div className="font-bold text-indigo-800 truncate ...">
                        {item.group}
                      </div>
                      <div>
                        {moment(item.endMeeting) > new Date() ? (
                          <Dropdown
                            overlay={
                              <Menu
                                onClick={(e) =>
                                  handleMenuClick(e, item.meetingId)
                                }
                              >
                                <Menu.Item key="edit-meeting">
                                  Edit meeting
                                </Menu.Item>
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
                        ) : (
                          <></>
                        )}
                      </div>
                    </div>

                    <div>
                      <Badge
                        className="font-semibold"
                        style={{ whiteSpace: "wrap" }}
                        status={
                          moment(item.endMeeting) < new Date()
                            ? "error"
                            : "success"
                        }
                        text={item.content}
                      ></Badge>
                    </div>

                    <div
                      style={{ color: "rgb(136 19 55)" }}
                      className="italic "
                    >
                      {item.time}
                    </div>
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
                        <a onClick={() => handleNoteClick(item.meetingId)}>
                          {item.note}
                        </a>
                      ) : (
                        <a onClick={() => handleNoteClick(item.meetingId)}>
                          {item.note}
                        </a>
                      )}
                    </div>
                  </li>
                </div>
              );
            })
          ) : (
            <div style={{ height: "70px" }}></div>
          )}
        </ul>
      </div>
    );
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
          <Calendar setRefresh={setRefresh} dateCellRender={dateCellRender} />
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

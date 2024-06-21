import axios from "axios";
import { apiUrl } from "../config";
import authenticationStore from "../stores/authenticationStore";

export const MeetingRequest = {
  getListMeeting: (groupId) =>
    axios({
      method: "get",
      url: `${apiUrl}/api/v1/meeting/view/${groupId}`,
      headers: {
        Authorization: `Bearer ${
          JSON.parse(authenticationStore.appToken).access_token
        }`,
        "Content-Type": "application/json",
      },
    }),

  getListNotes: (meetingId) =>
    axios({
      method: "get",
      url: `${apiUrl}/api/v1/meeting/notes/${meetingId}`,
      headers: {
        Authorization: `Bearer ${
          JSON.parse(authenticationStore.appToken).access_token
        }`,
        "Content-Type": "application/json",
      },
    }),

  createMeeting: (listMeetings) =>
    axios({
      method: "post",
      url: `${apiUrl}/api/v1/meeting/create`,
      headers: {
        Authorization: `Bearer ${JSON.parse(authenticationStore.appToken)}`,
        "Content-Type": "application/json",
      },
      data: listMeetings,
    }),
    getNoteListByMeeting: (meetingId) =>
      axios({
        method: "get",
        url: `${apiUrl}/api/v1/meeting/notes/${meetingId}`,
        headers: {
          Authorization: `Bearer ${JSON.parse(authenticationStore.appToken)}`,
          "Content-Type": "application/json",
        },
      }),
    createNote: (meetingId, title, content) =>
      axios({
        method: "post",
        url: `${apiUrl}/api/v1/meeting/note/create`,
        headers: {
          Authorization: `Bearer ${JSON.parse(authenticationStore.appToken)}`,
          "Content-Type": "application/json",
        },
        data: {
          meetingId: meetingId,
          title: title,
          content: content,
        },
      }),
};

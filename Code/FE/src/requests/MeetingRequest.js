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
};

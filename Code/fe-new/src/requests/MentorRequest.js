import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;
import authenticationStore from "../stores/authenticationStore";

export const MentorRequest = {
  getMentorList: (pageSize, pageNumber, keyword) =>
    axios({
      method: "get",
      url: `${apiUrl}/api/v1/mentors`,
      headers: {
        Authorization: `Bearer ${JSON.parse(authenticationStore.appToken)}`,
        "Content-Type": "application/json",
      },
      params: {
        page: pageNumber,
        size: pageSize,
        keyword: keyword || "",
      },
    }),

  getGroupMentorRegistered: () =>
    axios({
      method: "get",
      url: `${apiUrl}/api/v1/group-member-invitation/getListMentorRegistered`,
      headers: {
        Authorization: `Bearer ${JSON.parse(authenticationStore.appToken)}`,
        "Content-Type": "application/json",
      },
    }),
  getMentorProfileById: (mentorId) =>
    axios({
      method: "get",
      url: `${apiUrl}/api/v1/profile/mentor`,
      headers: {
        Authorization: `Bearer ${JSON.parse(authenticationStore.appToken)}`,
        "Content-Type": "application/json",
      },
      params: {
        Id: mentorId,
      },
    }),
};

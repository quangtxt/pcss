import axios from "axios";
import { apiUrl } from "../config";
import authenticationStore from "../stores/authenticationStore";
import utils from "../utils";

export const StudentRequest = {
  getStudentList: (pageSize, pageNumber, keyword) =>
    axios({
      method: "get",
      url: `${apiUrl}/api/v1/students`,
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

  getStudentsToInvite: () =>
    axios({
      method: "get",
      url: `${apiUrl}/api/v1/group/student/invite/allow`,
      headers: {
        Authorization: `Bearer ${JSON.parse(authenticationStore.appToken)}`,
        "Content-Type": "application/json",
      },
    }),
};

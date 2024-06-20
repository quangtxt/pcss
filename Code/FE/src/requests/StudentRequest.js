import axios from "axios";
import { apiUrl } from "../config";
import authenticationStore from "../stores/authenticationStore";
import utils from "../utils";
import { update } from "lodash";

export const StudentRequest = {
  getStudentList: (pageSize, pageNumber) =>
    axios({
      method: "get",
      url: `${apiUrl}/api/v1/staff/students`,
      headers: {
        Authorization: `Bearer ${JSON.parse(authenticationStore.appToken)}`,
        "Content-Type": "application/json",
      },
      params: {
        page: pageNumber,
        size: pageSize
        // keyword: keyword || "",
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
  getStudentProfileById: (studentId) =>
    axios({
      method: "get",
      url: `${apiUrl}/api/v1/profile/student`,
      headers: {
        Authorization: `Bearer ${JSON.parse(authenticationStore.appToken)}`,
        "Content-Type": "application/json",
      },
      params: {
        Id: studentId,
      },
    }),
  updateStudent: (fullName, gender, phone, facebook, alternativeEmail) =>
    axios({
      method: "post",
      url: `${apiUrl}/api/v1/profile/update/student`,
      headers: {
        Authorization: `Bearer ${JSON.parse(authenticationStore.appToken)}`,
        "Content-Type": "application/json",
      },
      data: {
        fullName: fullName,
        gender: gender,
        phone: phone,
        facebook: facebook,
        alternativeEmail: alternativeEmail,
      },
    }),
  createStudent: (email, name) =>
    axios({
      method: "post",
      url: `${apiUrl}/api/v1/staff/addStudent`,
      headers: {
        Authorization: `Bearer ${JSON.parse(authenticationStore.appToken)}`,
        "Content-Type": "application/json",
      },
      data: {
        email: email,
        fullName: name,
      },
    }),
    automaticallyCreateGroups: () =>
    axios({
      method: "post",
      url: `${apiUrl}/api/v1/staff/student/automatically/create/groups`,
      headers: {
        Authorization: `Bearer ${JSON.parse(authenticationStore.appToken)}`,
        "Content-Type": "application/json",
      }
    }),
};

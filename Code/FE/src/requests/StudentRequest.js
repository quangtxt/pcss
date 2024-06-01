import axios from "axios";
import { apiUrl } from "../config";
import authenticationStore from "../stores/authenticationStore";
import utils from "../utils";
import { update } from "lodash";

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
  updateStudent: (
    id,
    alternativeEmail,
    facebook,
    gender,
    phone,
    profession,
    rollNumber,
    fullName,
    email,
    semester,
    specialty
  ) =>
    axios({
      method: "post",
      url: `${apiUrl}/api/v1/profile/update/student`,
      headers: {
        Authorization: `Bearer ${JSON.parse(authenticationStore.appToken)}`,
        "Content-Type": "application/json",
      },
      data: {
        id: id,
        alternativeEmail: alternativeEmail,
        facebook: facebook,
        gender: gender,
        phone: phone,
        profession: profession,
        rollNumber: rollNumber,
        fullName: fullName,
        email: email,
        semester: semester,
        specialty: specialty,
      },
    }),
};

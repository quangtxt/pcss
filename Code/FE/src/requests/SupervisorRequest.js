import axios from "axios";
import { apiUrl } from "../config";
import authenticationStore from "../stores/authenticationStore";
import utils from "../utils";

export const SupervisorRequest = {
  getSupervisorList: (pageSize, pageNumber, keyword) =>
    axios({
      method: "get",
      url: `${apiUrl}/api/v1/supervisors`,
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

  getGroupSupervisorRegistered: () =>
    axios({
      method: "get",
      url: `${apiUrl}/api/v1/group-supervisor/groups/pending`,
      headers: {
        Authorization: `Bearer ${JSON.parse(authenticationStore.appToken)}`,
        "Content-Type": "application/json",
      },
    }),
  getSupervisorProfileById: (supervisorId) =>
    axios({
      method: "get",
      url: `${apiUrl}/api/v1/profile/supervisor`,
      headers: {
        Authorization: `Bearer ${JSON.parse(authenticationStore.appToken)}`,
        "Content-Type": "application/json",
      },
      params: {
        Id: supervisorId,
      },
    }),

  createSupervisor: (
    fullName,
    gender,
    branch,
    parentDepartment,
    childDepartment,
    jobTitle,
    fptEmail,
    fuEmail,
    phone,
    contractType
  ) =>
    axios({
      method: "post",
      url: `${apiUrl}/api/v1/staff/addSupervisors`,
      headers: {
        Authorization: `Bearer ${JSON.parse(authenticationStore.appToken)}`,
        "Content-Type": "application/json",
      },
      data: {
        fullName: fullName,
        gender: gender,
        branch: branch,
        parentDepartment: parentDepartment,
        childDepartment: childDepartment,
        jobTitle: jobTitle,
        fptEmail: fptEmail,
        fuEmail: fuEmail,
        phone: phone,
        contractType: contractType,
      },
    }),
};

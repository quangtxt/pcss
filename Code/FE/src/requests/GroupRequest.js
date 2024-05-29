import axios from "axios";
import { apiUrl, oauth } from "../config";
import authenticationStore from "../stores/authenticationStore";

export const GroupRequest = {
  createGroup: (
    abbreviations,
    description,
    keywords,
    name,
    vietnameseTitle,
    selectedStudent
  ) =>
    axios({
      method: "post",
      url: `${apiUrl}/api/v1/group/create`,
      headers: {
        Authorization: `Bearer ${JSON.parse(authenticationStore.appToken)}`,
        "Content-Type": "application/json",
      },
      data: {
        abbreviations: abbreviations,
        description: description,
        keywords: keywords,
        name: name,
        vietnameseTitle: vietnameseTitle,
        listStudentID: selectedStudent,
      },
    }),
  getListInvitationToJoinGroup: () =>
    axios({
      method: "get",
      url: `${apiUrl}/api/v1/group/invitations`,
      headers: {
        Authorization: `Bearer ${JSON.parse(authenticationStore.appToken)}`,
        "Content-Type": "application/json",
      },
    }),
  getGroupByMemberId: () =>
    axios({
      method: "get",
      url: `${apiUrl}/api/v1/group/view-group`,
      headers: {
        Authorization: `Bearer ${JSON.parse(authenticationStore.appToken)}`,
        "Content-Type": "application/json",
      },
    }),
  updateInvitationStatus: (groupId, status) =>
    axios({
      method: "post",
      url: `${apiUrl}/api/v1/group/update/invitation/status`,
      headers: {
        Authorization: `Bearer ${JSON.parse(authenticationStore.appToken)}`,
        "Content-Type": "application/json",
      },
      data: {
        groupId: groupId,
        status: status,
      },
    }),
  inviteMember: (groupId, listStudentID) =>
    axios({
      method: "post",
      url: `${apiUrl}/api/v1/group/inviteMember`,
      headers: {
        Authorization: `Bearer ${JSON.parse(authenticationStore.appToken)}`,
        "Content-Type": "application/json",
      },
      data: {
        groupId: groupId,
        listStudentID: listStudentID,
      },
    }),
  updateStatus: (groupId, status, studentId) =>
    axios({
      method: "post",
      url: `${apiUrl}/api/v1/group/update/invitation/status`,
      headers: {
        Authorization: `Bearer ${JSON.parse(authenticationStore.appToken)}`,
        "Content-Type": "application/json",
      },
      data: {
        groupId: groupId,
        status: status,
        studentId: studentId,
      },
    }),
};

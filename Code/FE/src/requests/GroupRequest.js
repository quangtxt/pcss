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

  editGroup: (
    id,
    name,
    description,
    abbreviations,
    vietnameseTitle,
    keywords
  ) =>
    axios({
      method: "post",
      url: `${apiUrl}/api/v1/group/edit`,
      headers: {
        Authorization: `Bearer ${JSON.parse(authenticationStore.appToken)}`,
        "Content-Type": "application/json",
      },
      data: {
        groupId: id,
        name: name,
        description: description,
        abbreviations: abbreviations,
        vietnameseTitle: vietnameseTitle,
        keywords: keywords,
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

  updateInvitationStatus: (groupId, status, studentId) =>
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

  submitGroup: (groupId, mentorIds) =>
    axios({
      method: "post",
      url: `${apiUrl}/api/v1/group/submitGroup`,
      headers: {
        Authorization: `Bearer ${JSON.parse(authenticationStore.appToken)}`,
        "Content-Type": "application/json",
      },
      data: {
        groupId: groupId,
        mentorIds: mentorIds,
      },
    }),
  empowerOwner: (groupId, studentId) =>
    axios({
      method: "post",
      url: `${apiUrl}/api/v1/group/empowerOwner`,
      headers: {
        Authorization: `Bearer ${JSON.parse(authenticationStore.appToken)}`,
        "Content-Type": "application/json",
      },
      params: {
        groupId: groupId,
        studentId: studentId,
      },
    }),

  //memtor
  getGroupByMentorId: () =>
    axios({
      method: "get",
      url: `${apiUrl}/api/v1/group-mentor/list`,
      headers: {
        Authorization: `Bearer ${JSON.parse(authenticationStore.appToken)}`,
        "Content-Type": "application/json",
      },
    }),

  getGroupList: (pageSize, pageNumber) =>
    axios({
      method: "get",
      url: `${apiUrl}/api/v1/staff/groups`,
      headers: {
        Authorization: `Bearer ${JSON.parse(authenticationStore.appToken)}`,
        "Content-Type": "application/json",
      },
      params: {
        page: pageNumber,
        size: pageSize,
        // keyword: keyword || "",
      },
    }),

  getGroupInvitation: () =>
    axios({
      method: "get",
      url: `${apiUrl}/api/v1/group-mentor/list`,
      headers: {
        Authorization: `Bearer ${JSON.parse(authenticationStore.appToken)}`,
        "Content-Type": "application/json",
      },
    }),

  updateGroupMentorStatus: (id, status) =>
    axios({
      method: "put",
      url: `${apiUrl}/api/v1/group-mentor/${id}/status`,
      headers: {
        Authorization: `Bearer ${JSON.parse(authenticationStore.appToken)}`,
        "Content-Type": "application/json",
      },
      params: {
        status: status,
      },
    }),

  getGroupsOfMentor: () =>
    axios({
      method: "get",
      url: `${apiUrl}/api/v1/group-mentor/getGroupsOfMentor`,
      headers: {
        Authorization: `Bearer ${JSON.parse(authenticationStore.appToken)}`,
        "Content-Type": "application/json",
      },
    }),
};

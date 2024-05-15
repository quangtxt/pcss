import axios from "axios";
import { apiUrl } from "../config";
import authenticationStore from "../stores/authenticationStore";
import utils from "../utils";

export const UserRequest = {
  getUserList: (
    pageSize,
    pageNumber,
    keyword,
    department_code,
    status,
    sortDirection,
    sortBy,
    has_admin,
    sort_by_department,
    companyCode,
    positionCode
  ) =>
    axios({
      method: "get",
      url: `${apiUrl}/api/v1/users`,
      headers: {
        Authorization: `Bearer ${
          JSON.parse(authenticationStore.appToken).access_token
        }`,
        "Content-Type": "application/json",
      },
      params: {
        page: pageNumber,
        size: pageSize,
        keyword: keyword || "",
        ...(!utils.isNullish(department_code) && {
          department_code: department_code,
        }),
        ...(!utils.isNullish(status) && { status: status }),
        ...(!utils.isNullish(sortDirection) && { direction: sortDirection }),
        ...(!utils.isNullish(sortBy) && { sort_by: sortBy }),
        has_admin: has_admin,
        sort: sort_by_department,
        company_code: companyCode,
        position_code: positionCode,
      },
    }),

  updateUser: (userCode, userInfo) =>
    axios({
      method: "put",
      url: `${apiUrl}/api/v1/users/${userCode}`,
      headers: {
        Authorization: `Bearer ${
          JSON.parse(authenticationStore.appToken).access_token
        }`,
        "Content-Type": "application/json",
      },
      data: {
        company_code: userInfo.company_code.trim(),
        email: userInfo.email.trim(),
        name: userInfo.name.trim(),
        password: userInfo.password || "",
        phone: userInfo.phone.trim(),
        username: userInfo.username.trim(),
        department_code: userInfo.department_code,
        position_code: userInfo.position_code,
        gender: userInfo.gender,
        home_phone: userInfo.home_phone,
        ma_nv: userInfo.ma_nv,
        birthday: userInfo?.birthday ? userInfo?.birthday : "",
      },
    }),
  updateUserRole: (userCode, rolesArr) =>
    axios({
      method: "patch",
      url: `${apiUrl}/api/v1/users/${userCode}/roles`,
      headers: {
        Authorization: `Bearer ${
          JSON.parse(authenticationStore.appToken).access_token
        }`,
        "Content-Type": "application/json",
      },
      data: {
        role_name: rolesArr,
      },
    }),
  createUser: (userInfo) =>
    axios({
      method: "post",
      url: `${apiUrl}/api/v1/users`,
      headers: {
        Authorization: `Bearer ${
          JSON.parse(authenticationStore.appToken).access_token
        }`,
        "Content-Type": "application/json",
      },
      data: {
        company_code: userInfo.company_code.trim(),
        email: userInfo.email.trim(),
        name: userInfo.name.trim(),
        password: userInfo.password,
        phone: userInfo.phone.trim(),
        username: userInfo.username.trim(),
        department_code: userInfo.department_code,
        position_code: userInfo.position_code,
        gender: userInfo.gender,
        ma_nv: userInfo.ma_nv,
      },
    }),
  updateUserCommands: (userCode, userCommandsArr) =>
    axios({
      method: "patch",
      url: `${apiUrl}/api/v1/users/${userCode}/commands`,
      headers: {
        Authorization: `Bearer ${
          JSON.parse(authenticationStore.appToken).access_token
        }`,
        "Content-Type": "application/json",
      },
      data: {
        commands: userCommandsArr,
      },
    }),
  updateUserStatus: (userCode, userStatus) =>
    axios({
      method: "patch",
      url: `${apiUrl}/api/v1/users/${userCode}`,
      headers: {
        Authorization: `Bearer ${
          JSON.parse(authenticationStore.appToken).access_token
        }`,
        "Content-Type": "application/json",
      },
      data: {
        status: userStatus,
      },
    }),
  UpdateCurrentUser: (userInfo) =>
    axios({
      method: "put",
      url: `${apiUrl}/api/v1/users/current-user`,
      headers: {
        Authorization: `Bearer ${
          JSON.parse(authenticationStore.appToken).access_token
        }`,
        "Content-Type": "application/json",
      },
      data: userInfo,
    }),
  UpdateCurrentUserPassword: (submitData) =>
    axios({
      method: "patch",
      url: `${apiUrl}/api/v1/users/current-user/password`,
      headers: {
        Authorization: `Bearer ${
          JSON.parse(authenticationStore.appToken).access_token
        }`,
        "Content-Type": "application/json",
      },
      data: submitData,
    }),

  getListAvatar: (user_code) =>
    axios({
      method: "post",
      url: `${apiUrl}/api/v1/users/getListImage`,
      headers: {
        Authorization: `Bearer ${
          JSON.parse(authenticationStore.appToken).access_token
        }`,
        "Content-Type": "application/json",
      },
      data: {
        user_code,
      },
    }),

  getMentionUserList: (has_admin) =>
    axios({
      method: "get",
      url: `${apiUrl}/api/v1/users/user-details`,
      headers: {
        Authorization: `Bearer ${
          JSON.parse(authenticationStore.appToken).access_token
        }`,
        "Content-Type": "application/json",
      },
      params: {
        has_admin: has_admin ? has_admin : false,
      },
    }),

  preConnectCloud: () =>
    axios({
      method: "post",
      url: `${apiUrl}/api/v1/users/cloud`,
      headers: {
        Authorization: `Bearer ${
          JSON.parse(authenticationStore.appToken).access_token
        }`,
        "Content-Type": "application/json",
      },
    }),
};

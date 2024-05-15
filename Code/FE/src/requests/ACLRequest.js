import axios from "axios";
import { apiUrl } from "../config";
import authenticationStore from "../stores/authenticationStore";

export const ACLRequest = {
  getACLActionList: () =>
    axios({
      method: "get",
      url: `${apiUrl}/api/v1/acl`,
      headers: {
        Authorization: `Bearer ${
          JSON.parse(authenticationStore.appToken).access_token
        }`,
        "Content-Type": "application/json",
      },
    }),

  getACLDetail: (code) =>
    axios({
      method: "get",
      url: `${apiUrl}/api/v1/acl_group/${code}`,
      headers: {
        Authorization: `Bearer ${
          JSON.parse(authenticationStore.appToken).access_token
        }`,
        "Content-Type": "application/json",
      },
    }),

  getACLGroupList: () =>
    axios({
      method: "get",
      url: `${apiUrl}/api/v1/acl_group`,
      headers: {
        Authorization: `Bearer ${
          JSON.parse(authenticationStore.appToken).access_token
        }`,
        "Content-Type": "application/json",
      },
    }),

  updateACLGroup: (code, payload) =>
    axios({
      method: "put",
      url: `${apiUrl}/api/v1/acl_group/${code}`,
      headers: {
        Authorization: `Bearer ${
          JSON.parse(authenticationStore.appToken).access_token
        }`,
        "Content-Type": "application/json",
      },
      data: payload,
    }),

  assignACLGroup: (payload) =>
    axios({
      method: "post",
      url: `${apiUrl}/api/v1/acl_group_user`,
      headers: {
        Authorization: `Bearer ${
          JSON.parse(authenticationStore.appToken).access_token
        }`,
        "Content-Type": "application/json",
      },
      data: payload,
    }),

  createACLGroup: (payload) =>
    axios({
      method: "post",
      url: `${apiUrl}/api/v1/acl_group`,
      headers: {
        Authorization: `Bearer ${
          JSON.parse(authenticationStore.appToken).access_token
        }`,
        "Content-Type": "application/json",
      },
      data: payload,
    }),

  getACLDetailByUser: (userName) =>
    axios({
      method: "get",
      url: `${apiUrl}/api/v1/acl_group_user/${userName}`,
      headers: {
        Authorization: `Bearer ${
          JSON.parse(authenticationStore.appToken).access_token
        }`,
        "Content-Type": "application/json",
      },
    }),

  deleteACLGroup: (code) =>
    axios({
      method: "delete",
      url: `${apiUrl}/api/v1/acl_group/${code}`,
      headers: {
        Authorization: `Bearer ${
          JSON.parse(authenticationStore.appToken).access_token
        }`,
        "Content-Type": "application/json",
      },
    }),

  cloneACLGroup: (code) =>
    axios({
      method: "post",
      url: `${apiUrl}/api/v1/acl_group/${code}/clone`,
      headers: {
        Authorization: `Bearer ${
          JSON.parse(authenticationStore.appToken).access_token
        }`,
        "Content-Type": "application/json",
      },
    }),
};

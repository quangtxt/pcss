import axios from "axios";
import { apiUrl } from "../config";
import authenticationStore from "../stores/authenticationStore";

export const CommandRequest = {
  getCommandList: () =>
    axios({
      method: "get",
      url: `${apiUrl}/api/v1/commands`,
      headers: {
        Authorization: `Bearer ${
          JSON.parse(authenticationStore.appToken).access_token
        }`,
        "Content-Type": "application/json",
      },
    }),
  getCommandsByUser: (userCode) =>
    axios({
      method: "get",
      url: `${apiUrl}/api/v1/commands/users/${userCode}`,
      headers: {
        Authorization: `Bearer ${
          JSON.parse(authenticationStore.appToken).access_token
        }`,
        "Content-Type": "application/json",
      },
    }),
  getSideMenuCounter: (types) =>
    axios({
      method: "get",
      url: `${apiUrl}/api/v1/dashboard/sidemenu_counter?${
        types ? types.map((type) => `type=${type}`).join("&") : ""
      }`,
      headers: {
        Authorization: `Bearer ${
          JSON.parse(authenticationStore.appToken).access_token
        }`,
        "Content-Type": "application/json",
      },
    }),
};

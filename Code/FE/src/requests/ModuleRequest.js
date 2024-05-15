import axios from "axios";
import { apiUrl } from "../config";
import authenticationStore from "../stores/authenticationStore";

export const ModuleRequest = {
  getModuleList: () =>
    axios({
      method: "get",
      url: `${apiUrl}/api/v1/module`,
      headers: {
        Authorization: `Bearer ${
          JSON.parse(authenticationStore.appToken).access_token
        }`,
        "Content-Type": "application/json",
      },
    }),

  updateModules: (payload) =>
    axios({
      method: "put",
      url: `${apiUrl}/api/v1/module`,
      headers: {
        Authorization: `Bearer ${
          JSON.parse(authenticationStore.appToken).access_token
        }`,
        "Content-Type": "application/json",
      },
      data: payload,
    }),
};

import axios from "axios";
import qs from "querystring";
import { apiUrl, oauth } from "../config";
import authenticationStore from "../stores/authenticationStore";

export const AuthenticationRequest = {
  // userLogin: (identifier, password) =>
  //   axios({
  //     method: "post",
  //     url: `${apiUrl}/api/v1/oauth/token`,
  //     headers: {
  //       Authorization: `Basic ${Buffer.from(
  //         `${oauth.clientId}:${oauth.clientSecret}`,
  //         "utf8"
  //       ).toString("base64")}`,
  //       "Content-Type": "application/x-www-form-urlencoded",
  //     },
  //     data: qs.stringify({
  //       username: identifier,
  //       password: password,
  //       grant_type: "password",
  //       scope: "openid",
  //     }),
  //   }),
  userLogin: (identifier, password) =>
    axios({
      method: "post",
      url: `${apiUrl}/api/v1/auth/token`,
      data: {
        username: identifier,
        password: password,
      },
    }),
  userLoginWithGoogle: (email, campus) =>
    axios({
      method: "post",
      url: `${apiUrl}/api/v1/auth/check-user`,
      data: {
        email: email,
        campus: campus,
      },
    }),

  checkCurrentUser: () =>
    axios({
      method: "get",
      url: `${apiUrl}/api/v1/users/current-user`,
      headers: {
        Authorization: `Bearer ${JSON.parse(authenticationStore.appToken)}`,
        "Content-Type": "application/json",
      },
    }),

  updateCurrentUserAvatar: (formData) =>
    axios({
      method: "patch",
      url: `${apiUrl}/api/v1/users/current-user/image`,
      headers: {
        Authorization: `Bearer ${JSON.parse(authenticationStore.appToken)}`,
        "Content-Type": "multipart/form-data",
      },
      data: formData,
    }),

  getCurrentUserAvatar: () =>
    axios({
      method: "get",
      url: `${apiUrl}/api/v1/users/current-user/image`,
      headers: {
        Authorization: `Bearer ${JSON.parse(authenticationStore.appToken)}`,
        "Content-Type": "image/jpeg",
      },
      responseType: "blob",
    }),
};

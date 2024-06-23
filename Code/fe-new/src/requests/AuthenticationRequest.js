import axios from "axios";
import authenticationStore from "../stores/authenticationStore";
const apiUrl = import.meta.env.VITE_API_URL;
export const AuthenticationRequest = {
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

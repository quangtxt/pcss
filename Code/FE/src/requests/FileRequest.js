import axios from "axios";
import { apiUrl, apiUrlTruc } from "../config";
import authenticationStore from "../stores/authenticationStore";

export const FileRequest = {
  uploadFile: (formData) =>
    axios({
      method: "post",
      url: `${apiUrl}/api/v1/upload`,
      headers: {
        Authorization: `Bearer ${
          JSON.parse(authenticationStore.appToken).appToken
        }`,
        "Content-Type": "multipart/form-data",
      },
      timeout: 0,
      data: formData,
    }),

  downloadAttachment: (file_id) =>
    axios({
      method: "get",
      url: `${apiUrl}/api/v1/upload/attachments/${file_id}`,
      headers: {
        Authorization: `Bearer ${
          JSON.parse(authenticationStore.appToken).appToken
        }`,
        "Content-Type": "application/json",
      },
      responseType: "blob",
    }),

  renameFile: (file_id, file_name) =>
    axios({
      method: "patch",
      url: `${apiUrl}/api/v1/upload/attachments/${file_id}`,
      headers: {
        Authorization: `Bearer ${
          JSON.parse(authenticationStore.appToken).appToken
        }`,
        "Content-Type": "application/json",
      },
      responseType: "blob",
      data: {
        file_name: file_name,
      },
    }),
  uploadExcel: (formData) =>
    axios({
      method: "post",
      url: `${apiUrl}/api/v1/time-sheet/upload-excel`,
      headers: {
        Authorization: `Bearer ${
          JSON.parse(authenticationStore.appToken).appToken
        }`,
        "Content-Type": "multipart/form-data",
      },
      timeout: 0,
      data: formData,
    }),

  sendDataExcel: (formData) =>
    axios({
      method: "post",
      url: `${apiUrl}/api/v1/import-excel`,
      headers: {
        Authorization: `Bearer ${
          JSON.parse(authenticationStore.appToken).appToken
        }`,
        "Content-Type": "application/json",
      },
      data: formData,
    }),
  createUsersFromExcel: (userInfo) =>
    axios({
      method: "post",
      url: `${apiUrl}/api/v1/addStudents`,
      headers: {
        Authorization: `Bearer ${
          JSON.parse(authenticationStore.appToken).appToken
        }`,
        "Content-Type": "application/json",
      },
      data: userInfo,
    }),
  downloadTemplateAccount: () =>
    axios({
      method: "get",
      url: `${apiUrl}/api/v1/template-account`,
      headers: {
        Authorization: `Bearer ${
          JSON.parse(authenticationStore.appToken).appToken
        }`,
        "Content-Type": "application/json",
      },
      responseType: "blob",
    }),
};

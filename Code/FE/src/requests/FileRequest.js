import axios from "axios";
import { apiUrl, apiUrlTruc } from "../config";
import authenticationStore from "../stores/authenticationStore";

export const FileRequest = {
  sendDataExcelStudent: (formData) =>
    axios({
      method: "post",
      url: `${apiUrl}/api/v1/import-excel/students`,
      headers: {
        Authorization: `Bearer ${JSON.parse(authenticationStore.appToken)}`,
        "Content-Type": "application/json",
      },
      data: formData,
    }),
  createStudentsFromExcel: (userInfo) =>
    axios({
      method: "post",
      url: `${apiUrl}/api/v1/save-data/students`,
      headers: {
        Authorization: `Bearer ${JSON.parse(authenticationStore.appToken)}`,
        "Content-Type": "application/json",
      },
      data: userInfo,
    }),
  downloadTemplateAccountStudent: () =>
    axios({
      method: "get",
      url: `${apiUrl}/api/v1/template/student`,
      headers: {
        Authorization: `Bearer ${JSON.parse(authenticationStore.appToken)}`,
        "Content-Type": "application/json",
      },
      responseType: "blob",
    }),
  sendDataExcelSupervisor: (formData) =>
    axios({
      method: "post",
      url: `${apiUrl}/api/v1/import-excel/supervisors`,
      headers: {
        Authorization: `Bearer ${JSON.parse(authenticationStore.appToken)}`,
        "Content-Type": "application/json",
      },
      data: formData,
    }),
  createSupervisorsFromExcel: (userInfo) =>
    axios({
      method: "post",
      url: `${apiUrl}/api/v1/save-data/supervisors`,
      headers: {
        Authorization: `Bearer ${JSON.parse(authenticationStore.appToken)}`,
        "Content-Type": "application/json",
      },
      data: userInfo,
    }),
  downloadTemplateAccountSupervisor: () =>
    axios({
      method: "get",
      url: `${apiUrl}/api/v1/template/supervisor`,
      headers: {
        Authorization: `Bearer ${JSON.parse(authenticationStore.appToken)}`,
        "Content-Type": "application/json",
      },
      responseType: "blob",
    }),
  sendDataExcelGroup: (formData) =>
    axios({
      method: "post",
      url: `${apiUrl}/api/v1/import-excel/groups`,
      headers: {
        Authorization: `Bearer ${JSON.parse(authenticationStore.appToken)}`,
        "Content-Type": "application/json",
      },
      data: formData,
    }),
  createGroupsFromExcel: (userInfo) =>
    axios({
      method: "post",
      url: `${apiUrl}/api/v1/save-data/groups`,
      headers: {
        Authorization: `Bearer ${JSON.parse(authenticationStore.appToken)}`,
        "Content-Type": "application/json",
      },
      data: userInfo,
    }),
  downloadTemplateAccountGroup: () =>
    axios({
      method: "get",
      url: `${apiUrl}/api/v1/template/group`,
      headers: {
        Authorization: `Bearer ${JSON.parse(authenticationStore.appToken)}`,
        "Content-Type": "application/json",
      },
      responseType: "blob",
    }),
};

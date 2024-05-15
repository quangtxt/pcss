import axios from "axios";
import { apiUrl } from "../config";
import authenticationStore from "../stores/authenticationStore";

export const AccountRequest = {
  getAccountsByUserCode: (userCode) =>
    axios({
      method: "get",
      url: `${apiUrl}/api/v1/accounts`,
      headers: {
        Authorization: `Bearer ${
          JSON.parse(authenticationStore.appToken).access_token
        }`,
        "Content-Type": "application/json",
      },
      params: {
        user_code: userCode,
      },
    }),
  updateAccountById: (accountId, accountInfo) =>
    axios({
      method: "put",
      url: `${apiUrl}/api/v1/accounts/${accountId}`,
      headers: {
        Authorization: `Bearer ${
          JSON.parse(authenticationStore.appToken).access_token
        }`,
        "Content-Type": "application/json",
      },
      data: {
        alias: accountInfo.alias?.trim(),
        account_name: accountInfo.account_name.trim(),
        password: accountInfo.password,
      },
    }),
  deleteAccountById: (accountId) =>
    axios({
      method: "delete",
      url: `${apiUrl}/api/v1/accounts/${accountId}`,
      headers: {
        Authorization: `Bearer ${
          JSON.parse(authenticationStore.appToken).access_token
        }`,
        "Content-Type": "application/json",
      },
    }),
  createAccount: (accountInfo) =>
    axios({
      method: "post",
      url: `${apiUrl}/api/v1/accounts`,
      headers: {
        Authorization: `Bearer ${
          JSON.parse(authenticationStore.appToken).access_token
        }`,
        "Content-Type": "application/json",
      },
      data: {
        alias: accountInfo.alias.trim(),
        account_name: accountInfo.account_name.trim(),
        command_code: accountInfo.command_code,
        password: accountInfo.password,
        user_code: accountInfo.user_code,
      },
    }),
  switchAccount: (accountId) =>
    axios({
      method: "put",
      url: `${apiUrl}/api/v1/accounts/${accountId}/switch`,
      headers: {
        Authorization: `Bearer ${
          JSON.parse(authenticationStore.appToken).access_token
        }`,
      },
    }),
  getCurrentUserAccount: () =>
    axios({
      method: "get",
      url: `${apiUrl}/api/v1/accounts/current-user`,
      headers: {
        Authorization: `Bearer ${
          JSON.parse(authenticationStore.appToken).access_token
        }`,
        "Content-Type": "application/json",
      },
    }),
};

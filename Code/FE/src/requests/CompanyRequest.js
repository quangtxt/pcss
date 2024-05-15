import axios from "axios";
import { apiUrl } from "../config";
import authenticationStore from "../stores/authenticationStore";

export const CompanyRequest = {
  getCompanyList: () =>
    axios({
      method: "get",
      url: `${apiUrl}/api/v1/companies`,
      headers: {
        Authorization: `Bearer ${
          JSON.parse(authenticationStore.appToken).access_token
        }`,
        "Content-Type": "application/json",
      },
      params: {
        status: true,
      },
    }),
  getUserListWithRole: (role_name, company_code) =>
    axios({
      method: "get",
      url: `${apiUrl}/api/v1/companies/${company_code}/users`,
      headers: {
        Authorization: `Bearer ${
          JSON.parse(authenticationStore.appToken).access_token
        }`,
        "Content-Type": "application/json",
      },
      params: {
        code: company_code,
        role_name: role_name,
      },
    }),
};

import axios from "axios";
import { apiUrl } from "../config";
import authenticationStore from "../stores/authenticationStore";
import utils from "../utils";

export const SemesterRequest = {
  getSemesters: () =>
    axios({
      method: "get",
      url: `${apiUrl}/api/v1/semester/gets`,
      headers: {
        Authorization: `Bearer ${JSON.parse(authenticationStore.appToken)}`,
        "Content-Type": "application/json",
      },
      // params: {
      //   page: pageNumber,
      //   size: pageSize
      //   // keyword: keyword || "",
      // },
    }),
};

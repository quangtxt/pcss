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
  createSemester: (code, name, begin_at, end_at, list_phase) =>
    axios({
      method: "post",
      url: `${apiUrl}/api/v1/semester/created`,
      headers: {
        Authorization: `Bearer ${JSON.parse(authenticationStore.appToken)}`,
        "Content-Type": "application/json",
      },
      data: {
        code: code,
        name: name,
        beginAt: begin_at,
        endAt: end_at,
        phases: list_phase,
      },
    }),
};

import axios from "axios";
import { apiUrl } from "../config";
import authenticationStore from "../stores/authenticationStore";
import utils from "../utils";

export const UserRequest = {
  getUserNotificationList: (filterUnread, pageIndex, pageSize) =>
    axios({
      method: "get",
      url: `${apiUrl}/api/v1/user-notification`,
      headers: {
        Authorization: `Bearer ${JSON.parse(authenticationStore.appToken)}`,
        "Content-Type": "application/json",
      },
      params: {
        page: pageIndex,
        size: pageSize,
        filter_unread: filterUnread,
      },
    }),
};

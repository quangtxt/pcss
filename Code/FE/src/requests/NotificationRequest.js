import axios from "axios";
import { apiUrl } from "../config";
import authenticationStore from "../stores/authenticationStore";
import utils from "../utils";

export const NotificationRequest = {
  getUserNotification: (
    notificationListPageIndex,
    notificationListPageSize,
    only_news_notification,
    filterUnread
  ) =>
    axios({
      method: "get",
      url: `${apiUrl}/api/v1/user-notification`,
      headers: {
        Authorization: `Bearer ${JSON.parse(authenticationStore.appToken)}`,
        "Content-Type": "application/json",
      },
      params: {
        page: notificationListPageIndex,
        size: notificationListPageSize,
        onlynews_notification: only_news_notification,
        filter_unread: filterUnread,
      },
    }),

  updateNotificationStatus: (id) =>
    axios({
      method: "post",
      url: `${apiUrl}/api/v1/user-notification/updateNotificationStatus/${id}`,
      headers: {
        Authorization: `Bearer ${JSON.parse(authenticationStore.appToken)}`,
        "Content-Type": "application/json",
      },
    }),
};

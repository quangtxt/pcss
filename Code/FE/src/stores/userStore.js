import { action, observable } from "mobx";
import { UserRequest } from "../requests/UserRequest";
import { message } from "antd";
import utils from "../utils";

class UserStore {
  @observable userNotificationList = [];
  @observable userNotificationListTotalCount = 0;
  @observable userNotificationListPageIndex = 0;
  @observable userNotificationListPageSize = 5;

  @action
  getUserNotificationList = (filterUnread) => {
    return new Promise((resolve, reject) => {
      UserRequest.getCurrentUserNotification(
        this.userNotificationListPageIndex,
        this.userNotificationListPageSize,
        filterUnread
      )
        .then((response) => {
          this.userNotificationList = response.data.content;
          this.userNotificationListTotalCount = response.data.totalElements;
          resolve(response);
        })
        .catch((error) => {
          console.log("error", error);
          reject(error);
        });
    });
  };

  @action setFilter = (filterName, filterValue) => {
    if (typeof filterName !== "string") return;
    this[filterName] = filterValue;
  };

  /** Clears the user notification list store */
  clearStore = () => {
    this.userNotificationList = [];
    this.userNotificationListTotalCount = 0;
    this.userNotificationListPageIndex = 0;
    this.userNotificationListPageSize = 5;
  };
}

export default new UserStore();

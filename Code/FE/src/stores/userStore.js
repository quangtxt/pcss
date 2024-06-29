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
      console.log("mes", filterUnread);
      UserRequest.getUserNotificationList(
        filterUnread,
        this.userNotificationListPageIndex,
        this.userNotificationListPageSize
      )
        .then((response) => {
          console.log("Response data", response.data.content);
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

  /** Clears the user notification list store */
  clearStore = () => {
    this.userNotificationList = [];
    this.userNotificationListTotalCount = 0;
    this.userNotificationListPageIndex = 0;
    this.userNotificationListPageSize = 5;
    console.log("clearStore userStore");
  };
}

export default new UserStore();

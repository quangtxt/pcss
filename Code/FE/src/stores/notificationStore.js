import { action, observable } from "mobx";
// Request
// import { NotificationRequest } from "../requests/NotificationRequest";
import { UserRequest } from "../requests/UserRequest";
import { NotificationRequest } from "../requests/NotificationRequest";
class NotificationStore {
  @action setFilter = (filterName, filterValue) => {
    if (typeof filterName !== "string") return;
    this[filterName] = filterValue;
  };

  /** Notification list */
  @observable notificationList = [];
  @observable notificationListTotal = [];
  @observable unreadNotificationCount = 0;
  @observable unreadNewsCount = 0;
  @observable notificationListPageSize = 30;
  @observable notificationListPageIndex = 0;
  @observable notificationListTotalPage = undefined;
  @observable notificationListTotalCount = undefined;
  @observable notificationType = null;

  @action setNotificationType = (type) => {
    this.notificationType = {
      type: type,
    };
  };
  @action clearNotificationType = () => {
    this.notificationType = null;
  };

  @action getCurrentUserNotification = (
    only_news_notification,
    filter_unread
  ) => {
    return new Promise((resolve, reject) => {
      NotificationRequest.getUserNotification(
        this.notificationListPageIndex,
        this.notificationListPageSize,
        only_news_notification,
        filter_unread
      )
        .then((response) => {
          this.notificationList = response.data.data;
          this.notificationListTotalPage = response.data.total_page;
          this.notificationListTotalCount = response.data.total_count;
          if (only_news_notification === "true") {
            this.unreadNewsCount = response.data.totalUnread;
          }
          if (only_news_notification === "false") {
            this.unreadNotificationCount = response.data.totalUnread;
          }
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  @action markAllAsRead = (only_news_notification) => {
    return new Promise((resolve, reject) => {
      NotificationRequest.markAllAsRead(only_news_notification)
        .then((response) => resolve(response))
        .catch((error) => reject(error));
    });
  };

  @action getUnreadNotificationCount = () => {
    return new Promise((resolve, reject) => {
      NotificationRequest.getUserNotification(0, 3, false, false)
        .then((response) => {
          this.notificationList = response.data.content;
          this.notificationListTotalPage = response.data.total_page;
          this.notificationListTotalCount = response.data.total_count;
          this.unreadNotificationCount = response.data.totalUnread;
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  @action getUnreadNewsCount = () => {
    return new Promise((resolve, reject) => {
      NotificationRequest.getUserNotification(0, 3, true, false)
        .then((response) => {
          this.notificationList = response.data.content;
          this.notificationListTotalPage = response.data.total_page;
          this.notificationListTotalCount = response.data.total_count;
          this.unreadNewsCount = response.data.totalUnread;
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  @action setUnreadNotificationCount = (type) => {
    if (type === "remove") {
      this.unreadNotificationCount =
        this.unreadNotificationCount - 1 < 0
          ? 0
          : this.unreadNotificationCount - 1;
    } else {
      this.unreadNotificationCount = this.unreadNotificationCount + 1;
    }
  };

  @action setUnreadNewsCount = (type) => {
    type === "remove"
      ? (this.unreadNewsCount =
          this.unreadNewsCount - 1 < 0 ? 0 : this.unreadNewsCount - 1)
      : (this.unreadNewsCount = this.unreadNewsCount + 1);
  };

  @action readNotification = (notification_id) => {
    return new Promise((resolve, reject) => {
      NotificationRequest.updateNotificationStatus(notification_id)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
  @action pushNotification = (newNotification) => {
    if (
      this.notificationList.findIndex(
        (item) => item.id === newNotification.id
      ) === -1
    ) {
      this.notificationList.unshift(newNotification);
    }
  };
  //firebase
  @action sendTokenToSever = (token) => {
    return new Promise((resolve, reject) => {
      NotificationRequest.sendTokenToSever(token)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  @action clearStore = () => {
    this.notificationList = [];
    this.notificationListTotal = [];
    // this.unreadNotificationCount = 0
    // this.unreadNewsCount = 0
    this.notificationListPageSize = 30;
    this.notificationListPageIndex = 0;
    this.notificationListTotalPage = undefined;
    this.notificationListTotalCount = undefined;
  };
}

export default new NotificationStore();

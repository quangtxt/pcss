// Request
// import { NotificationRequest } from "../requests/NotificationRequest";

class NotificationStore {
  setFilter = (filterName, filterValue) => {
    if (typeof filterName !== "string") return;
    this[filterName] = filterValue;
  };

  /** Notification list */
  notificationList = [];
  notificationListTotal = [];
  unreadNotificationCount = 0;
  unreadNewsCount = 0;
  notificationListPageSize = 30;
  notificationListPageIndex = 0;
  notificationListTotalPage = undefined;
  notificationListTotalCount = undefined;
  notificationType = null;

  setNotificationType = (type) => {
    this.notificationType = {
      type: type,
    };
  };
  clearNotificationType = () => {
    this.notificationType = null;
  };

  getCurrentUserNotification = (only_news_notification, filter_unread) => {
    return new Promise((resolve, reject) => {
      NotificationRequest.getCurrentUserNotification(
        this.notificationListPageIndex,
        this.notificationListPageSize,
        only_news_notification,
        filter_unread || null
      )
        .then((response) => {
          this.notificationList = response.data.data;
          this.notificationListTotalPage = response.data.total_page;
          this.notificationListTotalCount = response.data.total_count;
          if (only_news_notification === "true") {
            this.unreadNewsCount = response.data.total_unread;
          }
          if (only_news_notification === "false") {
            this.unreadNotificationCount = response.data.total_unread;
          }

          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
  markAllAsRead = (only_news_notification) => {
    return new Promise((resolve, reject) => {
      NotificationRequest.markAllAsRead(only_news_notification)
        .then((response) => resolve(response))
        .catch((error) => reject(error));
    });
  };

  getUnreadNotificationCount = () => {
    return new Promise((resolve, reject) => {
      NotificationRequest.getCurrentUserNotification(0, 1, false)
        .then((response) => {
          this.notificationList = response.data.data;
          this.notificationListTotalPage = response.data.total_page;
          this.notificationListTotalCount = response.data.total_count;
          this.unreadNotificationCount = response.data.total_unread;
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  setUnreadNotificationCount = (type) => {
    if (type === "remove") {
      this.unreadNotificationCount =
        this.unreadNotificationCount - 1 < 0
          ? 0
          : this.unreadNotificationCount - 1;
    } else {
      this.unreadNotificationCount = this.unreadNotificationCount + 1;
    }
  };

  getUnreadNewsCount = () => {
    return new Promise((resolve, reject) => {
      NotificationRequest.getCurrentUserNotification(0, 1, true)
        .then((response) => {
          this.unreadNewsCount = response.data.total_unread;
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  setUnreadNewsCount = (type) => {
    type === "remove"
      ? (this.unreadNewsCount =
          this.unreadNewsCount - 1 < 0 ? 0 : this.unreadNewsCount - 1)
      : (this.unreadNewsCount = this.unreadNewsCount + 1);
  };

  readNotification = (notification_id) => {
    return new Promise((resolve, reject) => {
      NotificationRequest.readNotification(notification_id)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
  pushNotification = (newNotification) => {
    if (
      this.notificationList.findIndex(
        (item) => item.id === newNotification.id
      ) === -1
    ) {
      this.notificationList.unshift(newNotification);
    }
  };
  //firebase
  sendTokenToSever = (token) => {
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

  clearStore = () => {
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

package com.pcms.be.service;

import com.pcms.be.errors.ServiceException;
import com.pcms.be.pojo.response.PageUserNotificationResponse;
import com.pcms.be.pojo.response.UserNotificationResponse;
import org.springframework.data.domain.PageRequest;

public interface UserNotificationService {
    PageUserNotificationResponse getNotifications(boolean onlyNewsNotification, boolean filterUnread, PageRequest pageRequest) throws ServiceException;

    UserNotificationResponse updateNotificationStatus(String notificationId) throws ServiceException;
    void updateAllNotificationStatusToRead() throws ServiceException;
}

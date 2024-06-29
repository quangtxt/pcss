package com.pcms.be.service;

import com.pcms.be.errors.ServiceException;
import com.pcms.be.pojo.response.UserNotificationResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface UserNotificationService {
    Page<UserNotificationResponse> getNotifications(Boolean filterUnread, Pageable pageable) throws ServiceException;

    UserNotificationResponse updateNotificationStatus(String notificationId) throws ServiceException;
    void updateAllNotificationStatusToRead() throws ServiceException;
}

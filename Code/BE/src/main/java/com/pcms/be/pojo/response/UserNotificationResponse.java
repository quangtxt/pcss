package com.pcms.be.pojo.response;

import com.pcms.be.domain.Notification;
import com.pcms.be.pojo.DTO.NotificationDTO;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserNotificationResponse {
    private Long id;
    private String userName;
    private Long notificationId;
    private Boolean status = Boolean.FALSE;
    private NotificationDTO notification;
}

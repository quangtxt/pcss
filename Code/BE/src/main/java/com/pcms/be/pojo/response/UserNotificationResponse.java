package com.pcms.be.pojo.response;

import com.pcms.be.pojo.DTO.NotificationDTO;
import com.pcms.be.pojo.DTO.UserDTO;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserNotificationResponse {
    private Long id;
    private UserDTO user;
    private Boolean status = Boolean.FALSE;
    private NotificationDTO notification;
}

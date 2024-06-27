package com.pcms.be.service;

//import com.pcms.be.domain.Notification;
import org.springframework.http.ResponseEntity;

import java.util.Map;

public interface NotificationService {
//    Notification createNotification(String templateName,String[] args);
//    String createNotification_V2(String template, Map<String, String> mapData);
    void createJoinGroupNotification();
}

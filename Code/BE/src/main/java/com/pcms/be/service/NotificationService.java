package com.pcms.be.service;

import com.pcms.be.domain.Notification;

import java.util.Map;

public interface NotificationService {
    Notification createNotification(String templateName,String[] args);
}

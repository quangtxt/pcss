package com.pcms.be.service.impl;

import com.pcms.be.domain.Notification;
import com.pcms.be.repository.NotificationRepository;
import com.pcms.be.service.NotificationService;
import lombok.Getter;
import lombok.Setter;
import org.springframework.stereotype.Service;

import java.text.MessageFormat;
import java.util.Arrays;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

@Service
public class NotificationServiceImpl implements NotificationService {
    private final NotificationRepository notificationRepository;
    private Map<String, String> NOTIFICATION_TEMPLATES;
    public NotificationServiceImpl(NotificationRepository notificationRepository) {
        this.notificationRepository = notificationRepository;
        NOTIFICATION_TEMPLATES = initNotificationTemplates();
    }
    private Map<String, String> initNotificationTemplates() {
        Map<String, String> templates = new HashMap<>();
        templates.put("template_1", "Xin chào %0s ! Đây là thông báo từ template 1.");
        templates.put("template_2", "Xin chào %0s ! Đây là thông báo từ template 1.");
        return Collections.unmodifiableMap(templates);
    }
    @Override
    public Notification createNotification(String templateName, String[] args) {

        String content = "";
        if (NOTIFICATION_TEMPLATES.containsKey(templateName)) {
            String template = NOTIFICATION_TEMPLATES.get(templateName);
            content = formatNotificationTemplate(template, args);
        }
        Notification notification = new Notification();
        notification.setContent(content);
        notificationRepository.save(notification);
        return notification;
    }
    private String formatNotificationTemplate(String template, Object... args) {
        for (int i = 0; i < args.length; i++) {
            String placeholder = "%" + i + "s";
            template = template.replace(placeholder, String.valueOf(args[i]));
        }
        return template;
    }
    @Getter
    @Setter
    public class NotificationTemplate {
        private String template;
        private String content;

        public NotificationTemplate(String template, String content) {
            this.template = template;
            this.content = content;
        }
    }
}

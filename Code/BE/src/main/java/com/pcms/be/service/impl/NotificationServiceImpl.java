package com.pcms.be.service.impl;

import com.pcms.be.domain.Notification;
import com.pcms.be.domain.user.Group;
import com.pcms.be.domain.user.Member;
import com.pcms.be.domain.user.User;
import com.pcms.be.domain.user.UserNotification;
import com.pcms.be.functions.Constants;
import com.pcms.be.functions.NotificationTemplate;
import com.pcms.be.repository.*;
import com.pcms.be.service.NotificationService;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
@RequiredArgsConstructor
public class NotificationServiceImpl implements NotificationService {
    private final NotificationRepository notificationRepository;
    private final GroupRepository groupRepository;
    private final UserRepository userRepository;
    private Map<String, String> NOTIFICATION_TEMPLATES;
//    private final StudentRepository studentRepository;
    private final UserNotificationRepository userNotificationRepository;

    //    public NotificationServiceImpl(NotificationRepository notificationRepository,
//                                   StudentRepository studentRepository) {
//        this.notificationRepository = notificationRepository;
//        NOTIFICATION_TEMPLATES = initNotificationTemplates();
//        this.studentRepository = studentRepository;
//    }
    private Map<String, String> initNotificationTemplates() {
        Map<String, String> templates = new HashMap<>();
        templates.put("template_1", "Xin chào %0s ! Đây là thông báo từ template 1.");
        templates.put("template_2", "Xin chào %0s ! Đây là thông báo từ template 1.");
        return Collections.unmodifiableMap(templates);
    }
//    @Override
//    public Notification createNotification(String templateName, String[] args) {
//
//        String content = "";
//        if (NOTIFICATION_TEMPLATES.containsKey(templateName)) {
//            String template = NOTIFICATION_TEMPLATES.get(templateName);
//            content = formatNotificationTemplate(template, args);
//        }
//        Notification notification = new Notification();
//        notification.setContent(content);
//        notificationRepository.save(notification);
//        return notification;
//    }

    public String createNotification(String template, Map<String, String> mapData) {
        for (Map.Entry<String, String> entry : mapData.entrySet()) {
            template = template.replaceAll(entry.getKey(), entry.getValue());
        }
        return template;
    }

    @Override
    @Transactional
    public void createJoinGroupNotification() {
        List<Group> groups = groupRepository.findAll();
        for (Group gr : groups) {
            Map<String, String> map = new HashMap<>();
            String listMember = "";
            String leaderName = "";
            List<User> users = new ArrayList<>();
            for (Member m : gr.getMembers()) {
                listMember += m.getStudent().getUser().getName() + ";";
                users.add(m.getStudent().getUser());
                if (m.getRole().equals(Constants.MemberRole.OWNER)) {
                    leaderName = m.getStudent().getUser().getName();
                }
            }

            map.put("_ListMember-txt", listMember.substring(0, listMember.length() - 1));
            map.put("_GroupName-txt_", gr.getName());
            map.put("_Leader-txt_", leaderName);
            String notification_txt = createNotification(NotificationTemplate.UserNotificationTemplate.joinGroupTemplate, map);
            Notification notification = new Notification();
            notification.setContent(notification_txt);
            notificationRepository.save(notification);
            for (User u : users){
                UserNotification userNotification = new UserNotification();
                userNotification.setNotification(notification);
                userNotification.setUser(u);
                userNotification.setStatus(false);
                userNotificationRepository.save(userNotification);

            }

        }
    }

    private String formatNotificationTemplate(String template, Object... args) {
        for (int i = 0; i < args.length; i++) {
            String placeholder = "%" + i + "s";
            template = template.replace(placeholder, String.valueOf(args[i]));
        }
        return template;
    }
//    @Getter
//    @Setter
//    public class NotificationTemplate {
//        private String template;
//        private String content;
//
//        public NotificationTemplate(String template, String content) {
//            this.template = template;
//            this.content = content;
//        }
//    }
}

package com.pcms.be.service.impl;

import com.pcms.be.domain.Notification;
import com.pcms.be.domain.Semester;
import com.pcms.be.domain.user.*;
import com.pcms.be.functions.Constants;
import com.pcms.be.functions.NotificationTemplate;
import com.pcms.be.pojo.request.CreateMeetingRequest;
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
    private final UserNotificationRepository userNotificationRepository;


    @Override
    public String createContentNotification(String template, Map<String, String> mapData) {
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
            String notification_txt = createContentNotification(NotificationTemplate.UserNotification.joinGroupTemplate, map);
            Notification notification = new Notification();
            notification.setContent(notification_txt);
            notificationRepository.save(notification);
            for (User u : users) {
                UserNotification userNotification = new UserNotification();
                userNotification.setNotification(notification);
                userNotification.setUser(u);
                userNotification.setStatus(false);
                userNotificationRepository.save(userNotification);
            }
        }
    }

    @Override
    @Transactional
    public void createMemberJoinGroupNotification(Member member) {
        Group group = member.getGroup();
        Map<String, String> map = new HashMap<>();
        map.put("_User-txt_", member.getStudent().getUser().getName());
        String notification_txt = createContentNotification(NotificationTemplate.UserNotification.memberAcceptJoinGroup, map);
        Notification notification = new Notification();
        notification.setContent(notification_txt);
        notification.setType(NotificationTemplate.NotificationType.GROUP);
        notificationRepository.save(notification);
        for (Member m : group.getMembers()) {
            if (m.equals(member)) {
                continue;
            }
            if (m.getStatus().equals(Constants.MemberStatus.INGROUP)) {
                UserNotification userNotification = new UserNotification();
                userNotification.setNotification(notification);
                userNotification.setUser(m.getStudent().getUser());
                userNotification.setStatus(false);
                userNotificationRepository.save(userNotification);
            }
        }
    }

    @Override
    public void createMemberOutGroupNotification(Member member) {
        Group group = member.getGroup();
        Map<String, String> map = new HashMap<>();
        map.put("_User-txt_", member.getStudent().getUser().getName());
        String notification_txt = createContentNotification(NotificationTemplate.UserNotification.memberOutGroup, map);
        Notification notification = new Notification();
        notification.setContent(notification_txt);
        notification.setType(NotificationTemplate.NotificationType.GROUP);
        notificationRepository.save(notification);
        for (Member m : group.getMembers()) {
            if (m.equals(member)) {
                continue;
            }
            if (m.getStatus().equals(Constants.MemberStatus.INGROUP)) {
                UserNotification userNotification = new UserNotification();
                userNotification.setNotification(notification);
                userNotification.setUser(m.getStudent().getUser());
                userNotification.setStatus(false);
                userNotificationRepository.save(userNotification);
            }
        }
    }

    @Override
    public void createRejectJoinGroupNotification(Member member) {
        Group group = member.getGroup();
        Map<String, String> map = new HashMap<>();
        map.put("_User-txt_", member.getStudent().getUser().getName());
        String notification_txt = createContentNotification(NotificationTemplate.UserNotification.memberRejectJoinGroup, map);
        Notification notification = new Notification();
        notification.setContent(notification_txt);
        notification.setType(NotificationTemplate.NotificationType.GROUP);
        notificationRepository.save(notification);
        for (Member m : group.getMembers()) {
            if (m.getRole().equals(Constants.MemberRole.OWNER)) {
                UserNotification userNotification = new UserNotification();
                userNotification.setNotification(notification);
                userNotification.setUser(m.getStudent().getUser());
                userNotification.setStatus(false);
                userNotificationRepository.save(userNotification);
            }
        }
    }

    @Override
    public void removeMemberNotification(Member member) {
        Group group = member.getGroup();
        Map<String, String> map = new HashMap<>();
        Map<String, String> map1 = new HashMap<>();
        String leaderName = "";
        for (Member m : group.getMembers()) {
            if (m.getRole().equals(Constants.MemberRole.OWNER)) {
                leaderName = m.getStudent().getUser().getName();
            }
        }
        map.put("_User-txt_", member.getStudent().getUser().getName());
        map.put("_Leader-txt_", leaderName);
        // create noti for member in group
        String notification_txt = createContentNotification(NotificationTemplate.UserNotification.removeMember, map);
        Notification notification = new Notification();
        notification.setContent(notification_txt);
        notification.setType(NotificationTemplate.NotificationType.GROUP);
        notificationRepository.save(notification);
        for (Member m : group.getMembers()) {
            if (m.getStatus().equals(Constants.MemberStatus.INGROUP)) {
                UserNotification userNotification = new UserNotification();
                userNotification.setNotification(notification);
                userNotification.setUser(m.getStudent().getUser());
                userNotification.setStatus(false);
                userNotificationRepository.save(userNotification);
            }
        }
        map1.put("_Leader-txt_", leaderName);
        String notification_txt1 = createContentNotification(NotificationTemplate.UserNotification.removeMember1, map);
        Notification notification1 = new Notification();
        notification1.setContent(notification_txt1);
        notification1.setType(NotificationTemplate.NotificationType.GROUP);
        notificationRepository.save(notification1);
        UserNotification userNotification = new UserNotification();
        userNotification.setNotification(notification1);
        userNotification.setUser(member.getStudent().getUser());
        userNotification.setStatus(false);
        userNotificationRepository.save(userNotification);
    }

    @Override
    public void inviteMemberNotification(Member member) {
        Group group = member.getGroup();
        Map<String, String> map = new HashMap<>();
        String leaderName = "";
        for (Member m : group.getMembers()) {
            if (m.getRole().equals(Constants.MemberRole.OWNER)) {
                leaderName = m.getStudent().getUser().getName();
            }
        }
        map.put("_Group-txt_", group.getName());
        map.put("_Leader-txt_", leaderName);
        String notification_txt = createContentNotification(NotificationTemplate.UserNotification.inviteMemberJoinGroup, map);
        Notification notification = new Notification();
        notification.setContent(notification_txt);
        notification.setType(NotificationTemplate.NotificationType.REQUESTGROUP);
        notificationRepository.save(notification);
        UserNotification userNotification = new UserNotification();
        userNotification.setNotification(notification);
        userNotification.setUser(member.getStudent().getUser());
        userNotification.setStatus(false);
        userNotificationRepository.save(userNotification);
    }
    public void saveNotification(User user, String content) {
        Notification notification = new Notification();
        notification.setContent(content);
        notificationRepository.save(notification);
        UserNotification userNotification = new UserNotification();
        userNotification.setNotification(notification);
        userNotification.setUser(user);
        userNotification.setStatus(false);
        userNotificationRepository.save(userNotification);
    }
}

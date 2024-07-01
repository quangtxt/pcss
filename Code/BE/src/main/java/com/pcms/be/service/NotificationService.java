package com.pcms.be.service;

//import com.pcms.be.domain.Notification;
import com.pcms.be.domain.user.Member;
import org.springframework.http.ResponseEntity;

import java.util.Map;

public interface NotificationService {
//    Notification createNotification(String templateName,String[] args);
//    String createNotification_V2(String template, Map<String, String> mapData);
    void createJoinGroupNotification();
    void createMemberJoinGroupNotification(Member member);
    void createMemberOutGroupNotification(Member member);
    void createRejectJoinGroupNotification(Member member);
    void removeMemberNotification(Member member);
    void inviteMemberNotification(Member member);
}

package com.pcms.be.service;

//import com.pcms.be.domain.Notification;
import com.pcms.be.domain.user.Member;
import com.pcms.be.domain.Notification;
import com.pcms.be.domain.user.User;
import com.pcms.be.pojo.request.CreateMeetingRequest;
import org.springframework.http.ResponseEntity;

import java.util.List;
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
   // void createJoinGroupNotification();
      String createContentNotification(String template, Map<String, String> mapData);
      void saveNotification(User user, String Content);
//      void checkingProcess();
}

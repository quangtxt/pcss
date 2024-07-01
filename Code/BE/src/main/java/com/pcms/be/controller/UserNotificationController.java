package com.pcms.be.controller;

import com.pcms.be.errors.ApiException;
import com.pcms.be.errors.ServiceException;
import com.pcms.be.pojo.response.UserNotificationResponse;
import com.pcms.be.service.UserNotificationService;
import com.pcms.be.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/user-notification")
public class UserNotificationController {
    private final UserService userService;
    private final UserNotificationService userNotificationService;

    @GetMapping("")
    public ResponseEntity<Page<UserNotificationResponse>> getNotifications(Pageable pageable, @RequestParam(value = "filter_unread", required = true) Boolean filterUnread) {
        try {
            Page<UserNotificationResponse> userNotifications = userNotificationService.getNotifications( filterUnread, pageable);
            return ResponseEntity.ok(userNotifications);

        } catch (ServiceException e) {
            throw new ApiException(e.getErrorCode(), e.getParams());
        }
    }
    @PostMapping("/updateNotificationStatus/{id}")
    public ResponseEntity<UserNotificationResponse> updateNotificationStatusToREAD(@PathVariable("id") String notificationId) {
        try {
            UserNotificationResponse userNotificationResponse= userNotificationService.updateNotificationStatus( notificationId);
            return ResponseEntity.ok(userNotificationResponse);
        } catch (ServiceException e) {
            throw new ApiException(e.getErrorCode(), e.getParams());
        }
    }
    @PostMapping("/updateNotificationStatus")
    public ResponseEntity<Void> markAllAsRead() {
        try {
            String userName = userService.getCurrentUser().getUsername();
            userNotificationService.updateAllNotificationStatusToRead();
            return ResponseEntity.ok().build();
        } catch (ServiceException e) {
            throw new ApiException(e.getErrorCode(), e.getParams());
        }
    }
}


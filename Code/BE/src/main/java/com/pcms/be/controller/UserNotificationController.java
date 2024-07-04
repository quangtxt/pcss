package com.pcms.be.controller;

import com.pcms.be.errors.ApiException;
import com.pcms.be.errors.ServiceException;
import com.pcms.be.pojo.response.PageUserNotificationResponse;
import com.pcms.be.pojo.response.UserNotificationResponse;
import com.pcms.be.service.UserNotificationService;
import com.pcms.be.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
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
    public ResponseEntity<PageUserNotificationResponse> getNotifications(
            @Valid @RequestParam(value = "page", required = true) String page,
            @Valid @RequestParam(value = "size", required = true) String size,
            @Valid @RequestParam(value = "onlynews_notification", required = false) Boolean onlyNewsNotification,
            @Valid @RequestParam(value = "filter_unread", required = false) Boolean filterUnread
    ) {
        try {
            PageRequest pageRequest = PageRequest.of(Integer.parseInt(page), Integer.parseInt(size));
            return ResponseEntity.ok(userNotificationService.getNotifications(onlyNewsNotification, filterUnread, pageRequest));
        } catch (ServiceException e) {
            throw new ApiException(e.getErrorCode(), e.getParams());
        }
    }

    @PostMapping("/updateNotificationStatus/{id}")
    public ResponseEntity<UserNotificationResponse> updateNotificationStatusToREAD(@PathVariable("id") String notificationId) {
        try {
            UserNotificationResponse userNotificationResponse = userNotificationService.updateNotificationStatus(notificationId);
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


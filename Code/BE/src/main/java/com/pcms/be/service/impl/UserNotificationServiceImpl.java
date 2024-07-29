package com.pcms.be.service.impl;

import com.pcms.be.domain.user.User;
import com.pcms.be.domain.user.UserNotification;
import com.pcms.be.errors.ErrorCode;
import com.pcms.be.errors.ServiceException;
import com.pcms.be.pojo.response.PageUserNotificationResponse;
import com.pcms.be.pojo.response.UserNotificationResponse;
import com.pcms.be.repository.UserNotificationRepository;
import com.pcms.be.service.UserNotificationService;
import com.pcms.be.service.UserService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class UserNotificationServiceImpl implements UserNotificationService {
    private final UserNotificationRepository userNotificationRepository;
    private final UserService userService;
    private final ModelMapper modelMapper;

    @Override
    public PageUserNotificationResponse getNotifications(boolean onlyNewsNotification, boolean filterUnread, PageRequest pageRequest) throws ServiceException {
        try {
            User user = userService.getCurrentUser();
            Pageable pageable = PageRequest.of(pageRequest.getPageNumber(), pageRequest.getPageSize());
            Page<UserNotification> userNotifications;
            if (onlyNewsNotification == true) {// lấy ra tất cả thông báo chung
                userNotifications = userNotificationRepository.findAllNotificationOnlyNews(Integer.parseInt(Long.toString(user.getId())), pageable);
            } else {
                if (filterUnread == false) {
                    userNotifications = userNotificationRepository.findAllNotificationNotOnlyNews(Integer.parseInt(Long.toString(user.getId())), pageable);// lấy ra tất cả thông báo
                } else {// lấy ra tất cả những thông báo chưa đọc
                    userNotifications = userNotificationRepository.findAllNotificationNotOnlyNewsAndUnread(Integer.parseInt(Long.toString(user.getId())), pageable);
                }
            }
            int countUnread = onlyNewsNotification ? userNotificationRepository.countAllNewsUnread(Integer.parseInt(Long.toString(user.getId()))) :
                    userNotificationRepository.countAllUnread(Integer.parseInt(Long.toString(user.getId())));

            PageUserNotificationResponse response = new PageUserNotificationResponse();
            response.setTotalPage(userNotifications.getTotalPages());
            response.setTotalCount(userNotifications.getTotalElements());
            List<UserNotificationResponse> userNotificationResponses = userNotifications.stream()
                    .map(usernoti -> modelMapper.map(usernoti, UserNotificationResponse.class))
                    .collect(Collectors.toList());
            response.setTotalUnread(Long.valueOf(countUnread));
            response.setData(userNotificationResponses);
            return response;
        } catch (Exception e) {
            throw new ServiceException(ErrorCode.FAILED_EDIT_NOTE);
        }
    }

    @Override
    public UserNotificationResponse updateNotificationStatus(String notificationId) throws ServiceException {
        try {
            Optional<UserNotification> userNotification = userNotificationRepository.findById(Long.parseLong(notificationId));
            if (!userNotification.isPresent()) {
                throw new ServiceException(ErrorCode.NOT_FOUND);
            }
            if (!userService.getCurrentUser().equals(userNotification.get().getUser())) {
                throw new ServiceException(ErrorCode.USER_NOT_ALLOW);
            }
            UserNotification userNotification1 = userNotification.get();
            userNotification1.setStatus(true);
            userNotificationRepository.save(userNotification1);
            return modelMapper.map(userNotification1, UserNotificationResponse.class);
        } catch (Exception e) {
            throw new ServiceException(ErrorCode.FAILED_EDIT_NOTE);
        }
    }

    @Override
    public void updateAllNotificationStatusToRead() throws ServiceException {
        try {
            User user = userService.getCurrentUser();
            List<UserNotification> notifications = userNotificationRepository.findAllByUserAndStatus(user, false);
            for (UserNotification userNotification : notifications) {
                userNotification.setStatus(true);
                userNotificationRepository.save(userNotification);
            }
        } catch (Exception e) {
            throw new ServiceException(ErrorCode.FAILED_EDIT_NOTE);
        }
    }
}

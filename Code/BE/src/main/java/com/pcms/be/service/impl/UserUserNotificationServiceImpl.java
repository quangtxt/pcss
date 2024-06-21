package com.pcms.be.service.impl;

import com.pcms.be.domain.user.UserNotification;
import com.pcms.be.errors.ErrorCode;
import com.pcms.be.errors.ServiceException;
import com.pcms.be.pojo.response.UserNotificationResponse;
import com.pcms.be.repository.UserNotificationRepository;
import com.pcms.be.service.UserNotificationService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class UserUserNotificationServiceImpl implements UserNotificationService {
    private final UserNotificationRepository userNotificationRepository;
    private  final ModelMapper modelMapper;
    @Override
    public Page<UserNotificationResponse> getNotifications(String userName, Boolean filterUnread, Pageable pageable) throws ServiceException {
        try {
            Page<UserNotification> userNotifications ;
            if(filterUnread == null){
                userNotifications = userNotificationRepository.findAllByUserName(userName, pageable);

            }else{
                userNotifications = userNotificationRepository.findAllByUserNameAndStatus(userName, filterUnread, pageable);

            }
            List<UserNotificationResponse> userNotificationResponses = userNotifications.stream()
                    .map(notification -> modelMapper.map(notification, UserNotificationResponse.class))
                    .collect(Collectors.toList());

            return new PageImpl<>(userNotificationResponses, pageable, userNotifications.getTotalElements());
        } catch (Exception e) {
            throw new ServiceException(ErrorCode.FAILED_EDIT_NOTE);
        }
    }
}

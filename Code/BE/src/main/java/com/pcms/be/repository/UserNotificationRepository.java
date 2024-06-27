package com.pcms.be.repository;

import com.pcms.be.domain.Notification;
import com.pcms.be.domain.user.UserNotification;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserNotificationRepository extends JpaRepository<UserNotification, Long> {
//    Page<UserNotification> findAllByUserName(String username, Pageable pageable);
//    Page<UserNotification> findAllByUserNameAndStatus(String username, boolean unread, Pageable pageable);
//    List<UserNotification> findAllByUserNameAndStatus(String username, boolean unread);
}

package com.pcms.be.repository;

import com.pcms.be.domain.Notification;
import com.pcms.be.domain.user.User;
import com.pcms.be.domain.user.UserNotification;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserNotificationRepository extends JpaRepository<UserNotification, Long> {
    Page<UserNotification> findAllByUser(User user, Pageable pageable);
    Page<UserNotification> findAllByUserAndStatus(User user, boolean unread, Pageable pageable);
    List<UserNotification> findAllByUserAndStatus(User user, boolean unread);
}

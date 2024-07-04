package com.pcms.be.repository;

import com.pcms.be.domain.Notification;
import com.pcms.be.domain.user.User;
import com.pcms.be.domain.user.UserNotification;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserNotificationRepository extends JpaRepository<UserNotification, Long> {
    Page<UserNotification> findAllByUser(User user, Pageable pageable);
    Page<UserNotification> findAllByUserAndStatus(User user, boolean unread, Pageable pageable);
    List<UserNotification> findAllByUserAndStatus(User user, boolean unread);
    @Query(value = "SELECT un.* " +
            "FROM v_user_notification un " +
            "JOIN v_notification n ON un.notification_id = n.id " +
            "WHERE un.user_id = :userId " +
            "AND n.type = 'NEWS'", nativeQuery = true)
    Page<UserNotification> findAllNotificationOnlyNews(@Param("userId") int userId, Pageable pageable);

    @Query(value = "SELECT un.* " +
            "FROM v_user_notification un " +
            "JOIN v_notification n ON un.notification_id = n.id " +
            "WHERE un.user_id = :userId " +
            "AND n.type <> 'NEWS'", nativeQuery = true)
    Page<UserNotification> findAllNotificationNotOnlyNews(@Param("userId") int userId, Pageable pageable);
    @Query(value = "SELECT un.* " +
            "FROM v_user_notification un " +
            "JOIN v_notification n ON un.notification_id = n.id " +
            "WHERE un.user_id = :userId " +
            "AND n.type <> 'NEWS' and un.status = 0", nativeQuery = true)
    Page<UserNotification> findAllNotificationNotOnlyNewsAndUnread(@Param("userId") int userId, Pageable pageable);

    @Query(value = "SELECT COUNT(un.id) AS notification_count " +
            "FROM v_user_notification un " +
            "JOIN v_notification n ON un.notification_id = n.id " +
            "WHERE un.user_id = :userId AND n.type = 'NEWS' AND un.status = 0",
            nativeQuery = true)
    int countAllNewsUnread(@Param("userId") int userId);
    @Query(value = "SELECT COUNT(un.id) AS notification_count " +
            "FROM v_user_notification un " +
            "JOIN v_notification n ON un.notification_id = n.id " +
            "WHERE un.user_id = :userId AND n.type <> 'NEWS'  AND un.status = 0",
            nativeQuery = true)
    int countAllUnread(@Param("userId") int userId);
}

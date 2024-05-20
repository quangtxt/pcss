package com.pcms.be.domain.user;

import com.pcms.be.domain.Notification;
import lombok.Getter;
import lombok.Setter;

import jakarta.persistence.*;
import java.io.Serializable;

@Getter
@Setter
@Entity
@Table(name = "v_user_notification")
public class UserNotification implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_name")
    private String userName;

    @Column(name = "notification_id")
    private Long notificationId;

    @Column(name = "status")
    private Boolean status = Boolean.FALSE;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "notification_id", referencedColumnName = "id", insertable = false, updatable = false)
    private Notification notification;
}
package com.pcms.be.domain;

import com.pcms.be.domain.user.UserNotification;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.*;
import java.time.OffsetDateTime;
import java.util.LinkedHashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "v_notification")
public class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "code")
    private String code;

    @Column(name = "type")
    private String type;

    @Column(name = "content")
    private String content;

    @CreationTimestamp
    @Column(name = "time_created")
    private OffsetDateTime timeCreated;

    @Column(name = "owner")
    private String owner;

    @OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "notification_id")
    private Set<UserNotification> userNotifications = new LinkedHashSet<>();
}
package com.pcms.be.domain;

import com.pcms.be.domain.user.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.*;

import java.io.Serializable;
import java.time.OffsetDateTime;
import java.util.HashSet;
import java.util.LinkedHashSet;
import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "v_notification")
public class Notification implements Serializable {

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

    @ManyToMany(mappedBy = "notifications", fetch = FetchType.LAZY)
    private Set<User> users = new HashSet<>();
}
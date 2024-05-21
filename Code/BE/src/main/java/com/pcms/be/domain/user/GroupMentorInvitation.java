package com.pcms.be.domain.user;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
@Entity
@Table(name = "v_group_mentor_invitation")
public class GroupMentorInvitation implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "group_id", nullable = false)
    private Group groupId;

    @ManyToOne
    @JoinColumn(name = "mentor_id", nullable = false)
    private User mentorId;

    @Column(name = "status", nullable = false)
    private String status;
}

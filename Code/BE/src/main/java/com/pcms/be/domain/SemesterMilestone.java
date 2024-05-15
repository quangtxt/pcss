package com.pcms.be.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.io.Serializable;
import java.time.OffsetDateTime;

@Getter
@Setter
@Entity
@Table(name = "semester_milestone")
public class SemesterMilestone implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "semester_code")
    public Semester semester;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "milestone_id")
    public Milestone milestone;

    @Column(name = "start_at")
    public OffsetDateTime beginAt;

    @Column(name = "end_at")
    public OffsetDateTime endAt;
}

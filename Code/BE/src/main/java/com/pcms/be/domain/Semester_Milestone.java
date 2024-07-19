package com.pcms.be.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.time.OffsetDateTime;

@Getter
@Setter
@Entity
@Table(name = "semester_milestone")
public class Semester_Milestone implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "semester_id", nullable = false)
    private Semester semester;

    @ManyToOne
    @JoinColumn(name = "milestone_id", nullable = false)
    private Milestone milestone;

    @Column(name = "start_date")
    public OffsetDateTime startDate;

    @Column(name = "end_date")
    public OffsetDateTime endDate;

    @Column(name = "duration")
    public String duration;


}

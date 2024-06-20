package com.pcms.be.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.time.OffsetDateTime;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "submission")
public class Submission implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;

    @Column(name = "name")
    public String name;

    @Column(name = "description")
    public String description;

    @Column(name = "due_date")
    public OffsetDateTime dueDate;

    @ManyToOne
    @JoinColumn(name = "milestone_id")
    private Milestone milestone;
    @Column(name = "status")
    private String status;
}

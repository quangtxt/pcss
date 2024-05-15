package com.pcms.be.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "semester_specificMajor")
public class SemesterSpecificMajor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "semester_code")
    public Semester semester;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "specificMajor_id")
    public SpecificMajor specificMajor;


}

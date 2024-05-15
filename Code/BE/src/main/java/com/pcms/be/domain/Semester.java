package com.pcms.be.domain;

import com.pcms.be.domain.user.Role;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "semester")
public class Semester implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;

    @Column(name = "code")
    public String code;

    @Column(name = "name")
    public String name;

    @ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinTable(name = "semester_specificMajor",
            joinColumns = @JoinColumn(name = "semester_code"),
            inverseJoinColumns = @JoinColumn(name = "specificMajor_id"))
    private Set<SpecificMajor> specificMajors = new HashSet<>();

    @ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinTable(name = "semester_milestone",
            joinColumns = @JoinColumn(name = "semester_code"),
            inverseJoinColumns = @JoinColumn(name = "milestone_id"))
    private Set<Milestone> milestones = new HashSet<>();
}

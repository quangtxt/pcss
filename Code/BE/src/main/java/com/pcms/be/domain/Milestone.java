package com.pcms.be.domain;

import com.pcms.be.domain.user.Group;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "milestone")
public class Milestone implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;

    @Column(name = "name")
    public String name;
    @Column(name = "requirement")
    public String requirement;
    @Column(name = "product")
    public String product;
    @Column(name = "time")
    public String time;
    @Column(name = "person")
    public String person;
    @Column(name = "parent")
    public Long parent;

    @ManyToMany(mappedBy = "milestones")
    private Set<Semester> semesters = new HashSet<>();

    @ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinTable(name = "v_milestone_group",
            joinColumns = @JoinColumn(name = "milestone_id"),
            inverseJoinColumns = @JoinColumn(name = "group_id"))
    private Set<Group> groups = new HashSet<>();
}

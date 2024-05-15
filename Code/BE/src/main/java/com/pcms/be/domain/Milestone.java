package com.pcms.be.domain;

import com.pcms.be.domain.user.User;
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

    @ManyToMany(mappedBy = "milestones")
    private Set<Semester> semesters = new HashSet<>();
}

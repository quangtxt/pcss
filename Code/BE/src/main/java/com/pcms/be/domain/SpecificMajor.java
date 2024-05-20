package com.pcms.be.domain;

import com.pcms.be.domain.user.User;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "specificMajor")
public class SpecificMajor implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;

    @Column(name = "name")
    public String name;

    @Column(name = "description")
    public String description;


    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.REFRESH)
    @JoinColumn(name = "major_code", referencedColumnName = "id")
    public Major major;

    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.REFRESH)
    @JoinColumn(name = "specificMajor_code", referencedColumnName = "id")
    public List<User> userList;

    @ManyToMany(mappedBy = "specificMajors")
    private Set<Semester> semesters = new HashSet<>();
}

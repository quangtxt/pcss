package com.pcms.be.domain;

import com.pcms.be.domain.user.Role;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.time.OffsetDateTime;
import java.util.HashSet;
import java.util.List;
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

    @Column(name = "start_at")
    public OffsetDateTime beginAt;

    @Column(name = "end_at")
    public OffsetDateTime endAt;

    @ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinTable(name = "semester_specificMajor",
            joinColumns = @JoinColumn(name = "semester_code"),
            inverseJoinColumns = @JoinColumn(name = "specificMajor_id"))
    private Set<SpecificMajor> specificMajors = new HashSet<>();

    @OneToMany(mappedBy = "semester", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<CapstonePhase> phases;
}

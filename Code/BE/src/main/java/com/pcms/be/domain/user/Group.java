package com.pcms.be.domain.user;

import com.pcms.be.domain.Milestone;
import com.pcms.be.domain.Semester;
import com.pcms.be.domain.meeting.Meeting;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.io.Serializable;
import java.time.OffsetDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
@Getter
@Setter
@Entity
@Table(name = "v_group")
public class Group implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "group_code")
    private String groupCode;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @Column(name = "abbreviations", columnDefinition = "TEXT")
    private String abbreviations;

    @Column(name = "vietnameseTitle", columnDefinition = "TEXT")
    private String vietnameseTitle;

    @Column(name = "keywords", columnDefinition = "TEXT")
    private String keywords;

    @Column(name = "status")
    private String status;

    @CreationTimestamp
    @Column(name = "created_at")
    public OffsetDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    public OffsetDateTime updatedAt;

    @OneToMany(mappedBy = "group", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Member> members;

    @OneToMany(mappedBy = "group", cascade = CascadeType.ALL)
    private List<Meeting> meetings;

    @ManyToMany
    @JoinTable(name = "v_group_supervisor",
            joinColumns = @JoinColumn(name = "group_id"),
            inverseJoinColumns = @JoinColumn(name = "supervisor_id"))
    private Set<Supervisor> supervisors = new HashSet<>();

    @ManyToMany(mappedBy = "groups")
    private Set<Milestone> milestones = new HashSet<>();

    @ManyToOne
    @JoinColumn(name = "semester_id")
    private Semester semester;

    @Column(name = "git_id")
    private String gitId;
    // Getters, setters, constructors, etc.
}

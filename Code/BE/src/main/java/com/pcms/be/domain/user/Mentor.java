package com.pcms.be.domain.user;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "v_mentor")
public class Mentor implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    @Column(name = "gender")
    public boolean gender;

    @Column(name = "phone")
    public String phone;

    @Column(name = "personal_email")
    public String personalEmail;

    @Column(name = "self_description")
    public String selfDescription;

    @ManyToMany(mappedBy = "mentors")
    private Set<Group> groups = new HashSet<>();

}

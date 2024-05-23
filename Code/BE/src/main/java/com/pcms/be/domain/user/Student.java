package com.pcms.be.domain.user;

import com.pcms.be.domain.SpecificMajor;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "v_student")
public class Student {
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

    @Column(name = "facebook")
    public String facebook;

    @Column(name = "alternative_email")
    public String alternativeEmail;

    @ManyToOne
    @JoinColumn(name = "specificMajor_code", referencedColumnName = "id")
    private SpecificMajor specificMajor;

}

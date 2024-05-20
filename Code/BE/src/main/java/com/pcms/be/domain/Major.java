package com.pcms.be.domain;

import com.pcms.be.domain.user.User;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.io.Serializable;
import java.time.OffsetDateTime;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "major")
public class Major implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;

    @Column(name = "name")
    public String name;

    @Column(name = "description")
    public String description;

    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.REFRESH)
    @JoinColumn(name = "major_code", referencedColumnName = "id")
    public List<SpecificMajor> specificMajorList;
}

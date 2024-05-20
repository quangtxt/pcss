package com.pcms.be.pojo;

import com.pcms.be.domain.SpecificMajor;
import com.pcms.be.domain.user.Role;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Getter
@Setter
public class UserDTO {
    public Long id;
    public String username;
    public String password;
    public String email;
    public OffsetDateTime createdAt;
    public OffsetDateTime updatedAt;
    private List<Role> roles = new ArrayList<>();
    public SpecificMajorDTO specificMajor;
}

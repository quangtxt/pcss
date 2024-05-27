package com.pcms.be.pojo.DTO;

import com.pcms.be.domain.SpecificMajor;
import com.pcms.be.domain.user.Group;
import com.pcms.be.domain.user.Member;
import com.pcms.be.domain.user.User;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Set;

@Getter
@Setter
public class StudentDTO {

    public Long id;
    private UserDTO user;
    public boolean gender;
    public String phone;
    public String facebook;
    public String alternativeEmail;
    private SpecificMajorDTO specificMajor;
}

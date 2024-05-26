package com.pcms.be.pojo;

import com.pcms.be.domain.SpecificMajor;
import com.pcms.be.pojo.DTO.UserDTO;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class StudentResponse {

    public Long id;
    private UserDTO user;
    public boolean gender;
    public String phone;
    public String facebook;
    public String alternativeEmail;
    private SpecificMajor specificMajor;
}

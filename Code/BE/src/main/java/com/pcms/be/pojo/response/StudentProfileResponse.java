package com.pcms.be.pojo.response;

import com.pcms.be.domain.Major;
import com.pcms.be.domain.Semester;
import com.pcms.be.domain.SpecificMajor;
import com.pcms.be.domain.user.Role;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class StudentProfileResponse {
    private String fullName;
    private boolean gender;
    private String rollNumber;
    private String profession;
    private String specialty;
    private String semester;
    private String phone;
    private String facebook;
    private String alternativeEmail;
    private String email;
}

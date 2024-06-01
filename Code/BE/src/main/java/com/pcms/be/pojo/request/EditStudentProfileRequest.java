package com.pcms.be.pojo.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class EditStudentProfileRequest {
    private String fullName;
    private boolean gender;
    private String phone;
    private String facebook;
    private String alternativeEmail;
}

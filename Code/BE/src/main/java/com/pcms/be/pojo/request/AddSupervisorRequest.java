package com.pcms.be.pojo.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AddSupervisorRequest {
    private String fullName;
    private boolean gender;
    private String branch;
    private String parentDepartment;
    private String childDepartment;
    private String jobTitle;
    private String fptEmail;
    private String fuEmail;
    private String phone;
    private String contractType;
}

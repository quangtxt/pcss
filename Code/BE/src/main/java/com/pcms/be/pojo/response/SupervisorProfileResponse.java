package com.pcms.be.pojo.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SupervisorProfileResponse {
    private String fullName;
    private String fptEmail;
    private String persionalEmail;
    private String phone;
}

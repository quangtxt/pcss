package com.pcms.be.pojo.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class EditMentorProfileRequest {
    private Long UserId;
    private String fullName;
    private String fptEmail;
    private String persionalEmail;
    private String phone;
}

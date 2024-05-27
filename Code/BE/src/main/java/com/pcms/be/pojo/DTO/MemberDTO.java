package com.pcms.be.pojo.DTO;

import com.pcms.be.pojo.response.GroupResponse;
import lombok.Getter;
import lombok.Setter;

import java.time.OffsetDateTime;
@Getter
@Setter
public class MemberDTO {
    private Long id;
    private StudentDTO student;
    private String role;
    private String status;
}

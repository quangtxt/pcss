package com.pcms.be.pojo;

import com.pcms.be.domain.user.Member;
import com.pcms.be.pojo.DTO.StudentDTO;
import com.pcms.be.pojo.DTO.UserDTO;
import com.pcms.be.pojo.response.GroupResponse;
import lombok.Getter;
import lombok.Setter;

import java.time.OffsetDateTime;

@Getter
@Setter
public class MemberResponse {
    private Long id;
    private StudentDTO student;
    private GroupResponse group;
    private String role;
    public OffsetDateTime createdAt;
    public OffsetDateTime updatedAt;
    private String status;
}

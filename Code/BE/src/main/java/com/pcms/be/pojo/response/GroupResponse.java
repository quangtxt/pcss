package com.pcms.be.pojo.response;

import com.pcms.be.pojo.DTO.MemberDTO;
import com.pcms.be.pojo.DTO.StudentDTO;
import com.pcms.be.pojo.DTO.UserDTO;
import com.pcms.be.pojo.MemberResponse;
import lombok.Getter;
import lombok.Setter;

import java.time.OffsetDateTime;
import java.util.List;

@Getter
@Setter
public class GroupResponse {
    private Long id;
    private String name;
    private String description;
    private String abbreviations;
    private String vietnameseTitle;
    private String keywords;
    public OffsetDateTime createdAt;
    public OffsetDateTime updatedAt;
    private StudentDTO owner;
    private String status;
    private List<MemberDTO> members;
}

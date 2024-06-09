package com.pcms.be.pojo.response;

import com.pcms.be.pojo.DTO.GroupDTO;
import com.pcms.be.pojo.DTO.MentorDTO;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class GroupMentorResponse {
    private Long id;
    private GroupDTO group;
    private MentorDTO mentor;
    private String status;
}

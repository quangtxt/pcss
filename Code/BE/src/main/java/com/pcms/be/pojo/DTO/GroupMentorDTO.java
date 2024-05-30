package com.pcms.be.pojo.DTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class GroupMentorDTO {

    private Long id;
    private GroupDTO groupId;
    private MentorDTO mentorId;
    private String status;
}

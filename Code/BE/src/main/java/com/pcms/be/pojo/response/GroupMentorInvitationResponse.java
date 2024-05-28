package com.pcms.be.pojo.response;

import com.pcms.be.domain.user.Group;
import com.pcms.be.pojo.DTO.GroupDTO;
import com.pcms.be.pojo.DTO.MentorDTO;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class GroupMentorInvitationResponse {
    private Long id;
    private GroupDTO groupId;
    private MentorDTO mentorId;
    private String status;
}

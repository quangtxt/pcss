package com.pcms.be.pojo.DTO;

import com.pcms.be.domain.user.Group;
import com.pcms.be.domain.user.Mentor;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class GroupMentorInvitationDTO {

    private Long id;
    private GroupDTO groupId;
    private MentorDTO mentorId;
    private String status;
}

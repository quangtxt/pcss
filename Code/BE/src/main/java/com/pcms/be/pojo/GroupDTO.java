package com.pcms.be.pojo;

import com.pcms.be.domain.user.GroupMentorInvitation;
import lombok.Getter;
import lombok.Setter;

import java.time.OffsetDateTime;

@Getter
@Setter
public class GroupDTO {
    private Long id;
    private String name;
    private String description;
    private String abbreviations;
    private String vietnameseTitle;
    private String keywords;
    public OffsetDateTime createdAt;
    public OffsetDateTime updatedAt;
    private UserDTO owner;
    private String status;
}

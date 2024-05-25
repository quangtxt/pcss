package com.pcms.be.pojo;

import com.pcms.be.domain.user.Member;
import lombok.Getter;
import lombok.Setter;

import java.time.OffsetDateTime;

@Getter
@Setter
public class MemberResponse {
    private Long id;
    private UserDTO user;
    private GroupResponse group;
    private Member.MemberRole role;
    public OffsetDateTime createdAt;
    public OffsetDateTime updatedAt;
    private boolean status;
    public enum MemberRole {
        OWNER,
        ADMIN,
        MEMBER
    }
}

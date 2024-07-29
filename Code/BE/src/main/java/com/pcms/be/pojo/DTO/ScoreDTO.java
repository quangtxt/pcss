package com.pcms.be.pojo.DTO;

import lombok.Getter;
import lombok.Setter;

import java.time.OffsetDateTime;

@Getter
@Setter
public class ScoreDTO {
    private Long id;
    private MemberDTO member;
    private Double score;
    private String comment;
    private MilestoneDTO milestone;
    private OffsetDateTime updatedAt;
}

package com.pcms.be.pojo.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ScoreEvaluateRequest {
    private Long memberId;
    private Double score;
    private String comment;
    private Long milestoneId;
}

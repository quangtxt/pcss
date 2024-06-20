package com.pcms.be.pojo.request;

import com.pcms.be.domain.Submission;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.OffsetDateTime;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class EditMilestoneRequest {
    private int milestoneId;
    private String name;
    private OffsetDateTime beginAt;
    private int duration;
    private List<Submission> submissions;
}

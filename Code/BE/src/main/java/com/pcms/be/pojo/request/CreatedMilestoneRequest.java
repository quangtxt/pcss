package com.pcms.be.pojo.request;

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
public class CreatedMilestoneRequest {
    private int phaseId;
    private String name;
    private OffsetDateTime beginAt;
    private int duration;
}

package com.pcms.be.pojo.DTO;

import com.pcms.be.pojo.response.MilestoneTemplateRp;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.OffsetDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class SemesterMilestone2DTO {
    public MilestoneTemplateRp milestone;
    public OffsetDateTime startDate;
    public OffsetDateTime endDate;
    public String duration;
}

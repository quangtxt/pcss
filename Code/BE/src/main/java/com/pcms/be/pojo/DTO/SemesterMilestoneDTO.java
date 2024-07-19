package com.pcms.be.pojo.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.OffsetDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class SemesterMilestoneDTO {
    public Long milestone_id;
    public OffsetDateTime start_date;
    public OffsetDateTime end_date;
    public String duration;

}

package com.pcms.be.pojo.DTO;

import com.pcms.be.domain.Milestone;
import com.pcms.be.domain.Semester;
import jakarta.persistence.*;
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
public class CapstonePhaseDTO {
    public Long id;
    public String name;
    public OffsetDateTime beginAt;
    public OffsetDateTime endAt;
    private List<MilestoneDTO> milestones;
}

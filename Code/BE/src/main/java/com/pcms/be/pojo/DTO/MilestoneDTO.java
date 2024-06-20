package com.pcms.be.pojo.DTO;

import com.pcms.be.domain.CapstonePhase;
import com.pcms.be.domain.Submission;
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
public class MilestoneDTO {
    public Long id;
    public String name;
    public OffsetDateTime beginAt;
    public int duration;
    private List<SubmissionDTO> submissions;
    private String status;
}

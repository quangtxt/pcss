package com.pcms.be.pojo.request;

import com.pcms.be.pojo.DTO.SemesterMilestoneDTO;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.OffsetDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CreateSemesterRequest {
    private String code;
    private String name;
    private OffsetDateTime start_at;
    private List<SemesterMilestoneDTO> milestone;
}

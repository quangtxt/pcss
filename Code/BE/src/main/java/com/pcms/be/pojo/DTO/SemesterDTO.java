package com.pcms.be.pojo.DTO;

import com.pcms.be.domain.CapstonePhase;
import com.pcms.be.domain.SpecificMajor;
import jakarta.persistence.*;
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
public class SemesterDTO {
    public Long id;
    public String code;
    public String name;
    public OffsetDateTime beginAt;
    public OffsetDateTime endAt;
    private Set<SpecificMajorDTO> specificMajors = new HashSet<>();
    private List<CapstonePhaseDTO> phases;
}

package com.pcms.be.pojo.request;

import com.pcms.be.domain.CapstonePhase;
import com.pcms.be.domain.Milestone;
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
@NoArgsConstructor
@AllArgsConstructor
public class CreatedSemesterRequest {
    private String code;
    private String name;
    private OffsetDateTime beginAt;
    private OffsetDateTime endAt;
//    private Set<SpecificMajor> specificMajors = new HashSet<>();
    private List<CapstonePhase> phases;
}

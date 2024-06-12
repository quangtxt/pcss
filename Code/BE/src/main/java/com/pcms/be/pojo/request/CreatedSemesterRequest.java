package com.pcms.be.pojo.request;

import com.pcms.be.domain.Milestone;
import com.pcms.be.domain.SpecificMajor;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.OffsetDateTime;
import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CreatedSemesterRequest {
    public String code;
    public String name;
    public OffsetDateTime beginAt;
    public OffsetDateTime endAt;
//    private Set<SpecificMajor> specificMajors = new HashSet<>();
}

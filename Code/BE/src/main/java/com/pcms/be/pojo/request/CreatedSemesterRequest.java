package com.pcms.be.pojo.request;

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
public class CreatedSemesterRequest {
    private String code;
    private String name;
    private OffsetDateTime beginAt;
    private OffsetDateTime endAt;
//    private Set<SpecificMajor> specificMajors = new HashSet<>();
}

package com.pcms.be.pojo;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class MentorPageResponse {
    private Long totalCount;
    private Integer totalPage;
    private List<MentorDTO> data = null;
}

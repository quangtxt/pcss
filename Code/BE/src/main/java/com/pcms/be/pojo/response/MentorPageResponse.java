package com.pcms.be.pojo.response;

import com.pcms.be.pojo.DTO.MentorDTO;
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

package com.pcms.be.pojo.response;

import com.pcms.be.pojo.DTO.SupervisorDTO;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class SupervisorPageResponse {
    private Long totalCount;
    private Integer totalPage;
    private List<SupervisorDTO> data = null;
}

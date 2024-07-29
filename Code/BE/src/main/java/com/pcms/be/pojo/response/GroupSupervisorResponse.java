package com.pcms.be.pojo.response;

import com.pcms.be.pojo.DTO.Group1DTO;
import com.pcms.be.pojo.DTO.SupervisorDTO;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class GroupSupervisorResponse {
    private Long id;
    private Group1DTO group;
    private SupervisorDTO supervisor;
    private String status;
}

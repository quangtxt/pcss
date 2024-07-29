package com.pcms.be.pojo.DTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class GroupSupervisorDTO {

    private Long id;
    private GroupDTO group;
    private SupervisorDTO supervisor;
    private String status;
}

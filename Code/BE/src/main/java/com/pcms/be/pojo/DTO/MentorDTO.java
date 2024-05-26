package com.pcms.be.pojo.DTO;

import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;
@Getter
@Setter
public class MentorDTO {
    public Long id;
    public String name;
    public String email;
    private List<RoleDTO> roles = new ArrayList<>();
    public CampusDTO campus;
}

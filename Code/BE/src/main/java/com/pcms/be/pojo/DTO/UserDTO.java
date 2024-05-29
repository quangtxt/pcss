package com.pcms.be.pojo.DTO;

import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class UserDTO {
    public Long id;
    public String username;
    public String name;
    public String email;
    private List<RoleDTO> roles = new ArrayList<>();
    public CampusDTO campus;
    public GroupDTO group;
}

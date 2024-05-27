package com.pcms.be.pojo.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class MentorDTO {
    public Long id;
    public String name;
    public String email;
    private List<RoleDTO> roles = new ArrayList<>();
    public CampusDTO campus;
}

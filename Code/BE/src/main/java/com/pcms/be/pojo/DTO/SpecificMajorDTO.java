package com.pcms.be.pojo.DTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SpecificMajorDTO {
    public Long id;
    public String name;
    public String description;
    public MajorDTO major;
}

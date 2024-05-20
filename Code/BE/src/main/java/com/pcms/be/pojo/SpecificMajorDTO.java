package com.pcms.be.pojo;

import com.pcms.be.domain.Major;
import jakarta.persistence.*;
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

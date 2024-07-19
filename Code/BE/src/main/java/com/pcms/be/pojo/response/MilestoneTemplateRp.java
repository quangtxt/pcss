package com.pcms.be.pojo.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MilestoneTemplateRp {
    public Long id;
    public String name;
    public String requirement;
    public String product;
    public String time;
    public String person;
    public Long parent;
}

package com.pcms.be.pojo.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class SupervisorDTO {
    public Long id;
    private UserDTO user;
    public boolean gender;
    public String phone;
    public String personalEmail;
    public String selfDescription;
}

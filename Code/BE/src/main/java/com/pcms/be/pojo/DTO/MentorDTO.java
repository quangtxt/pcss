package com.pcms.be.pojo.DTO;

import com.pcms.be.domain.user.User;
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
    private UserDTO user;
    public boolean gender;
    public String phone;
    public String personalEmail;
    public String selfDescription;
}

package com.pcms.be.pojo;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;

@Getter
public class LoginBody {
    @NotBlank
    private String username;
    @NotBlank
    private String password;
}

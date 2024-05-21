package com.pcms.be.pojo;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CheckUserRequest {
    @NotBlank
    private String email;
    @NotBlank
    private String campus;
}

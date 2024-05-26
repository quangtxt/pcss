package com.pcms.be.pojo.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@Getter
@Setter
public class CreateGroupRequest {
    @NotBlank
    private String abbreviations;
    @NotBlank
    private String description;
    @NotBlank
    private String keywords;
    @NotBlank
    private String name;
    @NotBlank
    private String vietnameseTitle;
    private List<Integer> listUserID;
}

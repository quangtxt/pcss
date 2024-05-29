package com.pcms.be.pojo.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
@Getter
@Setter
public class EditGroupRequest {
    int groupId;
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
}
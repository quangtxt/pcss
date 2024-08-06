package com.pcms.be.pojo.DTO;

import lombok.Getter;
import lombok.Setter;

import java.time.OffsetDateTime;
import java.util.List;

@Getter
@Setter
public class Group1DTO {
    private Long id;
    private String name;
    private String description;
    private String abbreviations;
    private String vietnameseTitle;
    private String keywords;
    public OffsetDateTime createdAt;
    public OffsetDateTime updatedAt;
    private String status;
    private List<MeetingDTO> meetings;
    private String groupCode;
}

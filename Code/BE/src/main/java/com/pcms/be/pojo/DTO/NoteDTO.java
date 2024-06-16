package com.pcms.be.pojo.DTO;

import lombok.Getter;
import lombok.Setter;

import java.time.OffsetDateTime;

@Getter
@Setter
public class NoteDTO {
    private Long id;
    private UserDTO author;
    private String title;
    private String content;
    private OffsetDateTime createdAt;
}

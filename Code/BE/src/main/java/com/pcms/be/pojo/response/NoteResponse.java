package com.pcms.be.pojo.response;

import com.pcms.be.domain.user.User;
import com.pcms.be.pojo.DTO.MeetingDTO;
import com.pcms.be.pojo.DTO.UserDTO;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.OffsetDateTime;

@Getter
@Setter
public class NoteResponse {
    private Long id;
    private MeetingDTO meeting;
    private UserDTO author;
    private String title;
    private String content;
    private OffsetDateTime createdAt;
}

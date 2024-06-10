package com.pcms.be.pojo.DTO;

import com.pcms.be.domain.meeting.Note;
import com.pcms.be.domain.user.Group;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.OffsetDateTime;
import java.util.List;

@Getter
@Setter
public class MeetingDTO {
    private Long id;
    private OffsetDateTime startAt;
    private OffsetDateTime endAt;
    private String type;
    private String location;
    private GroupDTO group;
}

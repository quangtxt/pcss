package com.pcms.be.pojo.request;

import com.pcms.be.domain.meeting.Meeting;
import com.pcms.be.domain.user.User;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.OffsetDateTime;
@Getter
@Setter
public class CreateNoteRequest {
    private int meetingId;
    private String title;
    private String content;
}

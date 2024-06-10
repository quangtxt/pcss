package com.pcms.be.pojo.request;

import lombok.Getter;
import lombok.Setter;

import java.time.OffsetDateTime;

@Getter
@Setter
public class EditNoteRequest {
    private int noteId;
    private int authorId;
    private int meetingId;
    private String title;
    private String content;
}

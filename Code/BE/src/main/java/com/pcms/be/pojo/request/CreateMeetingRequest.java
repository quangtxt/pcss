package com.pcms.be.pojo.request;

import lombok.Getter;
import lombok.Setter;

import java.time.OffsetDateTime;

@Getter
@Setter
public class CreateMeetingRequest {
    private OffsetDateTime startAt;
    private OffsetDateTime endAt;
    private String type;
    private String location;
    private int groupId;
}

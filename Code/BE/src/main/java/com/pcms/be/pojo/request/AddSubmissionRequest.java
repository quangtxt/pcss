package com.pcms.be.pojo.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.OffsetDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AddSubmissionRequest {
    public int milestoneId;
    public String name;
    public String description;
    public OffsetDateTime dueDate;
}

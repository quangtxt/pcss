package com.pcms.be.pojo.request;

import com.pcms.be.domain.Milestone;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.OffsetDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class EditSubmissionRequest {
    public int id;
    public String name;
    public String description;
    public OffsetDateTime dueDate;
}

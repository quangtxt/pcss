package com.pcms.be.pojo.DTO;

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
public class SubmissionDTO {
    public Long id;
    public String name;
    public String description;
    public OffsetDateTime dueDate;
    private String status;
}

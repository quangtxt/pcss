package com.pcms.be.pojo.DTO;

import com.pcms.be.domain.user.Member;
import com.pcms.be.domain.user.Student;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.OffsetDateTime;
import java.util.Set;

@Getter
@Setter
public class GroupDTO {
    private Long id;
    private String name;
    private String description;
    private String abbreviations;
    private String vietnameseTitle;
    private String keywords;
    public OffsetDateTime createdAt;
    public OffsetDateTime updatedAt;
    private String status;
    private String groupCode;
}

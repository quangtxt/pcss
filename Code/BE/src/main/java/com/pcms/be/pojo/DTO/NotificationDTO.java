package com.pcms.be.pojo.DTO;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.time.OffsetDateTime;
import java.util.LinkedHashSet;
import java.util.Set;

@Getter
@Setter
public class NotificationDTO {
    private Long id;
    private String code;
    private String type;
    private String content;
    private OffsetDateTime timeCreated;
    private String owner;
}

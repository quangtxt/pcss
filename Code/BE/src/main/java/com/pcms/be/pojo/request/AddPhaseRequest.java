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
public class AddPhaseRequest {
    public int semesterId;
    public String name;
    public OffsetDateTime beginAt;
    public OffsetDateTime endAt;
}

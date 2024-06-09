package com.pcms.be.pojo.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SetActiveStudentRequest {
    private int id;
    private boolean status;
}

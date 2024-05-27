package com.pcms.be.pojo;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class InviteMemberRequest {
    int GroupId;
    private List<Integer> listStudentID;
}

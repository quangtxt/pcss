package com.pcms.be.pojo;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class InviteMemberRequest {
    int groupId;
    private List<Integer> listStudentID;
}

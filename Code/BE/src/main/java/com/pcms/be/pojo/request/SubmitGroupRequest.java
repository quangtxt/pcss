package com.pcms.be.pojo.request;

import lombok.Getter;
import lombok.Setter;

import java.util.List;
@Getter
@Setter
public class SubmitGroupRequest {
    int groupId;
    List<Integer> mentorIds;
}

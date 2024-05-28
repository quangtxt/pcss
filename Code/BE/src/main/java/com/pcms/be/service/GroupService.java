package com.pcms.be.service;

import com.pcms.be.domain.user.Group;
import com.pcms.be.errors.ServiceException;
import com.pcms.be.pojo.request.CreateGroupRequest;
import com.pcms.be.pojo.request.EditGroupRequest;
import com.pcms.be.pojo.request.SubmitGroupRequest;
import com.pcms.be.pojo.response.GroupResponse;
import com.pcms.be.pojo.response.SubmitGroupResponse;

import java.util.List;

public interface GroupService {

    GroupResponse createGroup(CreateGroupRequest createGroupDTO)  throws ServiceException;
    GroupResponse editGroup(EditGroupRequest editGroupDTO) throws ServiceException;
    List<Group> getGroupsById(List<Long> groupId) throws  ServiceException;
    GroupResponse getGroupById(int groupId) throws  ServiceException;
    SubmitGroupResponse submitGroup(SubmitGroupRequest submitGroupRequest) throws ServiceException;

}

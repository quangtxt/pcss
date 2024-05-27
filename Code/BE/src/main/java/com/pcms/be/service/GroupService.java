package com.pcms.be.service;

import com.pcms.be.domain.user.Group;
import com.pcms.be.errors.ServiceException;
import com.pcms.be.pojo.request.CreateGroupRequest;
import com.pcms.be.pojo.request.EditGroupRequest;
import com.pcms.be.pojo.response.GroupResponse;

import java.util.List;

public interface GroupService {

    GroupResponse createGroup(CreateGroupRequest createGroupDTO)  throws ServiceException;
    GroupResponse editGroup(EditGroupRequest editGroupDTO) throws ServiceException;
    List<Group> getGroupsById(List<Long> groupId) throws  ServiceException;
    GroupResponse getGroupById(int groupId) throws  ServiceException;

}

package com.pcms.be.service;

import com.pcms.be.domain.user.Group;
import com.pcms.be.errors.ServiceException;
import com.pcms.be.pojo.CreateGroupRequest;
import com.pcms.be.pojo.EditGroupRequest;
import com.pcms.be.pojo.GroupResonse;

import java.util.List;

public interface GroupService {
    GroupResonse createGroup(CreateGroupRequest createGroupDTO)  throws ServiceException;
    GroupResonse editGroup(EditGroupRequest editGroupDTO) throws ServiceException;
    List<Group> getListGroupsById(List<Long> groupId) throws  ServiceException;
}

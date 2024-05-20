package com.pcms.be.service;

import com.pcms.be.domain.user.Group;
import com.pcms.be.domain.user.User;
import com.pcms.be.errors.ServiceException;
import com.pcms.be.pojo.CreateGroupDTO;

import java.time.OffsetDateTime;
import java.util.Date;

public interface GroupService {
    Group createGroup(CreateGroupDTO createGroupDTO)  throws ServiceException;

}

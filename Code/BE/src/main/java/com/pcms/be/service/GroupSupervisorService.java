package com.pcms.be.service;

import com.pcms.be.domain.user.GroupSupervisor;
import com.pcms.be.errors.ServiceException;
import com.pcms.be.pojo.response.GroupSupervisorResponse;

import java.util.List;

public interface GroupSupervisorService {

    GroupSupervisor putStatus(Long id, String newStatus) throws ServiceException;
    List<GroupSupervisorResponse> getByStatus(String status) throws ServiceException;
    List<GroupSupervisorResponse> getGroupBySemester(int semesterId) throws ServiceException;

}

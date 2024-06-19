package com.pcms.be.service;

import com.pcms.be.domain.user.GroupMentor;
import com.pcms.be.errors.ServiceException;
import com.pcms.be.pojo.response.GroupMentorResponse;

import java.util.List;

public interface GroupMentorService {

    GroupMentor putStatus(Long id, String newStatus) throws ServiceException;
    List<GroupMentorResponse> getByStatus(String status) throws ServiceException;

}

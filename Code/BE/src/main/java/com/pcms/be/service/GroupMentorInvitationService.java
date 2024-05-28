package com.pcms.be.service;

import com.pcms.be.domain.user.GroupMentorInvitation;
import com.pcms.be.errors.ServiceException;
import com.pcms.be.pojo.response.GroupMentorInvitationResponse;

import java.util.List;

public interface GroupMentorInvitationService {

    GroupMentorInvitation putStatus(Long id, String newStatus) throws ServiceException;
    List<GroupMentorInvitationResponse> getListInvitationByStatus(String status) throws ServiceException;

}
